import { UploadedFile } from "express-fileupload";
import temp from "temp";
import ffmpeg, { FfmpegCommand } from "fluent-ffmpeg";

const OUTPUT_PATH = "./outputs/combined.mp3";

export class AudioCombinar {
  combine(files: UploadedFile[]): FfmpegCommand {
    temp.track();
    const paths: (string | Buffer)[] = [];

    for (const file of files) {
      const stream = temp.createWriteStream();
      stream.write(file.data);
      paths.push(stream.path);
      stream.end();
    }

    const filter = "concat:" + paths.join("|");
    const renderer = ffmpeg().input(filter).outputOptions("-acodec copy");

    return renderer.save(OUTPUT_PATH);
  }
}
