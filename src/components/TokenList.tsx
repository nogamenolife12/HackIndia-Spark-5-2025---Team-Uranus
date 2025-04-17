
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, Check, AlertCircle, HelpCircle } from "lucide-react";

// Mock data for tokens
const tokens = [
  {
    id: 1,
    name: "Ethereum",
    symbol: "ETH",
    balance: 1.25,
    value: 3750,
    riskScore: 12,
    riskLevel: "low",
    issues: []
  },
  {
    id: 2,
    name: "BNB",
    symbol: "BNB",
    balance: 5.5,
    value: 2200,
    riskScore: 18,
    riskLevel: "low",
    issues: []
  },
  {
    id: 3,
    name: "SafeMoon V2",
    symbol: "SFM",
    balance: 50000,
    value: 450,
    riskScore: 78,
    riskLevel: "high",
    issues: ["Liquidity issues", "High sell tax"]
  },
  {
    id: 4,
    name: "DeFi Token",
    symbol: "DFT",
    balance: 1000,
    value: 250,
    riskScore: 45,
    riskLevel: "medium",
    issues: ["Centralized control"]
  },
  {
    id: 5,
    name: "ElonPump",
    symbol: "EPUMP",
    balance: 5000000,
    value: 120,
    riskScore: 92,
    riskLevel: "critical",
    issues: ["Honeypot contract", "Unable to sell", "Deployer holds 80%"]
  }
];

const TokenList = () => {
  return (
    <Card className="bg-[#32384A] border-gray-700 text-white">
      <CardHeader>
        <CardTitle className="text-lg">Your Tokens</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {tokens.map(token => (
            <TokenRow key={token.id} token={token} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const TokenRow = ({ token }: { token: any }) => {
  const getRiskColor = (level: string) => {
    switch(level) {
      case "low": return "text-green-400";
      case "medium": return "text-yellow-400";
      case "high": return "text-orange-400";
      case "critical": return "text-red-400";
      default: return "text-gray-400";
    }
  };
  
  const getRiskIcon = (level: string) => {
    switch(level) {
      case "low": return <Check className="h-5 w-5 text-green-400" />;
      case "medium": return <AlertCircle className="h-5 w-5 text-yellow-400" />;
      case "high": return <AlertTriangle className="h-5 w-5 text-orange-400" />;
      case "critical": return <AlertTriangle className="h-5 w-5 text-red-400" />;
      default: return <HelpCircle className="h-5 w-5 text-gray-400" />;
    }
  };
  
  const getProgressColor = (level: string) => {
    switch(level) {
      case "low": return "bg-green-500";
      case "medium": return "bg-yellow-500";
      case "high": return "bg-orange-500";
      case "critical": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="p-3 bg-[#3A3F50] rounded-lg hover:bg-[#424857] transition-colors">
      <div className="grid grid-cols-12 gap-2">
        <div className="col-span-5 md:col-span-3 flex items-center">
          <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center mr-2 text-xs">
            {token.symbol.substring(0, 2)}
          </div>
          <div>
            <p className="font-medium">{token.name}</p>
            <p className="text-xs text-gray-400">{token.symbol}</p>
          </div>
        </div>
        
        <div className="col-span-4 md:col-span-2 flex flex-col justify-center">
          <p className="font-medium">{token.balance.toLocaleString()}</p>
          <p className="text-xs text-gray-400">${token.value.toLocaleString()}</p>
        </div>
        
        <div className="col-span-3 md:col-span-2 flex items-center">
          <div className="w-full">
            <div className="flex items-center justify-between mb-1">
              <span className={`text-xs font-medium ${getRiskColor(token.riskLevel)}`}>
                {token.riskScore}
              </span>
              <span className={`text-xs font-medium ${getRiskColor(token.riskLevel)}`}>
                {token.riskLevel.charAt(0).toUpperCase() + token.riskLevel.slice(1)}
              </span>
            </div>
            <Progress 
              value={token.riskScore} 
              className="h-1.5 bg-gray-600" 
              indicatorClassName={getProgressColor(token.riskLevel)} 
            />
          </div>
        </div>
        
        <div className="hidden md:flex md:col-span-4 items-center text-sm text-gray-300">
          {token.issues.length > 0 ? (
            <span>{token.issues[0]}{token.issues.length > 1 ? ` +${token.issues.length - 1} more` : ''}</span>
          ) : (
            <span className="text-green-400">No issues detected</span>
          )}
        </div>
        
        <div className="flex col-span-12 md:hidden mt-2 text-xs text-gray-300">
          {token.issues.length > 0 ? (
            <div className="flex items-start">
              <AlertCircle className="h-4 w-4 text-yellow-400 mr-1 mt-0.5" />
              <span>{token.issues[0]}{token.issues.length > 1 ? ` +${token.issues.length - 1} more` : ''}</span>
            </div>
          ) : (
            <div className="flex items-center">
              <Check className="h-4 w-4 text-green-400 mr-1" />
              <span className="text-green-400">No issues detected</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TokenList;
