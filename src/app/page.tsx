'use client'
import { FC } from 'react';
import Button from '@/components/ui/Button';
import dbConnect from '../../lib/dbConnect';
import { NextRequest } from 'next/server';


/* interface pageProps {}

const Page: FC<pageProps> = ({}) => {
  return (
    <>
      <Button size={'lg'} variant={'default'}>
        Perform MongoDB Operation
      </Button>
    </>
  );
};

export default Page; */

export default async function Home(request: NextRequest) {
  await dbConnect()

  

}
