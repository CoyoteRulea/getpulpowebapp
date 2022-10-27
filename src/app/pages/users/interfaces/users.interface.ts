export interface User {
  _id:      string;
  username: string;
  password: string;
}

export interface UserResponse {
  User:       User;
  statusCode: number;
  msg:        string;
}
