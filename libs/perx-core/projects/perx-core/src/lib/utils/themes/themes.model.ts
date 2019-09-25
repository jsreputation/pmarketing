export interface ITheme {
    name: string;
    properties: IThemeProperties;
}

interface IThemeProperties {
    '--font'?: string;
    '--logo'?: string;
    '--title'?: string;
    '--accent'?: string;
    '--primary'?: string;
    '--button_color'?: string;
    '--header_color'?: string;
    '--background': string;
    '--font_color': string;
}

export const LIGHT: ITheme = {
    name: 'Light',
    properties: {
        '--background': '#e5e5e5',
        '--font_color': '#2d2d2d'
    }
};

export const DARK: ITheme = {
    name: 'Dark',
    properties: {
        '--background': '#1f2935',
        '--font_color': '#fff'
    }
};
