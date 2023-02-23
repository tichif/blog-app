import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

import { authOptions } from '@/pages/api/auth/[...nextauth]';
import MyPosts from './MyPosts';

const Dashboard = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect('/api/auth/signin');
  }

  return (
    <main>
      <h1 className='text-exl font-bold'>Welcome Back {session?.user?.name}</h1>
      <MyPosts />
    </main>
  );
};

export default Dashboard;
