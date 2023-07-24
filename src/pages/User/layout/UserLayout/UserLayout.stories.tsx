import type { Meta, StoryObj } from '@storybook/react'
import UserLayout from './UserLayout'

const meta = {
   title: 'Layouts/UserLayout',
   component: UserLayout,
   tags: ['autodocs']
} satisfies Meta<typeof UserLayout>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
