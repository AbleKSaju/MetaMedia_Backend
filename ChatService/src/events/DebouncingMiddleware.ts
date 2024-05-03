import { Request, Response } from "express";

let timeouts:any = {};

export const debounceMiddleware = (req:Request, res:Response, next:any) => {
  const requestId:any = req.method + req.originalUrl;
  if (timeouts[requestId]) {
    clearTimeout(timeouts[requestId]);
  }
  timeouts[requestId] = setTimeout(() => {
    delete timeouts[requestId];
    next();
  }, 10); 
};