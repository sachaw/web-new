import {
  Accessor,
  Component,
  JSXElement,
  Setter,
  createContext,
  createEffect,
  createSignal,
  useContext,
} from "solid-js";

type Theme = "light" | "dark" | "system";
type Accent =
  | "blue"
  | "red"
  | "green"
  | "yellow"
  | "purple"
  | "orange"
  | "violet";

export interface ThemeProviderProps {
  children: JSXElement;
}

export interface ThemeContextProps {
  theme: Accessor<Theme>;
  setTheme: Setter<Theme>;
  accent: Accessor<Accent>;
  setAccent: Setter<Accent>;
}

const ThemeContext = createContext<ThemeContextProps>();

export const ThemeProvider: Component<ThemeProviderProps> = (props) => {
  //Keep system theme in sync with OS
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const [systemColorScheme, setSystemPreference] = createSignal<Theme>(
    mediaQuery.matches ? "dark" : "light",
  );
  mediaQuery.addEventListener("change", (e) => {
    setSystemPreference(e.matches ? "dark" : "light");
  });

  const [accent, setAccent] = createSignal<Accent>("violet");
  const [themeOverride, setThemeOverride] = createSignal(
    (localStorage.getItem("theme") as Theme) ?? "system",
  );

  const theme =
    themeOverride() === "system" ? systemColorScheme : themeOverride;

  createEffect(() => {
    localStorage.setItem("theme", theme());
  });

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme: setThemeOverride,
        accent,
        setAccent,
      }}
    >
      <div data-theme={theme()} data-accent={accent()}>
        {props.children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext)!;
