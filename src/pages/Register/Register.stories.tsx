import type { Meta, StoryObj } from '@storybook/react'
import Register from './Register'

const meta = {
   title: 'Pages/Register',
   component: Register,
   tags: ['autodocs']
} satisfies Meta<typeof Register>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
