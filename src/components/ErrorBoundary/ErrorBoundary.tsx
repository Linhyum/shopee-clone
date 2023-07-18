import { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
   children?: ReactNode
}

interface State {
   hasError: boolean
}

export default class ErrorBoundary extends Component<Props, State> {
   public state: State = {
      hasError: false
   }

   // eslint-disable-next-line @typescript-eslint/no-unused-vars
   public static getDerivedStateFromError(_: Error): State {
      // Update state so the next render will show the fallback UI.
      return { hasError: true }
   }

   public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
      // You can also log the error to an error reporting service
      console.error('Uncaught error: ', error, errorInfo)
   }

   public render() {
      if (this.state.hasError) {
         // You can render any custom fallback UI
         return (
            <div className='flex flex-col items-center justify-center h-screen bg-gray-100'>
               <div className='max-w-md p-8 bg-white rounded shadow-lg'>
                  <h2 className='text-2xl font-bold mb-4 text-red-500'>Oops! Something went wrong.</h2>
                  <p className='text-gray-700 mb-8'>Please try again later.</p>
                  <button
                     onClick={() => window.location.reload()}
                     className='px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:bg-red-600'
                  >
                     Refresh
                  </button>
               </div>
            </div>
         )
      }

      return this.props.children
   }
}
