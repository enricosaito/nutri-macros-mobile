// src/types/theme.d.ts
declare module "../../styles/theme" {
  export const theme: {
    colors: {
      primary: string;
      primaryDark: string;
      primaryLight: string;
      secondary: string;
      secondaryDark: string;
      secondaryLight: string;
      background: string;
      foreground: string;
      card: string;
      text: string;
      textMuted: string;
      border: string;
      error: string;
      success: string;
      warning?: string;
    };
    spacing: {
      xs: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
      xxl: number;
    };
    fontSize: {
      xs: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
      xxl: number;
    };
    borderRadius: {
      sm: number;
      md: number;
      lg: number;
      full: number;
    };
  };
}
