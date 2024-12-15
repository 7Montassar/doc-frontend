"use client";

import React from 'react'
import { motion } from 'framer-motion'
import { FileText, Brain, Zap, Lock, BarChart, Users } from 'lucide-react'
import MagnificentBackground from '@/components/MagnificientBackground'
import Link from 'next/link'

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
    <motion.div
        whileHover={{ scale: 1.05 }}
        className="bg-white/10 backdrop-blur-md rounded-lg p-6 shadow-lg flex flex-col items-center text-center"
    >
        <div className="text-blue-400 mb-4">{icon}</div>
        <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
        <p className="text-gray-300">{description}</p>
    </motion.div>
)

const HomePage = () => {
    return (
        <div className="relative min-h-screen flex flex-col text-white">
            <MagnificentBackground />

            <header className="relative z-10 bg-gray-900/50 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <div className="flex items-center">
                        <FileText className="w-8 h-8 text-blue-400 mr-2" />
                        <span className="text-2xl font-bold">DocuFlow</span>
                    </div>
                    <nav className="flex items-center space-x-4">
                        <a href="#features" className="hover:text-blue-400 transition-colors">Features</a>
                        <a href="#benefits" className="hover:text-blue-400 transition-colors">Benefits</a>
                        <Link href="/signin" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">Sign In</Link>
                    </nav>
                </div>
            </header>

            <main className="relative z-10 flex-grow">
                <section className="py-20 px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h1 className="text-5xl sm:text-6xl font-bold mb-6">
                                Your Intelligent Document Hub
                            </h1>
                            <p className="text-xl text-gray-300 mb-8">Experience the power of AI-driven document management, enhancing your organization's efficiency and productivity.</p>
                            <div className="flex justify-center">
                                <Link href="/signin" className="bg-blue-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors shadow-md">
                                    Access Your Dashboard
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </section>

                <section id="features" className="py-20 bg-gray-900/30 backdrop-blur-md">
                    <div className="max-w-6xl mx-auto px-4">
                        <h2 className="text-3xl font-bold mb-12 text-center">Key Features</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <FeatureCard
                                icon={<Brain size={32} />}
                                title="AI-Powered Classification"
                                description="Our system automatically categorizes and routes documents using advanced machine learning algorithms."
                            />
                            <FeatureCard
                                icon={<Zap size={32} />}
                                title="Intelligent Automation"
                                description="Streamlined workflows with smart process automation, reducing manual tasks and errors."
                            />
                            <FeatureCard
                                icon={<Lock size={32} />}
                                title="Enhanced Security"
                                description="Your sensitive information is protected with state-of-the-art encryption and access controls."
                            />
                        </div>
                    </div>
                </section>

                <section id="benefits" className="py-20">
                    <div className="max-w-6xl mx-auto px-4">
                        <h2 className="text-3xl font-bold mb-12 text-center">Realized Benefits</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 shadow-lg flex items-start">
                                <BarChart className="w-8 h-8 text-blue-400 mr-4 flex-shrink-0" />
                                <div>
                                    <h3 className="text-xl font-semibold mb-2">Improved Efficiency</h3>
                                    <p className="text-gray-300">Our organization has seen a 40% reduction in document processing times, streamlining operations significantly.</p>
                                </div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 shadow-lg flex items-start">
                                <Users className="w-8 h-8 text-blue-400 mr-4 flex-shrink-0" />
                                <div>
                                    <h3 className="text-xl font-semibold mb-2">Enhanced Collaboration</h3>
                                    <p className="text-gray-300">Teams now collaborate seamlessly with real-time document sharing and AI-assisted workflows, boosting productivity.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="relative z-10 bg-gray-900/70 backdrop-blur-md py-8">
                <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
                    <div className="mb-4 sm:mb-0">© 2024 DocuFlow . All rights reserved.</div>
                    <div className="flex space-x-4">
                        <a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-blue-400 transition-colors">Support</a>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default HomePage

