import { Suspense } from 'react';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { RealTimeGlobalMetrics } from '@/components/admiral/GlobalMetrics';
import { QuantumAdEngine } from '@/components/admiral/QuantumEngine';
import { CrossBorderROI } from '@/components/admiral/CrossBorderROI';
import { PredictiveAnalytics } from '@/components/admiral/PredictiveAnalytics';
import { AdCampaignLauncher } from '@/components/admiral/CampaignLauncher';
import { CompetitiveHeatmap } from '@/components/admiral/CompetitiveHeatmap';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

export const metadata = {
    title: 'Admiral Control Center | Match-Auto Advertising',
    description: 'Manage global Match-Ads campaigns with real-time AI analytics.',
};

export default async function AdmiralDashboard() {
    const user = await currentUser();

    if (!user) {
        redirect('/sign-in');
    }

    return (
        <div className="min-h-screen bg-[#020617] text-white selection:bg-cyan-500/30">
            {/* HEADER NASA-GRADE */}
            <div className="sticky top-0 z-50 backdrop-blur-2xl bg-[#020617]/80 border-b border-cyan-500/20">
                <div className="max-w-[1600px] mx-auto px-6 py-4">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center space-x-4">
                            <div className="h-10 w-10 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-xl shadow-[0_0_20px_rgba(34,211,238,0.4)] animate-pulse"></div>
                            <div>
                                <h1 className="text-2xl font-black tracking-tighter italic">ADMIRAL CONTROL CENTER</h1>
                                <p className="text-xs text-cyan-400/70 font-mono tracking-widest uppercase">Global Ad Command • Phase: Alpha-1</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-6">
                            <div className="text-right hidden sm:block">
                                <div className="text-[10px] text-gray-500 font-mono uppercase">Campaign Velocity</div>
                                <div className="text-xl font-black text-green-400 glow-text">1.4M RPM</div>
                            </div>
                            <button className="px-8 py-3 bg-white text-black rounded-xl font-black italic hover:bg-cyan-400 transition-all hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                                LAUNCH GLOBAL BLITZ
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* MAIN DASHBOARD GRID - 7 COLUMN MACRO LAYOUT */}
            <div className="max-w-[1600px] mx-auto px-6 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">

                    {/* COLUMN 1-2: REAL-TIME GLOBAL METRICS & PREDICTIVE AI */}
                    <div className="lg:col-span-2 space-y-6">
                        <Suspense fallback={<LoadingSpinner />}>
                            <RealTimeGlobalMetrics />
                        </Suspense>
                        <PredictiveAnalytics />
                    </div>

                    {/* COLUMN 3-5: QUANTUM AD ENGINE (The Heart) */}
                    <div className="lg:col-span-3 space-y-6">
                        <QuantumAdEngine />
                        <div className="glass-panel p-6 rounded-3xl relative overflow-hidden h-[300px]">
                            <div className="absolute inset-x-0 h-[1px] bg-cyan-500/50 animate-scan" />
                            <h3 className="text-lg font-bold mb-4 italic tracking-widest text-cyan-400">NEURAL AD FEED</h3>
                            {/* Dashboard Placeholder for Feed */}
                            <div className="space-y-3 opacity-50">
                                <div className="h-12 bg-white/5 rounded-xl animate-pulse" />
                                <div className="h-12 bg-white/5 rounded-xl animate-pulse" />
                                <div className="h-12 bg-white/5 rounded-xl animate-pulse" />
                            </div>
                        </div>
                    </div>

                    {/* COLUMN 6-7: CAMPAIGN LAUNCHER & ROI OPTIMIZER */}
                    <div className="lg:col-span-2 space-y-6">
                        <AdCampaignLauncher />
                        <CrossBorderROI />
                        <CompetitiveHeatmap />
                    </div>
                </div>
            </div>

            {/* Decorative scanning line for the whole page */}
            <div className="fixed bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-20" />
        </div>
    );
}
