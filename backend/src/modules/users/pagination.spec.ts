import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { QueryUsersDto } from './dto/query-users.dto';
import { User } from './schemas/user.schema';
import { UsersService } from './users.service';

describe('UsersService - Pagination', () => {
  let service: UsersService;
  let mockUserModel: any;

  beforeEach(async () => {
    mockUserModel = {
      find: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      sort: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      exec: jest.fn(),
      countDocuments: jest.fn().mockReturnThis(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: mockUserModel,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  describe('findAllWithPagination', () => {
    it('should return paginated users with default values', async () => {
      const mockUsers = [
        { name: 'John Doe', email: 'john@example.com' },
        { name: 'Jane Doe', email: 'jane@example.com' },
      ];

      mockUserModel.exec
        .mockResolvedValueOnce(mockUsers) // for find query
        .mockResolvedValueOnce(25); // for countDocuments

      const query: QueryUsersDto = {};
      const result = await service.findAllWithPagination(query);

      expect(result.data).toEqual(mockUsers);
      expect(result.pagination.current).toBe(1);
      expect(result.pagination.pageSize).toBe(10);
      expect(result.pagination.total).toBe(25);
      expect(result.pagination.totalPages).toBe(3);
      expect(result.pagination.hasNext).toBe(true);
      expect(result.pagination.hasPrev).toBe(false);
    });

    it('should handle search query correctly', async () => {
      const mockUsers = [{ name: 'John Doe', email: 'john@example.com' }];

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

    it('should handle role filter correctly', async () => {
      const mockUsers = [];

      mockUserModel.exec
        .mockResolvedValueOnce(mockUsers)
        .mockResolvedValueOnce(0);

      const query: QueryUsersDto = { role: 'ADMIN' };
      await service.findAllWithPagination(query);

      expect(mockUserModel.find).toHaveBeenCalledWith({ role: 'ADMIN' });
    });

    it('should handle sorting correctly', async () => {
      const mockUsers = [];

      mockUserModel.exec
        .mockResolvedValueOnce(mockUsers)
        .mockResolvedValueOnce(0);

      const query: QueryUsersDto = { sort: '-name' };
      await service.findAllWithPagination(query);

      expect(mockUserModel.sort).toHaveBeenCalledWith({ name: -1 });
    });

    it('should calculate pagination for last page correctly', async () => {
      const mockUsers = [{ name: 'Last User', email: 'last@example.com' }];

      mockUserModel.exec
        .mockResolvedValueOnce(mockUsers)
        .mockResolvedValueOnce(21);

      const query: QueryUsersDto = { page: 3, limit: 10 };
      const result = await service.findAllWithPagination(query);

      expect(result.pagination.current).toBe(3);
      expect(result.pagination.totalPages).toBe(3);
      expect(result.pagination.hasNext).toBe(false);
      expect(result.pagination.hasPrev).toBe(true);
      expect(mockUserModel.skip).toHaveBeenCalledWith(20);
      expect(mockUserModel.limit).toHaveBeenCalledWith(10);
    });
  });
});
