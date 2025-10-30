# 🧪 Testing Guide - NestJS với Jest

## 📋 **Tổng quan**
Hệ thống test này sử dụng Jest và NestJS testing utilities để test Users service với đầy đủ các tính năng:
- ✅ **13 test cases** - All passed
- ✅ **Unit Testing** - Mock dependencies
- ✅ **Integration Testing** - Test business logic  
- ✅ **Coverage** - Tất cả methods được test

---

## 🚀 **Cách chạy tests:**

### 1. **Chạy tất cả tests:**
```bash
npm run test
```

### 2. **Chạy tests với pattern:**
```bash
# Chạy tất cả tests trong users module
npm run test -- --testPathPatterns=users

# Chạy file test cụ thể
npm run test -- users.service.complete.spec.ts

# Chạy với watch mode
npm run test:watch

# Chạy với coverage
npm run test:cov
```

### 3. **Debug tests:**
```bash
npm run test:debug
```

---

## 📝 **Cấu trúc Test File**

### **Setup và Mocking:**
```typescript
describe('UsersService - Complete Tests', () => {
  let service: UsersService;
  let mockUserModel: any;

  beforeEach(async () => {
    // Mock Mongoose Model methods
    mockUserModel = {
      findOne: jest.fn(),
      find: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      sort: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      exec: jest.fn(),
      countDocuments: jest.fn().mockReturnThis(),
    };

    // Tạo Module với mock dependencies
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: MockUserConstructor,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });
```

---

## 🧩 **Test Cases chi tiết:**

### **1. Create User Tests:**
```typescript
describe('create', () => {
  it('should create a user successfully', async () => {
    // Arrange
    const createUserDto: CreateUserDto = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
    };
    mockUserModel.findOne.mockResolvedValue(null);

    // Act
    const result = await service.create(createUserDto);

    // Assert
    expect(result).toBeDefined();
    expect(result.name).toBe(createUserDto.name);
    expect(mockUserModel.findOne).toHaveBeenCalledWith({
      email: createUserDto.email,
    });
  });

  it('should throw ConflictException when email exists', async () => {
    // Test duplicate email
    mockUserModel.findOne.mockResolvedValue({ 
      email: 'existing@example.com' 
    });

    await expect(service.create(createUserDto))
      .rejects.toThrow(ConflictException);
  });
});
```

### **2. Pagination Tests:**
```typescript
describe('findAllWithPagination', () => {
  it('should return paginated users with correct structure', async () => {
    // Mock data
    const mockUsers = [
      { name: 'John Doe', email: 'john@example.com' },
      { name: 'Jane Doe', email: 'jane@example.com' },
    ];
    
    mockUserModel.exec
      .mockResolvedValueOnce(mockUsers)  // for find
      .mockResolvedValueOnce(25);        // for countDocuments

    const query: QueryUsersDto = { page: 1, limit: 10 };
    const result = await service.findAllWithPagination(query);

    // Verify structure
    expect(result).toHaveProperty('data');
    expect(result).toHaveProperty('pagination');
    expect(result.pagination.current).toBe(1);
    expect(result.pagination.total).toBe(25);
  });
```

### **3. Search và Filter Tests:**
```typescript
  it('should handle search functionality', async () => {
    const query: QueryUsersDto = { search: 'john' };
    await service.findAllWithPagination(query);

    expect(mockUserModel.find).toHaveBeenCalledWith({
      $or: [
        { name: { $regex: 'john', $options: 'i' } },
        { email: { $regex: 'john', $options: 'i' } },
      ],
    });
  });

  it('should handle role filter', async () => {
    const query: QueryUsersDto = { role: 'ADMIN' };
    await service.findAllWithPagination(query);

    expect(mockUserModel.find).toHaveBeenCalledWith({ 
      role: 'ADMIN' 
    });
  });
```

### **4. Sorting Tests:**
```typescript
  it('should handle descending sort', async () => {
    const query: QueryUsersDto = { sort: '-createdAt' };
    await service.findAllWithPagination(query);

    expect(mockUserModel.sort).toHaveBeenCalledWith({ 
      createdAt: -1 
    });
  });
```

### **5. Password Validation Tests:**
```typescript
describe('validatePassword', () => {
  it('should return true for correct password', async () => {
    const bcrypt = require('bcrypt');
    jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);

    const result = await service.validatePassword(
      'password123',
      'hashedPassword'
    );

    expect(result).toBe(true);
  });
});
```

---

## 🎯 **Test Results Summary:**

```
✅ UsersService - Complete Tests
  ✅ create
    ✓ should create a user successfully (72 ms)
    ✓ should throw ConflictException when email exists (8 ms)
  ✅ findAllWithPagination  
    ✓ should return paginated users with correct structure (29 ms)
    ✓ should handle search functionality (3 ms)
    ✓ should handle role filter (2 ms)
    ✓ should handle isActive filter (2 ms)
    ✓ should handle descending sort (1 ms)
    ✓ should handle ascending sort (1 ms)
    ✓ should handle complex query with multiple filters (9 ms)
  ✅ validatePassword
    ✓ should return true for correct password (2 ms)
    ✓ should return false for incorrect password (1 ms)  
  ✅ findAll
    ✓ should return all users without pagination (1 ms)
  ✅ findOne
    ✓ should return user by id (3 ms)

📊 Test Suites: 1 passed, 1 total
📊 Tests: 13 passed, 13 total
⏱️ Time: 0.983 s
```

---

## 💡 **Best Practices được áp dụng:**

### **1. AAA Pattern:**
- **Arrange:** Setup data và mocks  
- **Act:** Gọi method cần test
- **Assert:** Verify kết quả

### **2. Descriptive Test Names:**
- `should create a user successfully`
- `should handle search functionality`  
- `should throw ConflictException when email exists`

### **3. Complete Mocking:**
- Mock tất cả external dependencies
- Chain methods với `mockReturnThis()`
- Mock async operations với `mockResolvedValue()`

### **4. Edge Cases Testing:**
- Empty results
- Error scenarios  
- Complex query combinations
- Boundary conditions

### **5. Verification:**
- Verify method calls: `toHaveBeenCalledWith()`
- Verify return values: `toBe()`, `toEqual()`  
- Verify exceptions: `rejects.toThrow()`

---

## 🔧 **Debugging Tests:**

### **1. Add console.log:**
```typescript
it('debug test', async () => {
  console.log('Mock calls:', mockUserModel.find.mock.calls);
  console.log('Result:', result);
});
```

### **2. Test specific case:**
```typescript
it.only('focus on this test', async () => {
  // Only this test will run
});
```

### **3. Skip failing tests:**
```typescript
it.skip('skip this test', async () => {
  // This test will be skipped
});
```

---

## 📚 **Tài liệu tham khảo:**
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [NestJS Testing](https://docs.nestjs.com/fundamentals/testing)
- [Testing Best Practices](https://github.com/goldbergyoni/javascript-testing-best-practices)