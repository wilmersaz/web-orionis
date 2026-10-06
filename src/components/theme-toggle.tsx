'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

interface ThemeToggleProps {
  switchToLightLabel: string;
  switchToDarkLabel: string;
}

export function ThemeToggle({ switchToLightLabel, switchToDarkLabel }: ThemeToggleProps) {
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
      className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg border border-line/10 bg-surface-elevated text-ink-300 shadow-sm transition-colors hover:border-line/20 hover:bg-surface-overlay/[0.04] hover:text-brand-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan/60"
    >
      <Icon size={17} aria-hidden="true" />
    </button>
  );
}