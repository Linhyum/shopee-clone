import type { Meta, StoryObj } from '@storybook/react'
import ProductDetails from './ProductDetails'

const meta = {
   title: 'Pages/ProductDetails',
   component: ProductDetails,
   tags: ['autodocs']
} satisfies Meta<typeof ProductDetails>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}

Primary.story = {
   parameters: {
      reactRouter: {
         routePath: '/:id',
         routeParams: { id: 'Điện-Thoại-Vsmart-Active-3-6GB64GB--Hàng-Chính-Hãng-i-60afb2c76ef5b902180aacba' }
      }
   }
}
