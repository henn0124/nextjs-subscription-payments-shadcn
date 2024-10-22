# Next.js Subscription Payments Starter with shadcn/ui and Role-Based Access Control

The all-in-one starter kit for high-performance SaaS applications, now featuring shadcn/ui for beautiful and customizable UI components, and role-based access control.

## Features

- Secure user management and authentication with [Supabase](https://supabase.io/docs/guides/auth)
- Powerful data access & management tooling on top of PostgreSQL with [Supabase](https://supabase.io/docs/guides/database)
- Integration with [Stripe Checkout](https://stripe.com/docs/payments/checkout) and the [Stripe customer portal](https://stripe.com/docs/billing/subscriptions/customer-portal)
- Automatic syncing of pricing plans and subscription statuses via [Stripe webhooks](https://stripe.com/docs/webhooks)
- Beautiful UI components powered by [shadcn/ui](https://ui.shadcn.com/)
- Role-based access control (RBAC) for managing user permissions

## Demo

- https://subscription-payments.vercel.app/

[![Screenshot of demo](./public/demo.png)](https://subscription-payments.vercel.app/)

## Architecture

![Architecture diagram](./public/architecture_diagram.png)

## Tech Stack

- [Next.js](https://nextjs.org/) – React framework for building performant apps with the best developer experience
- [Auth.js](https://authjs.dev/) – Handle user authentication with ease with providers like Google, Twitter, GitHub, etc.
- [Supabase](https://supabase.io/) – Open source Firebase alternative for database and authentication
- [Stripe](https://stripe.com/) – Handles all things payments
- [Tailwind CSS](https://tailwindcss.com/) – Utility-first CSS framework for rapid UI development
- [shadcn/ui](https://ui.shadcn.com/) – Beautifully designed components that you can copy and paste into your apps
- [TypeScript](https://www.typescriptlang.org/) – Static type checker for end-to-end typesafety
- [Replit] Easily preview in development environment and deploy to production.

## Project Structure

- `/app` - Next.js app router pages
- `/components` - React components, including shadcn/ui components
- `/hooks` - Custom React hooks
- `/lib` - Utility functions and custom type definitions
- `/styles` - Global styles and Tailwind CSS configuration
- `/utils` - Helper functions and utility modules

## Role-Based Access Control

This project implements a simple role-based access control system:

- Public routes: Accessible to all users
- `/playground`: Accessible to all authenticated users
- `/admin`: Accessible only to users with the 'admin' role

Roles are managed in the Supabase database and assigned to users upon registration.

## Getting Started

To get started with this template, follow these steps:

1. Clone this repository
2. Install dependencies with `pnpm install`
3. Copy `.env.example` to `.env.local` and update the variables
4. Run the development server with `pnpm dev`

For detailed setup instructions, including Supabase and Stripe configuration, please refer to the [original README](#step-by-step-setup).

## Customization

This project uses shadcn/ui for UI components. You can customize the look and feel of your application by modifying the components in the `components/ui` directory.

To add new shadcn/ui components, use the following command:

```bash
pnpm dl

```

## Documentation

For detailed documentation, please refer to the [/docs](./docs) directory. Key topics include:

- [Getting Started](./docs/getting-started.md)
- [Authentication](./docs/authentication.md)
- [Role-Based Access Control](./docs/role-based-access-control.md)
- [API Reference](./docs/api-reference.md)
- [Deployment](./docs/deployment.md)
- [Troubleshooting](./docs/troubleshooting.md)

## Supabase Setup

To configure your Supabase project for this application, follow these steps:

1. Create a Supabase Project:
   - Go to https://app.supabase.com/ and sign in.
   - Click "New project" and follow the prompts to create a new project.

2. Set up Database Tables:
   - In your Supabase dashboard, go to the "Table Editor" section.
   - Create a `user_roles` table with the following columns:
     - `user_id` (type: uuid, foreign key to auth.users)
     - `role_id` (type: integer)
   - Create a `roles` table with:
     - `id` (type: integer, primary key)
     - `name` (type: text, unique)
   - Insert default roles:
     ```sql
     INSERT INTO roles (id, name) VALUES (1, 'admin'), (2, 'paid_user'), (3, 'free_user');
     ```

3. Create the `get_user_role` Function:
   - Go to the "SQL Editor" in your Supabase dashboard.
   - Create a new query and paste the following SQL:
     ```sql
     CREATE OR REPLACE FUNCTION public.get_user_role(user_uuid UUID)
     RETURNS TEXT AS $$
     DECLARE
       user_role TEXT;
     BEGIN
       SELECT r.name INTO user_role
       FROM user_roles ur
       JOIN roles r ON ur.role_id = r.id
       WHERE ur.user_id = user_uuid
       LIMIT 1;
       
       RETURN COALESCE(user_role, 'free_user');
     END;
     $$ LANGUAGE plpgsql SECURITY DEFINER;
     ```

4. Set up Row Level Security (RLS):
   - For the `user_roles` table:
     ```sql
     ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

     CREATE POLICY "Users can view own role" ON public.user_roles
       FOR SELECT USING (auth.uid() = user_id);

     CREATE POLICY "Admins can manage roles" ON public.user_roles
       USING (EXISTS (
         SELECT 1 FROM public.user_roles ur
         JOIN public.roles r ON ur.role_id = r.id
         WHERE ur.user_id = auth.uid() AND r.name = 'admin'
       ));
     ```

5. Set up Authentication:
   - In the Supabase dashboard, go to "Authentication" > "Providers".
   - Enable the providers you want to use (e.g., Email, Google, GitHub).
   - Configure any additional settings for these providers.

6. Set up Email Templates:
   - In "Authentication" > "Email Templates", customize the email templates for sign-up, password reset, etc.

7. Configure your app's environment variables:
   - In your Supabase project settings, find your API URL and anon key.
   - Update your `.env.local` file with these values:
     ```
     NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
     ```

8. Generate TypeScript types:
   - Run `pnpm supabase:generate-types` to generate TypeScript types based on your Supabase schema.

After completing these steps, your Supabase backend should be properly configured to work with this application's authentication and role-based access control system.
