import type { Meta, StoryObj } from '@storybook/react'
import ChangePassword from './ChangePassword'

const meta = {
   title: 'Pages/ChangePassword',
   component: ChangePassword,
   tags: ['autodocs']
} satisfies Meta<typeof ChangePassword>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
