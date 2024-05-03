let users: any = [];
import { io } from "./app";
import { Server, Socket } from "socket.io";
import dependencies from "./frameworks/config/dependencies";
const socketConfig = () => {
  let users: any = [];

  const emailToSocketIdMap = new Map();
  const socketidToEmailMap = new Map();

  io.on("connection", (socket: Socket) => {
    console.log("USER CONNECTED", socket?.id);
    socket.on("addUser", (userId) => {
      const isUserExist = users.find((user: any) => user.userId === userId);
      if (!isUserExist) {
        const user = { userId, socketId: socket.id };
        users.push(user);
        io.emit("getUsers", users);
      }
    });

    socket.on(
      "sendMessage",
      async ({
        senderId,
        receiverId,
        message,
        conversationId,
        lastUpdate,
        socketType,
      }) => {
        const receiver = users.find((user: any) => user.userId === receiverId);
        const sender = users.find((user: any) => user.userId === senderId);
        console.log("sender :>> ", sender);
        console.log("receiver :>> ", receiver);
        if (receiver) {
          io.to(receiver?.socketId)
            .to(sender?.socketId)
            .emit("getMessage", {
              senderId,
              message,
              conversationId,
              receiverId,
              socketType,
              lastUpdate,
            });
        } else {
          io.to(sender?.socketId)?.emit("getMessage", {
            senderId,
            message,
            conversationId,
            receiverId,
            socketType,
            lastUpdate,
          });
        }
      }
    );

    socket.on("disconnect", () => {
      users = users.filter((user: any) => user.socketId !== socket.id);
      io.emit("getUsers", users);
    });

    socket.on("room:join", (data) => {
      const { name, room, receiverId, senderId } = data;
      const receiver = users.find((user: any) => user.userId === receiverId);
      io.to(receiver?.socketId).emit(
        "callingToRoom",
        senderId,
        receiverId,
        room,
        name
      );
      emailToSocketIdMap.set(name, socket.id);
      socketidToEmailMap.set(socket.id, name);
      io.to(room).emit("user:joined", { name, id: socket.id });
      socket.join(room);
      io.to(socket.id).emit("room:join", data);
    });
    socket.on("room:audio:join", (data) => {
      const { name, room, receiverId, senderId } = data;
      console.log(
        name,
        room,
        receiverId,
        senderId,
        "name, room, receiverId, senderId"
      );
      const receiver = users.find((user: any) => user.userId === receiverId);
      io.to(receiver?.socketId).emit(
        "callingToAudioRoom",
        senderId,
        receiverId,
        room,
        name
      );
      emailToSocketIdMap.set(name, socket.id);
      socketidToEmailMap.set(socket.id, name);
      io.to(room).emit("user:Audiojoined", { name, id: socket.id });
      socket.join(room);
      io.to(socket.id).emit("room:audio:join", data);
    });

    socket.on("user:call", ({ to, offer }) => {
      io.to(to).emit("incomming:call", { from: socket.id, offer });
    });

    socket.on("call:accepted", ({ to, ans }) => {
      io.to(to).emit("call:accepted", { from: socket.id, ans });
    });
    socket.on("peer:nego:needed", ({ to, offer }) => {
      io.to(to).emit("peer:nego:needed", { from: socket.id, offer });
    });

    socket.on("peer:nego:done", ({ to, ans }) => {
      io.to(to).emit("peer:nego:final", { from: socket.id, ans });
    });

    socket.on("joinGroup", (data) => {
      try {
        const { group_id, userId } = data;
        socket.join(group_id);
        console.log("Connected to the group", group_id, "by user", userId);
        socket
          .to(group_id)
          .emit("joinGroupResponse", {
            message: "Successfully joined the group",
          });
      } catch (error) {
        console.error("Error occurred while joining group:", error);
      }
    });

    socket.on("GroupMessage", async (data: any) => {
      const { group_id, sender_id, content, type, metadata, lastUpdate } = data;
      const datas = {
        group_id,
        sender_id,
        content,
        type,
        metadata,
        lastUpdate,
      };
      const { SendGroupMessage_UseCase } = dependencies.useCase;
      const response = await SendGroupMessage_UseCase(
        dependencies
      ).executeFunction(data);
      if (response.status) {
        console.log("TEXT MESAGE CREATEDD??????????");
        const emitpayload = response.data;
        io.to(group_id).emit("responseGroupMessage", emitpayload);
      }
    });

    socket.on("GroupfileMessage", (data: any) => {
      io.to(data.group_id).emit("GroupfileResponceMessage", data);
    });

    socket.on("GroupVideoCallRequest", (data: any) => {
      const emitdata = {
        roomId: data.roomId,
      };
      io.to(data.group_id).emit("GroupVideoCallResponse", emitdata);
    });

    socket.on("GroupAudioCallRequest", (data: any) => {
      const emitdata = {
        roomId: data.roomId,
      };
      io.to(data.receiverId).emit("GroupAudioCallResponse", emitdata);
    });

    socket.on("AudioCallRequest", (data: any) => {
      console.log(data.roomId, "dataaasdanjdaa");
      console.log(data.receiverId, "receiverId");
      const emitdata = {
        roomId: data.roomId,
        receiverId:data.receiverId
      };
      io.emit("AudioCallResponse", emitdata);
      console.log("ENITTED");
      
    });
    socket.on("VideoCallRequest", (data: any) => {
      console.log(data.roomId, "dataaasdanjdaa");
      console.log(data.receiverId, "receiverId");
      const emitdata = {
        roomId: data.roomId,
        receiverId:data.receiverId
      };
      io.emit("VideoCallResponse", emitdata);
      console.log("ENITTED");
      
    });
  });
};

export default socketConfig;
