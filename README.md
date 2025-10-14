# English with CiCi

Dự án học tiếng Anh với kiến trúc Full Stack hiện đại.

## 🏗️ Kiến trúc dự án

```
englishwithcici/
├── frontend/           # NextJS Frontend (Port: 3000)
├── backend/            # NestJS Backend API (Port: 3001)
├── database/           # MongoDB Configuration & Scripts
├── docker-compose.yml  # Docker setup cho MongoDB
└── README.md          # Documentation
```

## 🛠️ Công nghệ sử dụng

### Frontend
- **NextJS 15** - React Framework với App Router
- **TypeScript** - Type Safety
- **Tailwind CSS** - Styling
- **ESLint** - Code Quality

### Backend
- **NestJS** - Node.js Framework
- **TypeScript** - Type Safety
- **Express** - HTTP Server

### Database
- **MongoDB 7.0** - NoSQL Database
- **Mongo Express** - Database Management UI
- **Docker** - Containerization

## 🚀 Hướng dẫn cài đặt

### Yêu cầu hệ thống
- Node.js (v18 hoặc cao hơn)
- npm
- Docker & Docker Compose

### 1. Clone project và setup môi trường

```bash
# Copy file environment
cp .env.example .env

# Chỉnh sửa các biến môi trường trong file .env nếu cần
```

### 2. Khởi động MongoDB bằng Docker

```bash
# Start MongoDB container
docker-compose up -d

# Kiểm tra container đang chạy
docker-compose ps
```

**Thông tin truy cập MongoDB:**
- MongoDB: `mongodb://admin:password123@localhost:27017/englishwithcici`
- Mongo Express UI: http://localhost:8081 (admin/admin123)

### 3. Setup và chạy Backend (NestJS)

```bash
# Di chuyển vào thư mục backend
cd backend

# Cài đặt dependencies
npm install

# Chạy development server
npm run start:dev
```

Backend sẽ chạy tại: http://localhost:3000 (mặc định NestJS)

### 4. Setup và chạy Frontend (NextJS)

```bash
# Mở terminal mới và di chuyển vào thư mục frontend
cd frontend

# Cài đặt dependencies (đã được cài khi tạo project)
npm install

# Chạy development server
npm run dev
```

Frontend sẽ chạy tại: http://localhost:3000

## 📋 Scripts hữu ích

### Database Management
```bash
# Khởi động MongoDB
docker-compose up -d mongodb

# Khởi động MongoDB + Mongo Express
docker-compose up -d

# Dừng tất cả services
docker-compose down

# Xem logs của MongoDB
docker-compose logs mongodb

# Backup database
docker exec englishwithcici_mongodb mongodump --uri="mongodb://admin:password123@localhost:27017/englishwithcici" --out=/data/backup
```

### Frontend (NextJS)
```bash
cd frontend

# Development
npm run dev

# Build production
npm run build

# Start production server
npm run start

# Lint code
npm run lint
```

### Backend (NestJS)
```bash
cd backend

# Development với hot reload
npm run start:dev

# Build production
npm run build

# Start production
npm run start:prod

# Run tests
npm run test

# Generate new resource
nest generate resource [name]
```

## 🔧 Cấu hình môi trường

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### Backend (.env)
```env
MONGODB_URI=mongodb://admin:password123@localhost:27017/englishwithcici?authSource=admin
PORT=3001
JWT_SECRET=your-secret-key
```

## 📊 Monitoring và Logs

### Xem logs realtime
```bash
# All services
docker-compose logs -f

# Chỉ MongoDB
docker-compose logs -f mongodb

# Backend logs
cd backend && npm run start:dev

# Frontend logs
cd frontend && npm run dev
```

## 🔒 Bảo mật

- Thay đổi mật khẩu mặc định trong production
- Cập nhật JWT_SECRET với key bảo mật cao
- Sử dụng HTTPS trong production
- Cấu hình firewall cho MongoDB

## 🤝 Đóng góp

1. Fork project
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Tạo Pull Request

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📞 Liên hệ

Dự án: English with CiCi
Email: contact@englishwithcici.com
