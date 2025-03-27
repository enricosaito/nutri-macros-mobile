/**
 * Tema básico para o aplicativo NutriMacros
 */

export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
  };
  spacing: number[];
  fontSize: {
    small: number;
    medium: number;
    large: number;
  };
  borderRadius: number;
}

// Tema padrão do aplicativo
export const theme: Theme = {
  colors: {
    primary: "#4CAF50",
    secondary: "#2196F3",
    background: "#FFFFFF",
    text: "#333333",
  },
  spacing: [4, 8, 12, 16, 20, 24, 32],
  fontSize: {
    small: 14,
    medium: 16,
    large: 20,
  },
  borderRadius: 8,
};

// Tema escuro do aplicativo
export const darkTheme: Theme = {
  colors: {
    primary: "#4CAF50",
    secondary: "#2196F3",
    background: "#121212",
    text: "#FFFFFF",
  },
  spacing: [4, 8, 12, 16, 20, 24, 32],
  fontSize: {
    small: 14,
    medium: 16,
    large: 20,
  },
  borderRadius: 8,
};
