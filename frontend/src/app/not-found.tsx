import { AlertTriangleIcon } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-gray-100 px-4 dark:bg-gray-900">
      <div className="max-w-md space-y-4 text-center">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900">
          <AlertTriangleIcon className="text-red-500" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
          Oops... The page you&apos;re looking for does not exist!
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Maybe you were looking for something else?
        </p>
      </div>
    </div>
  );
}
