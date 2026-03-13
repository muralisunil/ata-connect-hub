import { Settings, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useColorTheme, type ColorTheme } from "@/hooks/use-color-theme";
import { useTranslation, type Language } from "@/i18n/LanguageContext";

const themeColors: Record<ColorTheme, string> = {
  gold: "hsl(36, 90%, 50%)",
  blue: "hsl(210, 90%, 50%)",
  emerald: "hsl(160, 80%, 38%)",
};

const SettingsDropdown = () => {
  const { theme, setTheme, themes } = useColorTheme();
  const { lang, setLang, t } = useTranslation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9">
          <Settings className="h-4 w-4" />
          <span className="sr-only">Settings</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>{t.settings.theme}</DropdownMenuLabel>
        {themes.map((th) => (
          <DropdownMenuItem
            key={th.value}
            onClick={() => setTheme(th.value)}
            className="flex items-center gap-2"
          >
            <span
              className="h-3.5 w-3.5 rounded-full border border-border shrink-0"
              style={{ backgroundColor: themeColors[th.value] }}
            />
            <span className="flex-1">{t.settings[th.value]}</span>
            {theme === th.value && <Check className="h-4 w-4 text-primary" />}
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator />

        <DropdownMenuLabel>{t.settings.language}</DropdownMenuLabel>
        {([
          { value: "en" as Language, label: t.settings.english },
          { value: "te" as Language, label: t.settings.telugu },
        ]).map((l) => (
          <DropdownMenuItem
            key={l.value}
            onClick={() => setLang(l.value)}
            className="flex items-center gap-2"
          >
            <span className="flex-1">{l.label}</span>
            {lang === l.value && <Check className="h-4 w-4 text-primary" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SettingsDropdown;
