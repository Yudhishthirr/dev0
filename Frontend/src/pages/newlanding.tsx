"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"

import { Card, CardContent } from "@/components/ui/card"
import { Zap, Code, Sparkles, Rocket, Users, Globe, Github, Twitter, Linkedin, Mail } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { useNavigate } from "react-router-dom"


export function FuturisticWebsite() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const [promptText, setPromptText] = useState("")
    const containerRef = useRef<HTMLDivElement>(null)


    
    const navigate = useNavigate()

    const onsubmit = ()=>{
        if (promptText.trim()) {
            console.log("Prompt submitted:", promptText)
            navigate(`/build?prompt=${encodeURIComponent(promptText)}`);
        }
    }


    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY })
        }

        window.addEventListener("mousemove", handleMouseMove)
        return () => window.removeEventListener("mousemove", handleMouseMove)
    }, [])

    return (
        <div ref={containerRef} className="min-h-screen bg-black text-white font-sans relative overflow-hidden">
            {/* Dynamic Background Effects */}
            <div
                className="fixed inset-0 pointer-events-none"
                style={{
                    background: `
            radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, 
              rgba(147, 51, 234, 0.15) 0%, 
              rgba(219, 39, 119, 0.1) 25%, 
              transparent 50%),
            radial-gradient(400px circle at ${mousePosition.x * 0.5}px ${mousePosition.y * 0.8}px, 
              rgba(219, 39, 119, 0.1) 0%, 
              transparent 50%)
          `,
                }}
            />

            {/* Corner Neon Effects */}
            <div className="fixed top-0 left-0 w-96 h-96 bg-gradient-to-br from-violet-500/20 to-transparent rounded-full blur-3xl animate-pulse" />
            <div
                className="fixed bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-pink-500/20 to-transparent rounded-full blur-3xl animate-pulse"
                style={{ animationDelay: "1s" }}
            />

            {/* Header */}
            <header className="sticky top-0 z-50 backdrop-blur-md bg-black/50 border-b border-violet-500/20">
                <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-violet-500 to-pink-500 rounded-lg flex items-center justify-center">
                            <Code className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
                            CodeCraft
                        </span>
                    </div>

                    <nav className="hidden md:flex items-center space-x-8">
                        <a href="#home" className="hover:text-violet-400 transition-colors">
                            Home
                        </a>
                        <a href="#features" className="hover:text-violet-400 transition-colors">
                            Features
                        </a>
                        <a href="#showcase" className="hover:text-violet-400 transition-colors">
                            Showcase
                        </a>
                        <a href="#pricing" className="hover:text-violet-400 transition-colors">
                            Pricing
                        </a>
                        <a href="#contact" className="hover:text-violet-400 transition-colors">
                            Contact
                        </a>
                    </nav>

                    <div className="flex items-center space-x-4">
                        <Button variant="ghost" className="text-white hover:text-violet-400">
                            Sign In
                        </Button>
                        <Button className="bg-gradient-to-r from-violet-500 to-pink-500 hover:from-violet-600 hover:to-pink-600 text-white shadow-lg shadow-violet-500/25">
                            Sign Up
                        </Button>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section id="home" className="relative py-20 px-6">
                <div className="container mx-auto text-center max-w-4xl">
                    <div className="mb-8">
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-violet-200 to-pink-200 bg-clip-text text-transparent leading-tight">
                            Build Anything
                            <br />
                            <span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
                                Just With Words
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed">
                            Transform your ideas into stunning websites and applications using natural language. No coding required,
                            unlimited possibilities.
                        </p>
                    </div>

                    {/* Interactive Prompt Box */}
                    <div className="relative mb-12">
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-violet-500 to-pink-500 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                                <div className="relative bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 border border-violet-500/30">
                                    <Textarea
                                        value={promptText}
                                        onChange={(e) => setPromptText(e.target.value)}
                                        placeholder="Code, just in words... or even better"
                                        className="text-white placeholder:text-gray-400 text-center px-6 py-4 text-2xl min-h-[120px] rounded-xl"
                                        // className="text-white placeholder:text-gray-400 text-center px-6 py-4 text-lg min-h-[120px] rounded-xl text-xl"
                                    />                              
                            </div>
                        </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Button
                        onClick={onsubmit}
                            size="lg"
                            className="bg-gradient-to-r from-violet-500 to-pink-500 hover:from-violet-600 hover:to-pink-600 text-white px-8 py-4 rounded-xl shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all duration-300"
                        >
                            Get Started Free
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="border-violet-500/50 text-violet-400 hover:bg-violet-500/10 px-8 py-4 rounded-xl bg-transparent"
                        >
                            Try Now
                        </Button>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 px-6">
                <div className="container mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                            Powerful Features
                        </h2>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            Everything you need to bring your ideas to life, powered by cutting-edge AI technology.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <Zap className="w-8 h-8" />,
                                title: "Lightning Fast",
                                description: "Generate complete applications in seconds, not hours or days.",
                            },
                            {
                                icon: <Code className="w-8 h-8" />,
                                title: "Clean Code",
                                description: "Production-ready code that follows best practices and modern standards.",
                            },
                            {
                                icon: <Sparkles className="w-8 h-8" />,
                                title: "AI-Powered",
                                description: "Advanced AI understands your requirements and creates exactly what you need.",
                            },
                            {
                                icon: <Globe className="w-8 h-8" />,
                                title: "Responsive Design",
                                description: "Every creation is mobile-first and works perfectly on all devices.",
                            },
                            {
                                icon: <Users className="w-8 h-8" />,
                                title: "Collaboration",
                                description: "Share and collaborate with your team in real-time.",
                            },
                            {
                                icon: <Rocket className="w-8 h-8" />,
                                title: "Deploy Instantly",
                                description: "One-click deployment to make your creations live immediately.",
                            },
                        ].map((feature, index) => (
                            <Card
                                key={index}
                                className="bg-gray-900/50 border-violet-500/20 hover:border-violet-500/40 transition-all duration-300 group"
                            >
                                <CardContent className="p-8">
                                    <div className="text-violet-400 mb-4 group-hover:text-pink-400 transition-colors">{feature.icon}</div>
                                    <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
                                    <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Product Showcase */}
            <section id="showcase" className="py-20 px-6">
                <div className="container mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                            See It In Action
                        </h2>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            Real examples created by our users in minutes, not months.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3, 4, 5, 6].map((item) => (
                            <div key={item} className="group relative">
                                <div className="absolute -inset-1 bg-gradient-to-r from-violet-500 to-pink-500 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                                <div className="relative bg-gray-900/80 rounded-2xl overflow-hidden">
                                    <img
                                        src={`/placeholder.svg?height=300&width=400`}
                                        alt={`Showcase ${item}`}
                                        width={400}
                                        height={300}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="p-6">
                                        <h3 className="text-lg font-semibold text-white mb-2">Project {item}</h3>
                                        <p className="text-gray-400 text-sm">Built with natural language prompts</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-20 px-6">
                <div className="container mx-auto text-center">
                    <div className="relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-violet-500 to-pink-500 rounded-3xl blur opacity-25"></div>
                        <div className="relative bg-gray-900/80 backdrop-blur-sm rounded-3xl p-12 border border-violet-500/30">
                            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                                Ready to Create?
                            </h2>
                            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                                Join thousands of creators who are building the future with AI-powered development.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button
                                    size="lg"
                                    className="bg-gradient-to-r from-violet-500 to-pink-500 hover:from-violet-600 hover:to-pink-600 text-white px-12 py-4 rounded-xl shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all duration-300"
                                >
                                    Start Building Now
                                </Button>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="border-violet-500/50 text-violet-400 hover:bg-violet-500/10 px-12 py-4 rounded-xl bg-transparent"
                                >
                                    View Pricing
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-violet-500/20 py-12 px-6">
                <div className="container mx-auto">
                    <div className="grid md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <div className="flex items-center space-x-2 mb-4">
                                <div className="w-8 h-8 bg-gradient-to-r from-violet-500 to-pink-500 rounded-lg flex items-center justify-center">
                                    <Code className="w-5 h-5 text-white" />
                                </div>
                                <span className="text-xl font-bold bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
                                    CodeCraft
                                </span>
                            </div>
                            <p className="text-gray-400">
                                Empowering creators to build the future with AI-powered development tools.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-white font-semibold mb-4">Product</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li>
                                    <a href="#" className="hover:text-violet-400 transition-colors">
                                        Features
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-violet-400 transition-colors">
                                        Pricing
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-violet-400 transition-colors">
                                        Templates
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-violet-400 transition-colors">
                                        API
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-white font-semibold mb-4">Company</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li>
                                    <a href="#" className="hover:text-violet-400 transition-colors">
                                        About
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-violet-400 transition-colors">
                                        Blog
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-violet-400 transition-colors">
                                        Careers
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-violet-400 transition-colors">
                                        Contact
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-white font-semibold mb-4">Connect</h3>
                            <div className="flex space-x-4">
                                <a href="#" className="text-gray-400 hover:text-violet-400 transition-colors">
                                    <Twitter className="w-5 h-5" />
                                </a>
                                <a href="#" className="text-gray-400 hover:text-violet-400 transition-colors">
                                    <Github className="w-5 h-5" />
                                </a>
                                <a href="#" className="text-gray-400 hover:text-violet-400 transition-colors">
                                    <Linkedin className="w-5 h-5" />
                                </a>
                                <a href="#" className="text-gray-400 hover:text-violet-400 transition-colors">
                                    <Mail className="w-5 h-5" />
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-violet-500/20 pt-8 text-center text-gray-400">
                        <p>&copy; 2024 CodeCraft. All rights reserved. Built with passion for the future of development.</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}
