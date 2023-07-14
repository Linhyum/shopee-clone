import axios, { AxiosError, HttpStatusCode } from 'axios'
import { PurchaseType } from 'src/types/purchase.type'

//kiểm tra lỗi trả về có phải của axios và có status 422 k
export function isAxiosUnprocessableEntity<FormError>(error: unknown): error is AxiosError<FormError> {
   // eslint-disable-next-line import/no-named-as-default-member
   return axios.isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity //422
}

export function formatNumber(number: number) {
   return new Intl.NumberFormat('de-DE').format(number)
}

export function formatNumberWithK(number: number) {
   return new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 })
      .format(number)
      .replace('.', ',')
      .toLowerCase()
}

//xoá các kí tự đặc biệt
const removeSpecialCharacter = (str: string) =>
   // eslint-disable-next-line no-useless-escape
   str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, '')

export const generateNameId = ({ name, id }: { name: string; id: string }) => {
   return `${removeSpecialCharacter(name).replace(/\s/g, '-')}-i-${id}` // /\s/g là dấu cách
}

//lấy ra id từ url trên(generateNameId)
export const getIdFromNameId = (nameId: string) => {
   const arr = nameId.split('-i-')
   return arr[1]
}

//tính tổng số tiền cần thanh toán
export const totalPrice = (purchaseInCartData: PurchaseType[]) => {
   let result = 0
   purchaseInCartData.forEach((purchase) => {
      result += purchase.price * purchase.buy_count
   })
   return result
}

//tính tổng số tiền tiết kiệm
export const totalSavings = (purchaseInCartData: PurchaseType[]) => {
   let result = 0
   purchaseInCartData.forEach((purchase) => {
      result += (purchase.price_before_discount - purchase.price) * purchase.buy_count
   })
   return result
}
