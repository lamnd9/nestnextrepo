import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { QueryUsersDto } from './dto/query-users.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserPaginationResult } from './interfaces/pagination.interface';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    // Kiểm tra email đã tồn tại chưa
    const existingUser = await this.userModel.findOne({
      email: createUserDto.email,
    });

    if (existingUser) {
      throw new ConflictException('Email đã được sử dụng');
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      saltRounds,
    );

    // Tạo user mới
    const newUser = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
      role: createUserDto.role || 'USER',
      accountType: 'LOCAL',
      isActive: true, // Mặc định đã kích hoạt
    });

    return await newUser.save();
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().select('-password').exec();
  }

  async findAllWithPagination(
    query: QueryUsersDto,
  ): Promise<UserPaginationResult> {
    const {
      page = 1,
      limit = 10,
      search,
      role,
      isActive,
      sort = '-createdAt',
    } = query;

    // Xây dựng filter conditions
    const conditions: Record<string, any> = {};

    // Tìm kiếm theo tên hoặc email
    if (search) {
      conditions.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    // Lọc theo role
    if (role) {
      conditions.role = role;
    }

    // Lọc theo isActive
    if (typeof isActive === 'boolean') {
      conditions.isActive = isActive;
    }

    // Xử lý sort
    const sortObject: Record<string, 1 | -1> = {};
    if (sort) {
      if (sort.startsWith('-')) {
        const field = sort.substring(1);
        sortObject[field] = -1;
      } else {
        sortObject[sort] = 1;
      }
    }

    // Tính toán pagination
    const skip = (page - 1) * limit;

    // Thực hiện queries parallel
    const [users, total] = await Promise.all([
      this.userModel
        .find(conditions)
        .select('-password')
        .sort(sortObject)
        .skip(skip)
        .limit(limit)
        .exec(),
      this.userModel.countDocuments(conditions).exec(),
    ]);

    // Tính toán thông tin pagination
    const totalPages = Math.ceil(total / limit);
    const hasNext = page < totalPages;
    const hasPrev = page > 1;

    return {
      data: users,
      pagination: {
        current: page,
        pageSize: limit,
        total,
        totalPages,
        hasNext,
        hasPrev,
      },
    };
  }

  async findOne(id: string): Promise<User | null> {
    return await this.userModel.findById(id).select('-password').exec();
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userModel.findOne({ email }).exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User | null> {
    // Nếu có password trong update, hash nó
    if (updateUserDto.password) {
      const saltRounds = 10;
      updateUserDto.password = await bcrypt.hash(
        updateUserDto.password,
        saltRounds,
      );
    }

    return await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .select('-password')
      .exec();
  }

  async remove(id: string): Promise<User | null> {
    return await this.userModel.findByIdAndDelete(id).exec();
  }

  async validatePassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}
