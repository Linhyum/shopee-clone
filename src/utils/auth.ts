import { User } from 'src/types/user.type'

//nếu có access token trong local storage thì login rồi(set isAuthenticated là true)
export const setAccessTokenFromLS = (access_token: string) => {
   localStorage.setItem('access_token', access_token)
}

//khi log out thì bỏ đi
export const clearLS = () => {
   localStorage.removeItem('access_token')
   localStorage.removeItem('profile')
}
// get phải return còn set,remove thì k
export const getAccessTokenFromLS = () => localStorage.getItem('access_token') || ''

//khi lưu obj user vào thì json.stringify còn lấy ra thì json.parse
export const setProfileFromLS = (profile: User) => {
   localStorage.setItem('profile', JSON.stringify(profile))
}

export const getProfileFromLS = () => {
   const result = localStorage.getItem('profile')
   return result ? JSON.parse(result) : null
}
