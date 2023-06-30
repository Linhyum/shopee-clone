import { Route, Routes } from 'react-router-dom'
import ProductList from './pages/ProductList/ProductList'
import RegisterLayout from './layouts/RegisterLayout/RegisterLayout'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'

export default function App() {
   return (
      <Routes>
         <Route path='/' element={<ProductList />} />
         <Route element={<RegisterLayout />}>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
         </Route>
      </Routes>
   )
}
