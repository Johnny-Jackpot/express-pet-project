export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader !== process.env.API_KEY) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  next();
};
