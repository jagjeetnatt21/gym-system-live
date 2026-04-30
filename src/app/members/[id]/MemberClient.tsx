'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '../../../lib/supabase';
import Link from 'next/link';

export default function MemberClient() {
  const { id } = useParams();
  const [member, setMember] = useState<any>(null);
  const [uploading, setUploading] = useState(false);

  const fetchMember = async () => {
    if (!id) return;
    const { data } = await supabase.from('members').select('*').eq('id', id).single();
    if (data) setMember(data);
  };

  const uploadAvatar = async (event: any) => {
    try {
      setUploading(true);
      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${id}-${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;
      let { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file);
      if (uploadError) throw uploadError;
      const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(filePath);
      await supabase.from('members').update({ avatar_url: publicUrl }).eq('id', id);
      fetchMember();
      alert("Photo Updated!");
    } catch (error: any) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => { fetchMember(); }, [id]);

  if (!member) return <div className="min-h-screen bg-[#0a192f] text-[#64ffda] p-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#0a192f] p-6 text-white font-sans">
      <div className="max-w-3xl mx-auto">
        <Link href="/members" className="text-[#64ffda] text-sm mb-8 block">← Back</Link>
        <div className="bg-[#112240] p-8 rounded-3xl border border-gray-800 shadow-2xl">
          <div className="flex flex-col items-center mb-10">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#64ffda] bg-[#1d2d50] flex items-center justify-center">
                {member.avatar_url ? (
                  <img src={member.avatar_url} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-4xl text-[#64ffda]">{member.full_name[0]}</span>
                )}
              </div>
              <label className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
                <span className="text-[10px] font-bold uppercase tracking-tighter">Change</span>
                <input type="file" className="hidden" onChange={uploadAvatar} disabled={uploading} />
              </label>
            </div>
            <h1 className="text-3xl font-bold mt-4 text-[#64ffda]">{member.full_name}</h1>
            <p className="text-gray-500 text-sm">Gym Member Since 2026</p>
          </div>
          <div className="grid grid-cols-2 gap-8 border-t border-gray-800 pt-8">
            <div>
              <p className="text-[10px] text-[#64ffda] uppercase font-bold mb-1">Phone</p>
              <p className="text-lg">{member.phone}</p>
            </div>
            <div>
              <p className="text-[10px] text-[#64ffda] uppercase font-bold mb-1">Plan Type</p>
              <p className="text-lg">{member.plan_name}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}