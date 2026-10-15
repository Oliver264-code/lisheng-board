import type { DailyRow } from '@/types/lisheng'
import { fmtMoney, fmtNum, fmtPct } from '@/lib/metrics'

export default function DailySection({ rows }: { rows: DailyRow[] }) {
  const desc = [...rows].reverse()
  return (
    <section className="rounded-2xl bg-white border border-[#d2d2d7]/60 p-6">
      <div className="flex items-baseline justify-between mb-4">
        <h3 className="text-sm font-semibold text-[#1d1d1f]">逐日明细</h3>
        <span className="text-[11px] text-[#aeaeb2]">T+1，当天不实时</span>
      </div>
      <div className="overflow-x-auto max-h-[32rem] overflow-y-auto rounded-xl border border-[#e8e8ed]">
        <table className="w-full text-sm tabular-nums whitespace-nowrap">
          <thead className="sticky top-0 z-10">
            <tr className="bg-[#f5f5f7] text-[#86868b] text-xs border-b border-[#e8e8ed]">
              {['日期', '营业厅消耗', '丽胜消耗', '满格消耗', 'B站消耗', '镜像消耗', '当日消耗', '广告费余额', '进线', '镜像进线', '进线成本', '有效订单', '订单成本', '转化率', '交付', '交付成本', '交付率', '内容篇数', '素材篇数', 'B站篇数'].map((h) => (
                <th key={h} className="px-4 py-2.5 text-right font-medium first:text-left">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {desc.map((r) => (
              <tr key={r.date} className="border-t border-[#f0f0f2] hover:bg-[#f5f5f7]/50 transition-colors">
                <td className="px-4 py-2 text-[#6e6e73]">{r.date}</td>
                <td className="px-4 py-2 text-right text-[#6e6e73]">{fmtMoney(r.spend_yyt)}</td>
                <td className="px-4 py-2 text-right text-[#6e6e73]">{fmtMoney(r.spend_lisheng)}</td>
                <td className="px-4 py-2 text-right text-[#6e6e73]">{fmtMoney(r.spend_mange)}</td>
                <td className="px-4 py-2 text-right text-[#6e6e73]">{fmtMoney(r.spend_bili)}</td>
                <td className="px-4 py-2 text-right text-[#aeaeb2]">{fmtMoney(r.spend_mirror)}</td>
                <td className="px-4 py-2 text-right font-semibold text-[#1d1d1f]">{fmtMoney(r.spend_total)}</td>
                <td className="px-4 py-2 text-right text-[#1d1d1f]">{fmtMoney(r.remain)}</td>
                <td className="px-4 py-2 text-right text-[#1d1d1f]">{fmtNum(r.leads)}</td>
                <td className="px-4 py-2 text-right text-[#aeaeb2]">{fmtNum(r.leads_mirror)}</td>
                <td className="px-4 py-2 text-right text-[#6e6e73]">{fmtMoney(r.lead_cost)}</td>
                <td className="px-4 py-2 text-right font-medium text-[#1d1d1f]">{fmtNum(r.orders)}</td>
                <td className="px-4 py-2 text-right text-[#6e6e73]">{fmtMoney(r.order_cost)}</td>
                <td className="px-4 py-2 text-right text-[#6e6e73]">{fmtPct(r.conv_rate)}</td>
                <td className="px-4 py-2 text-right text-[#1d1d1f]">{fmtNum(r.deliv)}</td>
                <td className="px-4 py-2 text-right text-[#6e6e73]">{fmtMoney(r.deliv_cost)}</td>
                <td className="px-4 py-2 text-right text-[#6e6e73]">{fmtPct(r.deliv_rate)}</td>
                <td className="px-4 py-2 text-right text-[#6e6e73]">{fmtNum(r.content)}</td>
                <td className="px-4 py-2 text-right text-[#6e6e73]">{fmtNum(r.material)}</td>
                <td className="px-4 py-2 text-right text-[#6e6e73]">{fmtNum(r.bili_pub)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
