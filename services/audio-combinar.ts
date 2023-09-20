import { UploadedFile } from "express-fileupload";
const audioconcat = require("audioconcat");

export class AudioCombinar {
  combine(files: UploadedFile[]) {
    audioconcat(files.map((file: UploadedFile) => file.name))
      .concat("./outputs/combined.mp3")
      .on("error", function (err: Error) {
        console.error("Error:", err);
      });
  }
}
