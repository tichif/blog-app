import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    // Fetch all post
    try {
      const data = await prisma?.post.findMany({
        include: {
          user: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
      return res.status(200).json(data);
    } catch (error: any) {
      return res.status(500).json({ message: 'Server Error !!!' });
    }
  }
}
