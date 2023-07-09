import { path } from 'src/constants/path'
import { ProductListParams, ProductListType, ProductType } from 'src/types/product.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

export const productApi = {
   getProductList: (params: ProductListParams) =>
      http.get<SuccessResponse<ProductListType>>(path.products, {
         params
      }),
   getProductDetail: (id: string) => http.get<SuccessResponse<ProductType>>(`${path.products}/${id}`)
}
