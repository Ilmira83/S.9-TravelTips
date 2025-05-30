
export interface User {
  id?: number,
  fbUID: string;
  username: string,
  userPhoto?: string,
  blogs?: UserBlogs[],
}

export interface UserBlogs {
  blogID: number,  
}