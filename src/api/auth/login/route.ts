import { NextResponse } from 'next/server';

interface LoginResponse {
  auth?: boolean;
  token?: string;
  success?: boolean;
  message: string;
}

export default async function handler(request: Request) {
  try {
    const { email, password } = await request.json();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}`, // TODO: change to the correct url
      {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );
    const data = (await response.json()) as LoginResponse;

    if (data && data.auth && data.token) {
      // cookies().set("token", data.token);
      return NextResponse.json({
        success: true,
        message: 'Login success',
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
