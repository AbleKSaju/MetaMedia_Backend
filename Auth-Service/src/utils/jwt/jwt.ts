import jwt from "jsonwebtoken";
import { Response } from "express";

export const createAccessToken = (
  user: Object,
  AccessTokensecretkey: string,
  Expiration: string
) => {
  const token = jwt.sign({ user }, AccessTokensecretkey, {
    expiresIn: Expiration,
  });
 
  
  return token;
};

export const createRefreshToken = (
  user: Object,
  RefreshTokenscretkey: string,
  Expiration: string
) => {

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
