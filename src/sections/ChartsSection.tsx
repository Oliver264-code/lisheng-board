import {
  ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts'
import type { DailyRow } from '@/types/lisheng'
import { LINE_COLORS } from '@/lib/metrics'

const axisStyle = { fontSize: 11, fill: '#94a3b8' }
const tooltipStyle = {
  contentStyle: { borderRadius: 12, border: '1px solid #e2e8f0', boxShadow: '0 8px 24px rgba(15,23,42,.08)', fontSize: 12 },
}

function ChartCard({ badge, color, title, hint, children }: { badge: string; color: string; title: string; hint: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-800">
          <span className="inline-flex items-center justify-center w-6 h-6 rounded-lg text-xs font-bold text-white" style={{ background: color }}>{badge}</span>
          {title}
        </h3>
        <span className="text-[11px] text-slate-400">{hint}</span>
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
  return (
    <section className="grid grid-cols-1 xl:grid-cols-2 gap-4">
      <ChartCard badge="①" color="#2563eb" title="分线消耗 × 广告费余额" hint="点图例可只看单条线">
        <ResponsiveContainer>
          <ComposedChart data={data} barCategoryGap="25%">
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis dataKey="d" tick={axisStyle} axisLine={false} tickLine={false} />
            <YAxis yAxisId="l" tick={axisStyle} axisLine={false} tickLine={false} />
            <YAxis yAxisId="r" orientation="right" tick={axisStyle} axisLine={false} tickLine={false} domain={[0, 30000]} />
            <Tooltip {...tooltipStyle} />
            <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
            <Bar yAxisId="l" dataKey="满格" stackId="s" fill={LINE_COLORS.满格} />
            <Bar yAxisId="l" dataKey="营业厅" stackId="s" fill={LINE_COLORS.营业厅} />
            <Bar yAxisId="l" dataKey="丽胜" stackId="s" fill={LINE_COLORS.丽胜} />
            <Bar yAxisId="l" dataKey="B站" stackId="s" fill={LINE_COLORS.B站} radius={[4, 4, 0, 0]} />
            <Line yAxisId="r" dataKey="余额" stroke="#0f172a" strokeWidth={2.5} dot={false} />
          </ComposedChart>
        </ResponsiveContainer>
      </ChartCard>
      <ChartCard badge="②" color="#d97706" title="消耗 × 订单 × 订单成本" hint="柱=消耗/订单量，线=订单成本">
        <ResponsiveContainer>
          <ComposedChart data={data} barCategoryGap="25%">
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis dataKey="d" tick={axisStyle} axisLine={false} tickLine={false} />
            <YAxis yAxisId="l" tick={axisStyle} axisLine={false} tickLine={false} />
            <YAxis yAxisId="r" orientation="right" tick={axisStyle} axisLine={false} tickLine={false} />
            <Tooltip {...tooltipStyle} />
            <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
            <Bar yAxisId="l" dataKey="消耗" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            <Bar yAxisId="l" dataKey="订单" fill="#f59e0b" radius={[4, 4, 0, 0]} />
            <Line yAxisId="r" dataKey="订单成本" stroke="#dc2626" strokeWidth={2.5} dot={false} />
          </ComposedChart>
        </ResponsiveContainer>
      </ChartCard>
      <ChartCard badge="③" color="#0891b2" title="进线 × 订单 × 转化率" hint="线=转化率（订单÷进线）">
        <ResponsiveContainer>
          <ComposedChart data={data} barCategoryGap="25%">
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis dataKey="d" tick={axisStyle} axisLine={false} tickLine={false} />
            <YAxis yAxisId="l" tick={axisStyle} axisLine={false} tickLine={false} />
            <YAxis yAxisId="r" orientation="right" tick={axisStyle} axisLine={false} tickLine={false} unit="%" />
            <Tooltip {...tooltipStyle} />
            <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
            <Bar yAxisId="l" dataKey="进线" fill="#06b6d4" radius={[4, 4, 0, 0]} />
            <Bar yAxisId="l" dataKey="订单" fill="#f59e0b" radius={[4, 4, 0, 0]} />
            <Line yAxisId="r" dataKey="转化率" stroke="#16a34a" strokeWidth={2.5} dot={false} />
          </ComposedChart>
        </ResponsiveContainer>
      </ChartCard>
      <ChartCard badge="④" color="#059669" title="交付 × 交付成本 × 交付率" hint="交付=已下单+已归档">
        <ResponsiveContainer>
          <ComposedChart data={data} barCategoryGap="25%">
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis dataKey="d" tick={axisStyle} axisLine={false} tickLine={false} />
            <YAxis yAxisId="l" tick={axisStyle} axisLine={false} tickLine={false} />
            <YAxis yAxisId="r" orientation="right" tick={axisStyle} axisLine={false} tickLine={false} />
            <Tooltip {...tooltipStyle} />
            <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
            <Bar yAxisId="l" dataKey="交付" fill="#10b981" radius={[4, 4, 0, 0]} />
            <Line yAxisId="r" dataKey="交付成本" stroke="#dc2626" strokeWidth={2.5} dot={false} />
            <Line yAxisId="r" dataKey="交付率" stroke="#16a34a" strokeWidth={2.5} dot={false} strokeDasharray="6 4" />
          </ComposedChart>
        </ResponsiveContainer>
      </ChartCard>
    </section>
  )
}
