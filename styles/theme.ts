// styles/theme.ts
export interface Theme {
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
}

// Light theme according to your web app colors
export const theme: Theme = {
  colors: {
    primary: "hsl(142, 70%, 45%)",
    primaryDark: "hsl(142, 70%, 35%)",
    primaryLight: "hsl(142, 70%, 55%)",
    secondary: "hsl(140, 15%, 94%)",
    secondaryDark: "hsl(140, 15%, 84%)",
    secondaryLight: "hsl(140, 15%, 98%)",
    background: "hsl(140, 50%, 98%)",
    foreground: "hsl(140, 10%, 10%)",
    card: "white",
    text: "hsl(140, 10%, 10%)",
    textMuted: "hsl(140, 10%, 40%)",
    border: "hsl(140, 10%, 90%)",
    error: "#e11d48",
    success: "#10b981",
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 24,
    xxl: 32,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    full: 9999,
  },
};

// Dark theme according to your web app colors
export const darkTheme: Theme = {
  colors: {
    primary: "hsl(142, 60%, 50%)",
    primaryDark: "hsl(142, 60%, 40%)",
    primaryLight: "hsl(142, 60%, 60%)",
    secondary: "hsl(140, 10%, 20%)",
    secondaryDark: "hsl(140, 10%, 15%)",
    secondaryLight: "hsl(140, 10%, 25%)",
    background: "hsl(140, 15%, 10%)",
    foreground: "hsl(0, 0%, 98%)",
    card: "hsl(140, 15%, 13%)",
    text: "hsl(0, 0%, 98%)",
    textMuted: "hsl(0, 0%, 70%)",
    border: "hsl(140, 15%, 18%)",
    error: "#f43f5e",
    success: "#34d399",
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 24,
    xxl: 32,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    full: 9999,
  },
};
