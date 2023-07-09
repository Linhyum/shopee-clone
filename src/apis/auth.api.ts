import { path } from 'src/constants/path'
import { AuthResponse } from 'src/types/auth.type'
import http from 'src/utils/http'

export const authApi = {
   registerAccount: (body: { email: string; password: string }) => http.post<AuthResponse>(path.register, body),
   login: (body: { email: string; password: string }) => http.post<AuthResponse>(path.login, body),
   logout: () => http.post(path.logout)
}
