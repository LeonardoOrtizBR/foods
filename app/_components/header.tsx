import Image from "next/image";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";
import Link from "next/link";

const Header = () => {
    return (
        <div className="flex justify-between pt-6 px-5">
            <Link href='/'>
                <Image src="/logo.svg" alt="FSW food" height={30} width={100} />
            </Link>
            <Button size="icon" variant="outline" className="bg-transparent border-none">
                <MenuIcon />
            </Button>
        </div>
    );
}

export default Header;