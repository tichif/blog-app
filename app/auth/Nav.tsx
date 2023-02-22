import Link from 'next/link';
import { getServerSession } from 'next-auth/next';

import Login from './Login';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import Logged from './Logged';

const Nav = async () => {
  const session = await getServerSession(authOptions);

  return (
    <nav className='flex justify-between items-center py-8'>
      <Link href='/'>
        <h1 className='font-bold text-lg'>Send it.</h1>
      </Link>
      <ul className='flex items-center gap-6'>
        {!session?.user && <Login />}
        {session?.user && (
          <Logged
            image={session?.user?.image || ''}
            alt={session?.user?.name || ''}
          />
        )}
      </ul>
    </nav>
  );
};

export default Nav;
