"use client"

import React from "react"
import Link from "next/link"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Page Not Found - Invoice.wiki",
  description: "The page you're looking for doesn't exist. Return to Invoice.wiki free invoice generator to create professional invoices online.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-gray-50 overflow-hidden relative">
        {/* Floating Documents Animation */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Document 1 */}
          <div className="absolute top-20 left-10 animate-float-slow">
            <div className="w-16 h-20 bg-white rounded shadow-lg border border-gray-200 transform rotate-12 opacity-70">
              <div className="p-2 space-y-1">
                <div className="h-2 bg-gray-300 rounded"></div>
                <div className="h-1 bg-gray-200 rounded"></div>
                <div className="h-1 bg-gray-200 rounded w-3/4"></div>
              </div>
            </div>
          </div>

          {/* Document 2 */}
          <div className="absolute top-32 right-16 animate-float-medium">
            <div className="w-14 h-18 bg-white rounded shadow-lg border border-gray-200 transform -rotate-6 opacity-60">
              <div className="p-2 space-y-1">
                <div className="h-1 bg-blue-300 rounded"></div>
                <div className="h-1 bg-gray-200 rounded"></div>
                <div className="h-1 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          </div>

          {/* Document 3 */}
          <div className="absolute bottom-32 left-20 animate-float-fast">
            <div className="w-12 h-16 bg-white rounded shadow-lg border border-gray-200 transform rotate-45 opacity-50">
              <div className="p-1 space-y-1">
                <div className="h-1 bg-green-300 rounded"></div>
                <div className="h-1 bg-gray-200 rounded w-3/4"></div>
              </div>
            </div>
          </div>

          {/* Document 4 */}
          <div className="absolute bottom-20 right-32 animate-float-slow">
            <div className="w-18 h-22 bg-white rounded shadow-lg border border-gray-200 transform -rotate-12 opacity-40">
              <div className="p-2 space-y-1">
                <div className="h-2 bg-purple-300 rounded"></div>
                <div className="h-1 bg-gray-200 rounded"></div>
                <div className="h-1 bg-gray-200 rounded w-4/5"></div>
              </div>
            </div>
          </div>

          {/* Main Lost Invoice Document */}
          <div className="absolute top-16 left-1/2 transform -translate-x-1/2 animate-float-main">
            <div className="w-24 h-32 bg-white rounded-lg shadow-2xl border-2 border-red-200 transform rotate-3">
              <div className="p-3 space-y-2">
                <div className="text-xs font-bold text-red-500 text-center">LOST</div>
                <div className="h-2 bg-red-300 rounded"></div>
                <div className="h-1 bg-gray-200 rounded"></div>
                <div className="h-1 bg-gray-200 rounded w-3/4"></div>
                <div className="h-1 bg-gray-200 rounded w-1/2"></div>
                <div className="text-xs text-gray-400 text-center mt-2">Invoice #404</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="text-center z-10 relative">
          <div className="mb-8">
            {/* Animated 404 Number */}
            <h1 className="text-8xl md:text-9xl font-bold text-gray-800 mb-4 animate-bounce-slow">
              <span className="inline-block animate-pulse">4</span>
              <span className="inline-block animate-wiggle text-blue-600">0</span>
              <span className="inline-block animate-pulse">4</span>
            </h1>
            
            {/* Typewriter Effect Text */}
            <div className="relative">
              <p className="text-xl md:text-2xl text-gray-600 mb-2 animate-typewriter overflow-hidden whitespace-nowrap border-r-2 border-blue-600 mx-auto max-w-fit">
                Oops! This invoice seems to be missing...
              </p>
            </div>
            
            <p className="text-lg text-gray-500 mb-8 animate-fade-in-up">
              Don't worry! Let's get you back to creating professional invoices
            </p>
          </div>

          {/* Animated Button */}
          <Link href="/">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 animate-bounce-gentle">
              🏠 Return to Invoice Generator
            </Button>
          </Link>

          <div className="mt-8">
            <Link href="/create-invoice" className="text-blue-600 hover:text-blue-800 underline hover:no-underline transition-colors duration-200">
              Or start creating an invoice right away →
            </Link>
          </div>
        </div>

        {/* Custom CSS Animations */}
        <style jsx>{`
          @keyframes float-slow {
            0%, 100% { transform: translateY(0px) rotate(12deg); }
            50% { transform: translateY(-20px) rotate(18deg); }
          }
          
          @keyframes float-medium {
            0%, 100% { transform: translateY(0px) rotate(-6deg); }
            50% { transform: translateY(-15px) rotate(-12deg); }
          }
          
          @keyframes float-fast {
            0%, 100% { transform: translateY(0px) rotate(45deg); }
            50% { transform: translateY(-25px) rotate(50deg); }
          }
          
          @keyframes float-main {
            0%, 100% { transform: translateX(-50%) translateY(0px) rotate(3deg); }
            50% { transform: translateX(-50%) translateY(-30px) rotate(-3deg); }
          }
          
          @keyframes wiggle {
            0%, 100% { transform: rotate(0deg); }
            25% { transform: rotate(-5deg); }
            75% { transform: rotate(5deg); }
          }
          
          @keyframes bounce-slow {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          
          @keyframes bounce-gentle {
            0%, 100% { transform: translateY(0) scale(1); }
            50% { transform: translateY(-2px) scale(1.02); }
          }
          
          @keyframes typewriter {
            from { width: 0; }
            to { width: 100%; }
          }
          
          @keyframes fade-in-up {
            from { 
              opacity: 0; 
              transform: translateY(20px); 
            }
            to { 
              opacity: 1; 
              transform: translateY(0); 
            }
          }
          
          .animate-float-slow { animation: float-slow 6s ease-in-out infinite; }
          .animate-float-medium { animation: float-medium 4s ease-in-out infinite; }
          .animate-float-fast { animation: float-fast 3s ease-in-out infinite; }
          .animate-float-main { animation: float-main 5s ease-in-out infinite; }
          .animate-wiggle { animation: wiggle 2s ease-in-out infinite; }
          .animate-bounce-slow { animation: bounce-slow 3s ease-in-out infinite; }
          .animate-bounce-gentle { animation: bounce-gentle 4s ease-in-out infinite; }
          .animate-typewriter { 
            animation: typewriter 3s steps(35, end) 1s both;
          }
          .animate-fade-in-up { 
            animation: fade-in-up 1s ease-out 4s both;
          }
        `}</style>
      </main>
      <Footer />
    </div>
  )
}
