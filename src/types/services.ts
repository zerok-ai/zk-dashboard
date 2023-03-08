export type KeyedObject = {
  [key: string]: string | number | KeyedObject | any;
};

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

export interface ServiceCardProps extends KeyedObject {
  id?: string | number;
  name: string;
}

export interface ServiceStateProps {
  services: Services[];
  service: Services | null;
  error: object | string | null;
}

export interface DefaultRootStateProps {
  service: ServiceStateProps;
}
