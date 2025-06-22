export interface DateFilterProps {
  year: number;
  month: number;
  onYearMonthChange: (year: number, month: number) => void;
}