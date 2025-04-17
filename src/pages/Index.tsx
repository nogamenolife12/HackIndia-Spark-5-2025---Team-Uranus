
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Shield, AlertTriangle, Search, MessageSquare } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#1A1F2C] to-[#2A2F3C] text-white">
      {/* Hero Section */}
      <header className="container mx-auto px-4 py-16 flex flex-col items-center text-center">
        <div className="mb-6 flex items-center justify-center bg-purple-600/20 p-4 rounded-full">
          <Shield className="h-12 w-12 text-[#9b87f5]" />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          <span className="text-[#9b87f5]">Block</span>Sage
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-300">
          AI-Powered Crypto Risk Advisor
        </p>
        <p className="max-w-2xl text-center mb-8 text-gray-300">
          Connect your wallet, scan your tokens, and detect scams before they drain your funds.
          Your personal watchdog in the crypto space.
        </p>
        <Link to={user ? "/dashboard" : "/auth"}>
          <Button size="lg" className="bg-[#9b87f5] hover:bg-[#8a76e4] text-white px-8 py-6 rounded-lg text-lg">
            {user ? "Go to Dashboard" : "Get Started"}
          </Button>
        </Link>
      </header>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">How BlockSage Protects You</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<Shield className="h-10 w-10 text-[#9b87f5]" />}
            title="Risk Analysis"
            description="Each token gets a risk score based on contract analysis and behavior patterns."
          />
          <FeatureCard 
            icon={<AlertTriangle className="h-10 w-10 text-[#9b87f5]" />}
            title="Scam Detection"
            description="Real-time alerts for suspicious activity in your wallet or transactions."
          />
          <FeatureCard 
            icon={<MessageSquare className="h-10 w-10 text-[#9b87f5]" />}
            title="AI Assistant"
            description="Ask questions about tokens, transactions, or general crypto safety concerns."
          />
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-[#2A2F3C] py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <StepCard 
              step="1"
              title="Connect Wallet"
              description="Securely connect your crypto wallet with one click."
            />
            <StepCard 
              step="2"
              title="Scan Assets"
              description="We analyze your tokens and recent transactions."
            />
            <StepCard 
              step="3"
              title="Get Insights"
              description="Receive risk scores and detailed safety analysis."
            />
            <StepCard 
              step="4"
              title="Stay Protected"
              description="Real-time alerts keep you safe from emerging threats."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Secure Your Crypto?</h2>
        <p className="max-w-2xl mx-auto mb-8 text-gray-300">
          Don't wait until it's too late. BlockSage helps you make informed decisions and avoid costly mistakes.
        </p>
        <Link to={user ? "/dashboard" : "/auth"}>
          <Button size="lg" className="bg-[#9b87f5] hover:bg-[#8a76e4] text-white px-8 py-6 rounded-lg text-lg">
            {user ? "Go to Dashboard" : "Get Started Now"}
          </Button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-[#1A1F2C] py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">© 2025 BlockSage. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

// Feature Card Component
const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => {
  return (
    <div className="bg-[#2A2F3C] p-6 rounded-xl hover:bg-[#32384A] transition-colors">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  );
};

// Step Card Component
const StepCard = ({ step, title, description }: { step: string, title: string, description: string }) => {
  return (
    <div className="bg-[#32384A] p-6 rounded-xl relative">
      <div className="absolute top-4 right-4 bg-[#9b87f5] w-8 h-8 rounded-full flex items-center justify-center font-bold text-white">
        {step}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  );
};

export default Index;
