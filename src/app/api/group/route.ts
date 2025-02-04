import { NextResponse } from 'next/server';
import { Group, GroupFull, GroupResponse } from '@/types/api/group';
import logger from '@/utils/logger';

async function getGroups(): Promise<Group[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/group`);
    return (await response.json()) as Group[];
  } catch (error) {
    logger.error('Error fetching groups:', error);
    return [];
  }
}

async function getGroupById(id: number): Promise<GroupFull> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/group/${id}`
    );
    return (await response.json()) as GroupFull;
  } catch (error) {
    logger.error('Error fetching group:', error);
    return {} as GroupFull;
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (id) {
    const group = await getGroupById(Number(id));
    return NextResponse.json(group);
  }

  const groups = await getGroups();
  return NextResponse.json(groups);
}
