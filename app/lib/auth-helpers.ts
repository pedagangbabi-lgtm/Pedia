// app/lib/auth-helpers.ts
'use server';

import { auth } from '@/app/lib/auth';  // Import dari auth.ts Anda

export async function getCurrentUser() {
  const session = await auth();
  return session?.user || null;
}

export async function getUserRole(): Promise<'admin' | 'staff'> {
  const session = await auth();
  return (session?.user?.role as 'admin' | 'staff') || 'staff';
}

export async function isAdmin(): Promise<boolean> {
  const role = await getUserRole();
  return role === 'admin';
}

export async function canEditTransaction(): Promise<boolean> {
  return await isAdmin();
}

export async function canDeleteTransaction(): Promise<boolean> {
  return await isAdmin();
}