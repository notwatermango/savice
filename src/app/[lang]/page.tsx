import Link from "next/link";
import { Button } from "~/components/ui/button";
import Image from "next/image";

export default function HomePage({
  params: { lang },
}: {
  params: { lang: string };
}) {
  return (
    <main className="p-6">
      <h1 className="bg-gradient !bg-cover !bg-clip-text !bg-center text-4xl font-black uppercase leading-none tracking-tighter text-transparent transition-all">
        Marioooooooooooooooooooooooooooooooooooooooooooooooooo
      </h1>
      <p>Welcome to the home page</p>
      <Image src="https://i.ibb.co.com/4N8rDrk/sent1.png" alt="logo" width={24} height={24}/>
      <Link href={`/${lang}/tools`}>
        <Button>Go to the tools page</Button>
      </Link>
    </main>
  );
}
