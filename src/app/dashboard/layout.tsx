// import type { Metadata } from "next";
import '../globals.css';

export default function Layout ( { children }: { children: React.ReactNode; } )
{
    return (
        <div>
            {/* ...your layout... */ }
            { children }
        </div>
    );
}