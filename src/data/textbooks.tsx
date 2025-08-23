export interface Textbook {
  subject: string;
  title: string;
  description: string;
  url: string;
}

export const textbooks: Textbook[] = [
  {
    subject: "電子學",
    title: "高職資電類電子學",
    description: "備戰統測，快速掌握重點，提升解題能力。",
    url: "https://drive.google.com/file/d/15f4YAIKG2UPFCAA632wPL7dbPoxAbcdj/view?usp=drive_link"
  },
  {
    subject: "基本電學",
    title: "高職資電類基本電學",
    description: "備戰統測，快速掌握重點，提升解題能力。",
    url: "https://drive.google.com/file/d/1DwOgFPThmX3-kX3qvOpyrBLmLXlzlU3v/view?usp=drive_link"
  },
  {
    subject: "程式設計",
    title: "高職資電類程式設計",
    description: "備戰統測，快速掌握重點，提升解題能力。",
    url: "/textbooks/js-basic.pdf"
  },
  {
    subject: "數位邏輯",
    title: "高職資電類數位邏輯",
    description: "備戰統測，快速掌握重點，提升解題能力。",
    url: "https://drive.google.com/file/d/1apJVe7QkVxLzp76ER8nprHh8CqCkhSDG/view?usp=drive_link"
  },
  {
    subject: "微處理機",
    title: "高職資電類微處理機",
    description: "備戰統測，快速掌握重點，提升解題能力。",
    url: "https://drive.google.com/file/d/1vfrAV-0UsMEzkraZH_2chah0X5beEco1/view?usp=drive_link"
  }
];
