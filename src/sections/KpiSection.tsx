import type { Agg } from '@/lib/metrics'
import { fmtMoney, fmtNum, fmtPct } from '@/lib/metrics'

interface Props {
  agg: Agg
  budget: number
  isAll: boolean
}

const GROUPS = [
  { name: '资金', color: '#2563eb', bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-l-blue-500' },
  { name: '进线', color: '#0891b2', bg: 'bg-cyan-50', text: 'text-cyan-700', border: 'border-l-cyan-500' },
  { name: '订单', color: '#d97706', bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-l-amber-500' },
  { name: '交付', color: '#059669', bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-l-emerald-500' },
  { name: '内容', color: '#7c3aed', bg: 'bg-violet-50', text: 'text-violet-700', border: 'border-l-violet-500' },
]

export default function KpiSection({ agg, budget, isAll }: Props) {
  const usedPct = budget > 0 ? (agg.spent / budget) * 100 : 0
  const cards = [
    { g: 1, label: '进线数', value: fmtNum(agg.leads), sub: '满格+营业厅+丽胜+B站' },
    { g: 1, label: '进线成本', value: fmtMoney(agg.leadCost), sub: '消耗 ÷ 进线' },
    { g: 2, label: '有效订单', value: fmtNum(agg.orders), sub: '真实用户下单·含工单废弃单' },
    { g: 2, label: '订单成本', value: fmtMoney(agg.orderCost), sub: '消耗 ÷ 订单' },
    { g: 2, label: '转化率', value: fmtPct(agg.convRate), sub: '订单 ÷ 进线' },
    { g: 3, label: '交付成功', value: fmtNum(agg.deliv), sub: '已下单+已归档' },
    { g: 3, label: '交付成本', value: fmtMoney(agg.delivCost), sub: '消耗 ÷ 交付' },
    { g: 3, label: '交付率', value: fmtPct(agg.delivRate), sub: '交付 ÷ 订单' },
    { g: 4, label: '内容发布', value: fmtNum(agg.content), sub: `素材 ${fmtNum(agg.material)} · B站 ${fmtNum(agg.biliPub)}（单列）` },
    { g: 4, label: '统计天数', value: fmtNum(agg.days), sub: '当前筛选区间' },
  ]
  return (
    <section className="space-y-4">
      {/* 资金总览横幅 */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-blue-900 p-5 sm:p-6 text-white shadow-lg">
        <div className="flex flex-wrap items-center gap-x-10 gap-y-4">
          <div>
            <div className="text-xs text-slate-400 mb-1">广告费总预算（丽胜充值 · 9/21 充入营业厅户）</div>
            <div className="text-3xl font-bold tabular-nums tracking-tight">{fmtMoney(budget)}</div>
          </div>
          <div>
            <div className="text-xs text-slate-400 mb-1">已消耗{isAll ? '' : '（区间）'}</div>
            <div className="text-3xl font-bold tabular-nums tracking-tight text-blue-300">{fmtMoney(agg.spent)}</div>
          </div>
          <div>
            <div className="text-xs text-slate-400 mb-1">广告费余额</div>
            <div className="text-3xl font-bold tabular-nums tracking-tight text-emerald-300">{fmtMoney(agg.remain)}</div>
          </div>
          <div>
            <div className="text-xs text-slate-400 mb-1">{isAll ? '日均消耗' : '区间日均'}</div>
            <div className="text-3xl font-bold tabular-nums tracking-tight text-slate-200">{fmtMoney(agg.avgDaily)}</div>
          </div>
          <div className="flex-1 min-w-[200px]">
            <div className="flex justify-between text-xs text-slate-400 mb-1.5">
              <span>预算执行进度</span>
              <span className="text-blue-300 font-semibold tabular-nums">{usedPct.toFixed(1)}%</span>
            </div>
            <div className="h-2.5 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-blue-400 to-cyan-300 transition-all" style={{ width: `${Math.min(usedPct, 100)}%` }} />
            </div>
          </div>
        </div>
      </div>
      {/* KPI 分组卡片 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {cards.map((c) => {
          const g = GROUPS[c.g]
          return (
            <div key={c.label} className={`rounded-xl border border-l-4 ${g.border} bg-white px-4 py-3.5 shadow-sm hover:shadow-md transition-shadow`}>
              <div className="flex items-center gap-1.5">
                <span className={`rounded px-1.5 py-0.5 text-[10px] font-medium ${g.bg} ${g.text}`}>{g.name}</span>
                <span className="text-xs text-slate-500">{c.label}</span>
              </div>
              <div className="text-2xl font-semibold tabular-nums text-slate-900 mt-1.5">{c.value}</div>
              <div className="text-[11px] text-slate-400 mt-1 leading-tight">{c.sub}</div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
