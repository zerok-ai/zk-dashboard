export type KeyedObject = {
  [key: string]: string | number | KeyedObject | any;
};

export type HttpLatencyIn = {
  p50: number;
  p90: number;
  p99: number;
};

export type Services = {
  name: string;
  podCount: number;
  httpLatencyIn: HttpLatencyIn;
  httpReqThroughputIn: number;
  httpErrorRateIn: number;
  inboundConns: number;
  outboundConns: number;
};

export type ServicesFilter = {
  search: string;
};

export interface ServiceCardProps extends KeyedObject {
  id?: string | number;
  name: string;
  podCount: number;
  httpLatencyIn: HttpLatencyIn;
  httpReqThroughputIn: number;
  httpErrorRateIn: number;
  inboundConns: number;
  outboundConns: number;
}

export interface ServiceStateProps {
  services: Services[];
  service: Services | null;
  error: object | string | null;
}

export interface DefaultRootStateProps {
  service: ServiceStateProps;
}
