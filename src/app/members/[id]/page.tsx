import MemberClient from './MemberClient';

// These lines make the build happy
export const dynamic = 'force-static';
export async function generateStaticParams() {
  return [];
}

export default function Page() {
  return <MemberClient />;
}