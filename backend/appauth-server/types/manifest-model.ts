export interface Manifest {
  short_name: string;
  name: string;
  icons: IconObject[];
  start_url: string;
  display: string;
  theme_color: string;
  background_color: string;
}

interface IconObject {
  src: string;
  sizes: string;
  type: string;
}

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
