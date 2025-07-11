import { createImage } from "./imageUtils";

// Given an image URL and crop rectangle, return a blob URL of the cropped area
export async function getCroppedImg(imageSrc, pixelCrop) {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
  const ctx = canvas.getContext("2d");

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  // return new Promise((resolve) => {
  //   canvas.toBlob((blob) => {
  //     resolve(URL.createObjectURL(blob));
  //   }, "image/jpeg");
  // });

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob); // return the Blob directly
        } else {
          reject(new Error("Canvas is empty or toBlob failed"));
        }
      },
      "image/jpeg",
      0.95 // quality
    );
  });
}
