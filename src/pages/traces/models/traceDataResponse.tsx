export type TraceItem = {
  destination: {
    args: {
      pod: string;
      start_time: string;
    };
    label: string;
    script: string;
  };
  latency: number;
  otel_flag: number;
  req_body: string;
  req_headers: any;
  req_method: string;
  req_path: string;
  resp_body: string;
  source: {
    args: {
      pod: string;
      start_time: string;
    };
    label: string;
    script: string;
  };
  span_id: string;
  time: string;
  trace_id: string;
  tracestate: string;
  type: string;
};

export type TraceDataAPIResponse = {
  results: TraceItem[];
};
