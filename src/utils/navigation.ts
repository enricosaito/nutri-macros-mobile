// src/utils/navigation.ts
import { useRouter } from "expo-router";

/**
 * Helper function to navigate safely with type assertions
 */
export const useTypeSafeRouter = () => {
  const router = useRouter();

  const navigateTo = (path: string) => {
    router.push(path as any);
  };

  return {
    navigateTo,
    router,
  };
};
