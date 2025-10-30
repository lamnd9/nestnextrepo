import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class QueryUsersDto {
  @ApiPropertyOptional({
    description: 'Số trang (bắt đầu từ 1)',
    example: 1,
    minimum: 1,
  })
  @IsOptional()
  @Transform(({ value }) => parseInt(value as string))
  @IsNumber({}, { message: 'Page phải là số' })
  @Min(1, { message: 'Page phải lớn hơn 0' })
  page?: number = 1;

  @ApiPropertyOptional({
    description: 'Số lượng items trên mỗi trang',
    example: 10,
    minimum: 1,
    maximum: 100,
  })
  @IsOptional()
  @Transform(({ value }) => parseInt(value as string))
  @IsNumber({}, { message: 'Limit phải là số' })
  @Min(1, { message: 'Limit phải lớn hơn 0' })
  limit?: number = 10;

  @ApiPropertyOptional({
    description: 'Tìm kiếm theo tên hoặc email',
    example: 'john',
  })
  @IsOptional()
  @IsString({ message: 'Search phải là chuỗi' })
  search?: string;

  @ApiPropertyOptional({
    description: 'Lọc theo vai trò',
    example: 'USER',
  })
  @IsOptional()
  @IsString({ message: 'Role phải là chuỗi' })
  role?: string;

  @ApiPropertyOptional({
    description: 'Lọc theo trạng thái active',
    example: 'true',
  })
  @IsOptional()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return undefined;
  })
  isActive?: boolean;

  @ApiPropertyOptional({
    description: 'Sắp xếp theo field (có thể thêm - để desc)',
    example: '-createdAt',
  })
  @IsOptional()
  @IsString({ message: 'Sort phải là chuỗi' })
  sort?: string = '-createdAt';
}
