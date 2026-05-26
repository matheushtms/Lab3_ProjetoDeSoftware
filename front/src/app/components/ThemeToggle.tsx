import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { cn } from './ui/utils';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const activeTheme = theme === 'light' ? 'light' : 'dark';

  const optionClass = (option: 'light' | 'dark') =>
    cn(
      'inline-flex h-10 w-10 items-center justify-center rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
      activeTheme === option
        ? 'bg-primary text-primary-foreground shadow-md'
        : 'text-foreground/65 hover:bg-accent hover:text-accent-foreground',
    );

  return (
    <div
      className="fixed bottom-4 right-4 z-[70] flex items-center gap-1 rounded-full border border-border bg-card/85 p-1 shadow-2xl backdrop-blur-xl"
      aria-label="Selecionar tema"
    >
      <button
        type="button"
        className={optionClass('light')}
        onClick={() => setTheme('light')}
        title="Tema claro"
        aria-label="Ativar tema claro"
        aria-pressed={activeTheme === 'light'}
      >
        <Sun className="h-4 w-4" />
      </button>
      <button
        type="button"
        className={optionClass('dark')}
        onClick={() => setTheme('dark')}
        title="Tema escuro"
        aria-label="Ativar tema escuro"
        aria-pressed={activeTheme === 'dark'}
      >
        <Moon className="h-4 w-4" />
      </button>
    </div>
  );
}
