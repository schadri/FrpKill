'use server';

import { createAdminClient } from '@/utils/supabase/admin';

export type UserData = {
  id: string;
  email: string;
  fullName: string;
  chimeraUser: string;
  chimeraPassword: string;
  avatarUrl: string;
  createdAt: string;
  lastSignIn: string;
};

export async function getAllUsers(): Promise<UserData[]> {
  try {
    const supabaseAdmin = createAdminClient();
    
    // Fetch users (this returns a maximum of 50 users by default per page, 
    // but for larger lists you would need pagination. Let's start with a decent limit)
    const { data: { users }, error } = await supabaseAdmin.auth.admin.listUsers({
      page: 1,
      perPage: 1000
    });

    if (error) {
      console.error('Error fetching users:', error);
      throw new Error('Failed to fetch users');
    }

    return users.map((user) => ({
      id: user.id,
      email: user.email || '',
      fullName: user.user_metadata?.full_name || 'Desconocido',
      chimeraUser: user.user_metadata?.chimera_user || '',
      chimeraPassword: user.user_metadata?.chimera_password || '',
      avatarUrl: user.user_metadata?.avatar_url || user.user_metadata?.picture || '',
      createdAt: user.created_at,
      lastSignIn: user.last_sign_in_at || ''
    }));

  } catch (error) {
    console.error('Admin Server Action Error:', error);
    return [];
  }
}
