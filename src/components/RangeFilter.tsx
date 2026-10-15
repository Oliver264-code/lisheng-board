import type { Range } from '@/lib/metrics'
import { Button } from '@/components/ui/button'

interface Props {
  range: Range
  onChange: (r: Range) => void
  minDate: string
  maxDate: string
}

function shift(date: string, days: number) {
  const d = new Date(date + 'T00:00:00')
  d.setDate(d.getDate() + days)
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${dd}`
}

export default function RangeFilter({ range, onChange, minDate, maxDate }: Props) {
  const isAll = !range.start && !range.end
  const is7 = range.start === shift(maxDate, -6) && !range.end
  const is14 = range.start === shift(maxDate, -13) && !range.end
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm font-medium text-slate-500 mr-1">日期筛选</span>
      <Button size="sm" variant={isAll ? 'default' : 'outline'} onClick={() => onChange({ start: null, end: null })}>
        全部
      </Button>
      <Button size="sm" variant={is7 ? 'default' : 'outline'} onClick={() => onChange({ start: shift(maxDate, -6), end: null })}>
        近 7 天
      </Button>
      <Button size="sm" variant={is14 ? 'default' : 'outline'} onClick={() => onChange({ start: shift(maxDate, -13), end: null })}>
        近 14 天
      </Button>
      <div className="flex items-center gap-1.5 ml-2">
        <input
          type="date"
          className="h-8 rounded-md border border-input bg-white px-2 text-sm"
          min={minDate}
          max={maxDate}
          value={range.start ?? minDate}
          onChange={(e) => onChange({ ...range, start: e.target.value || null })}
        />
        <span className="text-slate-400 text-sm">至</span>
        <input
          type="date"
          className="h-8 rounded-md border border-input bg-white px-2 text-sm"
          min={minDate}
          max={maxDate}
          value={range.end ?? maxDate}
          onChange={(e) => onChange({ ...range, end: e.target.value || null })}
        />
      </div>
    </div>
  )
}
