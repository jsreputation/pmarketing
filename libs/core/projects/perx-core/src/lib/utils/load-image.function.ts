import { patchUrl } from './patch-url.function';
import { getImageCors } from './getImageCors';

export function loadImage(path: string): Promise<HTMLImageElement> {
  return new Promise((resolve, _) => {
    const image = getImageCors(patchUrl(path));
    image.onload = () => resolve(image);
  });
}
