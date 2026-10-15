import {
  ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts'
import type { DailyRow } from '@/types/lisheng'
import { LINE_COLORS } from '@/lib/metrics'

const axisStyle = { fontSize: 11, fill: '#86868b' }
const tooltipStyle = {
  contentStyle: { borderRadius: 14, border: '1px solid rgba(210,210,215,.7)', boxShadow: '0 12px 32px rgba(0,0,0,.10)', fontSize: 12, background: 'rgba(255,255,255,.96)' },
  labelStyle: { color: '#86868b' },
}

function ChartCard({ title, hint, children }: { title: string; hint: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-white border border-[#d2d2d7]/60 p-6">
      <div className="flex items-baseline justify-between mb-4">
        <h3 className="text-sm font-semibold text-[#1d1d1f]">{title}</h3>
        <span className="text-[11px] text-[#aeaeb2]">{hint}</span>
      </div>
      <div className="h-72">{children}</div>
    </div>
  )
}

export default function ChartsSection({ rows }: { rows: DailyRow[] }) {
  const data = rows.map((r) => ({
    ...r,
    d: r.date.slice(5),
    营业厅: r.spend_yyt ?? 0,
    丽胜: r.spend_lisheng ?? 0,
    满格: r.spend_mange ?? 0,
    B站: r.spend_bili ?? 0,
    余额: r.remain,
    消耗: r.spend_total,
    订单: r.orders,
    订单成本: r.order_cost,
    进线: r.leads,
    转化率: r.conv_rate,
    交付: r.deliv,
    交付成本: r.deliv_cost,
    交付率: r.deliv_rate,
  }))
  const legendProps = { iconType: 'circle' as const, iconSize: 7, wrapperStyle: { fontSize: 12, color: '#6e6e73' } }
  return (
    <section className="grid grid-cols-1 xl:grid-cols-2 gap-4">
      <ChartCard title="分线消耗 × 广告费余额" hint="点图例可只看单条线">
        <ResponsiveContainer>
          <ComposedChart data={data} barCategoryGap="28%">
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f2" vertical={false} />
            <XAxis dataKey="d" tick={axisStyle} axisLine={false} tickLine={false} dy={4} />
            <YAxis yAxisId="l" tick={axisStyle} axisLine={false} tickLine={false} />
            <YAxis yAxisId="r" orientation="right" tick={axisStyle} axisLine={false} tickLine={false} domain={[0, 30000]} />
            <Tooltip {...tooltipStyle} cursor={{ fill: 'rgba(0,0,0,.03)' }} />
            <Legend {...legendProps} />
            <Bar yAxisId="l" dataKey="满格" stackId="s" fill={LINE_COLORS.满格} />
            <Bar yAxisId="l" dataKey="营业厅" stackId="s" fill={LINE_COLORS.营业厅} />
            <Bar yAxisId="l" dataKey="丽胜" stackId="s" fill={LINE_COLORS.丽胜} />
            <Bar yAxisId="l" dataKey="B站" stackId="s" fill={LINE_COLORS.B站} radius={[3, 3, 0, 0]} />
            <Line yAxisId="r" dataKey="余额" stroke="#1d1d1f" strokeWidth={2} dot={false} />
          </ComposedChart>
        </ResponsiveContainer>
      </ChartCard>
      <ChartCard title="消耗 × 订单 × 订单成本" hint="柱=消耗/订单量，线=订单成本">
        <ResponsiveContainer>
          <ComposedChart data={data} barCategoryGap="28%">
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f2" vertical={false} />
            <XAxis dataKey="d" tick={axisStyle} axisLine={false} tickLine={false} dy={4} />
            <YAxis yAxisId="l" tick={axisStyle} axisLine={false} tickLine={false} />
            <YAxis yAxisId="r" orientation="right" tick={axisStyle} axisLine={false} tickLine={false} />
            <Tooltip {...tooltipStyle} cursor={{ fill: 'rgba(0,0,0,.03)' }} />
            <Legend {...legendProps} />
            <Bar yAxisId="l" dataKey="消耗" fill="#0071e3" radius={[3, 3, 0, 0]} />
            <Bar yAxisId="l" dataKey="订单" fill="#d2d2d7" radius={[3, 3, 0, 0]} />
            <Line yAxisId="r" dataKey="订单成本" stroke="#1d1d1f" strokeWidth={2} dot={false} />
          </ComposedChart>
        </ResponsiveContainer>
      </ChartCard>
      <ChartCard title="进线 × 订单 × 转化率" hint="线=转化率（订单÷进线）">
        <ResponsiveContainer>
          <ComposedChart data={data} barCategoryGap="28%">
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f2" vertical={false} />
            <XAxis dataKey="d" tick={axisStyle} axisLine={false} tickLine={false} dy={4} />
            <YAxis yAxisId="l" tick={axisStyle} axisLine={false} tickLine={false} />
            <YAxis yAxisId="r" orientation="right" tick={axisStyle} axisLine={false} tickLine={false} unit="%" />
            <Tooltip {...tooltipStyle} cursor={{ fill: 'rgba(0,0,0,.03)' }} />
            <Legend {...legendProps} />
            <Bar yAxisId="l" dataKey="进线" fill="#0071e3" radius={[3, 3, 0, 0]} />
            <Bar yAxisId="l" dataKey="订单" fill="#d2d2d7" radius={[3, 3, 0, 0]} />
            <Line yAxisId="r" dataKey="转化率" stroke="#6e6e73" strokeWidth={2} dot={false} />
          </ComposedChart>
        </ResponsiveContainer>
      </ChartCard>
      <ChartCard title="交付 × 交付成本 × 交付率" hint="交付=已下单+已归档">
        <ResponsiveContainer>
          <ComposedChart data={data} barCategoryGap="28%">
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f2" vertical={false} />
            <XAxis dataKey="d" tick={axisStyle} axisLine={false} tickLine={false} dy={4} />
            <YAxis yAxisId="l" tick={axisStyle} axisLine={false} tickLine={false} />
            <YAxis yAxisId="r" orientation="right" tick={axisStyle} axisLine={false} tickLine={false} />
            <Tooltip {...tooltipStyle} cursor={{ fill: 'rgba(0,0,0,.03)' }} />
            <Legend {...legendProps} />
            <Bar yAxisId="l" dataKey="交付" fill="#0071e3" radius={[3, 3, 0, 0]} />
            <Line yAxisId="r" dataKey="交付成本" stroke="#1d1d1f" strokeWidth={2} dot={false} />
            <Line yAxisId="r" dataKey="交付率" stroke="#aeaeb2" strokeWidth={2} dot={false} strokeDasharray="6 4" />
          </ComposedChart>
        </ResponsiveContainer>
      </ChartCard>
    </section>
  )
}
