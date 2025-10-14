// Khởi tạo database và collection mẫu
db = db.getSiblingDB('englishwithcici');

// Tạo collection users
db.createCollection('users');

// Thêm dữ liệu mẫu
db.users.insertMany([
  {
    name: "Admin User",
    email: "admin@englishwithcici.com",
    role: "admin",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Test User",
    email: "test@englishwithcici.com",
    role: "student",
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

// Tạo collection lessons
db.createCollection('lessons');

// Thêm dữ liệu mẫu cho lessons
db.lessons.insertMany([
  {
    title: "Basic Greetings",
    description: "Learn how to greet people in English",
    level: "beginner",
    content: "Hello, Hi, Good morning, Good afternoon, Good evening",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Common Phrases",
    description: "Essential phrases for daily conversation",
    level: "beginner",
    content: "Please, Thank you, Excuse me, I'm sorry",
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

print("Database initialized successfully!");