// Resposta genérica para as requisições da API
export interface ApiResponse {
  success: boolean;
  message?: string;
  data?: any;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse extends ApiResponse {
  data: {
    token: string;
  };
}

export interface Animal {
  id: number;
  name: string;
  birthDate: Date;
  sex: string;
  picture: string;
  observations: string;
  vaccines: string[];
  comorbidities: string[];
  weight: number;
  favorite: boolean;
  status: string;
  company: Company;
  createdBy: User;
  updatedBy: User;
  activities: Activity[];
  createdAt?: Date;
  updatedAt?: Date;
  deleted: boolean;
  deletedAt: Date;
}

export interface AnimalResponse extends ApiResponse {
  data?: Animal | Animal[];
}

export interface Camera {
  id: number;
  url: string;
  name: string;
  thumbnail: string;
  company: Company;
  createdBy: User;
  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
  deletedAt: Date;
}

export interface CameraResponse extends ApiResponse {
  data?: Camera | Camera[];
}

export interface Activity {
  id: number;
  cat: Animal;
  camera: Camera;
  startTime: Date;
  endTime: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ActivityResponse extends ApiResponse {
  data?: Activity | Activity[];
}

export interface Notification {
  id: number;
  date: Date;
  target: string;
  origin: string;
  status: boolean;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface NotificationResponse extends ApiResponse {
  data?: Notification | Notification[];
}

export interface Company {
  id: number;
  name: string;
  cnpj: string;
  logo: string;
  color: string;
  phone: string;
  users: User[];
  cats: Animal[];
  cameras: Camera[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CompanyResponse extends ApiResponse {
  data?: Company;
}

export interface User {
  id: number;
  name: string;
  email: string;
  password?: string;
  access_level: string;
  company: Company;
  createdCameras: Camera[];
  createdAnimals: Animal[];
  updatedAnimals: Animal[];
  createdAt?: Date;
  updatedAt?: Date;
  deleted: boolean;
  deletedAt: Date;
}

export interface Feedback {
    id: number;
    text: string;
    date: Date;
    author?: User;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserResponse extends ApiResponse {
  data?: User | User[];
}

export interface ImageUploadResponse extends ApiResponse {
  data: {
    img_url: string;
  };
}
