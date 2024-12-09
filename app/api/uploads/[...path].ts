import { existsSync, createReadStream } from "fs";
import path from "path";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { path: filePathArray } = req.query;
  const filePath = path.join(process.cwd(), "uploads", ...(filePathArray as string[]));

  if (!existsSync(filePath)) {
    res.status(404).json({ error: "File not found" });
    return;
  }

  res.setHeader("Content-Disposition", `inline; filename="${path.basename(filePath)}"`);
  res.setHeader("Content-Type", "application/octet-stream");

  const fileStream = createReadStream(filePath);
  fileStream.pipe(res);
}
