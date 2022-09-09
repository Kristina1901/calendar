export function getDate(x) {
    const today = new Date();
    const todayFormatted = `${today.getFullYear()}-${
      today.getMonth() + 1
    }-${today.getDate()}`
      .split(/\s+/)
      .join('');
    const daysInWeek = [1, 2, 3, 4, 5, 6, 0];
    // const [selectedDate, setSelectedDate] = useState(today);
    const selectedMonthLastDate = new Date(
      x.getFullYear(),
      x.getMonth() + 1,
      0
    );
    const prevMonthLastDate = new Date(
      x.getFullYear(),
      x.getMonth(),
      0
    );
    const daysInMonth = selectedMonthLastDate.getDate();
    const firstDayInMonth = new Date(
      x.getFullYear(),
      x.getMonth(),
      1
    ).getDay();
    const startingPoint = daysInWeek.indexOf(firstDayInMonth) + 1;
    let prevMonthStartingPoint =
      prevMonthLastDate.getDate() - daysInWeek.indexOf(firstDayInMonth) + 1;
    let currentMonthCounter = 1;
    let nextMonthCounter = 1;
    const rows = 6;
    const cols = 8;
    const calendarRows = {};
    for (let i = 1; i < rows; i++) {
      for (let j = 1; j < cols; j++) {
        if (!calendarRows[i]) {
          calendarRows[i] = [];
        }
        if (i === 1) {
          if (j < startingPoint) {
            calendarRows[i] = [
              ...calendarRows[i],
              {
                classes: 'in-prev-month',
                date: `${
                  x.getMonth() === 0
                    ? x.getFullYear() - 1
                    : x.getFullYear()
                }
                      -${
                        x.getMonth() === 0
                          ? 12
                          : x.getMonth()
                      }-${prevMonthStartingPoint}`
                  .split(/\s+/)
                  .join(''),
                value: prevMonthStartingPoint,
                text: '',
                info: '',
                hours: '',
              },
            ];
            prevMonthStartingPoint++;
          } else {
            calendarRows[i] = [
              ...calendarRows[i],
              {
                classes: '',
                date: `${x.getFullYear()}-${
                  selectedMonthLastDate.getMonth() + 1
                }-${currentMonthCounter}`
                  .split(/\s+/)
                  .join(''),
                value: currentMonthCounter,
                text: '',
                info: '',
                hours: '',
              },
            ];
            currentMonthCounter++;
          }
        } else if (i > 1 && currentMonthCounter < daysInMonth + 1) {
          calendarRows[i] = [
            ...calendarRows[i],
            {
              classes: '',
              date: `${x.getFullYear()}-${
                x.getMonth() + 1
              }-${currentMonthCounter}`
                .split(/\s+/)
                .join(''),
              value: currentMonthCounter,
              text: '',
              info: '',
              hours: '',
            },
          ];
          currentMonthCounter++;
        } else {
          calendarRows[i] = [
            ...calendarRows[i],
            {
              classes: 'in-next-month',
              date: `${
                x.getMonth() + 2 === 13
                  ? x.getFullYear() + 1
                  : x.getFullYear()
              }-${
                x.getMonth() + 2 === 13
                  ? 1
                  : x.getMonth() + 2
              }-${nextMonthCounter}`
                .split(/\s+/)
                .join(''),
            },
          ];
          nextMonthCounter++;
        }
      }
    }
    return calendarRows
  }