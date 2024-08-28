'use client';

import { Dock, DockIcon } from '@/components/magicui/dock';
import { buttonVariants } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Home, LogOut, Pencil, User } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function BottomDock() {
  const { data: session, status } = useSession();

  const DATA = {
    navbar: [
      { href: '/', icon: Home, label: 'Home' },
      ...(status === 'authenticated'
        ? [
            { href: '/profile', icon: User, label: 'Profile' },
            {
              href: '/create-itinerary',
              icon: Pencil,
              label: 'Create Itinerary',
            },
            {
              href: '',
              icon: LogOut,
              label: 'Logout',
              onclick: () => signOut(),
            },
          ]
        : []),
    ],
  };

  const pathName = usePathname();

  if (!session) return null;

  return (
    <div
      className={`pointer-events-none fixed inset-x-0 bottom-20 z-30 mx-auto mb-4 flex origin-bottom h-full max-h-14 ${
        pathName === '/onboarding' && 'hidden'
      }`}
    >
      <div className="fixed bottom-0 inset-x-0 h-16 w-full bg-background to-transparent backdrop-blur-lg [-webkit-mask-image:linear-gradient(to_top,black,transparent)] dark:bg-background"></div>
      <Dock className="z-50 pointer-events-auto relative mx-auto flex min-h-full h-full items-center px-1 bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] ">
        {DATA.navbar.map((item) => (
          <DockIcon key={item.href}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={item.href}
                  className={cn(
                    buttonVariants({
                      variant: 'ghost',
                      size: 'icon',
                    }),
                    'size-10'
                  )}
                  onClick={item.onclick}
                >
                  <item.icon className="size-4" />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>{item.label}</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>
        ))}
      </Dock>
    </div>
  );
}
