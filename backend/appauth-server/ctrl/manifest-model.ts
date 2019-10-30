export default interface Manifest {
  short_name: string,
  name: string,
  icons: iconObject[],
  start_url: string,
  display: string,
  theme_color: string,
  background_color: string
};

interface iconObject {
  src: string,
  sizes: string,
  type: string
};

export const LIGHT = {
  name: 'Light',
  properties: {
    '--background': '#fafafa',
    '--font_color': '#333'
  }
};

export const DARK = {
  name: 'Dark',
  properties: {
    '--background': '#1f2935',
    '--font_color': '#fff'
  }
};