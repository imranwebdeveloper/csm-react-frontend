import { I } from "node_modules/react-router/dist/development/route-data-H2S3hwhf.d.mts";

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
  contents: IContent[];
}

export interface AuthUser {
  token: string;
  user: IUser;
}

export interface ApiMultiResponse<T> {
  data: T;
  message: string;
  success: boolean;
  pagination: {
    totalPages: number;
    limit: number;
    total: number;
    currentPage: number;
  };
}
export interface ApiSingleResponse<T> {
  data: T;
  message: string;
  success: boolean;
}
