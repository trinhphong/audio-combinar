import express, { Request, Response } from "express";
import { AudioCombinar } from "../services/audio-combinar";
import { UploadedFile } from "express-fileupload";
const router = express.Router();

router.post("/combine", async (req: Request, res: Response) => {
  try {
    const service = new AudioCombinar();
    const files: UploadedFile[] = [];

    for (const property in req.files) {
      const uploadFile = req.files[property] as UploadedFile;
      files.push(uploadFile);
    }

    service.combine(files);

    return res.json({ success: true, message: 'Combined audio file is outputs/combined.mp3' });
  } catch (error) {
    return res.json({ error });
  }
});

export default router;
