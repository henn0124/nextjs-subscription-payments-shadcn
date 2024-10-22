'use server';

import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { getURL } from '@/utils/helpers';
import { redirect } from 'next/navigation';

// Helper function to validate email format
function isValidEmail(email: string) {
  var regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return regex.test(email);
}

// Helper function to redirect to a specific path
export async function redirectToPath(path: string) {
  return redirect(path);
}

// Function to sign out the user
export async function SignOut() {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();
  return error;
}

// Function to sign in with email (magic link)
export async function signInWithEmail(formData: FormData) {
  const supabase = createClient();
  const callbackURL = getURL('/auth/callback');

  const email = String(formData.get('email')).trim();

  // Validate email format
  if (!isValidEmail(email)) {
    return redirect('/signin/email_signin?error=Invalid email address. Please try again.');
  }

  // Set up options for OTP sign-in
  let options = {
    emailRedirectTo: callbackURL,
    shouldCreateUser: true
  };

  // Attempt to sign in with OTP (magic link)
  const { data, error } = await supabase.auth.signInWithOtp({
    email,
    options: options
  });

  // Handle the result of the sign-in attempt
  if (error) {
    return redirect(`/signin/email_signin?error=${encodeURIComponent(error.message)}`);
  } else if (data) {
    // Instead of using cookieStore, we'll use the cookies() function
    cookies().set('preferredSignInView', 'email_signin', { path: '/' });
    return redirect('/signin/email_signin?message=Success! Please check your email for a magic link.');
  } else {
    return redirect('/signin/email_signin?error=Something went wrong. You could not be signed in.');
  }
}

// Function to request a password reset
export async function requestPasswordUpdate(formData: FormData) {
  const supabase = createClient();
  const email = String(formData.get('email')).trim();
  const callbackURL = getURL('/auth/callback');

  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: callbackURL
  });

  if (error) {
    return { error: error.message };
  }

  return { success: true, data };
}

// Function to sign in with email and password
export async function signInWithPassword(formData: FormData) {
  const supabase = createClient();
  const email = String(formData.get('email')).trim();
  const password = String(formData.get('password')).trim();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    return { error: error.message };
  }

  return { success: true, data };
}

// Function to sign up a new user
export async function signUp(formData: FormData) {
  const supabase = createClient();
  const email = String(formData.get('email')).trim();
  const password = String(formData.get('password')).trim();
  const callbackURL = getURL('/auth/callback');

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: callbackURL
    }
  });

  if (error) {
    return { error: error.message };
  }

  return { success: true, data };
}

// Function to update user's password
export async function updatePassword(formData: FormData) {
  const supabase = createClient();
  const password = String(formData.get('password')).trim();

  const { data, error } = await supabase.auth.updateUser({
    password
  });

  if (error) {
    return { error: error.message };
  }

  return { success: true, data };
}

// Function to update user's email
export async function updateEmail(formData: FormData) {
  const supabase = createClient();
  const email = String(formData.get('email')).trim();

  const callbackUrl = getURL('/account');

  const { data, error } = await supabase.auth.updateUser(
    { email: email },
    { emailRedirectTo: callbackUrl }
  );

  if (error) {
    return { error: error.message };
  }

  return { success: true, data };
}

// Function to update user's name
export async function updateName(formData: FormData) {
  const supabase = createClient();
  const fullName = String(formData.get('fullName')).trim();

  const { data, error } = await supabase.auth.updateUser({
    data: { full_name: fullName }
  });

  if (error) {
    return { error: error.message };
  }

  return { success: true, data };
}
