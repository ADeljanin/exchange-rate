export interface RatesResponse {
  base: string;
  date: string;
  rates: Rates;
  success: boolean;
}

export interface Rates {
  [key: string]: number;
}

export interface ExtendedRate extends CurrencyMapping {
  rate: number;
}

export interface CurrencyMapping {
  currency: string;
  currencyFullName: string;
  country: string;
}