import jwt from "jsonwebtoken";
const SECRET_KEY = process.env.SECRET_KEY;
export const generateToken = async (userId) => {
  const token = jwt.sign({ userId }, SECRET_KEY, { expiresIn: "48h" });
  // console.log("NEW TOKEN PAYLOAD:", jwt.decode(token));
  return token;
};

// export const getUserIdFromToken = (token) => {
//   try {
//     const decodedToken = jwt.verify(token, SECRET_KEY);
//     return decodedToken.userId;
//   } catch (error) {
//     return null;
//   }
// };
