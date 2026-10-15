import type { LineRow } from '@/types/lisheng'
import { aggregateLines, fmtMoney, fmtNum, LINE_COLORS } from '@/lib/metrics'

const ORDER_LINES = ['满格', '满格镜像', '营业厅', '丽胜', 'B站', '其他未归因'] as const
const LEAD_LINES = ['leads_满格', 'leads_营业厅', 'leads_丽胜', 'leads_B站', 'leads_镜像'] as const
const LEAD_LABELS: Record<string, string> = {
  leads_满格: '满格进线', leads_营业厅: '营业厅进线', leads_丽胜: '丽胜进线', leads_B站: 'B站线索', leads_镜像: '镜像进线',
}

export default function LineSection({ rows, mirrorSpend, mirrorLeads }: { rows: LineRow[]; mirrorSpend: number; mirrorLeads: number }) {
  const t = aggregateLines(rows)
  const desc = [...rows].reverse()
  return (
    <section className="rounded-[18px] bg-white shadow-[0_2px_16px_rgba(0,0,0,.05)] p-6">
      <div className="flex items-baseline justify-between mb-4">
        <h3 className="text-sm font-semibold text-[#1d1d1f]">每日订单与进线分线</h3>
        <span className="text-[11px] text-[#aeaeb2]">按归因证据广告主归属（谁投谁接待）；归因不到计「其他未归因」</span>
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        {ORDER_LINES.map((l) => (
          <span key={l} className="inline-flex items-center gap-1.5 rounded-full bg-[#f5f5f7] px-3 py-1 text-xs tabular-nums text-[#6e6e73]">
            <span className="w-2 h-2 rounded-full" style={{ background: LINE_COLORS[l] }} />
            {l}出单 <b className="text-[#1d1d1f] font-semibold">{fmtNum(t[l])}</b>
          </span>
        ))}
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#d2d2d7] px-3 py-1 text-xs tabular-nums text-[#6e6e73]">
          镜像户消耗 <b className="text-[#1d1d1f] font-semibold">{fmtMoney(mirrorSpend)}</b> · 进线 <b className="text-[#1d1d1f] font-semibold">{fmtNum(mirrorLeads)}</b>
          <span className="text-[#aeaeb2]">（对照户·不计预算）</span>
        </span>
      </div>
      <div className="overflow-x-auto max-h-96 overflow-y-auto rounded-xl">
        <table className="w-full text-sm tabular-nums whitespace-nowrap">
          <thead className="sticky top-0 z-10">
            <tr className="text-[#86868b] text-[11px] tracking-wide border-b border-[#e8e8ed]">
              <th className="px-4 py-2.5 text-left font-medium">日期</th>
              {ORDER_LINES.map((l) => (
                <th key={l} className="px-4 py-2.5 text-right font-medium">{l}单</th>
              ))}
              <th className="px-4 py-2.5 text-right font-medium">推送合计</th>
              {LEAD_LINES.map((l) => (
                <th key={l} className="px-4 py-2.5 text-right font-medium">{LEAD_LABELS[l]}</th>
              ))}
              <th className="px-4 py-2.5 text-right font-medium">进线合计</th>
            </tr>
          </thead>
          <tbody>
            <tr className="font-semibold border-b border-[#d2d2d7]">
              <td className="px-4 py-2.5 text-[#1d1d1f]">区间合计</td>
              {ORDER_LINES.map((l) => (
                <td key={l} className="px-4 py-2.5 text-right text-[#1d1d1f]">{fmtNum(t[l])}</td>
              ))}
              <td className="px-4 py-2.5 text-right text-[#1d1d1f]">{fmtNum(t.pushed)}</td>
              {LEAD_LINES.map((l) => (
                <td key={l} className="px-4 py-2.5 text-right text-[#1d1d1f]">{fmtNum(t[l])}</td>
              ))}
              <td className="px-4 py-2.5 text-right text-[#1d1d1f]">{fmtNum(t.leads_total)}</td>
            </tr>
            {desc.map((r) => (
              <tr key={r.date} className="border-t border-[#f0f0f2] hover:bg-[#f5f5f7]/50 transition-colors">
                <td className="px-4 py-2 text-[#6e6e73]">{r.date}</td>
                {ORDER_LINES.map((l) => (
                  <td key={l} className={`px-4 py-2 text-right ${r[l] > 0 ? 'font-medium text-[#1d1d1f]' : 'text-[#c7c7cc]'}`}>{fmtNum(r[l])}</td>
                ))}
                <td className="px-4 py-2 text-right font-semibold text-[#1d1d1f]">{fmtNum(r.pushed)}</td>
                {LEAD_LINES.map((l) => (
                  <td key={l} className="px-4 py-2 text-right text-[#6e6e73]">{fmtNum(r[l])}</td>
                ))}
                <td className="px-4 py-2 text-right font-semibold text-[#1d1d1f]">{fmtNum(r.leads_total)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
