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

// export const createRefreshTocken = (
//   user: Object,
//   RefreshTokenscretkey: string,
//   Expiration: string
// ) => {
//   console.log('enter into create refresh');
//   return jwt.sign({ user }, RefreshTokenscretkey, { expiresIn: Expiration });
// };

// export const clearRefreshTockenFromCookie = (cookieName:string,res:Response)=>{
//   console.log('attachAccesTokenToCookie - not http only ','development');
//     res.cookie(cookieName,{
//       httpOnly:false,
//       secure:false,
//       signed:false,
//       maxAge:0
//     })
// }
