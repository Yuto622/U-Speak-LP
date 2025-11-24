export enum University {
  UCLA = 'UCLA',
  STANFORD = 'Stanford',
}

export enum Topic {
  CAMPUS_LIFE = 'Campus Life',
  EXAMS = 'Exam Week Stress',
  WEEKEND = 'Weekend Plans',
  TECH = 'Tech & Startups',
  DATING = 'Modern Dating',
}

export interface MonologueResponse {
  text: string;
  author: string;
  university: University;
  mood: string;
  background_sound: string;
  emoji: string;
  color_hex: string;
  timestamp: string;
}