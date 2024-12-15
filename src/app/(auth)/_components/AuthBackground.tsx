"use client"

import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const EnhancedAuthBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        canvas.width = window.innerWidth
        canvas.height = window.innerHeight

        const particles: Particle[] = []
        const particleCount = 50

        class Particle {
            x: number
            y: number
            size: number
            speedX: number
            speedY: number
            color: string

            constructor() {
                // @ts-ignore
                this.x = Math.random() * canvas.width
                // @ts-ignore
                this.y = Math.random() * canvas.height
                this.size = Math.random() * 5 + 1
                this.speedX = Math.random() * 3 - 1.5
                this.speedY = Math.random() * 3 - 1.5
                this.color = `rgba(14, 112, 139, ${Math.random() * 0.5 + 0.1})`
            }

            update() {
                this.x += this.speedX
                this.y += this.speedY

                if (this.size > 0.2) this.size -= 0.1

                // @ts-ignore
                if (this.x < 0 || this.x > canvas.width) this.speedX *= -1
                // @ts-ignore
                if (this.y < 0 || this.y > canvas.height) this.speedY *= -1
            }

            draw() {
                if (!ctx) return
                ctx.fillStyle = this.color
                ctx.strokeStyle = 'rgba(14, 112, 139, 0.1)'
                ctx.lineWidth = 2
                ctx.beginPath()
                ctx.moveTo(this.x + this.size, this.y)
                ctx.lineTo(this.x, this.y + this.size)
                ctx.lineTo(this.x - this.size, this.y)
                ctx.lineTo(this.x, this.y - this.size)
                ctx.closePath()
                ctx.fill()
                ctx.stroke()
            }
        }

        function init() {
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle())
            }
        }

        function animate() {
            if (!ctx || !canvas) return
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            for (let i = 0; i < particles.length; i++) {
                particles[i].update()
                particles[i].draw()
            }
            requestAnimationFrame(animate)
        }

        init()
        animate()

        const handleResize = () => {
            if (!canvas) return
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return (
        <div className="fixed inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-br from-sky-100 via-white to-cyan-100 opacity-70" />
            <canvas ref={canvasRef} className="absolute inset-0" />
            <div className="absolute inset-0" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230e708b' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
            <motion.div
                className="absolute inset-0 opacity-30"
                animate={{
                    backgroundPosition: ['0px 0px', '100px 100px'],
                }}
                transition={{
                    repeat: Infinity,
                    repeatType: 'reverse',
                    duration: 20,
                    ease: 'linear',
                }}
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230e708b' fill-opacity='0.1'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}
            />
        </div>
    )
}

export default EnhancedAuthBackground

