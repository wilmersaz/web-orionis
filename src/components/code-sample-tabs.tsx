'use client';

import { useRef, useState, type KeyboardEvent } from 'react';
import { Code2 } from 'lucide-react';
import { CopyCodeButton } from './copy-code-button';

export interface CodeSampleTab {
  id: string;
  label: string;
  fileName?: string;
  code: string;
  highlightedCode: string;
}

interface CodeSampleTabsProps {
  tabs: CodeSampleTab[];
  tabsLabel: string;
  copyLabel: string;
  copiedLabel: string;
}

export function CodeSampleTabs({ tabs, tabsLabel, copyLabel, copiedLabel }: CodeSampleTabsProps) {
  const [activeTabId, setActiveTabId] = useState(tabs[0]?.id ?? '');
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const activeTab = tabs.find((tab) => tab.id === activeTabId) ?? tabs[0];

  if (!activeTab) return null;

  function selectTab(index: number) {
    const nextIndex = (index + tabs.length) % tabs.length;
    const nextTab = tabs[nextIndex];

    setActiveTabId(nextTab.id);
    tabRefs.current[nextIndex]?.focus();
  }

  function handleTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      selectTab(index + 1);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      selectTab(index - 1);
    } else if (event.key === 'Home') {
      event.preventDefault();
      selectTab(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      selectTab(tabs.length - 1);
    }
  }

  return (
    <div className="code-editor min-w-0">
      <div className="flex min-w-0 items-center justify-between gap-2 border-b border-slate-200/80 bg-white/90 px-3 py-3 dark:border-white/[0.08] dark:bg-slate-950/20 sm:px-4">
        <div
          role="tablist"
          aria-label={tabsLabel}
          className="flex min-w-0 flex-1 items-center gap-1 overflow-x-auto rounded-lg border border-slate-200/80 bg-slate-50 p-1 dark:border-white/[0.08] dark:bg-slate-900/70"
        >
          {tabs.map((tab, index) => {
            const isSelected = tab.id === activeTab.id;

            return (
              <button
                key={tab.id}
                ref={(element) => {
                  tabRefs.current[index] = element;
                }}
                id={`${tab.id}-tab`}
                type="button"
                role="tab"
                aria-selected={isSelected}
                aria-controls={`${tab.id}-panel`}
                tabIndex={isSelected ? 0 : -1}
                onClick={() => setActiveTabId(tab.id)}
                onKeyDown={(event) => handleTabKeyDown(event, index)}
                className={`shrink-0 whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-cyan/70 sm:px-4 ${
                  isSelected
                    ? 'bg-white text-slate-900 shadow-[0_1px_3px_rgba(15,23,42,0.12)] ring-1 ring-slate-200/80 dark:bg-slate-700 dark:text-white dark:ring-white/10'
                    : 'text-slate-500 hover:bg-white/70 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/[0.06] dark:hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
        <CopyCodeButton code={activeTab.code} label={copyLabel} copiedLabel={copiedLabel} />
      </div>

      <div className="flex min-w-0 items-center border-b border-slate-200/80 bg-slate-50/80 dark:border-white/[0.08] dark:bg-slate-900/35">
        <div className="flex min-w-0 items-center gap-2 border-r border-slate-200/80 bg-white px-4 py-2.5 dark:border-white/[0.08] dark:bg-slate-950/35">
          {/* <Code2 size={15} className="shrink-0 text-brand-cyan" aria-hidden="true" /> */}
          <img src="/python-logo.svg" alt="python" className="shrink-0" width="15" height="15" />
          <span className="truncate font-mono text-[11px] font-medium text-slate-700 dark:text-slate-200">
            {activeTab.fileName ?? activeTab.label}
          </span>
        </div>
      </div>

      {tabs.map((tab) => {
        const isSelected = tab.id === activeTab.id;

        return (
          <div
            key={tab.id}
            id={`${tab.id}-panel`}
            role="tabpanel"
            aria-labelledby={`${tab.id}-tab`}
            tabIndex={0}
            className={`min-w-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-cyan/50 ${
              isSelected ? '' : 'hidden'
            }`}
          >
            <pre className="min-h-[18rem] min-w-0 max-w-full overflow-x-auto bg-white px-5 py-6 font-mono text-[12px] leading-4 text-[#3B3B3B] sm:px-7 sm:py-7 sm:text-[13px]">
              <code
                lang="python"
                className="hljs block max-w-full !bg-transparent !p-0"
                dangerouslySetInnerHTML={{ __html: tab.highlightedCode }}
              />
            </pre>
          </div>
        );
      })}
    </div>
  );
}