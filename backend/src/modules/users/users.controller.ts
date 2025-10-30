import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { QueryUsersDto } from './dto/query-users.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Tạo người dùng mới' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Người dùng được tạo thành công',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Email đã được sử dụng',
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('paginated')
  @ApiOperation({ summary: 'Lấy danh sách người dùng với phân trang và lọc' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Danh sách người dùng với phân trang',
  })
  findAllWithPagination(@Query() query: QueryUsersDto) {
    return this.usersService.findAllWithPagination(query);
  }

  @Get()
  @ApiOperation({
    summary: 'Lấy danh sách tất cả người dùng (không phân trang)',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Danh sách người dùng',
  })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy thông tin người dùng theo ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Thông tin người dùng',
  })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Cập nhật thông tin người dùng' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Người dùng được cập nhật thành công',
  })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa người dùng' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Người dùng được xóa thành công',
  })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
