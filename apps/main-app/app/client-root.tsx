'use client';

import { NextNavigationPlugin } from '@/plugins/next-navigation-plugin';
import { RouterProvider } from '@/plugins/router-provider';
import { PluginDescriptor, VyuhProvider } from '@vyuh/react-core';
import { DefaultContentPlugin } from '@vyuh/react-extension-content';

import { system } from '@vyuh/react-feature-system';
import { SanityContentProvider } from '@vyuh/react-plugin-content-provider-sanity';
import { misc } from 'react-feature-misc';
import { ReactNode } from 'react';

import '@/app/globals.css';

const sanityProvider = new SanityContentProvider({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  perspective: 'drafts',
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN!,
});

const plugins = new PluginDescriptor({
  content: new DefaultContentPlugin(sanityProvider),
  navigation: new NextNavigationPlugin(),
});

/**
 * Feature configuration
 * Returns all features used in the application
 */
const features = () => [system, misc];

export function ClientRoot({ children }: { children: ReactNode }) {
  return (
    <VyuhProvider features={features} plugins={plugins}>
      <RouterProvider>{children}</RouterProvider>
    </VyuhProvider>
  );
}
