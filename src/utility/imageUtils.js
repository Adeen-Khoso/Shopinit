export function createImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.addEventListener("load", () => resolve(img));
    img.addEventListener("error", (e) => reject(e));
    img.setAttribute("crossOrigin", "anonymous"); // avoid CORS issues
    img.src = url;
  });
}
// loads an image and resolves to an HTMLImageElement
