import { User } from '../schemas/user.schema';

export interface PaginationResult<T> {
  data: T[];
  pagination: {
    current: number;
    pageSize: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export type UserPaginationResult = PaginationResult<User>;
