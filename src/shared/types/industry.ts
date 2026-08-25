export type Industry = {
  id: number;
  slug: string;
  name: string;
  sortOrder: number;
};

export type IndustriesData = {
  items: Industry[];
  total: number;
};
