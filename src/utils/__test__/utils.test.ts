import { describe, it, expect } from 'vitest'
import { isAxiosUnprocessableEntity } from '../utils'
import { AxiosError, HttpStatusCode } from 'axios'

//describe dùng để mô tả tập hợp các ngữ cảnh hoặc 1 đơn vị cần test: function,component
describe('isAxiosUnprocessableEntity', () => {
   //it dùng để ghi chú trường hợp cần test
   it('isAxiosUnprocessableEntity trả về boolean', () => {
      //expect dùng để mong đợi giá trị trả về
      //new Error() là 1 error bth chứ k phải axios error nên mong đợi trả về false
      expect(isAxiosUnprocessableEntity(new Error())).toBe(false)
      expect(
         isAxiosUnprocessableEntity(
            new AxiosError(undefined, undefined, undefined, undefined, {
               status: HttpStatusCode.UnprocessableEntity
               // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } as any)
         )
      ).toBe(true)
   })
})
