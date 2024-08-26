import {NextFunction, Request, Response} from "express";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader !== process.env.API_KEY) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  next();
};
