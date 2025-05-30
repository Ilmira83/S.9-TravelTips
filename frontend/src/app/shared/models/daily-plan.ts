export interface DailyPlan {
  id?:number,
  planID?:number | null,
  blogID?:number | null,
  userID?: string | null,
  dayNumber:number,
  costs?: number,
  description: string,
  createdAt?: string,
  updatedAt?: string
}