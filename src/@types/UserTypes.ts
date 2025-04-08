export type AuthenticatedUser = {
  id: string;
  email: string;
  name: string;
  image: string | null | undefined;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type SignUpCredentials = {
  name: string
  email: string
  password: string
}

export type SignInCredentials = {
  email: string
  password: string
}

