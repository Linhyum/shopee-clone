import { QueryConfig } from 'src/pages/ProductList/ProductList'
import useQueryParams from './useQueryParams'
import { isUndefined, omitBy } from 'lodash'

export default function useQueryConfig() {
   const queryParams: QueryConfig = useQueryParams() //lấy ra các param trên thanh url(?search=name&other=acending)==>{search:name,other:acending}

   //dùng omitBy để loại bỏ các giá trị là undefined(chỉ truyền những cái có nhập vào)
   const queryConfig: QueryConfig = omitBy(
      {
         //vì mặc định queryParams sẽ lấy tất cả param nên phải tạo queryConfig để lấy những cái cần thiết
         page: queryParams.page || '1',
         limit: queryParams.limit || '20',
         sort_by: queryParams.sort_by,
         order: queryParams.order,
         exclude: queryParams.exclude,
         name: queryParams.name,
         price_max: queryParams.price_max,
         price_min: queryParams.price_min,
         rating_filter: queryParams.rating_filter,
         category: queryParams.category
      },
      isUndefined
   )
   return queryConfig
}
