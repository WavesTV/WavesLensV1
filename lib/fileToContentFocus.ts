import { PublicationMainFocus } from "@lens-protocol/metadata";

/**
 * Convert file type to one of the supported content focus types
 */
export default function fileToContentFocus(file: File): PublicationMainFocus {
  // Image
  if (file.type.startsWith("image/")) {
    return PublicationMainFocus.IMAGE;
  }

  // Video
  if (file.type.startsWith("video/")) {
    return PublicationMainFocus.VIDEO;
  }

  // Audio
  if (file.type.startsWith("audio/")) {
    return PublicationMainFocus.AUDIO;
  }

  return PublicationMainFocus.TEXT_ONLY;
}
