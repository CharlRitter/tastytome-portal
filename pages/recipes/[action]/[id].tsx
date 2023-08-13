import React, { ReactElement, useEffect } from 'react';
import { useRouter } from 'next/router';
import PageContainer from '@/components/page-container';

export default function RecipeAction() : ReactElement {
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
