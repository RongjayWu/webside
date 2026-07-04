export type StatusType = 'Available' | 'Busy' | 'Full';

export interface TeachingCase {
  id: string;
  subjectType: string;
  grade: string;
  year: number;
  focus: string;
}

export interface GrowthStory {
  id: string;
  startProblem: string;
  process: string;
  finalChange: string;
}

export interface LessonSchedule {
  subjectName: string;
  timeSlot: string;
  date?: string;
  isCurrent: boolean;
}

export interface TutorProfileData {
  name: string;
  avatarUrl: string;
  tags: string[];
  status: StatusType;
  currentFocus: string[];
  journey: {
    whyStart: string;
    whyExamPrep: string;
    growthProcess: string;
  };
  philosophies: string[];
  subjects: {
    juniorHigh: string[];
    vocational: string[];
  };
  growthStories: GrowthStory[];
  featuredCases: TeachingCase[];
  totalHours: number;
  lessonSchedule: LessonSchedule | null;
}