import {
  ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts'
import type { DailyRow } from '@/types/lisheng'

const axisStyle = { fontSize: 11, fill: '#86868b' }
const tooltipStyle = {
  contentStyle: { borderRadius: 14, border: 'none', boxShadow: '0 12px 32px rgba(0,0,0,.12)', fontSize: 12, background: 'rgba(255,255,255,.97)', padding: '10px 14px' },
  labelStyle: { color: '#86868b', marginBottom: 4 },
}

function ChartCard({ title, hint, children }: { title: string; hint: string; children: React.ReactNode }) {
  return (
    <div className="rounded-[18px] bg-white shadow-[0_2px_16px_rgba(0,0,0,.05)] px-6 pt-5 pb-3">
      <div className="flex items-baseline justify-between mb-3">
        <h3 className="text-[15px] font-semibold text-[#1d1d1f] tracking-tight">{title}</h3>
        <span className="text-[11px] text-[#aeaeb2]">{hint}</span>
      </div>
      <div className="h-72">{children}</div>
    </div>
  )
}

const legendProps = { iconType: 'circle' as const, iconSize: 7, wrapperStyle: { fontSize: 12, color: '#6e6e73', paddingTop: 8 } }
const grid = <CartesianGrid strokeDasharray="2 4" stroke="#ececee" vertical={false} />
const xAxis = <XAxis dataKey="d" tick={axisStyle} axisLine={false} tickLine={false} dy={6} />
const yAxisL = <YAxis yAxisId="l" tick={axisStyle} axisLine={false} tickLine={false} width={44} />
const yAxisR = <YAxis yAxisId="r" orientation="right" tick={axisStyle} axisLine={false} tickLine={false} width={44} />

export default function ChartsSection({ rows }: { rows: DailyRow[] }) {
  const data = rows.map((r) => ({
    ...r,
    d: r.date.slice(5),
    营业厅: r.spend_yyt ?? 0,
    丽胜: r.spend_lisheng ?? 0,
    满格: r.spend_mange ?? 0,
    B站: r.spend_bili ?? 0,
    消耗: r.spend_total,
    订单: r.orders,
    订单成本: r.order_cost,
    进线: r.leads,
    转化率: r.conv_rate,
    交付: r.deliv,
    交付成本: r.deliv_cost,
    交付率: r.deliv_rate,
  }))
  return (
    <section className="grid grid-cols-1 xl:grid-cols-2 gap-4">
      <ChartCard title="分线消耗" hint="点图例可只看单条线">
        <ResponsiveContainer>
          <ComposedChart data={data} barCategoryGap="32%">
            {grid}
            {xAxis}
            <YAxis yAxisId="l" tick={axisStyle} axisLine={false} tickLine={false} width={44} />
            <Tooltip {...tooltipStyle} cursor={{ fill: 'rgba(0,0,0,.03)' }} />
            <Legend {...legendProps} />
            <Bar yAxisId="l" dataKey="满格" stackId="s" fill="#0a84ff" />
            <Bar yAxisId="l" dataKey="营业厅" stackId="s" fill="#8e8e93" />
            <Bar yAxisId="l" dataKey="丽胜" stackId="s" fill="#c7c7cc" />
            <Bar yAxisId="l" dataKey="B站" stackId="s" fill="#64d2ff" radius={[5, 5, 0, 0]} />
          </ComposedChart>
        </ResponsiveContainer>
      </ChartCard>
      <ChartCard title="消耗 × 订单 × 订单成本" hint="柱=消耗/订单量，线=订单成本">
        <ResponsiveContainer>
          <ComposedChart data={data} barCategoryGap="32%">
            {grid}
            {xAxis}
            {yAxisL}
            {yAxisR}
            <Tooltip {...tooltipStyle} cursor={{ fill: 'rgba(0,0,0,.03)' }} />
            <Legend {...legendProps} />
            <Bar yAxisId="l" dataKey="消耗" fill="#0a84ff" radius={[5, 5, 0, 0]} />
            <Bar yAxisId="l" dataKey="订单" fill="#d1d1d6" radius={[5, 5, 0, 0]} />
            <Line yAxisId="r" dataKey="订单成本" stroke="#1d1d1f" strokeWidth={2} dot={false} />
          </ComposedChart>
        </ResponsiveContainer>
      </ChartCard>
      <ChartCard title="进线 × 订单 × 转化率" hint="线=转化率（订单÷进线）">
        <ResponsiveContainer>
          <ComposedChart data={data} barCategoryGap="32%">
            {grid}
            {xAxis}
            {yAxisL}
            <YAxis yAxisId="r" orientation="right" tick={axisStyle} axisLine={false} tickLine={false} width={44} unit="%" />
            <Tooltip {...tooltipStyle} cursor={{ fill: 'rgba(0,0,0,.03)' }} />
            <Legend {...legendProps} />
            <Bar yAxisId="l" dataKey="进线" fill="#0a84ff" radius={[5, 5, 0, 0]} />
            <Bar yAxisId="l" dataKey="订单" fill="#d1d1d6" radius={[5, 5, 0, 0]} />
            <Line yAxisId="r" dataKey="转化率" stroke="#8e8e93" strokeWidth={2} dot={false} />
          </ComposedChart>
        </ResponsiveContainer>
      </ChartCard>
      <ChartCard title="交付 × 交付成本 × 交付率" hint="交付=已下单+已归档">
        <ResponsiveContainer>
          <ComposedChart data={data} barCategoryGap="32%">
            {grid}
            {xAxis}
            {yAxisL}
            {yAxisR}
            <Tooltip {...tooltipStyle} cursor={{ fill: 'rgba(0,0,0,.03)' }} />
            <Legend {...legendProps} />
            <Bar yAxisId="l" dataKey="交付" fill="#0a84ff" radius={[5, 5, 0, 0]} />
            <Line yAxisId="r" dataKey="交付成本" stroke="#1d1d1f" strokeWidth={2} dot={false} />
            <Line yAxisId="r" dataKey="交付率" stroke="#aeaeb2" strokeWidth={2} dot={false} strokeDasharray="6 4" />
          </ComposedChart>
        </ResponsiveContainer>
      </ChartCard>
    </section>
  )
}
