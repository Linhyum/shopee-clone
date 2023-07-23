import i18n from 'i18next'
import { useEffect } from 'react'
import { initReactI18next } from 'react-i18next'
import useLocalStorage from 'src/hooks/useLocalStorage'

export const resources = {
   en: {
      //gọi là namespace
      translation: {
         //header
         account: 'My Account',
         purchase: 'My Purchase',
         logout: 'Logout',
         newAddProduct: 'Newly added products',
         AddItemToCart: 'Add item to cart',
         viewCart: 'View cart',
         login: 'Login',
         register: 'Register',
         noProduct: 'No products',
         noAccount: 'Do not have an account',
         hasAccount: 'Do you already have an account',

         //AsideFilter
         'all categories': 'All categories',
         filter: 'SEARCH FILTER',
         'price range': 'Price range',
         rating: 'Rating',
         apply: 'APPLY',
         deleteAll: 'DELETE ALL',
         from: 'FROM',
         to: 'TO',
         more: 'or more',
         'Đồng hồ': 'Watch',
         'Áo thun': 'T-shirt',
         'Điện thoại': 'Mobile phone',

         //SortProductList
         sort: 'Sort by',
         popular: 'Popular',
         newest: 'Newest',
         selling: 'Selling',
         price: 'Price',
         lowToHigh: 'Price: Low to high',
         highToLow: 'Price: High to low',

         //productDetails
         sold: 'Sold',
         discount: 'DISCOUNT',
         quantity: 'Quantity',
         available: 'Available products',
         addToCart: 'Add To Cart',
         buyNow: 'Buy Now',
         desc: 'Product Description',
         like: 'YOU MIGHT ALSO LIKE',

         //cart
         cart: 'Shopping Cart',
         product: 'Product',
         unitPrice: 'Unit price',
         totalPrice: 'Total Price',
         action: 'Actions',
         delete: 'Delete',
         selectAll: 'Select All',
         totalPayment: 'Total Payment',
         item: 'item',
         saved: 'Saved',
         checkOut: 'Check Out',
         emty: 'Your shopping cart is empty',

         //user

         //profile
         changePassword: 'Change Password',
         myProfile: 'My Profile',
         manage: 'Manage and protect your account',
         name: 'Name',
         phoneNumber: 'Phone Number',
         address: 'Address',
         dateOfBirth: 'Date Of Birth',
         saveInfo: 'Save Info',
         selectImage: 'Select Image',
         fileSize: 'File size: maximum 1 MB',
         fileExt: 'File extension: .JPEG, .PNG',
         day: 'Day',
         month: 'Month',
         year: 'Year',

         //change password
         oldPassword: 'Old Password',
         newPassword: 'New Password',
         confirmPassword: 'Confirm Password',

         //history purchases
         'Tất cả': 'All',
         'Chờ xác nhận': 'To Confirm',
         'Chờ lấy hàng': 'To Pickup',
         'Đang giao': 'To Ship',
         'Đã giao': 'Delivered',
         'Đã huỷ': 'Cancelled',
         noPurchase: 'No orders yet',
         editProfile: 'Edit Profile'
      }
   },
   vi: {
      translation: {
         //header
         account: 'Tài khoản của tôi',
         purchase: 'Đơn mua',
         logout: 'Đăng xuất',
         newAddProduct: 'Sản phẩm mới thêm',
         AddItemToCart: 'Thêm hàng vào giỏ',
         viewCart: 'xem giỏ hàng',
         login: 'Đăng nhập',
         register: 'Đăng ký',
         noProduct: 'chưa có sản phẩm',
         noAccount: 'Bạn chưa có tài khoản',
         hasAccount: 'Bạn đã có tài khoản',

         //AsideFilter
         'all categories': 'Tất cả danh mục',
         filter: 'BỘ LỌC TÌM KIẾM',
         'price range': 'Khoảng giá',
         rating: 'Đánh giá',
         apply: 'ÁP DỤNG',
         deleteAll: 'XOÁ TẤT CẢ',
         from: 'TỪ',
         to: 'ĐẾN',
         more: 'Trở lên',
         'Đồng hồ': 'Đồng hồ',
         'Áo thun': 'Áo thun',
         'Điện thoại': 'Điện thoại',

         //SortProductList
         sort: 'Sắp xếp theo',
         popular: 'Phổ biến',
         newest: 'Mới nhất',
         selling: 'Bán chạy',
         price: 'Giá',
         lowToHigh: 'Giá: Thấp đến cao',
         highToLow: 'Giá: Cao đến thấp',

         //productDetails
         sold: 'Đã bán',
         discount: 'GIẢM',
         quantity: 'Số lượng',
         available: 'Sản phẩm có sẵn',
         addToCart: 'Thêm Vào Giỏ Hàng',
         buyNow: 'Mua Ngay',
         desc: 'Mô Tả Sản Phẩm',
         like: 'CÓ THỂ BẠN CŨNG THÍCH',

         //cart
         cart: 'Giỏ hàng',
         product: 'sản phẩm',
         unitPrice: 'đơn giá',
         totalPrice: 'số tiền',
         action: 'thao tác',
         delete: 'Xoá',
         selectAll: 'Chọn tất cả',
         totalPayment: 'Tổng thanh toán',
         item: 'sản phẩm',
         saved: 'Tiết kiệm',
         checkOut: 'mua hàng',
         emty: 'Giỏ hàng của bạn đang trống',

         //user

         //profile
         changePassword: 'Đổi mật khẩu',
         myProfile: 'Hồ Sơ Của Tôi',
         manage: 'Quản lý thông tin hồ sơ để bảo mật tài khoản',
         name: 'Tên',
         phoneNumber: 'Số Điện Thoại',
         address: 'Địa Chỉ',
         dateOfBirth: 'Ngày sinh',
         saveInfo: 'Lưu thông tin',
         selectImage: 'Chọn ảnh',
         fileSize: 'Dung lượng file tối đa 1 MB',
         fileExt: 'Định dạng:.JPEG, .PNG',
         day: 'Ngày',
         month: 'Tháng',
         year: 'Năm',

         //change password
         oldPassword: 'Mật Khẩu Cũ',
         newPassword: 'Mật Khẩu Mới',
         confirmPassword: 'Nhập Lại Mật Khẩu',

         //HistoryPurchase
         'Tất cả': 'Tất cả',
         'Chờ xác nhận': 'Chờ xác nhận',
         'Chờ lấy hàng': 'Chờ lấy hàng',
         'Đang giao': 'Đang giao',
         'Đã giao': 'Đã giao',
         'Đã huỷ': 'Đã huỷ',
         noPurchase: 'Chưa có đơn hàng',
         editProfile: 'Sửa hồ sơ'
      }
   }
}

const I18nProvider = () => {
   const [storedValue] = useLocalStorage<string>('language', 'vi')

   useEffect(() => {
      // eslint-disable-next-line import/no-named-as-default-member
      i18n.use(initReactI18next).init({
         resources,
         lng: storedValue,
         fallbackLng: storedValue,
         interpolation: {
            escapeValue: false // react already safes from xss
         }
      })
   }, [storedValue])

   return null
}

export default I18nProvider
