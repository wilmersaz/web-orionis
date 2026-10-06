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
      className="rounded-md p-1.5 text-ink-500 transition-colors hover:bg-white/[0.06] hover:text-brand-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan/60"
    >
      <Icon size={15} aria-hidden="true" />
    </button>
  );
}