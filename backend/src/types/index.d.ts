export interface JwtPayload {
  user_id: number;
  name: string;
  role_id: number;
}

// Extensión del objeto Request de Express

declare module "express-serve-static-core" {
  interface Request {
    user?: JwtPayload;
  }
}
