import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';

import { authOptions } from '../../auth/[...nextauth]';
import prisma from '../../../../prisma/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'DELETE') {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ message: 'Please sign in to make a post' });
    }

    const id = req.query.id as string;

    // delete post
    try {
      const result = await prisma.post.delete({
        where: {
          id,
        },
      });
      return res.status(201).json(result);
    } catch (error: any) {
      console.log(error);
      return res.status(500).json({ message: 'Server Error' });
    }
  }
}
