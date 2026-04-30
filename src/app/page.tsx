'use client';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a192f] flex flex-col items-center justify-center p-6 text-white">
      <h1 className="text-4xl font-bold text-[#64ffda] mb-4">Gym Management System</h1>
      <p className="text-gray-400 mb-8 text-lg">Manage your members and payments with ease.</p>
      
      <div className="flex gap-4">
        {/* Button 1: Goes to Registration Form */}
        <Link href="/add-member" className="bg-[#64ffda] text-[#0a192f] px-8 py-3 rounded-lg font-bold hover:bg-[#52d1b2] transition-all">
          + Add New Member
        </Link>

        {/* Button 2: Now goes to your Member Directory */}
        <Link href="/members" className="border border-[#64ffda] text-[#64ffda] px-8 py-3 rounded-lg font-bold hover:bg-[#64ffda]/10 transition-all">
          View Member List
        </Link>
      </div>
    </div>
  );
}