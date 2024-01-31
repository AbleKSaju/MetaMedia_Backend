import jwt from "jsonwebtoken";
import { Response } from "express";

export const createAccessToken = (
  user: Object,
  AccessTokensecretkey: string,
  Expiration: string
) => {
  console.log("acess token creating");
  const token = jwt.sign({ user }, AccessTokensecretkey, {
    expiresIn: Expiration,
  });
  console.log(token,"Access token");
  return token;
};

export const createRefreshToken = (
  user: Object,
  RefreshTokenscretkey: string,
  Expiration: string
) => {
  console.log("enter into create refresh");
  return jwt.sign({ user }, RefreshTokenscretkey, { expiresIn: Expiration });
};

export const clearRefreshTokenFromCookie = (
  cookieName: string,
  res: Response
) => {
  console.log("attachAccesTokenToCookie - not http only ", "development");
  res.cookie(cookieName, {
    httpOnly: false,
    secure: false,
    signed: false,
    maxAge: 0,
  });
};
