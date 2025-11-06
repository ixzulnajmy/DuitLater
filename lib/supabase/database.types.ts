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
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          phone: string | null
          avatar_url: string | null
          onesignal_player_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          phone?: string | null
          avatar_url?: string | null
          onesignal_player_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          phone?: string | null
          avatar_url?: string | null
          onesignal_player_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      friendships: {
        Row: {
          id: string
          user_id: string
          friend_id: string
          status: 'pending' | 'accepted' | 'blocked'
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          friend_id: string
          status?: 'pending' | 'accepted' | 'blocked'
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          friend_id?: string
          status?: 'pending' | 'accepted' | 'blocked'
          created_at?: string
        }
      }
      bills: {
        Row: {
          id: string
          title: string
          description: string | null
          total_amount: number
          service_charge: number
          tax: number
          paid_by: string
          created_by: string
          receipt_image_url: string | null
          bill_date: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          total_amount: number
          service_charge?: number
          tax?: number
          paid_by: string
          created_by: string
          receipt_image_url?: string | null
          bill_date?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          total_amount?: number
          service_charge?: number
          tax?: number
          paid_by?: string
          created_by?: string
          receipt_image_url?: string | null
          bill_date?: string
          created_at?: string
          updated_at?: string
        }
      }
      bill_participants: {
        Row: {
          id: string
          bill_id: string
          user_id: string
          created_at: string
        }
        Insert: {
          id?: string
          bill_id: string
          user_id: string
          created_at?: string
        }
        Update: {
          id?: string
          bill_id?: string
          user_id?: string
          created_at?: string
        }
      }
      bill_items: {
        Row: {
          id: string
          bill_id: string
          name: string
          price: number
          quantity: number
          created_at: string
        }
        Insert: {
          id?: string
          bill_id: string
          name: string
          price: number
          quantity?: number
          created_at?: string
        }
        Update: {
          id?: string
          bill_id?: string
          name?: string
          price?: number
          quantity?: number
          created_at?: string
        }
      }
      item_shares: {
        Row: {
          id: string
          item_id: string
          user_id: string
          created_at: string
        }
        Insert: {
          id?: string
          item_id: string
          user_id: string
          created_at?: string
        }
        Update: {
          id?: string
          item_id?: string
          user_id?: string
          created_at?: string
        }
      }
      settlements: {
        Row: {
          id: string
          bill_id: string
          from_user_id: string
          to_user_id: string
          amount: number
          status: 'pending' | 'paid' | 'cancelled'
          paid_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          bill_id: string
          from_user_id: string
          to_user_id: string
          amount: number
          status?: 'pending' | 'paid' | 'cancelled'
          paid_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          bill_id?: string
          from_user_id?: string
          to_user_id?: string
          amount?: number
          status?: 'pending' | 'paid' | 'cancelled'
          paid_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      user_friends: {
        Row: {
          user_id: string | null
          friend_id: string | null
          friend_name: string | null
          friend_email: string | null
          friend_avatar: string | null
        }
      }
      user_balances: {
        Row: {
          user_id: string | null
          balance: number | null
        }
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
