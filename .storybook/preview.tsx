import type { Preview } from '@storybook/react'
import '../src/index.scss'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AppProvider } from '../src/contexts/app.context'
import React from 'react'
import ErrorBoundary from '../src/components/ErrorBoundary/ErrorBoundary'
import I18nProvider from '../src/i18n/i18n'

import { withRouter } from 'storybook-addon-react-router-v6'
const queryClient = new QueryClient({
   defaultOptions: {
      queries: {
         retry: false
      },
      mutations: {
         retry: false
      }
   },
   logger: {
      log: console.log,
      warn: console.warn,
      error: () => null
   }
})

export const preview: Preview = {
   parameters: {
      actions: { argTypesRegex: '^on[A-Z].*' },
      controls: {
         matchers: {
            color: /(background|color)$/i,
            date: /Date$/
         }
      }
   }
}

export const decorators = [
   withRouter,
   (Story: any) => (
      <QueryClientProvider client={queryClient}>
         <AppProvider>
            <ErrorBoundary>
               <I18nProvider />
               <Story />
            </ErrorBoundary>
         </AppProvider>
      </QueryClientProvider>
   )
]
