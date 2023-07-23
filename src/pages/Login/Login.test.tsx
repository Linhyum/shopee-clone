import { fireEvent, screen, waitFor } from '@testing-library/react'
import { path } from 'src/constants/path'
import { renderWithRouter } from 'src/utils/testUtils'
import { describe, expect, test } from 'vitest'

describe('Login', async () => {
   renderWithRouter({ route: path.login })
   //phải có dòng waitFor để chờ cho nó render xong rồi mới chạy xuống dưới
   await waitFor(() => {
      expect(screen.getByText(/Bạn chưa có tài khoản/i)).toBeInTheDocument()
   })

   const emailInput = document.querySelector('input[type="text"]') as HTMLInputElement
   const passwordInput = document.querySelector('input[type="password"]') as HTMLInputElement
   const submitButton = document.querySelector('button[type="submit"]') as HTMLButtonElement

   test('Hiển thị lỗi required khi không nhập gì', async () => {
      fireEvent.click(submitButton)
      await waitFor(() => {
         expect(screen.getByText(/Email là bắt buộc/i)).toBeInTheDocument()
         expect(screen.getByText(/Mật khẩu là bắc buộc/i)).toBeInTheDocument()
      })
   })

   test('Hiển thị lỗi khi nhập dữ liệu không đúng định dạng', async () => {
      fireEvent.change(emailInput, {
         target: {
            value: '3123'
         }
      })
      fireEvent.change(passwordInput, {
         target: {
            value: '3123'
         }
      })
      fireEvent.click(submitButton)
      await waitFor(() => {
         expect(screen.getByText(/Email không đúng định dạng/i)).toBeInTheDocument()
         expect(screen.getByText(/Mật khẩu phải có ít nhất 6 kí tự/i)).toBeInTheDocument()
      })
   })

   test('không hiển thị lỗi khi nhập lại value đúng', async () => {
      fireEvent.change(emailInput, {
         target: {
            value: 'test@gmail.com'
         }
      })
      fireEvent.change(passwordInput, {
         target: {
            value: '123456'
         }
      })

      //những trường hợp tìm k thấy thì dùng query, vì k tìm thấy nó trả về null
      await waitFor(() => {
         expect(screen.queryByText(/Email không đúng định dạng/i)).toBeNull()
         expect(screen.queryByText(/Mật khẩu phải có ít nhất 6 kí tự/i)).toBeNull()
      })

      fireEvent.submit(submitButton)
      //login thành công
      await waitFor(() => {
         expect(document.querySelector('title')?.textContent).toBe('Trang chủ | Shopee Clone')
      })
   })
})
