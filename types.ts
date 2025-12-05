export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface Venue {
  id: string;
  name: string;
  type: 'Ceremony' | 'Reception';
  time: string;
  address: string;
  city: string;
  lat: number;
  lng: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export enum ViewState {
  MAIN = 'MAIN',
  MAP = 'MAP'
}