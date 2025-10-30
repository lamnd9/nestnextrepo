import { ConflictException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from './dto/create-user.dto';
import { QueryUsersDto } from './dto/query-users.dto';
import { User } from './schemas/user.schema';
import { UsersService } from './users.service';

describe('UsersService - Complete Tests', () => {
  let service: UsersService;
  let mockUserModel: any;

  beforeEach(async () => {
    // Mock cho Mongoose Model
    mockUserModel = {
      // Static methods
      findOne: jest.fn(),
      find: jest.fn().mockReturnThis(),
      findById: jest.fn().mockReturnThis(),
      findByIdAndUpdate: jest.fn().mockReturnThis(),
      findByIdAndDelete: jest.fn(),
      countDocuments: jest.fn().mockReturnThis(),

      // Chain methods
      select: jest.fn().mockReturnThis(),
      sort: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      exec: jest.fn(),
    };

    // Mock constructor cho new Model()
    const MockUserConstructor = jest.fn().mockImplementation((userData) => ({
      ...userData,
      save: jest.fn().mockResolvedValue({
        _id: '507f1f77bcf86cd799439011',
        ...userData,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
      }),
    }));

    // Gán static methods vào constructor
    Object.assign(MockUserConstructor, mockUserModel);

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

  describe('create', () => {
    it('should create a user successfully', async () => {
      const createUserDto: CreateUserDto = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
      };

      // Mock email không tồn tại
      mockUserModel.findOne.mockResolvedValue(null);

      const result = await service.create(createUserDto);

      expect(result).toBeDefined();
      expect(result._id).toBe('507f1f77bcf86cd799439011');
      expect(result.name).toBe(createUserDto.name);
      expect(result.email).toBe(createUserDto.email);
      expect(mockUserModel.findOne).toHaveBeenCalledWith({
        email: createUserDto.email,
      });
    });

    it('should throw ConflictException when email exists', async () => {
      const createUserDto: CreateUserDto = {
        name: 'John Doe',
        email: 'existing@example.com',
        password: 'password123',
      };

      // Mock email đã tồn tại
      mockUserModel.findOne.mockResolvedValue({
        _id: 'existing-id',
        email: 'existing@example.com',
      });

      await expect(service.create(createUserDto)).rejects.toThrow(
        ConflictException,
      );
      await expect(service.create(createUserDto)).rejects.toThrow(
        'Email đã được sử dụng',
      );
    });
  });

  describe('findAllWithPagination', () => {
    it('should return paginated users with correct structure', async () => {
      const mockUsers = [
        {
          _id: '1',
          name: 'John Doe',
          email: 'john@example.com',
          role: 'USER',
          isActive: true,
        },
        {
          _id: '2',
          name: 'Jane Doe',
          email: 'jane@example.com',
          role: 'USER',
          isActive: true,
        },
      ];

      // Mock response cho find query và count
      mockUserModel.exec
        .mockResolvedValueOnce(mockUsers) // for find
        .mockResolvedValueOnce(25); // for countDocuments

      const query: QueryUsersDto = {
        page: 1,
        limit: 10,
      };

      const result = await service.findAllWithPagination(query);

      // Kiểm tra structure response
      expect(result).toHaveProperty('data');
      expect(result).toHaveProperty('pagination');

      // Kiểm tra data
      expect(result.data).toEqual(mockUsers);
      expect(Array.isArray(result.data)).toBe(true);

      // Kiểm tra pagination info
      expect(result.pagination.current).toBe(1);
      expect(result.pagination.pageSize).toBe(10);
      expect(result.pagination.total).toBe(25);
      expect(result.pagination.totalPages).toBe(3);
      expect(result.pagination.hasNext).toBe(true);
      expect(result.pagination.hasPrev).toBe(false);
    });

    it('should handle search functionality', async () => {
      const mockUsers = [{ name: 'John Smith', email: 'john@example.com' }];

      mockUserModel.exec
        .mockResolvedValueOnce(mockUsers)
        .mockResolvedValueOnce(1);

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
      mockUserModel.exec.mockResolvedValueOnce([]).mockResolvedValueOnce(0);

      const query: QueryUsersDto = { role: 'ADMIN' };

      await service.findAllWithPagination(query);

      expect(mockUserModel.find).toHaveBeenCalledWith({
        role: 'ADMIN',
      });
    });

    it('should handle isActive filter', async () => {
      mockUserModel.exec.mockResolvedValueOnce([]).mockResolvedValueOnce(0);

      const query: QueryUsersDto = { isActive: true };

      await service.findAllWithPagination(query);

      expect(mockUserModel.find).toHaveBeenCalledWith({
        isActive: true,
      });
    });

    it('should handle descending sort', async () => {
      mockUserModel.exec.mockResolvedValueOnce([]).mockResolvedValueOnce(0);

      const query: QueryUsersDto = { sort: '-createdAt' };

      await service.findAllWithPagination(query);

      expect(mockUserModel.sort).toHaveBeenCalledWith({
        createdAt: -1,
      });
    });

    it('should handle ascending sort', async () => {
      mockUserModel.exec.mockResolvedValueOnce([]).mockResolvedValueOnce(0);

      const query: QueryUsersDto = { sort: 'name' };

      await service.findAllWithPagination(query);

      expect(mockUserModel.sort).toHaveBeenCalledWith({
        name: 1,
      });
    });

    it('should handle complex query with multiple filters', async () => {
      mockUserModel.exec.mockResolvedValueOnce([]).mockResolvedValueOnce(0);

      const query: QueryUsersDto = {
        search: 'admin',
        role: 'ADMIN',
        isActive: true,
        page: 2,
        limit: 20,
        sort: '-createdAt',
      };

      await service.findAllWithPagination(query);

      // Verify complex conditions
      expect(mockUserModel.find).toHaveBeenCalledWith({
        $or: [
          { name: { $regex: 'admin', $options: 'i' } },
          { email: { $regex: 'admin', $options: 'i' } },
        ],
        role: 'ADMIN',
        isActive: true,
      });

      expect(mockUserModel.sort).toHaveBeenCalledWith({
        createdAt: -1,
      });
      expect(mockUserModel.skip).toHaveBeenCalledWith(20); // (2-1) * 20
      expect(mockUserModel.limit).toHaveBeenCalledWith(20);
    });
  });

  describe('validatePassword', () => {
    it('should return true for correct password', async () => {
      // Mock bcrypt compare trực tiếp trong test
      const bcrypt = require('bcrypt');
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);

      const result = await service.validatePassword(
        'password123',
        'hashedPassword',
      );

      expect(result).toBe(true);
      expect(bcrypt.compare).toHaveBeenCalledWith(
        'password123',
        'hashedPassword',
      );
    });

    it('should return false for incorrect password', async () => {
      const bcrypt = require('bcrypt');
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);

      const result = await service.validatePassword(
        'wrongpassword',
        'hashedPassword',
      );

      expect(result).toBe(false);
    });
  });

  describe('findAll', () => {
    it('should return all users without pagination', async () => {
      const mockUsers = [
        { name: 'User 1', email: 'user1@example.com' },
        { name: 'User 2', email: 'user2@example.com' },
      ];

      mockUserModel.exec.mockResolvedValue(mockUsers);

      const result = await service.findAll();

      expect(result).toEqual(mockUsers);
      expect(mockUserModel.find).toHaveBeenCalledWith();
      expect(mockUserModel.select).toHaveBeenCalledWith('-password');
    });
  });

  describe('findOne', () => {
    it('should return user by id', async () => {
      const mockUser = {
        _id: '507f1f77bcf86cd799439011',
        name: 'John',
        email: 'john@example.com',
      };

      mockUserModel.exec.mockResolvedValue(mockUser);

      const result = await service.findOne('507f1f77bcf86cd799439011');

      expect(result).toEqual(mockUser);
      expect(mockUserModel.findById).toHaveBeenCalledWith(
        '507f1f77bcf86cd799439011',
      );
      expect(mockUserModel.select).toHaveBeenCalledWith('-password');
    });
  });
});
