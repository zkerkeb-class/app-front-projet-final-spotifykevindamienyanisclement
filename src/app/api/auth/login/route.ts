import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

interface LoginResponse {
  token: string;
  message: string;
}

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      }
    );

    const data = (await response.json()) as LoginResponse;
    const username = email.split('@')[0];
    const cookiesStore = await cookies();

    if (data.token) {
      cookiesStore.set('token', data.token, {
        httpOnly: false, // Disabled to give access to the cookie from the client side
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
      });

      cookiesStore.set('username', username, {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
      });

      return NextResponse.json({
        success: true,
        message: 'Login success',
        token: data.token,
      });
    }

    return NextResponse.json({
      success: false,
      message: data.message || 'Authentication failed',
      token: '',
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error instanceof Error ? error.message : 'Server error',
    });
  }
}
