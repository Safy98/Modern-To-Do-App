import { HttpStatus } from '@nestjs/common';
import { Expose } from 'class-transformer';

export class ResponseDto<T> {
  @Expose() success: boolean;
  @Expose() message?: string | null;
  @Expose() statusCode: HttpStatus;
  @Expose() data?: T | null;
  @Expose() error?: any;
  @Expose() path?: string | null;
  @Expose() timestamp: string;

  constructor(data: Partial<ResponseDto<T>> = {}) {
    this.success = data.success ?? true;
    this.message = data.message ?? null;
    this.statusCode = data.statusCode ?? HttpStatus.OK;
    this.data = data.data ?? null;
    this.error = data.error ?? null;
    this.path = data.path ?? null;
    this.timestamp = data.timestamp ?? new Date().toISOString();
  }
}
