import { NextResponse } from 'next/server';

interface RegisterResponse {
  success: boolean;
  message: string;
}

export default async function handler(request: Request) {
  try {
    const { email, password } = await request.json();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/register`, // TODO: change to the correct url
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );
    const data = (await response.json()) as RegisterResponse;

    if (data && data.success) {
      return NextResponse.json({
        success: true,
        message: 'Registration successful',
      });
    }

    return NextResponse.json({
      success: false,
      message: data.message,
    });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({
      success: false,
      message: err.message,
    });
  }
}
