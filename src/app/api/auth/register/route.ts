import { NextResponse } from 'next/server';

interface RegisterResponse {
  message: string;
  token: string;
}

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    const name = email.split('@')[0];

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      }
    );

    const data = (await response.json()) as RegisterResponse;

    if (data && data.token) {
      return NextResponse.json({
        success: true,
        message: 'Registration successful',
        token: data.token,
      });
    }

    return NextResponse.json({
      success: false,
      message: data.message || 'Registration failed',
      token: '',
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error instanceof Error ? error.message : 'Server error',
      token: '',
    });
  }
}
