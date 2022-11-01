import { useEffect } from 'react';

const THEME_MODE = 'theme-mode';
const defaultTheme = 'light';
const darkTheme = 'dark';

const useDarkMode = () => {
  const storeThemeToLocalStorage = (themeMode: string) => {
    localStorage.setItem(THEME_MODE, themeMode);
  };
  const readThemeToLocalStorage = () => {
    return localStorage.getItem(THEME_MODE) || '';
  };
  const updateTheme = (newTheme: string, previousTheme?: string) => {
    const { classList } = document.documentElement;
    if (previousTheme) classList.remove(previousTheme);
    classList.add(newTheme);
  };

  const toggleTheme = () => {
    const previousTheme = readThemeToLocalStorage();
    const newTheme = previousTheme === defaultTheme ? darkTheme : defaultTheme;
    updateTheme(newTheme, previousTheme);
    storeThemeToLocalStorage(newTheme);
  };

  useEffect(() => {
    const oldTheme = readThemeToLocalStorage();
    if (oldTheme) {
      return updateTheme(oldTheme);
    }

    const runningOnDarkMode = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;

    if (runningOnDarkMode) {
      updateTheme(darkTheme);
      storeThemeToLocalStorage(darkTheme);
    } else {
      updateTheme(defaultTheme);
      storeThemeToLocalStorage(defaultTheme);
    }
  }, []);

  return { toggleTheme };
};

export default useDarkMode;
