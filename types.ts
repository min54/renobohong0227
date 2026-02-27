import { ReactNode } from 'react';

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  image: string;
  price: string;
}

export interface Review {
  id: number;
  name: string;
  treatment: string;
  content: string;
  rating: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export enum TreatmentType {
  ACNE = 'ACNE',
  ANTI_AGING = 'ANTI_AGING',
  PIGMENTATION = 'PIGMENTATION',
  FILLER_BOTOX = 'FILLER_BOTOX',
  SKIN_CARE = 'SKIN_CARE'
}