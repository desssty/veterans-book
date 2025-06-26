export type Year = number | typeof NaN;

export interface FiltersData {
  rank: string[];
  word: string[];
  yearStart: Year;
  yearEnd: Year;
}
