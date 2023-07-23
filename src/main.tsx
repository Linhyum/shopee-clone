import ReactDOM from 'react-dom/client'
import './index.scss'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AppProvider } from './contexts/app.context'

const queryClient = new QueryClient({
   defaultOptions: {
      queries: {
         refetchOnWindowFocus: false,
         retry: 0
      }
   }
})
//dem hết mấy cái kia qua app để viết unit test (vì khi test chỉ chạy trên môi trường giả lập trên terminal)
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
   <BrowserRouter>
      <QueryClientProvider client={queryClient}>
         <AppProvider>
            <App />
         </AppProvider>
      </QueryClientProvider>
   </BrowserRouter>
)
