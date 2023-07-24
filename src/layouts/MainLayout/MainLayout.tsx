import { Outlet } from 'react-router-dom'
import Footer from 'src/components/Footer/Footer'
import Header from 'src/components/Header/Header'
import RegisterHeader from 'src/components/RegisterHeader/RegisterHeader'

export default function MainLayout({ isCart, isRegister }: { isCart?: boolean; isRegister?: boolean }) {
   return (
      <>
         {isRegister ? <RegisterHeader /> : <Header isCart={isCart} />}
         <Outlet />
         <Footer />
      </>
   )
}
