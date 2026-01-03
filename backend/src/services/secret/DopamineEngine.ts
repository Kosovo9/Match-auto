export class DopamineEngine {
    private static WEIGHTS = {
        RECENCY: 0.4,
        URGENCY_SCARCITY: 0.3, // "Sólo queda 1", "5 personas viendo esto"
        PERSONALIZATION: 0.2,
        SOCIAL_PROOF: 0.1
    };

    static async getDopamineFeed(userId: string, context: any) {
        // Lógica 20x: Generación de feed adictivo tipo TikTok
        // Combina datos de comportamiento con "triggers" psicológicos

        const candidates = await this.getCandidateListings();

        const scoredFeed = candidates.map(item => {
            const score =
                (item.isNew ? 1 : 0.5) * this.WEIGHTS.RECENCY +
                (item.viewersCount > 10 ? 1 : 0.2) * this.WEIGHTS.URGENCY_SCARCITY +
                (item.matchScore * this.WEIGHTS.PERSONALIZATION);

            return {
                ...item,
                finalScore: score,
                dopamineTriggers: this.generateTriggers(item)
            };
        }).sort((a, b) => b.finalScore - a.finalScore);

        return scoredFeed.slice(0, 20);
    }

    private static async getCandidateListings() {
        // Placeholder - En producción extraería de D1/Vector DB
        return Array.from({ length: 50 }).map((_, i) => ({
            id: `listing_${i}`,
            title: `Super Mach ${i}`,
            price: 15000 + i * 100,
            isNew: Math.random() > 0.5,
            viewersCount: Math.floor(Math.random() * 50),
            matchScore: Math.random(),
            images: ['https://cdn.match-auto.com/car.jpg']
        }));
    }

    private static generateTriggers(item: any) {
        const triggers = [];
        if (item.viewersCount > 20) triggers.push('📈 ALTA DEMANDA');
        if (item.isNew) triggers.push('✨ RECIÉN LLEGADO');
        if (item.matchScore > 0.8) triggers.push('🎯 MATCH PARA TI');
        return triggers;
    }
}
