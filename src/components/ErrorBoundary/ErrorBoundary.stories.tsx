import type { Meta, StoryObj } from '@storybook/react'
import ErrorBoundary from './ErrorBoundary'

const meta = {
   title: 'Components/ErrorBoundary',
   component: ErrorBoundary,
   tags: ['autodocs']
   // argTypes: {
   //    isCart: {
   //       description: 'Kiểm tra có phải là ErrorBoundary của giỏ hàng hay không'
   //    }
   // }
} satisfies Meta<typeof ErrorBoundary>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
   args: {
      children: (
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
}
