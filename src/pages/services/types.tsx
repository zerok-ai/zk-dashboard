export type Services = {
  id: string | number | undefined;
  name: string;
  namespace: string;
  labels?: string[];
  selector?: string;
  port?: number;
  targetport?: number;
};

export type ServicesFilter = {
  length?: number;
  search: string;
  sort: string;
};

export interface ServiceStateProps {
  //   product: Products | null;
  //   relatedProducts: Products[];
  //   reviews: Reviews[];
  //   addresses: Address[];
  service: Services | null;
  services: Services[];
  error: object | string | null;
}

export interface DefaultRootStateProps {
  product: ServiceStateProps;
}
