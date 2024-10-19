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
- [Vercel](https://vercel.com/) – Easily preview & deploy changes with git

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
