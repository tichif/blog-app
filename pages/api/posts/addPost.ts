import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';

import { authOptions } from '../auth/[...nextauth]';
import prisma from '../../../prisma/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ message: 'Please sign in to make a post' });
    }

    const title = req.body.title as string;

    if (title.length < 0) {
      return res.status(403).json({ message: 'Please add text' });
    }

    if (title.length > 300) {
      return res.status(403).json({ message: 'Please write a shorter post' });
    }

    // get user
    const user = await prisma.user.findUnique({
      where: { email: session?.user?.email || '' },
    });

    if (!user) {
      return res.status(401).json({ message: 'Please sign in to make a post' });
    }

    // create post
    try {
      const result = await prisma.post.create({
        data: {
          title,
          userId: user.id,
        },
      });
      return res.status(201).json(result);
    } catch (error: any) {
      console.log(error);
      return res.status(500).json({ message: 'Server Error' });
    }
  }
}
