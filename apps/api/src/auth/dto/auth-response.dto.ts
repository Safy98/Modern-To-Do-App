export class AuthResponseDto {
  success: boolean;
  message: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
  token?: string; // Optional token
}
