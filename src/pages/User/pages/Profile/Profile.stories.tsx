import type { Meta, StoryObj } from '@storybook/react'
import Profile from './Profile'

const meta = {
   title: 'Pages/Profile',
   component: Profile,
   tags: ['autodocs']
} satisfies Meta<typeof Profile>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
