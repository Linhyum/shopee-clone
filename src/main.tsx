import ReactDOM from 'react-dom/client'
import './index.scss'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import App from './App'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AppProvider } from './contexts/app.context'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'
import I18nProvider from './i18n/i18n'
const queryClient = new QueryClient({
   defaultOptions: {
      queries: {
         refetchOnWindowFocus: false,
         retry: 0
      }
   }
})
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
   <BrowserRouter>
      <QueryClientProvider client={queryClient}>
         <AppProvider>
            <ErrorBoundary>
               <I18nProvider />
               <App />
            </ErrorBoundary>
         </AppProvider>
         <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
      <ToastContainer autoClose={2000} />
   </BrowserRouter>
)
