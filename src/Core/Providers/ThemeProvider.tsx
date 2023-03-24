import {
  Accessor,
  Component,
  JSX,
  Setter,
  createContext,
  createEffect,
  createSignal,
  useContext,
} from "solid-js";

type Theme = "light" | "dark" | "system";
type Accent = "blue" | "red" | "green" | "yellow" | "purple" | "orange";

export interface ThemeProviderProps {
  children: JSX.Element;
}

export type ThemeContextProps = [
  theme: Accessor<Theme>,
  setTheme: Setter<Theme>,
  accent: Accessor<Accent>,
  setAccent: Setter<Accent>,
];

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

  const [accent, setAccent] = createSignal<Accent>("blue");
  const [themeOverride, setThemeOverride] = createSignal(
    (localStorage.getItem("theme") as Theme) ?? "system",
  );

  const theme =
    themeOverride() === "system" ? systemColorScheme : themeOverride;

  createEffect(() => {
    localStorage.setItem("theme", theme());
  });

  return (
    <ThemeContext.Provider value={[theme, setThemeOverride, accent, setAccent]}>
      <div data-theme={theme()} data-accent={accent()}>
        {props.children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext)!;