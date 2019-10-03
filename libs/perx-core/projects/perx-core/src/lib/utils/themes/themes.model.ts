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
    '--button_text_color'?: string;
    '--button_background_color'?: string;
    '--header_color'?: string;
    '--background': string;
    '--font_color': string;
}

export const LIGHT: ITheme = {
    name: 'Light',
    properties: {
        '--background': '#fafafa',
        '--font_color': '#333'
    }
};

export const DARK: ITheme = {
    name: 'Dark',
    properties: {
        '--background': '#1f2935',
        '--font_color': '#fff'
    }
};
