import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen, waitForOptions } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import App from 'src/App'
import { AppProvider, getInitialAppContext } from 'src/contexts/app.context'

export const delay = (time: number) =>
   new Promise((resolve) => {
      setTimeout(() => {
         resolve(true)
      }, time)
   })

//{ time = 1000 } = {} tham số này là obj detrusturing ra và lấy giá trị time gán mặc định là 1000
export const logScreen = async (
   body: HTMLElement = document.body.parentElement as HTMLElement,
   options?: waitForOptions
) => {
   const { timeout = 1000 } = options || {}
   await delay(timeout)
   screen.debug(body, 9_999_999) //cho chúng ta thấy nó render ra cái gì
}

const createWrapper = () => {
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
   const Provider = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
   )
   return Provider
}

const Provider = createWrapper()
export const renderWithRouter = ({ route = '/' } = {}) => {
   window.history.pushState({}, 'Test Page', route)
   const defaultValueAppContext = getInitialAppContext()
   return {
      user: userEvent.setup(),
      ...render(
         <Provider>
            <AppProvider defaultValue={defaultValueAppContext}>
               <App />
            </AppProvider>
         </Provider>,
         { wrapper: BrowserRouter }
      )
   }
}
