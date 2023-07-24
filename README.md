# Dự án Shopee Clone Typescript

## Chức năng trong dự án

-  Authentication module: Quản lý bằng JWT

   -  Đăng ký
   -  Đăng nhập
   -  Đăng xuất

-  Trang danh sách sản phẩm:

   -  Có phân trang
   -  Sort (sắp xếp) theo từng thuộc tính sản phẩm
   -  filter nâng cao theo từng thuộc tính sản phẩm
   -  Tìm kiếm sản phẩm

-  Trang chi tiết sản phẩm:

   -  Hiển thị thông tin chi tiết
   -  Ảnh hiển thị theo slider + hover zoom effect
   -  Mô tả thì hiển thị rich text dạng WYSIWYG HTML
   -  Có chức năng mua hàng, thêm vào giỏ hàng

-  Giỏ hàng:

   -  Quản lý đơn hàng: Thêm, sửa, xóa sản phẩm
   -  Mua hàng

-  Quản lý thông tin khách hàng:
   -  Update thông tin cá nhân
   -  Upload Avatar
   -  Đổi mật khẩu
   -  Xem tình trạng đơn hàng

## Công nghệ sử dụng

-  Language: TypeScript, ReactJS
-  UI / CSS Library: Tailwindcss
-  State Management: React Query cho async state và React Context cho state thường
-  Form Management: React Hook Form, Yup
-  Router: React Router
-  Build tool: Vite
-  Hỗ trợ đa ngôn ngữ với react.i18next
-  Hỗ trợ SEO với React Helmet
-  Quản lý component với Storybook
-  Unit Test với vitest và testing library
