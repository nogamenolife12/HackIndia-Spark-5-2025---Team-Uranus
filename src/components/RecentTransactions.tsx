
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, XCircle, Clock, ArrowUpRight, ArrowDownLeft, Info } from "lucide-react";

// Mock data for transactions
const transactions = [
  {
    id: "0x1234...5678",
    type: "receive",
    token: "ETH",
    amount: 0.5,
    from: "0xabcd...1234",
    to: "0x71...8a92",
    time: "2 hours ago",
    status: "completed",
    risk: "low"
  },
  {
    id: "0xabcd...ef12",
    type: "send",
    token: "USDT",
    amount: 500,
    from: "0x71...8a92",
    to: "0xef12...3456",
    time: "5 hours ago",
    status: "completed",
    risk: "low"
  },
  {
    id: "0x7890...1234",
    type: "receive",
    token: "EPUMP",
    amount: 5000000,
    from: "0x5678...9abc",
    to: "0x71...8a92",
    time: "1 day ago",
    status: "completed",
    risk: "high",
    warning: "Suspicious token received, possible airdrop scam"
  },
  {
    id: "0xef12...7890",
    type: "send",
    token: "ETH",
    amount: 0.2,
    from: "0x71...8a92",
    to: "0x3456...7890",
    time: "2 days ago",
    status: "pending",
    risk: "medium"
  }
];

const RecentTransactions = () => {
  return (
    <Card className="bg-[#32384A] border-gray-700 text-white">
      <CardHeader>
        <CardTitle className="text-lg">Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {transactions.map(tx => (
            <TransactionRow key={tx.id} transaction={tx} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const TransactionRow = ({ transaction }: { transaction: any }) => {
  const getStatusIcon = (status: string) => {
    switch(status) {
      case "completed": return <CheckCircle2 className="h-5 w-5 text-green-400" />;
      case "failed": return <XCircle className="h-5 w-5 text-red-400" />;
      case "pending": return <Clock className="h-5 w-5 text-yellow-400" />;
      default: return null;
    }
  };
  
  const getTypeIcon = (type: string) => {
    return type === "send" 
      ? <ArrowUpRight className="h-5 w-5 text-red-300" /> 
      : <ArrowDownLeft className="h-5 w-5 text-green-400" />;
  };
  
  const getRiskClass = (risk: string) => {
    switch(risk) {
      case "low": return "text-green-400";
      case "medium": return "text-yellow-400";
      case "high": return "text-orange-400";
      case "critical": return "text-red-400";
      default: return "text-gray-400";
    }
  };
  
  const shortAddress = (address: string) => {
    return address;
  };

  return (
    <div className="p-3 bg-[#3A3F50] rounded-lg hover:bg-[#424857] transition-colors">
      <div className="grid grid-cols-12 gap-2">
        <div className="col-span-1">
          {getTypeIcon(transaction.type)}
        </div>
        
        <div className="col-span-5 md:col-span-3">
          <p className="font-medium">
            {transaction.type === "send" ? "Sent" : "Received"} {transaction.amount} {transaction.token}
          </p>
          <p className="text-xs text-gray-400">{transaction.time}</p>
        </div>
        
        <div className="hidden md:block md:col-span-3 text-sm text-gray-300">
          {transaction.type === "send" 
            ? <span>To: {shortAddress(transaction.to)}</span>
            : <span>From: {shortAddress(transaction.from)}</span>
          }
        </div>
        
        <div className="col-span-4 md:col-span-2 flex justify-end">
          <div className="flex items-center">
            {transaction.status === "completed" && (
              <span className={`text-sm font-medium mr-2 ${getRiskClass(transaction.risk)}`}>
                {transaction.risk.charAt(0).toUpperCase() + transaction.risk.slice(1)} Risk
              </span>
            )}
            {getStatusIcon(transaction.status)}
          </div>
        </div>
        
        <div className="col-span-2 md:col-span-3 flex items-center justify-end">
          <div className="text-xs rounded-md px-2 py-1 bg-[#32384A]">
            <a href="#" className="text-[#9b87f5] hover:underline">
              View
            </a>
          </div>
        </div>
        
        {transaction.warning && (
          <div className="col-span-12 mt-2 py-1 px-2 bg-orange-400/20 border border-orange-400/30 rounded text-xs flex items-center">
            <Info className="h-3.5 w-3.5 text-orange-400 mr-1" />
            {transaction.warning}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentTransactions;
