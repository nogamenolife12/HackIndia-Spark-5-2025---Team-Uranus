
import React from 'react';
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Shield, 
  AlertTriangle, 
  Wallet, 
  ArrowUpRight, 
  BarChart3, 
  MessageSquare, 
  Clock, 
  RefreshCw,
  Check,
  X,
  LogOut
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import WalletConnect from "@/components/WalletConnect";
import TokenList from "@/components/TokenList";
import RiskSummary from "@/components/RiskSummary";
import RecentTransactions from "@/components/RecentTransactions";
import ChatAssistant from "@/components/ChatAssistant";

const Dashboard = () => {
  const { user, profile, signOut } = useAuth();
  const [connected, setConnected] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  
  const handleConnect = () => {
    setLoading(true);
    setTimeout(() => {
      setConnected(true);
      setLoading(false);
      toast({
        title: "Wallet connected successfully",
        description: "Your wallet has been connected and your assets are being analyzed.",
      });
    }, 1500);
  };

  const handleScan = () => {
    toast({
      title: "Scanning your wallet",
      description: "We're analyzing your tokens and transactions for potential risks.",
    });
  };

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Signed out successfully",
      description: "You have been logged out of your account.",
    });
  };

  const formatWalletAddress = (address: string) => {
    return address ? `${address.substring(0, 4)}...${address.substring(address.length - 4)}` : '0x71...8a92';
  };

  if (!connected) {
    return <WalletConnect onConnect={handleConnect} isLoading={loading} />;
  }

  return (
    <div className="min-h-screen bg-[#1A1F2C] text-white">
      <header className="bg-[#32384A] border-b border-gray-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Shield className="h-8 w-8 text-[#9b87f5] mr-2" />
            <h1 className="text-xl font-bold"><span className="text-[#9b87f5]">Block</span>Sage</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              size="sm" 
              className="bg-transparent border-gray-600 text-gray-300 hover:bg-gray-700"
              onClick={handleScan}
            >
              <RefreshCw className="h-4 w-4 mr-2" /> Scan Now
            </Button>
            <div className="bg-[#3A3F50] px-3 py-1.5 rounded-lg flex items-center">
              <div className="h-2 w-2 rounded-full bg-green-400 mr-2"></div>
              <span className="text-sm">{formatWalletAddress(user?.email || '')}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSignOut}
              className="text-gray-300 hover:bg-gray-700"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <RiskSummary />
        </div>

        <Tabs defaultValue="portfolio" className="space-y-4">
          <TabsList className="bg-[#32384A]">
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="assistant">AI Assistant</TabsTrigger>
          </TabsList>
          
          <TabsContent value="portfolio" className="space-y-4">
            <TokenList />
          </TabsContent>
          
          <TabsContent value="transactions" className="space-y-4">
            <RecentTransactions />
          </TabsContent>
          
          <TabsContent value="assistant" className="space-y-4">
            <ChatAssistant />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
