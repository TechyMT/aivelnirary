'use client';
import Globe from '@/components/magicui/globe';

export default function GlobeAnimation() {
  return (
    <section className="flex items-center justify-center">
      <div className="relative flex h-full w-full max-w-[32rem] items-center justify-center overflow-hidden rounded-lg  px-40 pb-40 md:pb-60">
        <Globe className="bottom-28" />
      </div>
    </section>
  );
}
