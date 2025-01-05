export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      production_orders: {
        Row: {
          id: string
          order_number: string
          location: string
          employee_id: string
          timestamp: string
          user_id: string
        }
        Insert: {
          id?: string
          order_number: string
          location: string
          employee_id: string
          timestamp?: string
          user_id: string
        }
        Update: {
          id?: string
          order_number?: string
          location?: string
          employee_id?: string
          timestamp?: string
          user_id?: string
        }
      }
    }
  }
}