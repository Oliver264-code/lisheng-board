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
    <section className="rounded-[18px] bg-white shadow-[0_2px_16px_rgba(0,0,0,.05)] p-6">
      <div className="flex items-baseline justify-between mb-4">
        <h3 className="text-sm font-semibold text-[#1d1d1f]">每日发布篇数</h3>
        <span className="text-[11px] text-[#aeaeb2]">分账号 + 广告素材/B站单列，不合并；排期不计</span>
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        {accounts.map((a) => (
          <span key={a} className="rounded-full bg-[#f5f5f7] px-3 py-1 text-xs tabular-nums text-[#6e6e73]">
            {a} <b className="text-[#1d1d1f] font-semibold">{fmtNum(totals[a] ?? 0)}</b>
          </span>
        ))}
        <span className="rounded-full bg-[#f5f5f7] px-3 py-1 text-xs tabular-nums text-[#6e6e73]">
          广告素材 <b className="text-[#1d1d1f] font-semibold">{fmtNum(materialTotal)}</b>
        </span>
        <span className="rounded-full bg-[#f5f5f7] px-3 py-1 text-xs tabular-nums text-[#6e6e73]">
          B站 <b className="text-[#1d1d1f] font-semibold">{fmtNum(biliTotal)}</b>
        </span>
      </div>
      <div className="overflow-x-auto max-h-96 overflow-y-auto rounded-xl">
        <table className="w-full text-sm tabular-nums whitespace-nowrap">
          <thead className="sticky top-0 z-10">
            <tr className="text-[#86868b] text-[11px] tracking-wide border-b border-[#e8e8ed]">
              <th className="px-4 py-2.5 text-left font-medium">日期</th>
              {accounts.map((a) => (
                <th key={a} className="px-4 py-2.5 text-right font-medium">{a}</th>
              ))}
              <th className="px-4 py-2.5 text-right font-medium">内容小计</th>
              <th className="px-4 py-2.5 text-right font-medium">广告素材</th>
              <th className="px-4 py-2.5 text-right font-medium">B站</th>
              <th className="px-4 py-2.5 text-right font-medium">当日合计</th>
            </tr>
          </thead>
          <tbody>
            <tr className="font-semibold border-b border-[#d2d2d7]">
              <td className="px-4 py-2.5 text-[#1d1d1f]">区间合计</td>
              {accounts.map((a) => (
                <td key={a} className="px-4 py-2.5 text-right text-[#1d1d1f]">{fmtNum(totals[a] ?? 0)}</td>
              ))}
              <td className="px-4 py-2.5 text-right text-[#1d1d1f]">{fmtNum(contentTotal)}</td>
              <td className="px-4 py-2.5 text-right text-[#1d1d1f]">{fmtNum(materialTotal)}</td>
              <td className="px-4 py-2.5 text-right text-[#1d1d1f]">{fmtNum(biliTotal)}</td>
              <td className="px-4 py-2.5 text-right text-[#1d1d1f]">{fmtNum(contentTotal + materialTotal + biliTotal)}</td>
            </tr>
            {desc.map((r) => (
              <tr key={r.date} className="border-t border-[#f0f0f2] hover:bg-[#f5f5f7]/50 transition-colors">
                <td className="px-4 py-2 text-[#6e6e73]">{r.date}</td>
                {accounts.map((a) => (
                  <td key={a} className="px-4 py-2 text-right text-[#1d1d1f]">{fmtNum(r.pub_by_acc[a] ?? 0)}</td>
                ))}
                <td className="px-4 py-2 text-right font-medium text-[#1d1d1f]">{fmtNum(r.content)}</td>
                <td className="px-4 py-2 text-right text-[#6e6e73]">{fmtNum(r.material)}</td>
                <td className="px-4 py-2 text-right text-[#6e6e73]">{fmtNum(r.bili_pub)}</td>
                <td className="px-4 py-2 text-right font-semibold text-[#1d1d1f]">{fmtNum(r.content + r.material + r.bili_pub)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
