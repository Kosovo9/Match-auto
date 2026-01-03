import { ViralDashboard } from '@/components/features/admin/ViralDashboard';
import { SecurityPanel } from '@/components/features/admin/SecurityPanel';

export default function HomePage() {
    return (
        <main className="flex min-h-screen flex-col items-center p-8 lg:p-24 space-y-12 bg-black">
            <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex border-b border-white/10 pb-8">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl text-nasa-blue bg-gradient-to-r from-nasa-blue to-nasa-red bg-clip-text text-transparent">
                    MATCH-AUTO v1.0
                </h1>
                <div className="mt-4 lg:mt-0 flex items-center gap-4">
                    <div className="flex items-center gap-2 px-3 py-1 bg-nasa-blue/10 rounded-full border border-nasa-blue/20">
                        <div className="w-2 h-2 bg-nasa-blue rounded-full animate-pulse" />
                        <span className="text-xs text-nasa-blue font-bold uppercase tracking-widest">Orbit Active</span>
                    </div>
                    <p className="text-xl text-neutral-400 font-light">
                        Operación 1000x
                    </p>
                </div>
            </div>

            <div className="w-full max-w-7xl grid grid-cols-1 gap-12">
                <ViralDashboard />
                <SecurityPanel />
            </div>

            <footer className="w-full max-w-5xl border-t border-white/10 pt-8 mt-12 text-center text-neutral-500 text-sm">
                <p>© 2026 Match-Auto Global Platforms. Nivel NASA 1000x Operacional.</p>
            </footer>
        </main>
    );
}
