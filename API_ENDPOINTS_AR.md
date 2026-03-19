# توثيق شامل Endpoints مشروع E-Commerce (NestJS)

> Base URL: `{{varUri}} = http://localhost:4000`

## المتغيرات المقترحة في Postman

- `varUri`: رابط السيرفر
- `token`: JWT بعد تسجيل الدخول
- `userId`, `categoryId`, `subCategoryId`, `brandId`, `productId`, `reviewId`, `itemId`, `couponId`, `orderId`, `requestProductId`, `supplierId`, `taxId`

---

## 1) Auth Endpoints

### POST /auth/register

- **الوصف:** إنشاء حساب جديد.
- **Params:** لا يوجد.
- **Body مثال:**

```json
{
  "name": "Ahmed Ali",
  "email": "ahmed@example.com",
  "password": "P@ssw0rd123",
  "confirmPassword": "P@ssw0rd123"
}
```

- **Response مثال (201):**

```json
{
  "message": "User registered successfully",
  "data": {
    "id": "u123",
    "email": "ahmed@example.com"
  }
}
```

### POST /auth/login

- **الوصف:** تسجيل الدخول وإرجاع JWT.
- **Params:** لا يوجد.
- **Body مثال:**

```json
{
  "email": "ahmed@example.com",
  "password": "P@ssw0rd123"
}
```

- **Response مثال (200):**

```json
{
  "token": "jwt-token",
  "user": {
    "id": "u123",
    "role": "user"
  }
}
```

### POST /auth/logout

- **الوصف:** تسجيل خروج المستخدم الحالي.
- **Params:** لا يوجد.
- **Body:** لا يوجد.
- **Response مثال (200):**

```json
{
  "message": "Logged out successfully"
}
```

### POST /auth/verify-email

- **الوصف:** تأكيد البريد الإلكتروني بكود التحقق.
- **Params:** لا يوجد.
- **Body مثال:**

```json
{
  "email": "ahmed@example.com",
  "code": "123456"
}
```

- **Response مثال (200):**

```json
{
  "message": "Email verified"
}
```

### POST /auth/forgot-password

- **الوصف:** إرسال رابط/كود إعادة تعيين كلمة المرور.
- **Params:** لا يوجد.
- **Body مثال:**

```json
{
  "email": "ahmed@example.com"
}
```

- **Response مثال (200):**

```json
{
  "message": "Reset password instructions sent"
}
```

### POST /auth/reset-password

- **الوصف:** تعيين كلمة مرور جديدة باستخدام token.
- **Params:** لا يوجد.
- **Body مثال:**

```json
{
  "token": "reset-token",
  "newPassword": "NewP@ss123",
  "confirmPassword": "NewP@ss123"
}
```

- **Response مثال (200):**

```json
{
  "message": "Password reset successful"
}
```

### POST /auth/change-password

- **الوصف:** تغيير كلمة المرور للمستخدم المسجل دخوله.
- **Params:** لا يوجد.
- **Body مثال:**

```json
{
  "currentPassword": "OldP@ss123",
  "newPassword": "NewP@ss123"
}
```

- **Response مثال (200):**

```json
{
  "message": "Password changed successfully"
}
```

### GET /auth/me

- **الوصف:** جلب بيانات المستخدم الحالي.
- **Params:** لا يوجد.
- **Body:** لا يوجد.
- **Response مثال (200):**

```json
{
  "id": "u123",
  "name": "Ahmed Ali",
  "email": "ahmed@example.com",
  "role": "user"
}
```

---

## 2) Users Endpoints

### Admin

#### GET /users

- **Params:** Query اختياري: `page`, `limit`, `sort`, `keyword`.
- **Body:** لا يوجد.
- **Response مثال:**

```json
{
  "results": 20,
  "page": 1,
  "data": [{ "id": "u1", "name": "User 1" }]
}
```

#### GET /users/:id

- **Path Params:** `id`.
- **Body:** لا يوجد.
- **Response مثال:**

```json
{
  "id": "u1",
  "name": "User 1",
  "email": "u1@example.com"
}
```

#### PATCH /users/:id

- **Path Params:** `id`.
- **Body مثال:**

```json
{
  "name": "Updated Name",
  "phone": "01000000000"
}
```

- **Response:**

```json
{
  "message": "User updated",
  "data": { "id": "u1", "name": "Updated Name" }
}
```

#### DELETE /users/:id

- **Path Params:** `id`.
- **Body:** لا يوجد.
- **Response:**

```json
{
  "message": "User deleted"
}
```

#### PATCH /users/:id/activate

- **Path Params:** `id`.
- **Body:** لا يوجد.
- **Response:**

```json
{
  "message": "User activated"
}
```

#### PATCH /users/:id/deactivate

- **Path Params:** `id`.
- **Body:** لا يوجد.
- **Response:**

```json
{
  "message": "User deactivated"
}
```

### User

#### GET /users/me

- **Params:** لا يوجد.
- **Body:** لا يوجد.
- **Response:** بيانات المستخدم الحالي.

#### PATCH /users/updateMe

