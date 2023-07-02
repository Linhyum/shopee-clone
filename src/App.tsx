import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import ProductList from './pages/ProductList/ProductList'
import RegisterLayout from './layouts/RegisterLayout/RegisterLayout'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import MainLayout from './layouts/MainLayout/MainLayout'
import Profile from './pages/Profile/Profile'
import { useContext } from 'react'
import { AppContext } from './contexts/app.context'
import { path } from './constants/path'

function ProtectedRoute() {
   const { isAuthenticated } = useContext(AppContext)
   //nếu chưa login thì không được vào outlet
   return isAuthenticated ? <Outlet /> : <Navigate to={path.login} />
}

function RejectedRoute() {
   const { isAuthenticated } = useContext(AppContext)
   //nếu login rồi thì k cho vào login,register nữa
   return !isAuthenticated ? <Outlet /> : <Navigate to={path.home} />
}

export default function App() {
   return (
      <Routes>
         <Route
            path={path.home}
            element={
               <MainLayout>
                  <ProductList />
               </MainLayout>
            }
         />
         <Route element={<ProtectedRoute />}>
            <Route
               path={path.profile}
               element={
                  <MainLayout>
                     <Profile />
                  </MainLayout>
               }
            />
         </Route>
         <Route element={<RejectedRoute />}>
            <Route
               path={path.login}
               element={
                  <RegisterLayout>
                     <Login />
                  </RegisterLayout>
               }
            />
            <Route
               path={path.register}
               element={
                  <RegisterLayout>
                     <Register />
                  </RegisterLayout>
               }
            />
         </Route>
      </Routes>
   )
}
