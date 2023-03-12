import {
  Accessor,
  Component,
  JSX,
  createContext,
  createSignal,
  useContext,
} from "solid-js";

type Theme = "light" | "dark" | "system";
type Accent = "blue" | "red" | "green" | "yellow" | "purple" | "orange";

export interface ThemeProviderProps {
  children: JSX.Element;
}

export type ThemeState = [
  theme: Accessor<Theme> | Theme,
  setTheme: (theme: Theme) => void,
  accent: Accessor<Accent> | Accent,
  setAccent: (accent: Accent) => void,
];

const ThemeContext = createContext<ThemeState>([
  "system",
  (theme: Theme) => {},
  "blue",
  (accent: Accent) => {},
]);

export const ThemeProvider: Component<ThemeProviderProps> = (props) => {
  //Keep system theme in sync with OS
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const [systemColorScheme, setSystemPreference] = createSignal<Theme>(
    mediaQuery.matches ? "dark" : "light",
  );
  mediaQuery.addEventListener("change", (e) => {
    setSystemPreference(e.matches ? "dark" : "light");
    console.log("update systemColorScheme");
  });

  const [accent, setAccent] = createSignal<Accent>("blue");
  const [themeOverride, setThemeOverride] = createSignal(
    (localStorage.getItem("theme") as Theme) ?? "system",
  );

  const theme =
    themeOverride() === "system" ? systemColorScheme : themeOverride;

  return (
    <ThemeContext.Provider
      value={[
        theme,
        (theme: Theme) => {
          localStorage.setItem("theme", theme);
          setThemeOverride(theme);
        },
        accent,
        (accent: Accent) => setAccent(accent),
      ]}
    >
      <div data-theme={theme()} data-accent={accent()}>
        {props.children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
