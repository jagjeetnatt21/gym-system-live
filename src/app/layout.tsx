// @ts-ignore
import './globals.css'; // This connects your Navy & Gold colors!
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gym Management System',
  description: 'Professional Dashboard for Gym Owners',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* antialiased makes the fonts look smoother and more premium */}
      <body className="antialiased bg-[#0a192f]">
        {children}
      </body>
    </html>
  );
}