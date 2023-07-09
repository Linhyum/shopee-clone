import axios, { AxiosError, HttpStatusCode } from 'axios'

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
