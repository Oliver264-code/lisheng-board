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
    <section className="rounded-2xl border border-indigo-200 bg-gradient-to-br from-indigo-50 via-blue-50 to-white p-5 sm:p-6 shadow-sm">
      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-4">
        <h2 className="flex items-center gap-2 text-base font-semibold text-slate-800">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-500"></span>
          </span>
          今日实时成本 <span className="text-sm font-normal text-slate-500">（{realtime.date} 当日累计，不受日期筛选影响）</span>
        </h2>
        <span className="text-xs text-slate-500">更新：{realtime.updated} · 每天 10:00 / 15:00 / 18:00 / 21:00 自动刷新</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-4">
        {kpis.map((k) => (
          <div key={k.label} className="rounded-xl bg-white border border-indigo-100 px-4 py-3 shadow-sm">
            <div className="text-xs text-slate-500">{k.label}</div>
            <div className="text-xl font-bold tabular-nums text-slate-900 mt-0.5">{k.value}</div>
          </div>
        ))}
      </div>
      <div className="overflow-x-auto rounded-xl border border-indigo-100">
        <table className="w-full text-sm tabular-nums">
          <thead>
            <tr className="bg-indigo-100/50 text-slate-600">
              <th className="px-3 py-2 text-left font-medium">条线</th>
              <th className="px-3 py-2 text-right font-medium">今日实时消耗</th>
              <th className="px-3 py-2 text-right font-medium">新进线数</th>
              <th className="px-3 py-2 text-right font-medium">进线成本</th>
              <th className="px-3 py-2 text-right font-medium">新客户单量</th>
              <th className="px-3 py-2 text-right font-medium">订单成本</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {realtime.rows.map((r) => (
              <tr key={r.line} className="border-t border-slate-100">
                <td className="px-3 py-2">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-sm" style={{ background: LINE_COLORS[r.line] ?? '#94a3b8' }} />
                    {r.line}
                  </span>
                </td>
                <td className="px-3 py-2 text-right">{fmtMoney(r.spend)}</td>
                <td className="px-3 py-2 text-right">{fmtNum(r.leads)}</td>
                <td className="px-3 py-2 text-right">{fmtMoney(r.lead_cost)}</td>
                <td className="px-3 py-2 text-right">{fmtNum(r.orders)}</td>
                <td className="px-3 py-2 text-right">{fmtMoney(r.order_cost)}</td>
              </tr>
            ))}
            <tr className="border-t-2 border-blue-200 bg-blue-50/60 font-semibold">
              <td className="px-3 py-2">总计</td>
              <td className="px-3 py-2 text-right">{fmtMoney(realtime.total_spend)}</td>
              <td className="px-3 py-2 text-right">{fmtNum(realtime.total_leads)}</td>
              <td className="px-3 py-2 text-right">{fmtMoney(realtime.total_lead_cost)}</td>
              <td className="px-3 py-2 text-right">{fmtNum(realtime.total_orders)}</td>
              <td className="px-3 py-2 text-right">{fmtMoney(realtime.total_order_cost)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  )
}
