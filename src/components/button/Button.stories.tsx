import type { Meta, StoryObj } from '@storybook/react'
import Button from './Button'

const meta = {
   title: 'Components/Button',
   component: Button,
   tags: ['autodocs'],
   argTypes: {
      children: {
         description: 'Nội dung button',
         table: {
            type: { summary: 'string' }
         }
      }
   }
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
   args: {
      children: 'Đăng nhập',
      className: 'w-full rounded-md bg-primary py-3 text-base uppercase text-white disabled:opacity-50',
      isLoading: false
   }
}
