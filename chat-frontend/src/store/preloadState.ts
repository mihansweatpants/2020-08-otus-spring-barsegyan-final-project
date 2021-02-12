import { DeepPartial } from '@reduxjs/toolkit';

import { UsersApi } from 'api';
import { UserDto } from 'api/types/users';
import { StoreState } from 'store';

export async function preloadState(): Promise<DeepPartial<StoreState>> {
  let currentUser: UserDto | null = null;

  try {
    currentUser = await UsersApi.getCurrentUser();
  }
  catch {}

  return {
    auth: { user: currentUser }
  };
}