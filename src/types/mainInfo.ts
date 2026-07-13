// types/database.ts 擴充定義
export interface ClubType {
  id: string
  title: string | null
  club: string | null
  description: string | null
  created_at: string
}
// types/database.ts 擴充定義
export interface EducationType {
  id: string
  degree: string | null
  department: string | null
  period: string | null
  created_at: string
}
// types/database.ts
export interface Experience {
  id: string
  title: string | null
  company: string | null
  description: string | null
  years: string | null
  created_at: string
}
// types/database.ts 擴充定義
export interface PortfolioType {
  id: string
  title: string | null
  description: string | null
  image: string | null         // 用來存放網路圖片網址
  completedDate: string | null // 如果資料庫是 Date 型態，撈出後會是字串
  projectLink: string | null
  created_at: string
}