import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ChevronRight, Zap } from 'lucide-react';
import placeholderImages from '@/lib/placeholder-images.json';

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link href={href} className="text-sm font-semibold text-foreground/80 hover:text-foreground transition-colors">
    {children}
  </Link>
);

const Logo = () => (
    <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="hsl(var(--primary-foreground))" strokeWidth="2" strokeLinejoin="round"/>
                <path d="M2 7L12 12L22 7" stroke="hsl(var(--primary-foreground))" strokeWidth="2" strokeLinejoin="round"/>
                <path d="M12 12V22" stroke="hsl(var(--primary-foreground))" strokeWidth="2" strokeLinejoin="round"/>
            </svg>
        </div>
        <span className="font-bold text-xl">XORA</span>
    </div>
)


export default function Home() {
  const heroImageData = placeholderImages.placeholderImages.find(img => img.id === 'xora-hero');

  return (
    <div className="flex flex-col min-h-screen">
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 border-b border-white/10">
            <div className="flex items-center gap-10">
              <Logo />
              <nav className="hidden md:flex items-center gap-6">
                <NavLink href="#">FEATURES</NavLink>
                <NavLink href="#">PRICING</NavLink>
                <NavLink href="#">FAQ</NavLink>
              </nav>
            </div>
            <Button asChild variant="ghost" className="hidden md:flex">
              <Link href="#">DOWNLOAD</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 pt-16">
        <div className="relative w-full max-w-5xl mx-auto">
           {heroImageData && (
            <div className="absolute -bottom-48 right-0 w-[600px] h-[400px] opacity-40 md:opacity-70">
              <Image
                src={heroImageData.imageUrl}
                alt={heroImageData.description}
                fill
                className="object-contain"
                data-ai-hint={heroImageData.imageHint}
                priority
              />
            </div>
           )}

          <div className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left max-w-lg">
            <span className="font-semibold text-primary mb-2 text-sm tracking-widest">TUTOR AI</span>
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4">
              Amazingly Simple
            </h1>
            <p className="text-lg md:text-xl text-foreground/60 max-w-md mb-8">
              We designed XORA AI to be an easy to use, quick to learn and surprisingly powerful.
            </p>
            <Button size="lg" className="group bg-primary/90 hover:bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300 transform hover:-translate-y-1">
              <Zap className="mr-2 h-5 w-5 transform group-hover:rotate-12 transition-transform" />
              TRY IT NOW
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </main>

      <footer className="z-10 text-center text-muted-foreground text-sm py-4">
        <p>Built with love for the future of learning.</p>
      </footer>
    </div>
  );
}
