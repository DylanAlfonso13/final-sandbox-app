import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const { name, email, note } = await request.json();

  if (!name || !email) {
    return NextResponse.json(
      { error: 'Name and email are required.' },
      { status: 400 }
    );
  }

  try {
    const newRSVP = await prisma.rSVP.create({
      data: { name, email, note },
    });

    return NextResponse.json(newRSVP, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to save RSVP.' },
      { status: 500 }
    );
  }
}
