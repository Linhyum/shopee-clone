import type { Meta, StoryObj } from '@storybook/react'
import InputFile from './InputFile'

const meta = {
   title: 'Components/InputFile',
   component: InputFile,
   tags: ['autodocs']
} satisfies Meta<typeof InputFile>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
