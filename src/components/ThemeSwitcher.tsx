import { useColorTheme } from "@/hooks/use-color-theme";
import { cn } from "@/lib/utils";

const ThemeSwitcher = () => {
  const { theme, setTheme, themes } = useColorTheme();

  return (
    <div className="flex items-center gap-1.5">
      {themes.map((t) => (
        <button
          key={t.value}
          onClick={() => setTheme(t.value)}
          title={t.label}
          className={cn(
            "h-5 w-5 rounded-full border-2 transition-all hover:scale-110",
            theme === t.value
              ? "border-foreground scale-110"
              : "border-transparent opacity-60 hover:opacity-100"
          )}
          style={{ backgroundColor: t.color }}
          aria-label={`Switch to ${t.label} theme`}
        />
      ))}
    </div>
  );
};

export default ThemeSwitcher;
