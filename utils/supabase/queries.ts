import { SupabaseClient } from '@supabase/supabase-js';
import { cache } from 'react';
import { createClient } from './server';
import { Database } from '@/types_db';

type Product = Database['public']['Tables']['products']['Row'];
type Price = Database['public']['Tables']['prices']['Row'];
type Subscription = Database['public']['Tables']['subscriptions']['Row'];
type ProductWithPrices = Product & { prices: Price[] };

export const getUser = cache(async (supabase: SupabaseClient) => {
  const {
    data: { user }
  } = await supabase.auth.getUser();
  return user;
});

export const getSubscription = cache(async (supabase: SupabaseClient) => {
  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('*, prices(*, products(*))')
    .in('status', ['trialing', 'active'])
    .maybeSingle();

  return subscription as (Subscription & {
    prices: Price & {
      products: Product;
    };
  }) | null;
});

export async function getProducts(supabase: ReturnType<typeof createClient>) {
  const { data: products } = await supabase
    .from('products')
    .select('*, prices(*)')
    .eq('active', true)
    .order('metadata->index')
    .order('unit_amount', { foreignTable: 'prices' });

  return (products as ProductWithPrices[]) ?? [];
}

export const getUserDetails = cache(async (supabase: SupabaseClient) => {
  const { data: userDetails } = await supabase
    .from('users')
    .select('*')
    .single();
  return userDetails;
});
