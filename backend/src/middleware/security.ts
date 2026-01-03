import { Context, Next } from 'hono'
import CryptoJS from 'crypto-js'

export interface SecurityMetrics {
    threatsBlocked: number
    lastAttack: number
    botDetectionRate: number
}

class SentinelSecurity {
    private threatsBlocked = 0
    private knownBotPatterns = [
        /bot|spider|crawler|scraper/i,
        /curl|wget|python-requests/i,
        /HeadlessChrome|PhantomJS/i
    ]

    private suspiciousHeaders = [
        'x-scraper',
        'x-crawler',
        'x-bot-token'
    ]

    async analyzeRequest(c: Context): Promise<{
        isThreat: boolean
        threatLevel: 'low' | 'medium' | 'high'
        reason?: string
    }> {
        const request = c.req
        const userAgent = request.header('user-agent') || ''
        const ip = request.header('x-forwarded-for') || 'unknown'

        // Detección de bots conocidos
        const isKnownBot = this.knownBotPatterns.some(pattern => pattern.test(userAgent))
        if (isKnownBot) {
            return { isThreat: true, threatLevel: 'high', reason: 'Known bot pattern' }
        }

        // Verificación de headers sospechosos
        const hasSuspiciousHeaders = this.suspiciousHeaders.some(header =>
            request.header(header) !== undefined
        )
        if (hasSuspiciousHeaders) {
            return { isThreat: true, threatLevel: 'high', reason: 'Suspicious headers detected' }
        }

        // Análisis de frecuencia de solicitudes (simplificado)
        // const requestSignature = CryptoJS.SHA256(`${ip}:${userAgent}`).toString()
        // Aquí integraríamos con Redis para tracking en producción

        return { isThreat: false, threatLevel: 'low' }
    }

    getMetrics(): SecurityMetrics {
        return {
            threatsBlocked: this.threatsBlocked,
            lastAttack: Date.now(),
            botDetectionRate: 0.98 // Simulado, en producción sería calculado
        }
    }

    blockThreat() {
        this.threatsBlocked++
    }
}

// Middleware de seguridad
export const sentinelMiddleware = async (c: Context, next: Next) => {
    const sentinel = new SentinelSecurity()
    const analysis = await sentinel.analyzeRequest(c)

    if (analysis.isThreat) {
        sentinel.blockThreat()

        // Respuesta engañosa para scrapers
        if (analysis.threatLevel === 'high') {
            return c.json({
                error: 'Service temporarily unavailable',
                code: 503
            }, 503)
        }

        // Rate limiting silencioso para amenazas medias
        await new Promise(resolve => setTimeout(resolve, 2000))
    }

    // Headers de seguridad
    c.header('X-Content-Type-Options', 'nosniff')
    c.header('X-Frame-Options', 'DENY')
    c.header('X-XSS-Protection', '1; mode=block')
    c.header('X-Sentinel-Status', analysis.isThreat ? 'blocked' : 'clean')

    await next()
}
