import { FC } from 'react';
import Button from '@/components/ui/Button';


interface pageProps {}

const Page: FC<pageProps> = ({}) => {
  return (
    <>
      <Button size={'lg'} variant={'default'}>
        Perform MongoDB Operation
      </Button>
    </>
  );
};

export default Page;

