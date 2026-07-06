export interface Food {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  description?: string;
  soldOut: boolean;
}