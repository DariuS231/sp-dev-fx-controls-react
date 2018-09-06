import {DateTimePickerType} from "./dateTimePickerEnums";

export interface IDateTimePickerProps {
  label: string;
  type: DateTimePickerType;
  value: Date;
}
export interface IDateTimePickerState {
  isDatePickerShown: boolean;
}
