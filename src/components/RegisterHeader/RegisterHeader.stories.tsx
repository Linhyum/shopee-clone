import type { Meta, StoryObj } from '@storybook/react'
import RegisterHeader from './RegisterHeader'

const meta = {
   title: 'Components/RegisterHeader',
   component: RegisterHeader,
   tags: ['autodocs']
} satisfies Meta<typeof RegisterHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
