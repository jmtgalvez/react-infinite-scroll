export const removeDuplicate = (arr: any[]) => (
    Array.from(new Set(arr.map(i => JSON.stringify(i))))
)

export function formatDate(date: Date, format: string) {
  const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  return format
    .replace(/HH/g, (date.getHours() + '').padStart(2, '0'))
    .replace(/H/g, date.getHours() + '')
    .replace(/hh/g, ((date.getHours() % 12) + '').padStart(2, '0'))
    .replace(/h/g, (date.getHours() % 12) + '')
    .replace(/mm|m/g, (date.getMinutes() + '').padStart(2, '0'))
    .replace(/ss|s/g, (date.getSeconds() + '').padStart(2, '0'))
    .replace(/a|a/g, date.getHours() < 12 ? 'AM' : 'PM')
    .replace(/yyyy/g, date.getFullYear().toString())
    .replace(/yy/g, (date.getFullYear() + '').slice(-2))
    .replace(/MMMM/g, MONTHS[date.getMonth()])
    .replace(/MMM/g, MONTHS[date.getMonth()].slice(0, 3))
    .replace(/MM/g, (date.getMonth() + 1).toString().padStart(2, '0'))
    .replace(/dd/g, date.getDate().toString().padStart(2, '0'))
    .replace(/d/g, date.getDate().toString())
}