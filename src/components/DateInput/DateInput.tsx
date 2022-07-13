import React, { useEffect, useState } from "react";
import { InputField } from "@kiwicom/orbit-components";
import ReactDatePicker from "react-datepicker";
import customParseFormat from "dayjs/plugin/customParseFormat";
import dayjs from "dayjs";
import { SearchParam } from "../SearchForm/SearchFormAPI";

dayjs.extend(customParseFormat);

const DATE_FORMAT = "DD/MM/YYYY";

interface IProps {
  type: SearchParam.DATE_FROM | SearchParam.DATE_TO;
  value: string;
  prefix: string;
  onChange(value: string, type: SearchParam): void;
}

const DateInput = React.memo(({ value, prefix, type, onChange }: IProps) => {
  const [date, setDate] = useState<Date | null>(
    !!value ? dayjs(value, DATE_FORMAT).toDate() : null
  );

  useEffect(() => {
    setDate(!!value ? dayjs(value, DATE_FORMAT).toDate() : null);
  }, [value]);

  return (
    <ReactDatePicker
      selected={date}
      placeholderText="Set date..."
      onChange={onInputChange}
      dateFormat="dd/MM/yyyy"
      customInput={
        <InputField prefix={prefix} value={value} placeholder="Set date..." />
      }
    />
  );

  function onInputChange(date: Date | null): void {
    if (dayjs().isBefore(date, "day") || dayjs().isSame(date, "day")) {
      setDate(date);
      onChange(dayjs(date).format(DATE_FORMAT).toString(), type);
    }
  }
});

export default DateInput;
