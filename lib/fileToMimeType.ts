import {
  MediaVideoMimeType,
  MediaAudioMimeType,
  MediaImageMimeType,
} from "@lens-protocol/metadata";

/**
 * Convert file type to one of the supported publication media types.
 */
export default function fileToMimeType(file: File): string {
  const { type } = file;

  // Png
  if (type === "image/png") {
    return MediaImageMimeType.PNG;
  }

  // Jpeg
  if (type === "image/jpeg") {
    return MediaImageMimeType.JPEG;
  }

  // Gif
  if (type === "image/gif") {
    return MediaImageMimeType.GIF;
  }

  // Webp
  if (type === "image/webp") {
    return MediaImageMimeType.WEBP;
  }

  // Mp4
  if (type === "video/mp4") {
    return MediaVideoMimeType.MP4;
  }

  // Mp3
  if (type === "audio/mp3") {
    return MediaAudioMimeType.MP3;
  }

  // Ogg
  if (type === "audio/ogg") {
    return MediaAudioMimeType.OGG_AUDIO;
  }

  // Wav
  if (type === "audio/wav") {
    return MediaAudioMimeType.WAV;
  }

  throw new Error(`Unsupported file type: ${type}`);
}
