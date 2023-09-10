export type Category = {
  category_id: number;
  value: string;
  description: string;
  user_id: number;
  type: string;
  status: string;
  created_at: string;
  updated_at: string;
};

export type CategoriesResponse = {
  status: string;
  data: {
    categories: Category[];
  };
};
