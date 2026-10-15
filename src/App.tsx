import { useMemo, useState } from 'react'
import raw from '@/data/lisheng.json'
import type { LishengData } from '@/types/lisheng'
import { aggregate, filterRows, type Range } from '@/lib/metrics'
import RangeFilter from '@/components/RangeFilter'
import RealtimeSection from '@/sections/RealtimeSection'
import KpiSection from '@/sections/KpiSection'
import ChartsSection from '@/sections/ChartsSection'
import PublishSection from '@/sections/PublishSection'
import LineSection from '@/sections/LineSection'
import DailySection from '@/sections/DailySection'

const data = raw as unknown as LishengData

const CALIBERS = [
  '核算起点：极速线上营业厅 9/21（开始投放，3 万广告费即当时充值进该户，9/21-9/30 仅计营业厅线）；丽胜宽带营业厅 / 极速满格通信 / B站三连（联通+移动）10/1 起（满格 10/1 前的单和消耗不计，10/1 起只计广州计划）。',
  '消耗：聚光账户离线日报（满格=单元报表广州计划）+ B站三连报表；数据 T+1，当天不实时。',
  '广告费余额 = 30,000 − 各户自起点累计消耗，不含佣金收益（代运营佣金交付方自算）。',
  '进线 = 聚光创意报表私信进线（按户窗口）；B站进线 = 表单提交数。',
  '有效订单 = 售前接待真实用户下单的全部意向单（工单废弃单也计入）；转化率 = 订单 ÷ 进线，订单成本 = 消耗 ÷ 订单。',
  '交付 = 已下单 + 已归档；交付率 = 交付 ÷ 订单，交付成本 = 消耗 ÷ 交付。转化与交付两段分开看。',
  '发布篇数 = 飞书「总笔记资料」库任务状态=已发布按发布日期计数（自 9/21），广告素材单列不合并；已与原库逐日核对一致（内容 121 + 素材 480）。B站篇数=B站三连创意按视频去重后进入投放的日期计数。',
  '订单分线：按归因证据里的广告主归属条线（谁投谁接待）；归因不到广告主的计入「其他未归因」。',
  '满格镜像 9320987 为对照户，不计预算、不计入总消耗，出单/进线/消耗单列展示（自 10/1 起计入）。B站条线=全部 B站户合计（老联通 4221900 + 新联通 4505906 + 新移动 4505909；4212709 无消耗），丽胜自有投放（4505909）的消耗与出单均已并入 B站条线。',
]

export default function App() {
  const [range, setRange] = useState<Range>({ start: null, end: null })
  const rows = useMemo(() => filterRows(data.rows, range), [range])
  const lineRows = useMemo(() => filterRows(data.line_rows, range), [range])
  const agg = useMemo(() => aggregate(rows), [rows])
  const isAll = !range.start && !range.end

  return (
    <div className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f]">
      <header className="sticky top-0 z-30 bg-[#f5f5f7]/80 backdrop-blur-xl border-b border-[#d2d2d7]/50">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-semibold tracking-tight leading-tight">丽胜代运营数据看板</h1>
            <p className="text-[11px] text-[#86868b] leading-tight mt-0.5">
              更新 {data.updated}（每天 9:00 同步，T+1）· 数据截至 {data.data_through}
            </p>
          </div>
          <RangeFilter range={range} onChange={setRange} minDate={data.start} maxDate={data.data_through} />
        </div>
      </header>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8 space-y-4">

        <RealtimeSection realtime={data.realtime} />
        <KpiSection agg={agg} budget={data.budget} isAll={isAll} />
        <ChartsSection rows={rows} />
        <PublishSection
          rows={rows}
          accounts={data.pub_accounts}
          totals={agg.pubByAcc}
          materialTotal={agg.material}
          biliTotal={agg.biliPub}
          contentTotal={agg.content}
        />
        <LineSection rows={lineRows} mirrorSpend={agg.mirrorSpend} mirrorLeads={agg.mirrorLeads} />
        <DailySection rows={rows} />

        <footer className="rounded-2xl bg-white border border-[#d2d2d7]/60 p-6">
          <h3 className="text-sm font-semibold text-[#1d1d1f] mb-2">指标口径</h3>
          <ul className="text-xs text-[#86868b] space-y-1.5 leading-relaxed list-disc pl-4">
            {CALIBERS.map((c) => (
              <li key={c.slice(0, 12)}>{c}</li>
            ))}
          </ul>
        </footer>
      </div>
    </div>
  )
}
