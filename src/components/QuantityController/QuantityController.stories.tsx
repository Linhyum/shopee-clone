import type { Meta, StoryObj } from '@storybook/react'
import QuantityController from './QuantityController'

const meta = {
   title: 'Components/QuantityController',
   component: QuantityController,
   tags: ['autodocs']
} satisfies Meta<typeof QuantityController>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
