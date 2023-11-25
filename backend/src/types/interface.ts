export interface updateUser {
    id: string;
    username: string;
    email: string;
  }
  
export interface user extends updateUser {
    password: string;
    role: string;
}


export interface ExtendedUser extends Request {
    info?: updateUser;
  }