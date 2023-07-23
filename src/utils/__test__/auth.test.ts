import { beforeEach, describe, expect, it } from 'vitest'
import {
   clearLS,
   getAccessTokenFromLS,
   getProfileFromLS,
   getRefreshTokenFromLS,
   setAccessTokenFromLS,
   setProfileFromLS,
   setRefreshTokenFromLS
} from '../auth'

const access_token =
   'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YTBlZGI3MWFmYzJlMWExZjk2YTgyOCIsImVtYWlsIjoieXVtQGdtYWlsLmNvbSIsInJvbGVzIjpbIlVzZXIiXSwiY3JlYXRlZF9hdCI6IjIwMjMtMDctMTlUMDI6NTA6MTMuNDI0WiIsImlhdCI6MTY4OTczNTAxMywiZXhwIjoxNjg5ODIxNDEzfQ.2Yih4fE2XgsK1T2pypD6f5yzbmPtMZPSSA5YIzZm41c'

const refresh_token =
   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YTBlZGI3MWFmYzJlMWExZjk2YTgyOCIsImVtYWlsIjoieXVtQGdtYWlsLmNvbSIsInJvbGVzIjpbIlVzZXIiXSwiY3JlYXRlZF9hdCI6IjIwMjMtMDctMTlUMDI6NTA6MTMuNDI0WiIsImlhdCI6MTY4OTczNTAxMywiZXhwIjoxNzAzNTU5MDEzfQ.R-BvN0zeCS7jXuakzcfgb6V12PmtL_ZMhK5h_yPQINY'

const profile =
   '{"_id":"64a0edb71afc2e1a1f96a828","roles":["User"],"email":"yum@gmail.com","createdAt":"2023-07-02T03:23:35.483Z","updatedAt":"2023-07-16T02:48:11.124Z","__v":0,"address":"tam bình í","date_of_birth":"2003-09-19T17:00:00.000Z","name":"Trần Thị Diễm My","phone":"123456","avatar":"368f6d03-4c94-46fd-92f8-49c2b64af0e8.jpg"}'

//beforeEach được gọi 1 lần trước 1 lần describe được gọi(có mấy cái describe thì gọi trước bấy nhiêu lần),tương tự afterEach, còn beforeAll chỉ gọi trước 1 lần cho tất cả describe
//trước mỗi lần describe đều clear hết localStorage cho nó tường minh , k bị ảnh hưởng lẫn nhau
beforeEach(() => {
   localStorage.clear()
})

describe('setAccessTokenFromLS', () => {
   it('access token được set vào localStorage', () => {
      setAccessTokenFromLS(access_token)
      expect(getAccessTokenFromLS()).toBe(access_token)
   })
})

describe('setRefreshTokenFromLS', () => {
   it('refesh token được set vào localStorage', () => {
      setRefreshTokenFromLS(refresh_token)
      expect(getRefreshTokenFromLS()).toEqual(refresh_token)
   })
})

//toBe và toEqual đều dùng để so sánh string nhưng khi so sánh obj thì toBe so sánh tham chiếu còn toEqual chỉ so sánh giá trị
describe('setProfileFromLS', () => {
   it('Profile được set vào localStorage', () => {
      setProfileFromLS(JSON.parse(profile))
      expect(getProfileFromLS()).toEqual(JSON.parse(profile))
   })
})

describe('clearLS', () => {
   it('xoá hết access token, refresh token, profile', () => {
      //set trước rồi clear sau cho nó chặt chẽ
      setAccessTokenFromLS(access_token)
      setRefreshTokenFromLS(refresh_token)
      setProfileFromLS(JSON.parse(profile))
      clearLS()
      expect(getAccessTokenFromLS()).toBe('')
      expect(getRefreshTokenFromLS()).toBe('')
      expect(getProfileFromLS()).toBe(null)
   })
})