- **Body مثال:**

```json
{
  "name": "My New Name",
  "address": "Cairo"
}
```

- **Response:**

```json
{
  "message": "Profile updated"
}
```

#### DELETE /users/deleteMe

- **Body:** لا يوجد.
- **Response:**

```json
{
  "message": "Account deleted"
}
```

#### PATCH /users/changePassword

- **Body مثال:**

```json
{
  "currentPassword": "OldP@ss123",
  "newPassword": "NewP@ss123"
}
```

- **Response:**

```json
{
  "message": "Password changed"
}
```

---

## 3) Categories Endpoints

### POST /categories (Admin)

- **Body:**

```json
{
  "name": "Electronics",
  "image": "https://example.com/cat.jpg"
}
```

- **Response:** `201 Created` + بيانات التصنيف.

### PATCH /categories/:id (Admin)

- **Path Params:** `id`
- **Body:**

```json
{
  "name": "Mobiles"
}
```

- **Response:**

```json
{
  "message": "Category updated"
}
```

### DELETE /categories/:id (Admin)

- **Path Params:** `id`
- **Response:**

```json
{
  "message": "Category deleted"
}
```

### GET /categories (Public)

- **Query:** `page`, `limit`, `sort`.
- **Response:** قائمة التصنيفات.

### GET /categories/:id (Public)

- **Path Params:** `id`
- **Response:** بيانات تصنيف واحد.

---

## 4) Sub Categories

### POST /subcategories (Admin)

- **Body:**

```json
{
  "name": "Smartphones",
  "categoryId": "{{categoryId}}"
}
```

### PATCH /subcategories/:id (Admin)

- **Body:**

```json
{
  "name": "Accessories"
}
```

### DELETE /subcategories/:id (Admin)

- **Path Params:** `id`

### GET /subcategories (Public)

- **Response:** قائمة sub-categories.

### GET /subcategories/:id (Public)

- **Response:** sub-category واحدة.

### GET /categories/:categoryId/subcategories (Public)

- **Path Params:** `categoryId`
- **Response:** كل sub-categories الخاصة بالتصنيف.

---

## 5) Brands

### POST /brands (Admin)

- **Body:**

```json
{
  "name": "Apple",
  "logo": "https://example.com/apple.png"
}
```

### PATCH /brands/:id (Admin)

- **Body:**

```json
{
  "name": "Apple Inc."
}
```

### DELETE /brands/:id (Admin)

- **Path Params:** `id`

### GET /brands (Public)

- **Response:** قائمة البراندات.

### GET /brands/:id (Public)

- **Response:** براند واحدة.

---

## 6) Products

### POST /products (Admin)

- **Body:**

```json
{
  "title": "iPhone 15",
  "description": "Latest iPhone",
  "price": 1200,
  "stock": 20,
  "category": "{{categoryId}}",
  "subCategory": "{{subCategoryId}}",
  "brand": "{{brandId}}"
}
```

### PATCH /products/:id (Admin)

- **Body:**

```json
{
  "price": 1100,
  "stock": 30
}
```

### DELETE /products/:id (Admin)

- **Path Params:** `id`

### GET /products (Public)

- **Query مدعوم:** `page`, `limit`, `sort`, `fields`, `keyword`, `category`, `brand`, `price[gte]`, `price[lte]`
- **Response مثال:**

```json
{
  "results": 10,
  "data": [{ "id": "p1", "title": "iPhone 15", "price": 1200 }]
}
```

### GET /products/:id (Public)

- **Path Params:** `id`
- **Response:** بيانات منتج كامل + علاقاته.

### أمثلة Filtering & Search

- `/products?keyword=iphone`
- `/products?category=electronics`
- `/products?brand=apple`
- `/products?price[gte]=100`
- `/products?sort=price`
- `/products?page=2`

---

## 7) Reviews

### POST /reviews (User)

- **Body:**

```json
{
  "productId": "{{productId}}",
  "rating": 5,
  "comment": "Excellent product"
}
```

### PATCH /reviews/:id (User)

- **Body:**

```json
{
  "rating": 4,
  "comment": "Updated comment"
}
```

### DELETE /reviews/:id (User)

- **Path Params:** `id`

### GET /reviews/myReviews (User)

- **Response:** مراجعات المستخدم الحالي.

### GET /products/:productId/reviews (Public)

- **Path Params:** `productId`
- **Response:** كل مراجعات المنتج.

### GET /reviews (Admin)

- **Response:** جميع المراجعات.

### GET /reviews/user/:userId (Admin)

- **Path Params:** `userId`
- **Response:** مراجعات مستخدم محدد.

---

## 8) Cart

### POST /cart

- **Body:**

```json
{
  "productId": "{{productId}}",
  "quantity": 1
}
```

### GET /cart

- **Response:** محتوى السلة + total.

### PATCH /cart/:itemId

- **Body:**

```json
{
  "quantity": 2
}
```

### DELETE /cart/:itemId

- **Response:** حذف عنصر من السلة.

### DELETE /cart

- **Response:** تفريغ السلة.

