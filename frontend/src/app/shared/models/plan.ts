export interface Plan {
  id?: number,
  userID?: string | null,
  title: string,
  destination: string,
  country: string,
  city: string,
  description: string,
  travelers: string,
  costs?: number,
  month: string,
  year: string,
  nDays: number,
  image?: string,
  createdAt?: string,
  updatedAt?: string
}

