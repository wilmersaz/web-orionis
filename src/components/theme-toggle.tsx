'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

interface ThemeToggleProps {
  switchToLightLabel: string;
  switchToDarkLabel: string;
}

export function ThemeToggle({
  switchToLightLabel,
  switchToDarkLabel,
}: ThemeToggleProps) {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted && theme === 'dark';
  const Icon = isDark ? Moon : Sun;
  const switchLabel = isDark ? switchToLightLabel : switchToDarkLabel;

  return (
    <button
      type="button"
      aria-label={switchLabel}
      aria-pressed={isDark}
      title={switchLabel}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-lg px-2 text-sm font-medium text-ink-400 transition-colors hover:bg-slate-100 hover:text-ink-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan/60 dark:hover:bg-white/[0.06] dark:hover:text-ink-50 sm:px-2.5"
    >
      <Icon size={17} aria-hidden="true" />
    </button>
  );
}