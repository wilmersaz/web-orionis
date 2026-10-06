/**
 * Single source of truth for external links and global site metadata.
 */
export const site = {
  name: 'Orionis',
  fullName: 'Orionis Framework',
  url: 'https://orionis-framework.com',
  version: '0.755.0',
  repo: 'https://github.com/orionis-framework/framework',
  docs: 'https://docs.orionis-framework.com/en/introduction/prologue/',
  apiReference: 'https://orionis-framework.github.io/framework/',
  twitter: 'https://twitter.com/orionisfw',
} as const;

export const nav: { key: string; href: string }[] = [
  { key: 'features', href: '/#features' },
  { key: 'benchmarks', href: '/#benchmarks' },
  { key: 'modules', href: '/#modules' },
  { key: 'start', href: '/#getting-started' },
  { key: 'community', href: '/#community' },
];
