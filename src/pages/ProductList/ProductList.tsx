import { useEffect } from 'react'

export default function ProductList() {
   useEffect(() => {
      document.title = 'Trang chủ | Shopee Clone'
   }, [])
   return <div>ProductList</div>
}
