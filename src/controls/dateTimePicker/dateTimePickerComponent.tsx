// import * as strings from "ControlStrings";
import * as React from "react";
import { IDateTimePickerProps, IDateTimePickerState } from "./IDateTimePicker";
import { TextField } from "office-ui-fabric-react/lib/components/TextField";
import { IconButton } from "office-ui-fabric-react/lib/components/Button";
import { Calendar } from "office-ui-fabric-react/lib/components/Calendar";
import { Label } from "office-ui-fabric-react/lib/components/Label";
import { FocusTrapZone } from "office-ui-fabric-react/lib/components/FocusTrapZone";
import { Callout, DirectionalHint } from "office-ui-fabric-react/lib/components/Callout";
import {  DateFormat } from "./dateFormat";

import { DateTimePickerType } from "./dateTimePickerEnums";

import styles from "./dateTimePickerComponent.module.scss";

const DEFAULT_STRINGS: any = {
  months: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ],

  shortMonths: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ],

  days: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ],

  shortDays: ["S", "M", "T", "W", "T", "F", "S"],

  goToToday: "Go to today",
  prevMonthAriaLabel: "Go to previous month",
  nextMonthAriaLabel: "Go to next month",
  prevYearAriaLabel: "Go to previous year",
  nextYearAriaLabel: "Go to next year",
  closeButtonAriaLabel: "Close date picker"
};

export class DateTimePicker extends React.Component<
  IDateTimePickerProps,
  IDateTimePickerState
  > {
  constructor(props: IDateTimePickerProps) {
    super(props);
    this.state = { isDatePickerShown: false };
  }
  private _onTextFieldFocus = (ev: React.FocusEvent<HTMLElement>): void => { };

  private _onTextFieldBlur = (ev: React.FocusEvent<HTMLElement>): void => { };

  private _onTextFieldKeyDown = (
    ev: React.KeyboardEvent<HTMLElement>
  ): void => { }

  private _onTextFieldClick = (ev: React.MouseEvent<HTMLElement>): void => { };
  private _onIconClick = (ev: any): void => {
    this.setState({ isDatePickerShown: !this.state.isDatePickerShown });
  }

  public render(): React.ReactElement<IDateTimePickerProps> {
    const { type, value } = this.props;
    let dateString = "";
    let iconName = "";
    if (type == DateTimePickerType.DateAndTime) {
      iconName = "DateTime";
      dateString = DateFormat.Format(value, 'MM/dd/yyyy hh:mm t');

    } else {
      iconName = "Calendar";
      dateString = DateFormat.Format(value, 'MM/dd/yyyy');
    }

    return (
      <div>
        <div className={styles.dtPickerTable}>
          <div className={styles.dtPickerTr}>
            <Label>{this.props.label}</Label>
          </div>
          <div className={styles.dtPickerTr}>
            <TextField
              className={styles.dtPickerTd}
              aria-haspopup="true"
              value={dateString}
              onKeyDown={this._onTextFieldKeyDown}
              onFocus={this._onTextFieldFocus}
              onBlur={this._onTextFieldBlur}
              onClick={this._onTextFieldClick}
            />

            <IconButton
              className={styles.dtPickerTd}
              iconProps={{ iconName }}
              onClick={this._onIconClick}
            />
          </div>
        </div>
        {this.state.isDatePickerShown && (
          <Callout
            role="dialog"
            isBeakVisible={false}
            gapSpace={0}
            doNotLayer={false}
            directionalHint={DirectionalHint.bottomLeftEdge}
          >
            <FocusTrapZone isClickableOutsideFocusTrap={true}>
              <Calendar
                strings={DEFAULT_STRINGS}
                showMonthPickerAsOverlay={true}
                highlightCurrentMonth={true}
                showGoToToday={true}
              />
            </FocusTrapZone>
          </Callout>
        )}
      </div>
    );
  }
}
