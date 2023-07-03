import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import PageContainer from '@/components/pagecontainer';

export default function Pantry() {
  const router = useRouter();
  const { action, id } = router.query;
  const isIDInt = typeof id === 'string' && /^\d+$/.test(id);
  const isDuplicateMode = action === 'add';
  const isEditMode = action === 'edit';

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    if (!isIDInt || !(isDuplicateMode || isEditMode)) {
      router.push('/recipes');
    }
  }, [isIDInt, isDuplicateMode, isEditMode, router]);

  return <PageContainer />;
}
