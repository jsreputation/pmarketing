export function getImageCors(src: string | undefined): HTMLImageElement {
  const res = new Image();
  res.setAttribute('crossorigin', 'anonymous');
  res.crossOrigin = 'Anonymous';
  res.src = src || '';
  // res.src = src ? `${src}?v=${new Date().getTime()}` : '';
  return res;
}
