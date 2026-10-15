import type { DailyRow } from '@/types/lisheng'
import { fmtNum } from '@/lib/metrics'

interface Props {
  rows: DailyRow[]
  accounts: string[]
  totals: Record<string, number>
  materialTotal: number
  biliTotal: number
  contentTotal: number
}

export default function PublishSection({ rows, accounts, totals, materialTotal, biliTotal, contentTotal }: Props) {
  const desc = [...rows].reverse()
  return (
    <section className="rounded-2xl border bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
      <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-800 mb-1">
        <span className="inline-flex items-center justify-center w-6 h-6 rounded-lg text-xs font-bold text-white bg-violet-500">⑤</span>
        每日发布篇数 <span className="font-normal text-slate-400 text-xs">分账号 + 广告素材/B站单列，不合并；排期不计</span>
      </h3>
      <div className="flex flex-wrap gap-2 my-3">
        {accounts.map((a) => (
          <span key={a} className="rounded-full bg-slate-100 px-3 py-1 text-xs tabular-nums text-slate-600">
            {a} <b className="text-slate-900">{fmtNum(totals[a] ?? 0)}</b>
          </span>
        ))}
        <span className="rounded-full bg-amber-100 px-3 py-1 text-xs tabular-nums text-amber-700">
          广告素材 <b>{fmtNum(materialTotal)}</b>
        </span>
        <span className="rounded-full bg-violet-100 px-3 py-1 text-xs tabular-nums text-violet-700">
          B站 <b>{fmtNum(biliTotal)}</b>
        </span>
      </div>
      <div className="overflow-x-auto max-h-96 overflow-y-auto rounded-lg border">
        <table className="w-full text-sm tabular-nums whitespace-nowrap">
          <thead className="sticky top-0 z-10">
            <tr className="bg-slate-50 text-slate-500 border-b border-slate-200">
              <th className="px-3 py-2 text-left font-medium">日期</th>
              {accounts.map((a) => (
                <th key={a} className="px-3 py-2 text-right font-medium">{a}</th>
              ))}
              <th className="px-3 py-2 text-right font-medium">内容小计</th>
              <th className="px-3 py-2 text-right font-medium">广告素材</th>
              <th className="px-3 py-2 text-right font-medium">B站</th>
              <th className="px-3 py-2 text-right font-medium">当日合计</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-blue-50 font-semibold border-b-2 border-blue-200">
              <td className="px-3 py-2">区间合计</td>
              {accounts.map((a) => (
                <td key={a} className="px-3 py-2 text-right">{fmtNum(totals[a] ?? 0)}</td>
              ))}
              <td className="px-3 py-2 text-right">{fmtNum(contentTotal)}</td>
              <td className="px-3 py-2 text-right">{fmtNum(materialTotal)}</td>
              <td className="px-3 py-2 text-right">{fmtNum(biliTotal)}</td>
              <td className="px-3 py-2 text-right">{fmtNum(contentTotal + materialTotal + biliTotal)}</td>
            </tr>
            {desc.map((r) => (
              <tr key={r.date} className="border-t border-slate-100 hover:bg-slate-50">
                <td className="px-3 py-1.5 text-slate-600">{r.date}</td>
                {accounts.map((a) => (
                  <td key={a} className="px-3 py-1.5 text-right">{fmtNum(r.pub_by_acc[a] ?? 0)}</td>
                ))}
                <td className="px-3 py-1.5 text-right font-medium">{fmtNum(r.content)}</td>
                <td className="px-3 py-1.5 text-right">{fmtNum(r.material)}</td>
                <td className="px-3 py-1.5 text-right">{fmtNum(r.bili_pub)}</td>
                <td className="px-3 py-1.5 text-right font-semibold">{fmtNum(r.content + r.material + r.bili_pub)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
