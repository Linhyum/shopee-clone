import { path } from 'src/constants/path'
import { CategoryType } from 'src/types/category.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

export const getCategories = () => http.get<SuccessResponse<CategoryType[]>>(path.categories)
