import jwt from "jsonwebtoken";

const generateToken = (id: string, isAdmin?: boolean) => {
  const token = jwt.sign(
    { id, isAdmin: isAdmin ?? false },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "7d",
    }
  );
  return token;
};

export default generateToken;
