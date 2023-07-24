import type { Meta, StoryObj } from '@storybook/react'
import ProductRating from './ProductRating'

const meta = {
   title: 'Components/ProductRating',
   component: ProductRating,
   tags: ['autodocs']
} satisfies Meta<typeof ProductRating>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
   args: {
      rating: 3.5
   }
}
