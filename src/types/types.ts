export interface LinkCardProps {
    id: string;
    createdAt: Date;
    name: string;
    longURL: string;
    shortCode: string;
    description: string;
    totalClicks: number;
    clickLocation?: string[];
    deleteLink: (linkDocID: string) => Promise<void>;
    copyLink: (shortUrl: string) => void;
    customURL?: string;
    expiresAt?: Date | null;
  }
  
  export interface Link extends LinkCardProps {
    deleteLink: (linkDocID: string) => Promise<void>;
    copyLink: (shortUrl: string) => void;
    totalClicks: number;
    clickLocation?: string[];
  }
  