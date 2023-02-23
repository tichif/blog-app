'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface Props {
  avatar: string;
  name: string;
  postTitle: string;
  id: string;
  comments?: {
    createdAt: string;
    id: string;
    postId: string;
    userId: string;
  }[];
}

const Posts = ({ avatar, name, postTitle, id, comments }: Props) => {
  return (
    <motion.div
      animate={{ opacity: 1, scale: 1 }}
      initial={{ opacity: 0, scale: 0.8 }}
      transition={{ ease: 'easeOut' }}
      className='bg-white my-8 p-8 rounded-lg '
    >
      <div className='bg-white my-8 p-8 rounded-lg'>
        <div className='flex items-center gap-2'>
          <Image
            className='rounded-full'
            width={32}
            height={32}
            alt='avatar'
            src={avatar}
          />
          <h3 className='font-bold text-gray-700'>{name}</h3>
        </div>
        <div className='my-8'>
          <p className='break-all'>{postTitle}</p>
        </div>
        <div className='flex items-center gap-4 cursor-pointer'>
          <Link href={`/post/${id}`}>
            <p className='text-sm font-bold text-gray-700'>
              {comments?.length} Comments
            </p>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default Posts;
