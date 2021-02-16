import { parseISO, format } from 'date-fns'

const DateFormatter = ({ dateStr }: { dateStr: string }) => (
  <time dateTime={dateStr}>{format(parseISO(dateStr), 'LLLL d, yyyy')}</time>
)

export default DateFormatter
