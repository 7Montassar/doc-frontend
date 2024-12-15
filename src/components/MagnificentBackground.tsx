"use client"

import React, { useEffect, useRef } from 'react'
import { motion, useAnimation } from 'framer-motion'

const MagnificentBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const resizeCanvas = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }

        resizeCanvas()
        window.addEventListener('resize', resizeCanvas)

        const documentShapes: DocumentShape[] = []

        class DocumentShape {
            x: number
            y: number
            size: number
            speed: number
            color: string

            constructor() {
                // @ts-ignore
                this.x = Math.random() * canvas.width
                // @ts-ignore
                this.y = Math.random() * canvas.height
                this.size = Math.random() * 30 + 10
                this.speed = Math.random() * 0.5 + 0.1
                this.color = `rgba(255, 255, 255, ${Math.random() * 0.1 + 0.05})`
            }

            draw() {
                if (!ctx) return
                ctx.fillStyle = this.color
                ctx.beginPath()
                ctx.moveTo(this.x, this.y)
                ctx.lineTo(this.x + this.size, this.y)
                ctx.lineTo(this.x + this.size, this.y + this.size * 1.4)
                ctx.lineTo(this.x, this.y + this.size * 1.4)
                ctx.closePath()
                ctx.fill()

                // Draw lines to represent text
                ctx.fillStyle = 'rgba(255, 255, 255, 0.1)'
                for (let i = 0; i < 3; i++) {
                    ctx.fillRect(this.x + 5, this.y + 5 + i * 8, this.size - 10, 2)
                }
            }

            update() {
                this.y += this.speed
                // @ts-ignore
                if (this.y > canvas.height) {
                    this.y = -this.size
                    // @ts-ignore
                    this.x = Math.random() * canvas.width
                }
            }
        }

        for (let i = 0; i < 50; i++) {
            documentShapes.push(new DocumentShape())
        }

        const animate = () => {
            if (!ctx) return
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            documentShapes.forEach((shape) => {
                shape.update()
                shape.draw()
            })
            requestAnimationFrame(animate)
        }

        animate()

        return () => {
            window.removeEventListener('resize', resizeCanvas)
        }
    }, [])

    return (
        <div className="fixed inset-0 z-0 overflow-hidden bg-gradient-to-br from-gray-900 to-blue-900">
            <canvas ref={canvasRef} className="absolute inset-0" />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2 }}
                className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-purple-500/10"
            />
            <div className="absolute inset-0 backdrop-blur-[1px]" />
        </div>
    )
}

export default MagnificentBackground

