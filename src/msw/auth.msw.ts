import { rest } from 'msw'

export const access_token_1s =
   'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0OWVkMjI4MWFmYzJlMWExZjk2YTc0NyIsImVtYWlsIjoibGluaDEyM0BnbWFpbC5jb20iLCJyb2xlcyI6WyJVc2VyIl0sImNyZWF0ZWRfYXQiOiIyMDIzLTA3LTIwVDAyOjQyOjI2LjUwM1oiLCJpYXQiOjE2ODk4MjA5NDYsImV4cCI6MTY4OTgyMDk0N30.guhiOEgzBy-9fkpn7OKTOQ7wHrwvyzS3qDMSANl069U'
export const refresh_token_1000days =
   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0OWVkMjI4MWFmYzJlMWExZjk2YTc0NyIsImVtYWlsIjoibGluaDEyM0BnbWFpbC5jb20iLCJyb2xlcyI6WyJVc2VyIl0sImNyZWF0ZWRfYXQiOiIyMDIzLTA3LTIwVDAyOjQ4OjQ4LjQzN1oiLCJpYXQiOjE2ODk4MjEzMjgsImV4cCI6MTc3NjIyMTMyOH0.kz_uilI6GfP59jhykEakXe3ORysBUBoePEbeEyu4LvY'
export const access_token =
   'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0OWVkMjI4MWFmYzJlMWExZjk2YTc0NyIsImVtYWlsIjoibGluaDEyM0BnbWFpbC5jb20iLCJyb2xlcyI6WyJVc2VyIl0sImNyZWF0ZWRfYXQiOiIyMDIzLTA3LTIzVDAyOjM1OjMxLjI4NFoiLCJpYXQiOjE2OTAwNzk3MzEsImV4cCI6MTcwMDA3OTczMH0.LTWw503vtVoMxyIKr2SREIrP9q1FkT5dDP8xhPpwV3c'
const loginRes = {
   message: 'Đăng nhập thành công',
   data: {
      access_token:
         'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0OWVkMjI4MWFmYzJlMWExZjk2YTc0NyIsImVtYWlsIjoibGluaDEyM0BnbWFpbC5jb20iLCJyb2xlcyI6WyJVc2VyIl0sImNyZWF0ZWRfYXQiOiIyMDIzLTA3LTIyVDEyOjQ2OjI5LjQ0OVoiLCJpYXQiOjE2OTAwMjk5ODksImV4cCI6MTY5MTAyOTk4OH0.LbYekJYukYi16H4HuKCoxgt15XXroIwf9kqrqaS5Mrc',
      expires: 999_999,
      refresh_token:
         'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0OWVkMjI4MWFmYzJlMWExZjk2YTc0NyIsImVtYWlsIjoibGluaDEyM0BnbWFpbC5jb20iLCJyb2xlcyI6WyJVc2VyIl0sImNyZWF0ZWRfYXQiOiIyMDIzLTA3LTIyVDEyOjQ2OjI5LjQ0OVoiLCJpYXQiOjE2OTAwMjk5ODksImV4cCI6MTc3NjQyOTk4OX0.AtJu3A61rHsMUawwhyrYyfL7iBJ8zlJgr58zwxyozuc',
      expires_refresh_token: 86_400_000,
      user: {
         _id: '649ed2281afc2e1a1f96a747',
         roles: ['User'],
         email: 'linh123@gmail.com',
         createdAt: '2023-06-30T13:01:28.739Z',
         updatedAt: '2023-07-14T14:53:19.316Z',
         __v: 0,
         address: 'Việt Nam',
         avatar: 'URL Avatar',
         date_of_birth: '1907-02-18T17:17:56.000Z',
         name: 'Dư Thanh Được',
         phone: '04511414'
      }
   }
}

const refreshTokenRes = {
   message: 'Refresh Token thành công',
   data: {
      access_token:
         'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0OWVkMjI4MWFmYzJlMWExZjk2YTc0NyIsImVtYWlsIjoibGluaDEyM0BnbWFpbC5jb20iLCJyb2xlcyI6WyJVc2VyIl0sImNyZWF0ZWRfYXQiOiIyMDIzLTA3LTIyVDE0OjU1OjI0LjU1M1oiLCJpYXQiOjE2OTAwMzc3MjQsImV4cCI6MTY5MDY0MjUyNH0._KGbXwZv7iq7ix8cIuCZkO0lKwOh5A_20FSyeGhLd0c'
   }
}
const loginRequest = rest.post('https://api-ecom.duthanhduoc.com/login', (_, res, ctx) => {
   return res(ctx.status(200), ctx.json(loginRes))
})

const refreshToken = rest.post('https://api-ecom.duthanhduoc.com/refresh-access-token', (_, res, ctx) => {
   return res(ctx.status(200), ctx.json(refreshTokenRes))
})

export const authRequests = [loginRequest, refreshToken]
