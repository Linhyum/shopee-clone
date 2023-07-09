export const sortBy = {
   createdAt: 'createdAt',
   view: 'view',
   sold: 'sold',
   price: 'price'
} as const //as const nghĩa là không thể thay đổi giá trị của obj

export const orderBy = {
   asc: 'asc',
   desc: 'desc'
} as const
