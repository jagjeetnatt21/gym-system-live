'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import Link from 'next/link';

export default function MemberList() {
  const [members, setMembers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchMembers = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('members').select('*').order('id', { ascending: false });
    if (!error) setMembers(data || []);
    setLoading(false);
  };

  const exportToCSV = () => {
    if (members.length === 0) return alert("No data to export!");
    const headers = ["Name", "Phone", "Plan", "Payment"];
    const rows = members.map(m => [m.full_name, m.phone, m.plan_name, m.payment_status || 'Unpaid']);
    let csvContent = "data:text/csv;charset=utf-8," + headers.join(",") + "\n" + rows.map(e => e.join(",")).join("\n");
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", "gym_report.csv");
    link.click();
  };

  const togglePayment = async (id: number, currentStatus: string) => {
    const newStatus = currentStatus === 'Paid' ? 'Unpaid' : 'Paid';
    const { error } = await supabase.from('members').update({ payment_status: newStatus }).eq('id', id);
    if (!error) setMembers(members.map(m => m.id === id ? { ...m, payment_status: newStatus } : m));
  };

  const deleteMember = async (id: number) => {
    if (confirm("Delete member?")) {
      await supabase.from('members').delete().eq('id', id);
      setMembers(members.filter(m => m.id !== id));
    }
  };

  useEffect(() => { fetchMembers(); }, []);

  const filteredMembers = members.filter(m => m.full_name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="min-h-screen bg-[#0a192f] p-4 md:p-8 text-white">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER: Adjusted for Mobile */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-[#64ffda]">Gym Admin</h1>
          <div className="flex gap-2 w-full md:w-auto">
            <button onClick={exportToCSV} className="flex-1 md:flex-none border border-[#64ffda] text-[#64ffda] px-4 py-2 rounded-lg text-sm font-bold hover:bg-[#64ffda]/10">
              Download CSV
            </button>
            <Link href="/add-member" className="flex-1 md:flex-none bg-[#64ffda] text-[#0a192f] px-4 py-2 rounded-lg text-sm font-bold text-center hover:bg-[#52d1b2]">
              + Add Member
            </Link>
          </div>
        </div>

        <input 
          type="text" 
          placeholder="Search members..." 
          className="w-full p-3 mb-6 bg-[#112240] border border-gray-700 rounded-xl text-white outline-none focus:border-[#64ffda]"
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="bg-[#112240] rounded-2xl overflow-hidden border border-gray-800 shadow-2xl">
          <table className="w-full text-left">
            <thead className="bg-[#1d2d50] text-[#64ffda] uppercase text-[10px] md:text-xs tracking-wider">
              <tr>
                <th className="p-4 md:p-5">Name</th>
                <th className="p-4 md:p-5 hidden sm:table-cell">Plan</th>
                <th className="p-4 md:p-5 text-center">Payment</th>
                <th className="p-4 md:p-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {filteredMembers.map((member) => (
                <tr key={member.id} className="hover:bg-[#1d2d50] transition-colors">
                  <td className="p-4 md:p-5">
  <Link href={`/members/${member.id}`} className="hover:text-[#64ffda] transition-colors cursor-pointer">
    <div className="font-medium text-sm md:text-base">{member.full_name}</div>
  </Link>
  <div className="text-[10px] text-gray-500 sm:hidden">{member.plan_name}</div>
</td>
                  <td className="p-4 md:p-5 hidden sm:table-cell text-gray-400 text-sm">{member.plan_name}</td>
                  <td className="p-4 md:p-5 text-center">
                    <button 
                      onClick={() => togglePayment(member.id, member.payment_status)}
                      className={`px-3 py-1 rounded-full text-[10px] md:text-xs font-bold border ${
                        member.payment_status === 'Paid' ? 'bg-green-500/10 text-green-400 border-green-500' : 'bg-red-500/10 text-red-400 border-red-500'
                      }`}
                    >
                      {member.payment_status || 'Unpaid'}
                    </button>
                  </td>
                  <td className="p-4 md:p-5 text-right">
                    <button onClick={() => deleteMember(member.id)} className="text-gray-500 hover:text-red-400 text-xs md:text-sm">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}