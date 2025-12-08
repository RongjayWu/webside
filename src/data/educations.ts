// 學歷資料結構
export interface Education {
  degree: string;      // 學位名稱
  department: string;  // 校系
  period: string;      // 就讀時間
}

// 範例資料
const educations: Education[] = [
  {
    degree: "學士學位",
    department: "國立台灣科技大學 資訊管理系",
    period: "2022 - 在讀"
  },
  {
    degree: "高中學歷",
    department: "市立高雄高工 資訊科",
    period: "2018 - 2022"
  }
  // 可依需求新增更多
];

export default educations;
