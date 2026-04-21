export const dynamic = 'force-dynamic';
'use client';
import { useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function AddMember() {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [plan, setPlan] = useState('Monthly');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase
      .from('members')
      .insert([{ 
        full_name: fullName, 
        phone: phone, 
        plan_name: plan, 
        status: 'Active' 
      }]);

    setLoading(false);

    if (error) {
      alert("Error: " + error.message);
    } else {
      alert("✅ Success! Member added to Database.");
      setFullName('');
      setPhone('');
    }
  };

  return (
    <div className="min-h-screen bg-[#0a192f] flex items-center justify-center p-6">
      <div className="bg-[#112240] p-8 rounded-xl border border-[#64ffda] w-full max-w-md shadow-2xl">
        <h2 className="text-[#64ffda] text-2xl font-bold mb-6 text-center">GYM REGISTRATION</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            className="w-full p-3 bg-[#0a192f] border border-gray-700 rounded text-white outline-none focus:border-[#64ffda]"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          <input 
            className="w-full p-3 bg-[#0a192f] border border-gray-700 rounded text-white outline-none focus:border-[#64ffda]"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <select 
            className="w-full p-3 bg-[#0a192f] border border-gray-700 rounded text-white outline-none"
            value={plan}
            onChange={(e) => setPlan(e.target.value)}
          >
            <option>Monthly</option>
            <option>Quarterly</option>
            <option>Yearly</option>
          </select>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[#64ffda] text-[#0a192f] font-bold py-3 rounded hover:bg-[#52d1b2] transition-all disabled:opacity-50"
          >
            {loading ? "Registering..." : "CONFIRM MEMBER"}
          </button>
        </form>
      </div>
    </div>
  );
}