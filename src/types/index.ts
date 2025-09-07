export type Sneaker = {
  id: number;
  name: string;
  brand: string;
  gender: "MEN" | "WOMEN" | "UNISEX";
  category: string;
  price: number;
  is_in_inventory: boolean;
  items_left: number;
  sizes?: string[];
  colors?: string[];
  rating?: number;
  reviews_count?: number;
  description?: string;
  imageURL: string;
  slug: string;
};

export type Category = "Featured" | "Running" | "Training" | "Lifestyle";

export interface Filters {
  size: string[];
  brand: string[];
  price: {
    min: number;
    max: number;
  };
  category: Category;
}

export const defaultFilters: Filters = {
  size: [],
  brand: [],
  price: {
    min: 0,
    max: 200,
  },
  category: "Featured",
};