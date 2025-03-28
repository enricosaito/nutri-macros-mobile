import { StyleSheet } from "react-native";
import { Theme } from "@/styles/theme";

/**
 * Função para criar estilos usando o sistema de temas
 * @param themeFn - Função que recebe o tema e retorna os estilos
 * @returns StyleSheet criado com os estilos baseados no tema
 */
export const createStyles = <T extends StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>>(
  themeFn: (theme: Theme) => T
) => {
  return (theme: Theme) => StyleSheet.create(themeFn(theme));
};
