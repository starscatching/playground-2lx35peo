export { createClient as createBrowserClient } from "@/utils/supabase/client";

// Legacy singleton for client components that import from this module
import { createBrowserClient } from "@supabase/ssr";
const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;
export const supabase = createBrowserClient(url, key);

export const isConfigured = () =>
  !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

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
