import React from 'react'
import Footer from 'src/components/Footer/Footer'
import Header from 'src/components/Header/Header'
import RegisterHeader from 'src/components/RegisterHeader/RegisterHeader'

export default function MainLayout({
   children,
   isCart,
   isRegister
}: {
   children: React.ReactNode
   isCart?: boolean
   isRegister?: boolean
}) {
   return (
      <>
         {isRegister ? <RegisterHeader /> : <Header isCart={isCart} />}
         {children}
         <Footer />
      </>
   )
}
