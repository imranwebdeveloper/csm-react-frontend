export interface IContent {
  id: string;
  userId: string;
  title: string;
  description?: string;
  youtubeUrl: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUser {
  id: string;
  username: string;
  email: string;
  password: string;
  role: "user" | "admin";
  image?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
