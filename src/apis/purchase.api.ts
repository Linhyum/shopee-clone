import { path } from 'src/constants/path'
import { PurchaseListStatus, PurchaseType } from 'src/types/purchase.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

export const addToCart = (body: { product_id: string; buy_count: number }) =>
   http.post<SuccessResponse<PurchaseType>>(`${path.purchases}/add-to-cart`, body)

export const getPurchases = (params: { status: PurchaseListStatus }) =>
   http.get<SuccessResponse<PurchaseType[]>>(path.purchases, {
      params
   })

export const buyProducts = (body: { product_id: string; buy_count: number }[]) =>
   http.post<SuccessResponse<PurchaseType[]>>(`${path.purchases}/buy-products`, body)

export const updatePurchases = (body: { product_id: string; buy_count: number }) =>
   http.put<SuccessResponse<PurchaseType>>(`${path.purchases}/update-purchase`, body)

export const deletePurchases = (purchaseIds: string[]) =>
   http.delete<SuccessResponse<{ deleted_count: number }>>(`${path.purchases}`, {
      data: purchaseIds
   })
