import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="w-full h-screen flex justify-center items-center gap-5">
      <Button>
        <Link href={"/connexion"}>
          Se connecter
        </Link>
      </Button>
      <Button>
        <Link href={"/inscription"}>
          S'inscrire
        </Link>
      </Button>
    </main>
  );
}
