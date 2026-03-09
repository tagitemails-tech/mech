
export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  imageUrl: string;
  specifications: string[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export enum Section {
  HERO = 'hero',
  PRODUCTS = 'products',
  ABOUT = 'about',
  CONTACT = 'contact'
}
