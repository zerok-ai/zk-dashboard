// product shop list
export type Services = {
  id: string | number | undefined;
  name: string;
};

export type ServicesFilter = {
  length?: number;
  search: string;
  sort: string;
};
