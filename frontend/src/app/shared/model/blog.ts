export interface Blog {
  id?: number,
  title: string,
  destination: string,
  country: string,
  city: string,
  description: string,
  travelers: string,
  costs: number,
  month: string,
  year: string,
  nDays: number,
  image: string,
  createdAt?: string,
  updatedAt?: string
}

export interface Blogs {
  id?: number,
  blogs: Blog[],
}