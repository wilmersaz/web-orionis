'use client';

import { Check, Copy } from 'lucide-react';
import { useEffect, useState } from 'react';

interface CopyCodeButtonProps {
  code: string;
  label: string;
  copiedLabel: string;
}

export function CopyCodeButton({ code, label, copiedLabel }: CopyCodeButtonProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;

    const timeoutId = window.setTimeout(() => setCopied(false), 1600);
    return () => window.clearTimeout(timeoutId);
  }, [copied]);

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  const Icon = copied ? Check : Copy;

  return (
    <button
      type="button"
      onClick={copyCode}
      aria-label={copied ? copiedLabel : label}
      title={copied ? copiedLabel : label}
      className="shrink-0 rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-brand-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan/60 dark:text-slate-400 dark:hover:bg-white/[0.06] dark:hover:text-brand-cyan"
    >
      <Icon size={15} aria-hidden="true" />
    </button>
  );
}