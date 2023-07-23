import { screen, waitFor } from '@testing-library/react'
import { path } from 'src/constants/path'
import { access_token } from 'src/msw/auth.msw'
import { setAccessTokenFromLS } from 'src/utils/auth'
import { renderWithRouter } from 'src/utils/testUtils'
import { describe, expect, test } from 'vitest'

describe('Profile', () => {
   test('Hiển thị trang profile', async () => {
      setAccessTokenFromLS(access_token)
      renderWithRouter({ route: path.profile })
      await waitFor(() => {
         expect(screen.queryByText(/Dung lượng file tối đa 1 MB/i)).toBeTruthy()
      })
   })
})
