export interface RatesResponse {
  base: string;
  date: string;
  rates: Rates;
  success: boolean;
}

export interface Rates {
  [key: string]: number;
}
