import Image from "next/image";
import Link from "next/link";
import { SearchInput } from "./search-input";

export const Navbar = () => {
  return (
    <nav className="grid h-full w-full grid-cols-[1fr_auto_1fr] items-center gap-4">
      <Link href="/" className="flex items-center gap-2 justify-self-start">
        <Image src="/logo.svg" alt="Logo" width={36} height={36} />
        <h3 className="text-lg font-semibold">Dossier</h3>
      </Link>

      <div className="w-full max-w-180 justify-self-center">
        <SearchInput />
      </div>

      <div className="justify-self-end" />
    </nav>
  )
}