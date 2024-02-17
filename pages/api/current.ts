import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/libs/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const currentUser = await serverAuth(req);
    res.status(200).json(currentUser);
  } catch (error) {
    console.error("Error:", error);
    res.status(401).json({ message: "Not authenticated!" });
  }
}