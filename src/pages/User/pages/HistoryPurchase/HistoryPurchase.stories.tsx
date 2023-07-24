import type { Meta, StoryObj } from '@storybook/react'
import HistoryPurchase from './HistoryPurchase'

const meta = {
   title: 'Pages/HistoryPurchase',
   component: HistoryPurchase,
   tags: ['autodocs']
} satisfies Meta<typeof HistoryPurchase>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
