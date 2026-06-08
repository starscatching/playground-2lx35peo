import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://placeholder.supabase.co";
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "placeholder-key";

export const supabase = createClient(url, key);

export const isConfigured = () =>
  !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export type Coin = {
  id: string;
  user_id: string;
  name: string;
  year: string;
  country: string;
  material: string;
  denomination: string;
  grade: string;
  grader: string;
  mint: string;
  notes: string;
  purchase_price: number;
  current_value: number;
  obverse_url: string;
  reverse_url: string;
  created_at: string;
};

export type Profile = {
  id: string;
  email: string;
  display_name: string;
  avatar_url: string;
  created_at: string;
};
