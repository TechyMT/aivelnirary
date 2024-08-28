import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full py-4 px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-500 bg-white z-50">
      © {new Date().getFullYear()}{' '}
      <span>
        <Link
          href={'/humans.txt'}
          target="_self"
          className="underline underline-offset-4 decoration-gray-500"
        >
          Mustafa Trunkwala{' '}
        </Link>
      </span>
      All rights reserved.
    </footer>
  );
}
