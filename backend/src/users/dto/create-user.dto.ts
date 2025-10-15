import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ 
    description: 'User full name', 
    example: 'John Doe' 
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ 
    description: 'User email address', 
    example: 'john@example.com' 
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ 
    description: 'User password (minimum 6 characters)', 
    example: 'password123',
    minLength: 6
  })
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiPropertyOptional({ 
    description: 'User role', 
    example: 'student',
    default: 'student'
  })
  @IsOptional()
  @IsString()
  role?: string;

  @ApiPropertyOptional({ 
    description: 'User active status', 
    example: true,
    default: true
  })
  @IsOptional()
  isActive?: boolean;
}
