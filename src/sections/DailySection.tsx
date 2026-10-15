import type { DailyRow } from '@/types/lisheng'
import { fmtMoney, fmtNum, fmtPct } from '@/lib/metrics'

export default function DailySection({ rows }: { rows: DailyRow[] }) {
  const desc = [...rows].reverse()
  return (
    <section className="rounded-2xl border bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
      <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-800 mb-3">
        <span className="inline-flex items-center justify-center w-6 h-6 rounded-lg text-xs font-bold text-white bg-slate-600">明</span>
        逐日明细 <span className="font-normal text-slate-400 text-xs">T+1，当天不实时</span>
      </h3>
      <div className="overflow-x-auto max-h-[32rem] overflow-y-auto rounded-lg border">
        <table className="w-full text-sm tabular-nums whitespace-nowrap">
          <thead className="sticky top-0 z-10">
            <tr className="bg-slate-50 text-slate-500 border-b border-slate-200">
              {['日期', '营业厅消耗', '丽胜消耗', '满格消耗', 'B站消耗', '镜像消耗', '当日消耗', '广告费余额', '进线', '镜像进线', '进线成本', '有效订单', '订单成本', '转化率', '交付', '交付成本', '交付率', '内容篇数', '素材篇数', 'B站篇数'].map((h) => (
                <th key={h} className="px-3 py-2 text-right font-medium first:text-left">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {desc.map((r) => (
              <tr key={r.date} className="border-t border-slate-100 hover:bg-slate-50">
                <td className="px-3 py-1.5 text-slate-600">{r.date}</td>
                <td className="px-3 py-1.5 text-right">{fmtMoney(r.spend_yyt)}</td>
                <td className="px-3 py-1.5 text-right">{fmtMoney(r.spend_lisheng)}</td>
                <td className="px-3 py-1.5 text-right">{fmtMoney(r.spend_mange)}</td>
                <td className="px-3 py-1.5 text-right">{fmtMoney(r.spend_bili)}</td>
                <td className="px-3 py-1.5 text-right text-slate-500">{fmtMoney(r.spend_mirror)}</td>
                <td className="px-3 py-1.5 text-right font-semibold">{fmtMoney(r.spend_total)}</td>
                <td className="px-3 py-1.5 text-right">{fmtMoney(r.remain)}</td>
                <td className="px-3 py-1.5 text-right">{fmtNum(r.leads)}</td>
                <td className="px-3 py-1.5 text-right text-slate-500">{fmtNum(r.leads_mirror)}</td>
                <td className="px-3 py-1.5 text-right">{fmtMoney(r.lead_cost)}</td>
                <td className="px-3 py-1.5 text-right font-medium">{fmtNum(r.orders)}</td>
                <td className="px-3 py-1.5 text-right">{fmtMoney(r.order_cost)}</td>
                <td className="px-3 py-1.5 text-right">{fmtPct(r.conv_rate)}</td>
                <td className="px-3 py-1.5 text-right">{fmtNum(r.deliv)}</td>
                <td className="px-3 py-1.5 text-right">{fmtMoney(r.deliv_cost)}</td>
                <td className="px-3 py-1.5 text-right">{fmtPct(r.deliv_rate)}</td>
                <td className="px-3 py-1.5 text-right">{fmtNum(r.content)}</td>
                <td className="px-3 py-1.5 text-right">{fmtNum(r.material)}</td>
                <td className="px-3 py-1.5 text-right">{fmtNum(r.bili_pub)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
