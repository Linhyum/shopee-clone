import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout/MainLayout'
import { Suspense, lazy, useContext, useEffect } from 'react'
import { AppContext } from './contexts/app.context'
import { path } from './constants/path'
import { LocalStorageEventTarget } from './utils/auth'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'
import I18nProvider from './i18n/i18n'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const NotFound = lazy(() => import('./pages/NotFound/NotFound'))
const HistoryPurchase = lazy(() => import('./pages/User/pages/HistoryPurchase/HistoryPurchase'))
const ChangePassword = lazy(() => import('./pages/User/pages/ChangePassword/ChangePassword'))
const UserLayout = lazy(() => import('./pages/User/layout/UserLayout/UserLayout'))
const Profile = lazy(() => import('./pages/User/pages/Profile/Profile'))
const Cart = lazy(() => import('./pages/Cart/Cart'))
const ProductDetails = lazy(() => import('./pages/ProductDetails/ProductDetails'))
const Register = lazy(() => import('./pages/Register/Register'))
const Login = lazy(() => import('./pages/Login/Login'))
const ProductList = lazy(() => import('./pages/ProductList/ProductList'))

function ProtectedRoute() {
   const { isAuthenticated } = useContext(AppContext)
   //nếu chưa login thì không được vào outlet
   return isAuthenticated ? <Outlet /> : <Navigate to={path.login} />
}

function RejectedRoute() {
   const { isAuthenticated } = useContext(AppContext)
   //nếu login rồi thì k cho vào login,register nữa
   return isAuthenticated ? <Navigate to={path.home} /> : <Outlet />
}

export default function App() {
   const { reset } = useContext(AppContext)

   //khi gọi dispatchEvent bên auth.ts thì sẽ chạy vào đây để reset lại dữ liệu
   useEffect(() => {
      LocalStorageEventTarget.addEventListener('clearLS', reset)
      return () => {
         LocalStorageEventTarget.removeEventListener('clearLS', reset)
      }
   }, [reset])
   return (
      <>
         <ErrorBoundary>
            <I18nProvider />
            <Suspense fallback={<></>}>
               <Routes>
                  <Route
                     path={path.home}
                     element={
                        <MainLayout>
                           <ProductList />
                        </MainLayout>
                     }
                  />
                  <Route
                     path={path.productDetails}
                     element={
                        <MainLayout>
                           <ProductDetails />
                        </MainLayout>
                     }
                  />
                  <Route
                     path='*'
                     element={
                        <MainLayout>
                           <NotFound />
                        </MainLayout>
                     }
                  />
                  <Route element={<ProtectedRoute />}>
                     <Route element={<UserLayout />}>
                        <Route path={path.profile} element={<Profile />} />
                        <Route path={path.changePassword} element={<ChangePassword />} />
                        <Route path={path.historyPurchase} element={<HistoryPurchase />} />
                     </Route>

                     <Route
                        path={path.cart}
                        element={
                           <MainLayout isCart>
                              <Cart />
                           </MainLayout>
                        }
                     />
                  </Route>
                  <Route element={<RejectedRoute />}>
                     <Route
                        path={path.login}
                        element={
                           <MainLayout isRegister>
                              <Login />
                           </MainLayout>
                        }
                     />
                     <Route
                        path={path.register}
                        element={
                           <MainLayout isRegister>
                              <Register />
                           </MainLayout>
                        }
                     />
                  </Route>
               </Routes>
            </Suspense>
         </ErrorBoundary>
         <ReactQueryDevtools initialIsOpen={false} />
         <ToastContainer autoClose={2000} />
      </>
   )
}
