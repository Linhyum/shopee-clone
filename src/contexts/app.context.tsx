import React, { createContext, useState } from 'react'
import { ExtendedPurchase } from 'src/types/purchase.type'
import { User } from 'src/types/user.type'
import { getAccessTokenFromLS, getProfileFromLS } from 'src/utils/auth'
interface AppContextInterface {
   isAuthenticated: boolean
   setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
   profile: User | null
   setProfile: React.Dispatch<React.SetStateAction<User | null>>
   extendedPurchases: ExtendedPurchase[]
   setExtendedPurchases: React.Dispatch<React.SetStateAction<ExtendedPurchase[]>>
   reset: () => void
}

//dùng cho unit test profile.test.tsx
export const getInitialAppContext: () => AppContextInterface = () => ({
   isAuthenticated: Boolean(getAccessTokenFromLS()),
   setIsAuthenticated: () => null,
   profile: getProfileFromLS(),
   setProfile: () => null,
   extendedPurchases: [],
   setExtendedPurchases: () => null,
   reset: () => null
})

const initialAppContext = getInitialAppContext()

export const AppContext = createContext<AppContextInterface>(initialAppContext)

//khi không truyền value vào AppProvider thì cái initialAppContext của AppContext sẽ được sử dụng
export const AppProvider = ({
   children,
   defaultValue = initialAppContext
}: {
   children: React.ReactNode
   defaultValue?: AppContextInterface //dùng defaultValue để custom value cho unit test(testUtils.tsx)
}) => {
   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(defaultValue.isAuthenticated)
   const [profile, setProfile] = useState<User | null>(defaultValue.profile)
   const [extendedPurchases, setExtendedPurchases] = useState<ExtendedPurchase[]>(defaultValue.extendedPurchases)

   const reset = () => {
      setIsAuthenticated(false)
      setProfile(null)
      setExtendedPurchases([])
   }

   return (
      <AppContext.Provider
         value={{
            isAuthenticated,
            setIsAuthenticated,
            profile,
            setProfile,
            extendedPurchases,
            setExtendedPurchases,
            reset
         }}
      >
         {children}
      </AppContext.Provider>
   )
}
