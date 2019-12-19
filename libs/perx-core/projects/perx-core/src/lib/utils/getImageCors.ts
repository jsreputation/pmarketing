export function getImageCors(src: string| undefined): HTMLImageElement {
  const res = new Image();
  res.setAttribute('crossOrigin', 'Anonymous');
  res.src = src ? `${src}?v=${new Date().getTime()}` : '';
  res.crossOrigin = 'Anonymous';
  return res;
}
