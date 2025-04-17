
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, Shield, Info } from "lucide-react";

const RiskSummary = () => {
  const overallRisk = 35; // Mock risk score out of 100 (higher = riskier)
  
  const getRiskLabel = (score: number) => {
    if (score < 25) return { label: "Low Risk", color: "text-green-400" };
    if (score < 50) return { label: "Moderate Risk", color: "text-yellow-400" };
    if (score < 75) return { label: "High Risk", color: "text-orange-400" };
    return { label: "Critical Risk", color: "text-red-400" };
  };
  
  const riskDetails = getRiskLabel(overallRisk);
  
  const getRiskColor = (score: number) => {
    if (score < 25) return "bg-green-500";
    if (score < 50) return "bg-yellow-500";
    if (score < 75) return "bg-orange-500";
    return "bg-red-500";
  };

  return (
    <Card className="bg-[#32384A] border-gray-700 text-white">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <Shield className="mr-2 h-5 w-5 text-[#9b87f5]" />
          Wallet Risk Summary
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="col-span-1">
            <div className="text-center">
              <div className="inline-flex justify-center items-center mb-2">
                <span className="text-4xl font-bold">{overallRisk}</span>
                <span className="text-sm text-gray-400 ml-1">/100</span>
              </div>
              <p className={`font-medium ${riskDetails.color}`}>{riskDetails.label}</p>
              <div className="mt-3">
                <Progress value={overallRisk} className="h-2 bg-gray-600" indicatorClassName={getRiskColor(overallRisk)} />
              </div>
            </div>
          </div>
          
          <div className="col-span-1 md:col-span-2 flex flex-col justify-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <RiskFactor label="Suspicious Tokens" count={2} />
              <RiskFactor label="Risky Contracts" count={1} />
              <RiskFactor label="Vulnerable Assets" count={3} />
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-[#2A2F3C] text-sm text-gray-400 rounded-b-lg flex items-center pt-3">
        <Info className="h-4 w-4 mr-2 text-[#9b87f5]" />
        Last scan: 2 minutes ago
      </CardFooter>
    </Card>
  );
};

const RiskFactor = ({ label, count }: { label: string, count: number }) => {
  return (
    <div className="flex items-center p-2 rounded-lg bg-[#3A3F50]">
      <AlertTriangle className={`h-5 w-5 mr-2 ${count > 0 ? "text-yellow-400" : "text-gray-400"}`} />
      <div>
        <p className="text-xs text-gray-400">{label}</p>
        <p className="font-medium">{count}</p>
      </div>
    </div>
  );
};

export default RiskSummary;
