import type { Meta, StoryObj } from '@storybook/react'
import MainLayout from './MainLayout'

const meta = {
   title: 'Layouts/MainLayout',
   component: MainLayout,
   tags: ['autodocs'],
   argTypes: {
      children: {
         description: 'Nội dung của trang web',
         table: {
            type: { summary: 'React.ReactNode' }
         }
      },
      isRegister: {
         description: 'Kiểm tra có phải là header của trang register hay không'
      },
      isCart: {
         description: 'Kiểm tra có phải là header của trang giỏ hàng hay không'
      }
   }
} satisfies Meta<typeof MainLayout>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
   args: {
      children: 'Nội dung của trang web'
   }
}

// Primary.story = {
//    parameters: {
//       reactRouter: {
//          routePath: '/:id',
//          routeParams: { id: 'Điện-Thoại-Vsmart-Active-3-6GB64GB--Hàng-Chính-Hãng-i-60afb2c76ef5b902180aacba' }
//       }
//    }
// }
