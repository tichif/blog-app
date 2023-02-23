import type { NextApiRequest, NextApiResponse } from 'next';

import prisma from '../../../../prisma/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const id = req.query.id as string;

    // get post
    try {
      const result = await prisma.post.findUnique({
        where: {
          id,
        },
        include: {
          Comment: {
            orderBy: {
              createdAt: 'desc',
            },
            include: {
              user: true,
            },
          },
          user: true,
        },
      });
      return res.status(200).json(result);
    } catch (error: any) {
      console.log(error);
      return res.status(500).json({ message: 'Server Error' });
    }
  }
}
