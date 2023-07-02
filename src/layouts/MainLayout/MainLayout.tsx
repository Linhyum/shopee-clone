import React from 'react'
import Footer from 'src/components/Footer/Footer'
import Header from 'src/components/Header/Header'

export default function MainLayout({ children }: { children: React.ReactNode }) {
   return (
      <>
         <Header />
         {children}
         <Footer />
      </>
   )
}
