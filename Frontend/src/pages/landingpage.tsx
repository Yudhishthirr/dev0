import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Zap, Brain, Code, Sparkles } from "lucide-react"
import { useNavigate } from 'react-router-dom';

import { useState } from "react"
export function LandingPage() {

  const [prompt,setQuery] = useState('');
  const navigate = useNavigate()

  const onsubmit = ()=>{
      if (prompt.trim()) {
        navigate('/build', { state: { prompt } });
    }

  }
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-white border-b">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 bg-blue-600 rounded-lg">
            <Code className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">Dev0</span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
            Examples
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
            Features
          </a>
          <Button className="bg-blue-600 hover:bg-blue-700">Get Started</Button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center px-6 py-16 max-w-6xl mx-auto">
        {/* Badge */}
        <Badge variant="secondary" className="mb-8 bg-blue-50 text-blue-700 border-blue-200 px-4 py-2">
          <Sparkles className="w-4 h-4 mr-2" />
          AI-Powered Website Builder
        </Badge>

        {/* Hero Heading */}
        <h1 className="text-5xl md:text-6xl font-bold text-center mb-6 leading-tight">
          Build websites with{" "}
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">just words</span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl text-gray-600 text-center mb-12 max-w-2xl leading-relaxed">
          Describe your vision and watch as our AI transforms your ideas into beautiful, functional websites. No coding
          required, just creativity.
        </p>

        {/* Input Section */}
        <div className="w-full max-w-3xl mb-8">
          <div className="flex gap-3 p-2 bg-white rounded-2xl shadow-lg border">
            <Input
              id="query"
              value={prompt}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Describe the website you want to build..."
              className="flex-1 border-0 text-lg placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <Button className="bg-purple-600 hover:bg-purple-700 px-8 py-3 rounded-xl"
            onClick={onsubmit}>
              <Sparkles className="w-4 h-4 mr-2" />
              Create
            </Button>
          </div>
        </div>

        {/* Example Suggestions */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          <span className="text-gray-500 mr-2">Try:</span>
          <Badge variant="outline" className="cursor-pointer hover:bg-blue-50 hover:border-blue-300 transition-colors">
            "E-commerce store for handmade jewelry"
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-blue-50 hover:border-blue-300 transition-colors">
            "Portfolio site for a photographer"
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-blue-50 hover:border-blue-300 transition-colors">
            "Restaurant website with online ordering"
          </Badge>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 w-full max-w-4xl">
          {/* Lightning Fast */}
          <div className="text-center">
            <div className="flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mx-auto mb-4">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3">Lightning Fast</h3>
            <p className="text-gray-600 leading-relaxed">Generate complete websites in seconds, not hours</p>
          </div>

          {/* Beautiful Design */}
          <div className="text-center">
            <div className="flex items-center justify-center w-16 h-16 bg-purple-600 rounded-2xl mx-auto mb-4">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3">Beautiful Design</h3>
            <p className="text-gray-600 leading-relaxed">Every website is crafted with modern design principles</p>
          </div>

          {/* Production Ready */}
          <div className="text-center">
            <div className="flex items-center justify-center w-16 h-16 bg-green-600 rounded-2xl mx-auto mb-4">
              <Code className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3">Production Ready</h3>
            <p className="text-gray-600 leading-relaxed">Clean, optimized code that's ready to deploy</p>
          </div>
        </div>
      </main>
    </div>
  )
}
