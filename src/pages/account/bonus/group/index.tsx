import { useRouter } from 'next/router';
import React from 'react';

const Index = () => {
  const router = useRouter();

  const { id } = router.query;

  return <>my group{id}</>;
};

export default Index;
