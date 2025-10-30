# Users Module - API Documentation

## Tổng quan
Module Users quản lý việc tạo, đọc, cập nhật và xóa người dùng trong hệ thống. Password được hash bằng bcrypt để đảm bảo bảo mật.

## Endpoints

### 1. Tạo người dùng mới
```
POST /users
```

**Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com", 
  "password": "password123",
  "phone": "0123456789",
  "address": "123 Main St",
  "image": "https://example.com/image.jpg",
  "role": "USER"
}
```

**Response (201):**
```json
{
  "_id": "64a1b2c3d4e5f6g7h8i9j0k1",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "0123456789", 
  "address": "123 Main St",
  "image": "https://example.com/image.jpg",
  "role": "USER",
  "accountType": "LOCAL",
  "isActive": false,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

**Lỗi (409):**
```json
{
  "statusCode": 409,
  "message": "Email đã được sử dụng"
}
```

### 2. Lấy danh sách người dùng
```
GET /users
```

**Response (200):**
```json
[
  {
    "_id": "64a1b2c3d4e5f6g7h8i9j0k1",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "0123456789",
    "address": "123 Main St", 
    "role": "USER",
    "accountType": "LOCAL",
    "isActive": false,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

### 3. Lấy thông tin người dùng theo ID
```
GET /users/:id
```

**Response (200):** Tương tự như response của tạo user

### 4. Cập nhật thông tin người dùng
```
PATCH /users/:id
```

**Body:** Các trường tùy chọn từ CreateUserDto

### 5. Xóa người dùng
```
DELETE /users/:id
```

## Validation Rules

### Trường bắt buộc:
- **name**: Chuỗi, không được rỗng
- **email**: Email hợp lệ, không được rỗng, unique
- **password**: Chuỗi, ít nhất 6 ký tự

### Trường tùy chọn:
- **phone**: Chuỗi
- **address**: Chuỗi  
- **image**: Chuỗi (URL)
- **role**: Chuỗi (mặc định: 'USER')

## Security Features

### Password Hashing
- Sử dụng bcrypt với salt rounds = 10
- Password không được trả về trong response
- Method `validatePassword()` để xác thực password

### Validation
- Email phải unique trong hệ thống
- Sử dụng class-validator cho validation
- Thông báo lỗi bằng tiếng Việt

## Database Schema

```typescript
{
  name: string,
  email: string,
  password: string, // Được hash
  phone?: string,
  address?: string, 
  image?: string,
  role: string, // Mặc định 'USER'
  accountType: string, // Mặc định 'LOCAL'
  isActive: boolean, // Mặc định false
  codeId?: string, // Cho xác thực email
  codeExpired?: Date,
  createdAt: Date,
  updatedAt: Date
}
```

## Testing

Chạy test:
```bash
npm run test -- users.service.spec.ts
```

## Usage Example

```typescript
// Trong service khác
constructor(private usersService: UsersService) {}

// Tạo user
const newUser = await this.usersService.create({
  name: 'John Doe',
  email: 'john@example.com',
  password: 'password123'
});

// Xác thực password
const isValid = await this.usersService.validatePassword(
  'password123', 
  user.password
);

// Tìm user theo email
const user = await this.usersService.findByEmail('john@example.com');
```