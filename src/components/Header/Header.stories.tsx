import type { Meta, StoryObj } from '@storybook/react'
import Header from './Header'

const meta = {
   title: 'Components/Header',
   component: Header,
   tags: ['autodocs'],
   argTypes: {
      isCart: {
         description: 'Kiểm tra có phải là header của giỏ hàng hay không'
      }
   }
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
   args: {
      isCart: false
   }
}
