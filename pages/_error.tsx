import { useRouter } from 'next/router';
import React, { JSX, useEffect } from 'react';

export default function RouteNotFound(): JSX.Element {
  const router = useRouter();

  useEffect(() => {
    router.push('/');
  }, [router]);

  return <div />;
}
