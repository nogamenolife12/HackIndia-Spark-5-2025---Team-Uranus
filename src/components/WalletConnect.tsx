
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet, AlertTriangle, Shield } from "lucide-react";

interface WalletConnectProps {
  onConnect: () => void;
  isLoading: boolean;
}

const WalletConnect = ({ onConnect, isLoading }: WalletConnectProps) => {
  return (
    <div className="min-h-screen bg-[#1A1F2C] flex items-center justify-center px-4">
      <Card className="max-w-md w-full bg-[#32384A] border-gray-700 text-white">
        <CardHeader className="text-center">
          <div className="mb-4 mx-auto w-16 h-16 bg-purple-600/20 rounded-full flex items-center justify-center">
            <Shield className="h-8 w-8 text-[#9b87f5]" />
          </div>
          <CardTitle className="text-2xl"><span className="text-[#9b87f5]">Block</span>Sage</CardTitle>
          <CardDescription className="text-gray-400">Connect your wallet to start scanning for risks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Button 
              onClick={onConnect} 
              className="w-full bg-[#9b87f5] hover:bg-[#8a76e4] py-6"
              disabled={isLoading}
            >
              <Wallet className="mr-2 h-5 w-5" />
              {isLoading ? "Connecting..." : "Connect Wallet"}
            </Button>
            
            <div className="text-sm text-gray-400">
              <p className="mb-2 flex items-center">
                <Shield className="inline mr-2 h-4 w-4 text-[#9b87f5]" /> 
                Your data stays private and secure
              </p>
              <p className="flex items-center">
                <AlertTriangle className="inline mr-2 h-4 w-4 text-[#9b87f5]" /> 
                We'll never request approval to spend your tokens
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WalletConnect;
