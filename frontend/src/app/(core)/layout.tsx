'use client';

import AuthProtector from '@/config/protectors/AuthProtector';

function AppLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export default AuthProtector(AppLayout);
