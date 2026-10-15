import type { Agg } from '@/lib/metrics'
import { fmtMoney, fmtNum, fmtPct } from '@/lib/metrics'

interface Props {
  agg: Agg
  budget: number
  isAll: boolean
}

export default function KpiSection({ agg, budget, isAll }: Props) {
  const usedPct = budget > 0 ? (agg.spent / budget) * 100 : 0
  const cards = [
    { label: '进线数', value: fmtNum(agg.leads), sub: '满格+营业厅+丽胜+B站' },
    { label: '进线成本', value: fmtMoney(agg.leadCost), sub: '消耗 ÷ 进线' },
    { label: '有效订单', value: fmtNum(agg.orders), sub: '真实用户下单·含工单废弃单' },
    { label: '订单成本', value: fmtMoney(agg.orderCost), sub: '消耗 ÷ 订单' },
    { label: '转化率', value: fmtPct(agg.convRate), sub: '订单 ÷ 进线' },
    { label: '交付成功', value: fmtNum(agg.deliv), sub: '已下单+已归档' },
    { label: '交付成本', value: fmtMoney(agg.delivCost), sub: '消耗 ÷ 交付' },
    { label: '交付率', value: fmtPct(agg.delivRate), sub: '交付 ÷ 订单' },
    { label: '内容发布', value: fmtNum(agg.content), sub: `素材 ${fmtNum(agg.material)} · B站 ${fmtNum(agg.biliPub)}（单列）` },
    { label: '统计天数', value: fmtNum(agg.days), sub: '当前筛选区间' },
  ]
  return (
    <section className="space-y-3">
      {/* 资金总览 */}
      <div className="rounded-2xl bg-white border border-[#d2d2d7]/60 px-6 py-6 sm:px-8">
        <div className="flex flex-wrap items-end gap-x-12 gap-y-5">
          <div>
            <div className="text-xs text-[#86868b] mb-1.5">广告费总预算</div>
            <div className="text-[32px] leading-none font-semibold tabular-nums text-[#1d1d1f] tracking-tight">{fmtMoney(budget)}</div>
          </div>
          <div>
            <div className="text-xs text-[#86868b] mb-1.5">已消耗{isAll ? '' : '（区间）'}</div>
            <div className="text-[32px] leading-none font-semibold tabular-nums text-[#0071e3] tracking-tight">{fmtMoney(agg.spent)}</div>
          </div>
          <div>
            <div className="text-xs text-[#86868b] mb-1.5">广告费余额</div>
            <div className="text-[32px] leading-none font-semibold tabular-nums text-[#1d1d1f] tracking-tight">{fmtMoney(agg.remain)}</div>
          </div>
          <div>
            <div className="text-xs text-[#86868b] mb-1.5">{isAll ? '日均消耗' : '区间日均'}</div>
            <div className="text-[32px] leading-none font-semibold tabular-nums text-[#1d1d1f] tracking-tight">{fmtMoney(agg.avgDaily)}</div>
          </div>
          <div className="flex-1 min-w-[180px] pb-1">
            <div className="flex justify-between text-xs text-[#86868b] mb-2">
              <span>预算执行</span>
              <span className="text-[#1d1d1f] font-medium tabular-nums">{usedPct.toFixed(1)}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-[#e8e8ed] overflow-hidden">
              <div className="h-full rounded-full bg-[#0071e3] transition-all" style={{ width: `${Math.min(usedPct, 100)}%` }} />
            </div>
          </div>
        </div>
      </div>
      {/* KPI 卡片 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {cards.map((c) => (
          <div key={c.label} className="rounded-2xl bg-white border border-[#d2d2d7]/60 px-5 py-4">
            <div className="text-xs text-[#86868b]">{c.label}</div>
            <div className="text-[26px] leading-tight font-semibold tabular-nums text-[#1d1d1f] mt-1.5 tracking-tight">{c.value}</div>
            <div className="text-[11px] text-[#aeaeb2] mt-1 leading-tight">{c.sub}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
