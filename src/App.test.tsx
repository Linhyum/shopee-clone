import { screen, waitFor } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { renderWithRouter } from './utils/testUtils'
import { path } from './constants/path'
//vitest + testing library

describe('App', () => {
   test('App có render và chuyển trang được', async () => {
      const { user } = renderWithRouter()

      //verify vào đúng trang chủ
      //waitFor sẽ run callback nhiều lần đến khi nào hết timout hoặc expect chạy xong( mặc định timout: 1000ms, interval: 50ms)
      await waitFor(() => {
         expect(document.querySelector('title')?.textContent).toBe('Trang chủ | Shopee Clone')
      })

      //verify chuyển sang trang login,dùng await để đợi cho nó click xong mới render html ra(screen.debug())
      await user.click(screen.getByText(/Đăng nhập/i)) //i tìm kiếm k phân biệt hoa thường

      await waitFor(() => {
         expect(document.querySelector('title')?.textContent).toBe('Đăng nhập | Shopee Clone')
      })
   })

   test('Về trang not found', async () => {
      const badRoute = '/some/bad/route'
      //phải dùng MemoryRouter mới truyền được url bên ngoài vô
      renderWithRouter({ route: badRoute })
      await waitFor(() => {
         expect(screen.getByText(/404/i)).toBeInTheDocument()
      })
   })

   test('Render register page', async () => {
      //phải dùng MemoryRouter mới truyền được url bên ngoài vô
      renderWithRouter({ route: path.register })
      await waitFor(() => {
         expect(screen.getByText(/Bạn đã có tài khoản/i)).toBeInTheDocument()
      })
   })
})
