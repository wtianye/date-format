import { formate } from ".";

describe("格式化日期", () => {
  const date = new Date("2023-08-10 09:30:05");
  it("date", () => {
    expect(formate(date, "date")).toBe("2023-8-10");
  });

  it("date-pad", () => {
    expect(formate(date, "date", true)).toBe("2023-08-10");
  });

  it("datetime", () => {
    expect(formate(date, "datetime")).toBe("2023-8-10 9:30:5");
  });

  it("datetime-pad", () => {
    expect(formate(date, "datetime", true)).toBe("2023-08-10 09:30:05");
  });

  it("yyyy年MM月dd日", () => {
    expect(formate(date, "yyyy年MM月dd日")).toBe("2023年8月10日");
  });

  it("yyyy年MM月dd日-pad", () => {
    expect(formate(date, "yyyy年MM月dd日", true)).toBe("2023年08月10日");
  });

  it("yyyy年MM月dd日 hh时mm分ss秒", () => {
    expect(formate(date, "yyyy年MM月dd日 hh时mm分ss秒")).toBe(
      "2023年8月10日 9时30分5秒"
    );
  });

  it("yyyy年MM月dd日 hh时mm分ss秒-pad", () => {
    expect(formate(date, "yyyy年MM月dd日 hh时mm分ss秒", true)).toBe(
      "2023年08月10日 09时30分05秒"
    );
  });

  it("yyyy-MM-dd", () => {
    expect(formate(date, "yyyy-MM-dd")).toBe("2023-8-10");
  });

  it("yyyy-MM-dd-pad", () => {
    expect(formate(date, "yyyy-MM-dd", true)).toBe("2023-08-10");
  });

  it("formate function", () => {
    expect(
      formate(new Date("2026-08-10 09:30:05"), (date) => {
        const { year, month, day } = date;
        const thisYear = new Date().getFullYear();
        if (year === thisYear) {
          return `今年`;
        }
        if (year < thisYear) {
          return `${thisYear - year}年前`;
        }
        return `${year - thisYear}年后`;
      })
    ).toBe("3年后");
  });
});
