import Link from "next/link";
import { Button } from "~/components/ui/button";

export default function HomePage() {
  return (
    <main className="p-6">
      <h1 className="bg-gradient !bg-cover !bg-clip-text !bg-center text-4xl font-black uppercase leading-none tracking-tighter text-transparent transition-all">
        Marioooooooooooooooooooooooooooooooooooooooooooooooooo
      </h1>
      <p>Welcome to the home page</p>
      <Link href="/tools">
        <Button>Go to the tools page</Button>
      </Link>
    </main>
  );
}