### POST /cart/apply-coupon

- **Body:**

```json
{
  "coupon": "SAVE20"
}
```

- **Response:** السعر بعد الخصم.

---

## 9) Coupons

### POST /coupons (Admin)

- **Body:**

```json
{
  "code": "SAVE20",
  "discount": 20,
  "expiresAt": "2026-12-31T23:59:59.000Z"
}
```

### GET /coupons (Admin)

- **Response:** قائمة الكوبونات.

### GET /coupons/:id (Admin)

- **Response:** كوبون واحد.

### PATCH /coupons/:id (Admin)

- **Body:**

```json
{
  "discount": 25
}
```

### DELETE /coupons/:id (Admin)

- **Response:** حذف الكوبون.

---

## 10) Orders

### POST /orders (User)

- **Body:**

```json
{
  "shippingAddress": {
    "city": "Cairo",
    "street": "Nasr City",
    "phone": "01000000000"
  },
  "paymentMethod": "cash"
}
```

### GET /orders/myOrders (User)

- **Response:** كل طلبات المستخدم.

### GET /orders/:id (User/Admin)

- **Response:** تفاصيل الطلب.

### GET /orders (Admin)

- **Response:** كل الطلبات.

### PATCH /orders/:id/pay (Admin)

- **Response:** تحديث حالة الدفع إلى `paid`.

### PATCH /orders/:id/deliver (Admin)

- **Response:** تحديث حالة التوصيل إلى `delivered`.

---

## 11) Stripe Payment

### POST /checkout/session

- **Body:**

```json
{
  "orderId": "{{orderId}}"
}
```

- **Response مثال:**

```json
{
  "sessionId": "cs_test_...",
  "url": "https://checkout.stripe.com/..."
}
```

### POST /webhook/stripe

- **Body:** Stripe event payload.
- **Response:**

```json
{
  "received": true
}
```

---

## 12) Request Product

### POST /request-product (User)

- **Body:**

```json
{
  "name": "PlayStation 5",
  "details": "Need latest model"
}
```

### GET /request-product/:id (User/Admin)

- **Response:** طلب منتج واحد.

### PATCH /request-product/:id (User)

- **Body:**

```json
{
  "details": "Need digital edition"
}
```

### DELETE /request-product/:id (User)

- **Response:** حذف الطلب.

### GET /request-product (Admin)

- **Response:** كل الطلبات.

---

## 13) Suppliers

### POST /suppliers (Admin)

- **Body:**

```json
{
  "name": "Global Supplier",
  "email": "supplier@example.com",
  "phone": "01000000000"
}
```

### GET /suppliers (Admin/User)

- **Response:** قائمة الموردين.

### GET /suppliers/:id (Admin)

- **Response:** مورد واحد.

### PATCH /suppliers/:id (Admin)

- **Body:**

```json
{
  "phone": "01111111111"
}
```

### DELETE /suppliers/:id (Admin)

- **Response:** حذف المورد.

---

## 14) Tax & Shipping

### POST /tax (Admin)

- **Body:**

```json
{
  "country": "EG",
  "taxRate": 14,
  "shippingFee": 50
}
```

### GET /tax (Admin)

- **Response:** إعدادات الضريبة والشحن.

### PATCH /tax/:id (Admin)

- **Body:**

```json
{
  "shippingFee": 60
}
```

### DELETE /tax/:id (Admin)

- **Response:** حذف إعدادات الضريبة.

---

## 15) Upload Images

### POST /upload/single

- **Body:** `form-data` → key: `image` (file).
- **Response:** رابط الصورة المرفوعة.

### POST /upload/multiple

- **Body:** `form-data` → key: `images` (files).
- **Response:** روابط الصور المرفوعة.

---

## 16) Wishlist

### POST /wishlist/:productId

- **Path Params:** `productId`
- **Response:** إضافة المنتج للمفضلة.

### DELETE /wishlist/:productId

- **Response:** حذف المنتج من المفضلة.

### GET /wishlist

- **Response:** قائمة المفضلة للمستخدم.

---

## 17) Admin Dashboard Stats

### GET /dashboard/stats

- **Response:** إحصائيات عامة (orders, revenue, users...).

### GET /dashboard/sales

- **Response:** تقارير المبيعات (يومي/شهري).

### GET /dashboard/users

- **Response:** إحصائيات المستخدمين.

### GET /dashboard/products

- **Response:** إحصائيات المنتجات (الأكثر مبيعًا/الأقل مخزونًا).

---

## ملاحظات احترافية مهمة للـ API

- **Pagination:** استخدم `page` و `limit`.
- **Filtering:** مثل `category`, `brand`, `price[gte]`.
- **Sorting:** مثل `sort=price,-createdAt`.
- **Search:** مثل `keyword=iphone`.
- **Populate Relations:** ربط category/subcategory/brand/reviews عند الحاجة.
- **Rate Limiting:** حماية من spam/brute force.
- **Caching:** Redis أو memory cache للـ endpoints الثقيلة.
- **Validation:** DTO + `class-validator` + `ValidationPipe`.
