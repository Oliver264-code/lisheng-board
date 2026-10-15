export interface LeadsLines {
  满格: number
  营业厅: number
  丽胜: number
  B站: number
}

export interface DailyRow {
  date: string
  spend_yyt: number | null
  spend_lisheng: number | null
  spend_mange: number | null
  spend_bili: number | null
  spend_total: number
  spend_mirror: number | null
  leads_mirror: number | null
  remain: number
  leads: number
  lead_cost: number | null
  leads_lines: LeadsLines
  orders: number
  order_cost: number | null
  conv_rate: number | null
  deliv: number
  deliv_cost: number | null
  deliv_rate: number | null
  content: number
  material: number
  pub_by_acc: Record<string, number>
  bili_pub: number
}

export interface LineRow {
  date: string
  满格: number
  营业厅: number
  丽胜: number
  B站: number
  满格镜像: number
  丽胜自有投放: number
  其他未归因: number
  pushed: number
  leads_满格: number
  leads_营业厅: number
  leads_丽胜: number
  leads_B站: number
  leads_total: number
  leads_镜像?: number | null
}

export interface RealtimeRow {
  line: string
  spend: number | null
  leads: number | null
  lead_cost: number | null
  orders: number | null
  order_cost: number | null
}

export interface Realtime {
  date: string
  updated: string
  note?: string
  total_spend: number
  total_leads: number
  total_orders: number
  total_lead_cost: number | null
  total_order_cost: number | null
  rows: RealtimeRow[]
}

export interface LishengData {
  updated: string
  start: string
  data_through: string
  budget: number
  spent: number
  remain: number
  avg_daily: number
  leads_total: number
  lead_cost: number | null
  line_leads_totals: LeadsLines
  orders_total: number
  order_cost: number | null
  conv_rate: number | null
  deliv_total: number
  deliv_cost: number | null
  deliv_rate: number | null
  content_total: number
  material_total: number
  pub_accounts: string[]
  pub_acc_totals: Record<string, number>
  bili_pub_total: number
  bili_warning: string | null
  line_totals: Record<string, number>
  line_rows: LineRow[]
  accounts: { id: string; name: string; start: string }[]
  rows: DailyRow[]
  realtime: Realtime
}
