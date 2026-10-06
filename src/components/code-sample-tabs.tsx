'use client';

import { useRef, useState, type KeyboardEvent } from 'react';
import { CopyCodeButton } from './copy-code-button';

export interface CodeSampleTab {
  id: string;
  label: string;
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
    <>
      <div className="flex min-w-0 items-stretch border-b border-white/[0.06] bg-[#0b1724]">
        <div
          className="hidden shrink-0 items-center gap-2 border-r border-white/[0.06] px-4 sm:flex"
          aria-hidden="true"
        >
          <span className="size-2.5 rounded-full bg-[#FF6B6B]/80" />
          <span className="size-2.5 rounded-full bg-brand-gold/80" />
          <span className="size-2.5 rounded-full bg-[#5DD39E]/80" />
        </div>
        <div role="tablist" aria-label={tabsLabel} className="flex min-w-0 flex-1 overflow-x-auto">
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
                className={`shrink-0 border-b-2 px-3 py-3 text-xs font-semibold whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-cyan/70 sm:px-4 ${
                  isSelected
                    ? 'border-brand-cyan bg-[#08111d] text-white'
                    : 'border-transparent text-ink-400 hover:bg-white/[0.03] hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
        <div className="flex shrink-0 items-center border-l border-white/[0.06] px-2">
          <CopyCodeButton code={activeTab.code} label={copyLabel} copiedLabel={copiedLabel} />
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
            <pre
              className={`min-h-52 min-w-0 max-w-full overflow-x-auto bg-[#272822] px-5 py-7 text-[13px] leading-7 sm:px-7 sm:text-sm ${
                tab.id === 'console-command' ? 'font-monoid' : 'font-sans'
              }`}
            >
              <code
                lang="python"
                className="hljs block max-w-full"
                dangerouslySetInnerHTML={{ __html: tab.highlightedCode }}
              />
            </pre>
          </div>
        );
      })}
    </>
  );
}