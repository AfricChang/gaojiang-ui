export type ColorMode = "light" | "dark";

export const COLOR_MODE_STORAGE_KEY = "wenyan-color-mode";

function isColorMode(value: string | null): value is ColorMode {
    return value === "light" || value === "dark";
}

function getSystemColorMode(): ColorMode {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

class ColorModeStore {
    private _mode = $state<ColorMode>("light");
    private initialized = false;

    initialize() {
        if (this.initialized || typeof window === "undefined" || typeof document === "undefined") return;

        let storedMode: string | null = null;
        try {
            storedMode = localStorage.getItem(COLOR_MODE_STORAGE_KEY);
        } catch (error) {
            console.warn("Failed to load color mode:", error);
        }

        const initialMode = isColorMode(storedMode)
            ? storedMode
            : document.documentElement.classList.contains("dark")
              ? "dark"
              : getSystemColorMode();

        this.initialized = true;
        this.apply(initialMode);
    }

    getMode(): ColorMode {
        return this._mode;
    }

    setMode(mode: ColorMode) {
        this.initialized = true;
        this.apply(mode);

        try {
            localStorage.setItem(COLOR_MODE_STORAGE_KEY, mode);
        } catch (error) {
            console.warn("Failed to save color mode:", error);
        }
    }

    toggle() {
        this.setMode(this._mode === "dark" ? "light" : "dark");
    }

    private apply(mode: ColorMode) {
        this._mode = mode;
        if (typeof document === "undefined") return;

        document.documentElement.classList.toggle("dark", mode === "dark");
        document.documentElement.style.colorScheme = mode;
    }
}

export const colorModeStore = new ColorModeStore();
