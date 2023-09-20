import { UploadedFile } from "express-fileupload";
import temp from 'temp';
const audioconcat = require("audioconcat");

export class AudioCombinar {
  combine(files: UploadedFile[]) {
    temp.track();
    const paths: string[] = [];

    for (const file of files) {
      const stream = temp.createWriteStream();
      stream.write(file.data);
      paths.push(stream.path as string)
      stream.end();
    }

    audioconcat(paths)
      .concat("./outputs/combined.mp3")
      .on("error", function (err: Error) {
        console.error("Error:", err);
      });
  }
}
