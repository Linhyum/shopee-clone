import { Outlet } from 'react-router-dom'
import Footer from 'src/components/Footer/Footer'
import RegisterHeader from 'src/components/RegisterHeader/RegisterHeader'

export default function RegisterLayout() {
   return (
      <>
         <RegisterHeader></RegisterHeader>
         <Outlet></Outlet>
         <Footer></Footer>
      </>
   )
}
