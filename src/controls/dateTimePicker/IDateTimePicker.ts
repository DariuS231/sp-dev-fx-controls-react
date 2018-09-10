import { DateTimePickerType } from "./dateTimePickerEnums";

export interface IDateTimePickerProps {
  label: string;
  type: DateTimePickerType;
  value: Date;
  onDateChange?: (newDate: Date, oldDate?: Date) => void;
}
export interface IDateTimePickerState {
  isDatePickerShown: boolean;
}
