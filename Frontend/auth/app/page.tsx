import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Link href='/register'>Register</Link>
      <Link href='/login'>Login</Link>
    </div>
  );
}
