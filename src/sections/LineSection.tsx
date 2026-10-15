import type { LineRow } from '@/types/lisheng'
import { aggregateLines, fmtMoney, fmtNum, LINE_COLORS } from '@/lib/metrics'

const ORDER_LINES = ['满格', '满格镜像', '营业厅', '丽胜', '丽胜自有投放', 'B站', '其他未归因'] as const
const LEAD_LINES = ['leads_满格', 'leads_营业厅', 'leads_丽胜', 'leads_B站', 'leads_镜像'] as const
const LEAD_LABELS: Record<string, string> = {
  leads_满格: '满格进线', leads_营业厅: '营业厅进线', leads_丽胜: '丽胜进线', leads_B站: 'B站线索', leads_镜像: '镜像进线',
}

export default function LineSection({ rows, mirrorSpend, mirrorLeads }: { rows: LineRow[]; mirrorSpend: number; mirrorLeads: number }) {
  const t = aggregateLines(rows)
  const desc = [...rows].reverse()
  return (
    <section className="rounded-2xl border bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
      <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-800 mb-1">
        <span className="inline-flex items-center justify-center w-6 h-6 rounded-lg text-xs font-bold text-white bg-amber-500">⑥</span>
        每日订单与进线分线 <span className="font-normal text-slate-400 text-xs">按归因证据广告主归属（谁投谁接待）；归因不到计「其他未归因」</span>
      </h3>
      <div className="flex flex-wrap gap-2 my-3">
        {ORDER_LINES.map((l) => (
          <span key={l} className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs tabular-nums text-slate-600">
            <span className="w-2.5 h-2.5 rounded-sm" style={{ background: LINE_COLORS[l] }} />
            {l}出单 <b className="text-slate-900">{fmtNum(t[l])}</b>
          </span>
        ))}
        <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-200 px-3 py-1 text-xs tabular-nums text-slate-600">
          <span className="w-2.5 h-2.5 rounded-sm" style={{ background: LINE_COLORS.满格镜像 }} />
          镜像户消耗 <b className="text-slate-900">{fmtMoney(mirrorSpend)}</b> · 进线 <b className="text-slate-900">{fmtNum(mirrorLeads)}</b>
          <span className="text-slate-400">（对照户·不计预算）</span>
        </span>
      </div>
      <div className="overflow-x-auto max-h-96 overflow-y-auto rounded-lg border">
        <table className="w-full text-sm tabular-nums whitespace-nowrap">
          <thead className="sticky top-0 z-10">
            <tr className="bg-slate-50 text-slate-500 border-b border-slate-200">
              <th className="px-3 py-2 text-left font-medium">日期</th>
              {ORDER_LINES.map((l) => (
                <th key={l} className="px-3 py-2 text-right font-medium">{l}单</th>
              ))}
              <th className="px-3 py-2 text-right font-medium">推送合计</th>
              {LEAD_LINES.map((l) => (
                <th key={l} className="px-3 py-2 text-right font-medium">{LEAD_LABELS[l]}</th>
              ))}
              <th className="px-3 py-2 text-right font-medium">进线合计</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-blue-50 font-semibold border-b-2 border-blue-200">
              <td className="px-3 py-2">区间合计</td>
              {ORDER_LINES.map((l) => (
                <td key={l} className="px-3 py-2 text-right">{fmtNum(t[l])}</td>
              ))}
              <td className="px-3 py-2 text-right">{fmtNum(t.pushed)}</td>
              {LEAD_LINES.map((l) => (
                <td key={l} className="px-3 py-2 text-right">{fmtNum(t[l])}</td>
              ))}
              <td className="px-3 py-2 text-right">{fmtNum(t.leads_total)}</td>
            </tr>
            {desc.map((r) => (
              <tr key={r.date} className="border-t border-slate-100 hover:bg-slate-50">
                <td className="px-3 py-1.5 text-slate-600">{r.date}</td>
                {ORDER_LINES.map((l) => (
                  <td key={l} className={`px-3 py-1.5 text-right ${r[l] > 0 ? 'font-medium text-slate-800' : 'text-slate-300'}`}>{fmtNum(r[l])}</td>
                ))}
                <td className="px-3 py-1.5 text-right font-semibold">{fmtNum(r.pushed)}</td>
                {LEAD_LINES.map((l) => (
                  <td key={l} className="px-3 py-1.5 text-right">{fmtNum(r[l])}</td>
                ))}
                <td className="px-3 py-1.5 text-right font-semibold">{fmtNum(r.leads_total)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
