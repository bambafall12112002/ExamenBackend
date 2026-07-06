import type { Food } from "../types/food";

export const foods: Food[] = [
  {
    id: 1,
    name: "Thiéboudienne",
    price: 3500,
    imageUrl:
      "https://images.unsplash.com/photo-1544025162-d76694265947",
    description: "Plat traditionnel sénégalais",
    soldOut: false,
  },

  {
    id: 2,
    name: "Yassa Poulet",
    price: 3000,
    imageUrl:
      "https://images.unsplash.com/photo-1604908176997-4316d2d4b7f4",
    description: "Délicieux yassa poulet",
    soldOut: false,
  },

  {
    id: 3,
    name: "Burger",
    price: 4500,
    imageUrl:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
    description: "Burger spécial maison",
    soldOut: true,
  },
];