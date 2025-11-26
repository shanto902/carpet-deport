/* eslint-disable @typescript-eslint/no-explicit-any */
export function overrideWednesdayHours(data: any): any {
  if (!data.opening_hours) return data;

  const opening_hours = { ...data.opening_hours };

  // 0 = Sun, 1 = Mon, 2 = Tue, 3 = Wed, 4 = Thu, 5 = Fri, 6 = Sat
  if (Array.isArray(opening_hours.periods)) {
    opening_hours.periods = opening_hours.periods.map((period: any) => {
      if (period?.open?.day === 3) {
        return {
          ...period,
          close: { ...period.close, time: "1500" }, // 3:00 PM
        };
      }
      return period;
    });
  }

  if (Array.isArray(opening_hours.weekday_text)) {
    opening_hours.weekday_text = opening_hours.weekday_text.map(
      (line: string) => {
        if (line.startsWith("Wednesday:")) {
          return "Wednesday: 9:30 AM – 3:00 PM";
        }
        return line;
      }
    );
  }

  return {
    ...data,
    opening_hours,
  };
}
