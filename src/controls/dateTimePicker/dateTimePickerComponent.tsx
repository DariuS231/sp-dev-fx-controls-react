// import * as strings from "ControlStrings";
import * as React from "react";
import { IDateTimePickerProps, IDateTimePickerState } from "./IDateTimePicker";
import {
  TextField,
  ITextField
} from "office-ui-fabric-react/lib/components/TextField";
import { IconButton } from "office-ui-fabric-react/lib/components/Button";
import {
  Calendar,
  ICalendar
} from "office-ui-fabric-react/lib/components/Calendar";
import { Label } from "office-ui-fabric-react/lib/components/Label";
import { FocusTrapZone } from "office-ui-fabric-react/lib/components/FocusTrapZone";
import {
  Callout,
  DirectionalHint
} from "office-ui-fabric-react/lib/components/Callout";
import { DateFormat } from "./dateFormat";
import { createRef } from "./utils";
import { DateTimePickerType } from "./dateTimePickerEnums";
import {
  Dropdown,
  IDropdown,
  DropdownMenuItemType,
  IDropdownOption
} from "office-ui-fabric-react/lib/Dropdown";

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
  closeButtonAriaLabel: "Close date picker",
  hours: [
    { key: "00", text: "00" },
    { key: "01", text: "01" },
    { key: "02", text: "02" },
    { key: "03", text: "03" },
    { key: "04", text: "04" },
    { key: "05", text: "05" },
    { key: "06", text: "06" },
    { key: "07", text: "07" },
    { key: "08", text: "08" },
    { key: "09", text: "09" },
    { key: "10", text: "10" },
    { key: "11", text: "11" },
    { key: "12", text: "12" },
    { key: "13", text: "13" },
    { key: "14", text: "14" },
    { key: "15", text: "15" },
    { key: "16", text: "16" },
    { key: "17", text: "17" },
    { key: "18", text: "18" },
    { key: "19", text: "19" },
    { key: "20", text: "20" },
    { key: "21", text: "21" },
    { key: "22", text: "22" },
    { key: "23", text: "23" }
  ],
  minutes: [
    { key: "00", text: "00" },
    { key: "01", text: "01" },
    { key: "02", text: "02" },
    { key: "03", text: "03" },
    { key: "04", text: "04" },
    { key: "05", text: "05" },
    { key: "06", text: "06" },
    { key: "07", text: "07" },
    { key: "08", text: "08" },
    { key: "09", text: "09" },
    { key: "10", text: "10" },
    { key: "11", text: "11" },
    { key: "12", text: "12" },
    { key: "13", text: "13" },
    { key: "14", text: "14" },
    { key: "15", text: "15" },
    { key: "16", text: "16" },
    { key: "17", text: "17" },
    { key: "18", text: "18" },
    { key: "19", text: "19" },
    { key: "20", text: "20" },
    { key: "21", text: "21" },
    { key: "22", text: "22" },
    { key: "23", text: "23" },
    { key: "24", text: "00" },
    { key: "25", text: "01" },
    { key: "26", text: "02" },
    { key: "27", text: "03" },
    { key: "28", text: "04" },
    { key: "29", text: "05" },
    { key: "30", text: "06" },
    { key: "31", text: "07" },
    { key: "32", text: "08" },
    { key: "33", text: "09" },
    { key: "34", text: "10" },
    { key: "35", text: "11" },
    { key: "36", text: "12" },
    { key: "37", text: "13" },
    { key: "38", text: "14" },
    { key: "39", text: "15" },
    { key: "40", text: "16" },
    { key: "41", text: "17" },
    { key: "42", text: "18" },
    { key: "43", text: "19" },
    { key: "44", text: "20" },
    { key: "45", text: "21" },
    { key: "46", text: "22" },
    { key: "47", text: "23" },
    { key: "48", text: "01" },
    { key: "49", text: "02" },
    { key: "50", text: "03" },
    { key: "51", text: "04" },
    { key: "52", text: "05" },
    { key: "53", text: "06" },
    { key: "54", text: "07" },
    { key: "55", text: "08" },
    { key: "56", text: "09" },
    { key: "57", text: "10" },
    { key: "58", text: "11" },
    { key: "59", text: "12" }
  ],
  amPm: [{ key: "AM", text: "AM" }, { key: "PM", text: "PM" }]
};

export class DateTimePicker extends React.Component<
  IDateTimePickerProps,
  IDateTimePickerState
> {
  private _calendar = createRef<ICalendar>();
  private _datePickerDiv = createRef<HTMLDivElement>();
  private _textField = createRef<ITextField>();

  constructor(props: IDateTimePickerProps) {
    super(props);
    this.state = { isDatePickerShown: false };
    this._dismissDatePickerPopup.bind(this);
    this._onSelectDate.bind(this);
  }
  private _onTextFieldFocus = (ev: React.FocusEvent<HTMLElement>): void => {};

  private _onTextFieldBlur = (ev: React.FocusEvent<HTMLElement>): void => {};

  private _onTextFieldKeyDown = (
    ev: React.KeyboardEvent<HTMLElement>
  ): void => {};

  private _onTextFieldClick = (ev: React.MouseEvent<HTMLElement>): void => {};
  private _onIconClick = (ev: any): void => {
    this.setState({ isDatePickerShown: !this.state.isDatePickerShown });
  };
  private _onSelectDate = (date: Date): void => {
    console.log(date);
    if (this.props.onDateChange) {
      this.props.onDateChange(date, this.props.value);
    }
    this._calendarDismissed();
  };
  /**
   * Callback for closing the calendar callout
   */
  private _calendarDismissed = (): void => {
    this._dismissDatePickerPopup();
    // don't need to focus the text box, if necessary the focusTrapZone will do it
  };

  private _dismissDatePickerPopup = (): void => {
    if (this.state.isDatePickerShown) {
      this.setState({
        isDatePickerShown: false
      });

      // this._validateTextInput();
    }
  };

  public render(): React.ReactElement<IDateTimePickerProps> {
    const { type, value } = this.props;
    let dateString = "";
    let iconName = "";
    if (type == DateTimePickerType.DateAndTime) {
      iconName = "DateTime";
      dateString = DateFormat.Format(value, "MM/dd/yyyy hh:mm t");
    } else {
      iconName = "Calendar";
      dateString = DateFormat.Format(value, "MM/dd/yyyy");
    }

    return (
      <div>
        <div className={styles.dtPickerTable} ref={this._datePickerDiv}>
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
              componentRef={this._textField}
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
            target={this._datePickerDiv.current}
            directionalHint={DirectionalHint.bottomLeftEdge}
          >
            <FocusTrapZone isClickableOutsideFocusTrap={true}>
              <Calendar
                strings={DEFAULT_STRINGS}
                showMonthPickerAsOverlay={true}
                highlightCurrentMonth={true}
                showGoToToday={true}
                componentRef={this._calendar}
                onSelectDate={this._onSelectDate}
              />
              <div
                className={styles.dtPickerTable}
                style={{ marginTop: "30px" }}
              >
                <div className={styles.dtPickerTr}>
                  <div className={styles.dtPickerTd}>
                    <Dropdown options={DEFAULT_STRINGS.hours} />
                  </div>
                  <div className={styles.dtPickerTd}>
                    <Dropdown options={DEFAULT_STRINGS.minutes} />
                  </div>
                  <div className={styles.dtPickerTd}>
                    <Dropdown options={DEFAULT_STRINGS.amPm} />
                  </div>
                </div>
              </div>
            </FocusTrapZone>
          </Callout>
        )}
      </div>
    );
  }
}
