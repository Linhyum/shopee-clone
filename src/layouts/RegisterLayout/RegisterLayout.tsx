import React from 'react'
import Footer from 'src/components/Footer/Footer'
import RegisterHeader from 'src/components/RegisterHeader/RegisterHeader'

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
   return (
      <>
         <RegisterHeader />
         {children}
         <Footer />
      </>
   )
}
