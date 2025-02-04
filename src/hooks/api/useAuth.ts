import { cookies } from 'next/headers';
import { jwtDecode } from 'jwt-decode';

export const getCookieToken = async () => {
  const cookieStore = await cookies();
  return cookieStore.get('token');
};

export const setCookieToken = async (token: string) => {
  const cookieStore = await cookies();
  cookieStore.set('token', token);
};

export const deleteCookieToken = async () => {
  const cookieStore = await cookies();
  cookieStore.delete('token');
};

export const getToken = async () => {
  const cookieStore = await cookies();
  return cookieStore.get('token')?.value;
};

export const getUserId = async (token: string) => {
  if (!token) {
    throw new Error('No token found');
  }
  const decodedToken = jwtDecode<{ userId: string }>(token);
  const { userId } = decodedToken;
  return userId;
};
