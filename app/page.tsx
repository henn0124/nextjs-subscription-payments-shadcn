import Link from 'next/link';
import Pricing from '@/components/ui/Pricing/Pricing';
import { createClient } from '@/utils/supabase/server';
import {
  getProducts,
  getSubscription,
  getUser
} from '@/utils/supabase/queries';
import { User } from '@supabase/supabase-js';
import { Database } from '@/types_db';

type Product = Database['public']['Tables']['products']['Row'];
type Price = Database['public']['Tables']['prices']['Row'];
type Subscription = Database['public']['Tables']['subscriptions']['Row'];

type ProductWithPrices = Product & { prices: Price[] };

// Define the type that Pricing component expects
type PriceWithProduct = Price & {
  products: Product;
};

type SubscriptionWithProduct = Subscription & {
  prices: PriceWithProduct;
};

export default async function Home() {
  const supabase = createClient();
  
  let user: User | null = null;
  let products: ProductWithPrices[] = [];
  let subscription: SubscriptionWithProduct | null = null;

  try {
    [user, products, subscription] = await Promise.all([
      getUser(supabase),
      getProducts(supabase),
      getSubscription(supabase)
    ]);

    if (subscription) {
      subscription = {
        ...subscription,
        prices: {
          ...subscription.prices,
          products: subscription.prices.products
        }
      };
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold mb-4">
          Welcome to Our App
        </h1>
        
        <p className="text-xl mb-8">
          Explore our subscription plans and features below.
        </p>
        
        {!user && (
          <div className="mb-8">
            <Link href="/signin" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
              Sign In
            </Link>
            <Link href="/signin?mode=signup" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Sign Up
            </Link>
          </div>
        )}
        
        <div className="w-full max-w-4xl">
          <Pricing
            user={user}
            products={products}
            subscription={subscription}
          />
        </div>
      </main>
    </div>
  );
}
