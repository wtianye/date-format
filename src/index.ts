interface DateInfo {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
  yyyy: string;
  MM: string;
  dd: string;
  hh: string;
  mm: string;
  ss: string;
}

export function formate(
  date: Date,
  formatter: string | ((dateInfo: DateInfo) => string),
  isPad = false
): string {
  const dateInfo = getDateInfo(date);
  if (typeof formatter == "string") {
    const template = getTemplate(formatter);
    return formateByTemplate(dateInfo, template, isPad);
  }
  return formatter(dateInfo);
}
const getDateInfo = (date: Date): DateInfo => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  return {
    year,
    month,
    day,
    hour,
    minute,
    second,
    yyyy: `${year}`,
    MM: `${month + 1}`,
    dd: `${day}`,
    hh: `${hour}`,
    mm: `${minute}`,
    ss: `${second}`,
  };
};

const getTemplate = (formatter: string) => {
  let template = null;
  if (formatter === "date") {
    template = "yyyy-MM-dd";
  } else if (formatter === "datetime") {
    template = "yyyy-MM-dd hh:mm:ss";
  } else {
    template = formatter;
  }
  return template;
};

const formateByTemplate = (
  dateInfo: DateInfo,
  template: string,
  isPad = false
) => {
  const getPadValue = (rawValue: string, length: number) => {
    const padLength = Math.max(0, length - rawValue.length);
    return "0".repeat(padLength) + rawValue;
  };
  return [
    "yyyy" as const,
    "MM" as const,
    "dd" as const,
    "hh" as const,
    "mm" as const,
    "ss" as const,
  ].reduce((pre, cur) => {
    const rawValue = dateInfo[cur];
    const resultValue = isPad ? getPadValue(rawValue, cur.length) : rawValue;
    return pre.replace(cur, resultValue);
  }, template);
};
