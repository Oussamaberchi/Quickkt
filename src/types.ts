export interface UserData {
  quitDate: string;
  cigarettesPerDay: number;
  pricePerPack: number;
  cigarettesPerPack: number;
  currency: string;
  savingsGoal?: {
    name: string;
    amount: number;
  };
}

export interface CravingLog {
  id: string;
  timestamp: string;
  intensity: number; // 1-10
  trigger: string;
  mood: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}

export interface AppState {
  userData: UserData | null;
  cravings: CravingLog[];
  chatHistory: ChatMessage[];
  theme: 'light' | 'dark';
  language: 'ar' | 'fr';
}
