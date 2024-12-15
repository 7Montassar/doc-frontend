"use client"

import React, { useEffect, useRef } from 'react'
import { motion, useAnimation } from 'framer-motion'

const MagnificentAuthBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const controls = useAnimation()

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        canvas.width = window.innerWidth
        canvas.height = window.innerHeight

        const particles: Particle[] = []
        const particleCount = 100
        const connectionDistance = 100

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
                this.size = Math.random() * 2 + 1
                this.speedX = Math.random() - 0.5
                this.speedY = Math.random() - 0.5
                this.color = `rgba(14, 112, 139, ${Math.random() * 0.5 + 0.5})`
            }

            update() {
                this.x += this.speedX
                this.y += this.speedY

                // @ts-ignore
                if (this.x < 0 || this.x > canvas.width) this.speedX *= -1
                // @ts-ignore
                if (this.y < 0 || this.y > canvas.height) this.speedY *= -1
            }

            draw() {
                if (!ctx) return
                ctx.fillStyle = this.color
                ctx.beginPath()
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
                ctx.fill()
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

                for (let j = i; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x
                    const dy = particles[i].y - particles[j].y
                    const distance = Math.sqrt(dx * dx + dy * dy)

                    if (distance < connectionDistance) {
                        ctx.beginPath()
                        ctx.strokeStyle = `rgba(14, 112, 139, ${1 - distance / connectionDistance})`
                        ctx.lineWidth = 0.5
                        ctx.moveTo(particles[i].x, particles[i].y)
                        ctx.lineTo(particles[j].x, particles[j].y)
                        ctx.stroke()
                    }
                }
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

    useEffect(() => {
        controls.start({
            backgroundPosition: ['0% 0%', '100% 100%'],
            transition: { duration: 20, ease: 'linear', repeat: Infinity }
        })
    }, [controls])

    return (
        <div className="fixed inset-0 z-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />
            <canvas ref={canvasRef} className="absolute inset-0" />
            <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(14, 112, 139, 0.1)" strokeWidth="1"/>
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
            <motion.div
                className="absolute inset-0"
                animate={controls}
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230e708b' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    opacity: 0.1,
                }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-transparent to-gray-900 opacity-50" />
        </div>
    )
}

export default MagnificentAuthBackground

