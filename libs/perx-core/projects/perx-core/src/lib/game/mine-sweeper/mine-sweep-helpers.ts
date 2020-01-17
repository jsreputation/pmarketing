export function rand(min: number, max: number): number {
  // phpjs.org
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * @source http://www.html5canvastutorials.com/tutorials/html5-canvas-image-loader/
 */
export function loadImages(sources: string[], callback: (images: { [k: string]: HTMLImageElement }) => void): void {
  const images: { [k: string]: HTMLImageElement } = {};
  let loadedImages: number = 0;
  const numImages: number = sources.length;
  sources.forEach((src: string) => {
    images[src] = new Image();
    images[src].onload = () => {
      if (++loadedImages >= numImages) {
        callback(images);
      }
    };
    images[src].src = src;
  });
}
// tslint:disable-next-line:naming-convention
export const enum CELL_TYPE {
  // const
  CLOSED = 1001, // cell closed
  FLAG = 1002, // cell with flag
  QUESTION = 1003, // is a mine?
  MINE = 1009, // cell with mine
  MINES_NEAR_0 = 1010, // cell with 0 mines near
  MINES_NEAR_1 = 1011, // cell with 1 mines near
  MINES_NEAR_2 = 1012, // cell with 2 mines near
  MINES_NEAR_3 = 1013, // cell with 3 mines near
  MINES_NEAR_4 = 1014, // cell with 4 mines near
  MINES_NEAR_5 = 1015, // cell with 5 mines near
  MINES_NEAR_6 = 1016, // cell with 6 mines near
  MINES_NEAR_7 = 1017, // cell with 7 mines near
  MINES_NEAR_8 = 1018, // cell with 8 mines near
}
