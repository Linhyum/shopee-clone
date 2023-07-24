import type { Meta, StoryObj } from '@storybook/react'
import { InputNumber } from './InputNumber'

const meta = {
   title: 'Components/InputNumber',
   component: InputNumber,
   tags: ['autodocs']
} satisfies Meta<typeof InputNumber>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
