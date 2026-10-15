import type { Realtime } from '@/types/lisheng'
import { fmtMoney, fmtNum, LINE_COLORS } from '@/lib/metrics'

export default function RealtimeSection({ realtime }: { realtime: Realtime }) {
  const kpis = [
    { label: '今日实时消耗', value: fmtMoney(realtime.total_spend) },
    { label: '新进线数', value: fmtNum(realtime.total_leads) },
    { label: '进线成本', value: fmtMoney(realtime.total_lead_cost) },
    { label: '新客户单量', value: fmtNum(realtime.total_orders) },
    { label: '订单成本', value: fmtMoney(realtime.total_order_cost) },
  ]
  return (
    <section className="rounded-2xl bg-white border border-[#d2d2d7]/60 p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-5">
        <h2 className="flex items-center gap-2 text-base font-semibold text-[#1d1d1f]">
          <span className="inline-block w-2 h-2 rounded-full bg-[#0071e3]" />
          今日实时成本
          <span className="text-xs font-normal text-[#86868b]">{realtime.date} 当日累计 · 不受日期筛选影响</span>
        </h2>
        <span className="text-[11px] text-[#aeaeb2]">更新 {realtime.updated} · 每天 10:00 / 15:00 / 18:00 / 21:00 刷新{realtime.note ? ` · ${realtime.note}` : ''}</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-5">
        {kpis.map((k) => (
          <div key={k.label} className="rounded-xl bg-[#f5f5f7] px-4 py-3">
            <div className="text-[11px] text-[#86868b]">{k.label}</div>
            <div className="text-xl font-semibold tabular-nums text-[#1d1d1f] mt-1 tracking-tight">{k.value}</div>
          </div>
        ))}
      </div>
      <div className="overflow-x-auto rounded-xl border border-[#e8e8ed]">
        <table className="w-full text-sm tabular-nums">
          <thead>
            <tr className="bg-[#f5f5f7] text-[#86868b] text-xs">
              <th className="px-4 py-2.5 text-left font-medium">条线</th>
              <th className="px-4 py-2.5 text-right font-medium">今日实时消耗</th>
              <th className="px-4 py-2.5 text-right font-medium">新进线数</th>
              <th className="px-4 py-2.5 text-right font-medium">进线成本</th>
              <th className="px-4 py-2.5 text-right font-medium">新客户单量</th>
              <th className="px-4 py-2.5 text-right font-medium">订单成本</th>
            </tr>
          </thead>
          <tbody>
            {realtime.rows.map((r) => (
              <tr key={r.line} className="border-t border-[#f0f0f2]">
                <td className="px-4 py-2.5 text-[#1d1d1f]">
                  <span className="inline-flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ background: LINE_COLORS[r.line] ?? '#aeaeb2' }} />
                    {r.line}
                  </span>
                </td>
                <td className="px-4 py-2.5 text-right text-[#1d1d1f]">{fmtMoney(r.spend)}</td>
                <td className="px-4 py-2.5 text-right text-[#1d1d1f]">{fmtNum(r.leads)}</td>
                <td className="px-4 py-2.5 text-right text-[#6e6e73]">{fmtMoney(r.lead_cost)}</td>
                <td className="px-4 py-2.5 text-right text-[#1d1d1f]">{fmtNum(r.orders)}</td>
                <td className="px-4 py-2.5 text-right text-[#6e6e73]">{fmtMoney(r.order_cost)}</td>
              </tr>
            ))}
            <tr className="border-t border-[#d2d2d7] bg-[#f5f5f7]/60 font-semibold">
              <td className="px-4 py-2.5 text-[#1d1d1f]">总计</td>
              <td className="px-4 py-2.5 text-right text-[#1d1d1f]">{fmtMoney(realtime.total_spend)}</td>
              <td className="px-4 py-2.5 text-right text-[#1d1d1f]">{fmtNum(realtime.total_leads)}</td>
              <td className="px-4 py-2.5 text-right text-[#6e6e73]">{fmtMoney(realtime.total_lead_cost)}</td>
              <td className="px-4 py-2.5 text-right text-[#1d1d1f]">{fmtNum(realtime.total_orders)}</td>
              <td className="px-4 py-2.5 text-right text-[#6e6e73]">{fmtMoney(realtime.total_order_cost)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  )
}
