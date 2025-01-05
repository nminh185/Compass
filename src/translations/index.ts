import { en } from './en';
import { vn } from './vn';

export const translations = {
  en,
  vn,
} as const;

export type TranslationKey = keyof typeof en;
export type Language = keyof typeof translations;