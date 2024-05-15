import jwt from "jsonwebtoken";

export const decodeAccessToken = (token: string) => {
  const accessSecret: any = process.env.ACCESS_SECRET_KEY;
  let playload: any;
  return jwt.verify(token, accessSecret, (err: any, decode: any) => {
    if (err) {
      return { status: false, message: `${err}jwt err` };
    } else {
      playload = decode;
      return { status: true, message: "token verified", data: playload };
    }
  });
};
