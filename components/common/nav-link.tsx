'use client'
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({
    href,
    className,
    children
}: {
        href: string;
        children: React.ReactNode;
        className?: string;
    }) {
    const pathname = usePathname();
    const isActive = pathname === href || (href !== '/' && pathname.startsWith(href));
    return (
        <Link href={href} className={cn(
            "transition-colors text-sm duration-200 text-gray-400 hover:text-purple-500/80",
            className,
            isActive && 'text-purple-500/80'
        )}>
            {children}
        </Link>
    )
}