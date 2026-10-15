import type { DailyRow, LineRow } from '@/types/lisheng'

export interface Range {
  start: string | null
  end: string | null
}

export const LINE_COLORS: Record<string, string> = {
  满格: '#2563eb',
  营业厅: '#f59e0b',
  丽胜: '#10b981',
  B站: '#8b5cf6',
  满格镜像: '#94a3b8',
  丽胜自有投放: '#06b6d4',
  其他未归因: '#d4d4d8',
}

export const fmtMoney = (v: number | null | undefined) =>
  v == null ? '—' : `¥${v.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

export const fmtNum = (v: number | null | undefined) => (v == null ? '—' : v.toLocaleString('zh-CN'))

export const fmtPct = (v: number | null | undefined) => (v == null ? '—' : `${v.toFixed(1)}%`)

export const pct = (a: number, b: number) => (b > 0 ? (a / b) * 100 : null)

export const div = (a: number, b: number) => (b > 0 ? a / b : null)

export function inRange(date: string, range: Range) {
  if (range.start && date < range.start) return false
  if (range.end && date > range.end) return false
  return true
}

export function filterRows<T extends { date: string }>(rows: T[], range: Range): T[] {
  return rows.filter((r) => inRange(r.date, range))
}

export interface Agg {
  days: number
  spent: number
  remain: number | null
  leads: number
  orders: number
  deliv: number
  content: number
  material: number
  biliPub: number
  leadCost: number | null
  orderCost: number | null
  convRate: number | null
  delivCost: number | null
  delivRate: number | null
  avgDaily: number | null
  mirrorSpend: number
  mirrorLeads: number
  pubByAcc: Record<string, number>
  spendByLine: { yyt: number; lisheng: number; mange: number; bili: number }
}

export function aggregate(rows: DailyRow[]): Agg {
  const acc: Agg = {
    days: rows.length,
    spent: 0,
    remain: null,
    leads: 0,
    orders: 0,
    deliv: 0,
    content: 0,
    material: 0,
    biliPub: 0,
    leadCost: null,
    orderCost: null,
    convRate: null,
    delivCost: null,
    delivRate: null,
    avgDaily: null,
    mirrorSpend: 0,
    mirrorLeads: 0,
    pubByAcc: {},
    spendByLine: { yyt: 0, lisheng: 0, mange: 0, bili: 0 },
  }
  for (const r of rows) {
    acc.spent += r.spend_total
    acc.leads += r.leads
    acc.orders += r.orders
    acc.deliv += r.deliv
    acc.content += r.content
    acc.material += r.material
    acc.biliPub += r.bili_pub
    acc.remain = r.remain
    acc.mirrorSpend += r.spend_mirror ?? 0
    acc.mirrorLeads += r.leads_mirror ?? 0
    acc.spendByLine.yyt += r.spend_yyt ?? 0
    acc.spendByLine.lisheng += r.spend_lisheng ?? 0
    acc.spendByLine.mange += r.spend_mange ?? 0
    acc.spendByLine.bili += r.spend_bili ?? 0
    for (const [k, v] of Object.entries(r.pub_by_acc)) {
      acc.pubByAcc[k] = (acc.pubByAcc[k] ?? 0) + v
    }
  }
  acc.leadCost = div(acc.spent, acc.leads)
  acc.orderCost = div(acc.spent, acc.orders)
  acc.convRate = pct(acc.orders, acc.leads)
  acc.delivCost = div(acc.spent, acc.deliv)
  acc.delivRate = pct(acc.deliv, acc.orders)
  acc.avgDaily = acc.days > 0 ? acc.spent / acc.days : null
  return acc
}

export function aggregateLines(rows: LineRow[]) {
  const acc = {
    满格: 0, 营业厅: 0, 丽胜: 0, B站: 0, 满格镜像: 0, 丽胜自有投放: 0, 其他未归因: 0,
    pushed: 0, leads_满格: 0, leads_营业厅: 0, leads_丽胜: 0, leads_B站: 0, leads_镜像: 0, leads_total: 0,
  }
  for (const r of rows) {
    acc.满格 += r.满格; acc.营业厅 += r.营业厅; acc.丽胜 += r.丽胜; acc.B站 += r.B站
    acc.满格镜像 += r.满格镜像; acc.丽胜自有投放 += r.丽胜自有投放; acc.其他未归因 += r.其他未归因
    acc.pushed += r.pushed
    acc.leads_满格 += r.leads_满格; acc.leads_营业厅 += r.leads_营业厅
    acc.leads_丽胜 += r.leads_丽胜; acc.leads_B站 += r.leads_B站; acc.leads_镜像 += r.leads_镜像 ?? 0; acc.leads_total += r.leads_total
  }
  return acc
}
