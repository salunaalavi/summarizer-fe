export interface Message {
  sender: string;
  message: string;
  timestamp: Date;
  isCurrentUser: boolean;
}

export type ViewMode = 'chat' | 'summary';