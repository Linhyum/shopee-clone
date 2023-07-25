import type { Meta, StoryObj } from '@storybook/react'
import MainLayout from './MainLayout'

const meta = {
   title: 'Layouts/MainLayout',
   component: MainLayout,
   tags: ['autodocs'],
   argTypes: {
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

export const Primary: Story = {}
