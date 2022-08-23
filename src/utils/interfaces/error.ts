interface Message {
  key: string;
  error: string;
}

export interface ErrorHandle {
  statusCode: number;
  status: string;
  ok: boolean;
  message: string | Message | any;
}
