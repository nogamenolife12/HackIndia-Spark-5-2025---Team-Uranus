
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Bot, User, AlertCircle, ArrowRight } from "lucide-react";

// Mock initial messages for the chat assistant
const initialMessages = [
  {
    id: 1,
    role: "assistant",
    content: "Hello! I'm your BlockSage AI assistant. How can I help you with your crypto safety today?",
    timestamp: new Date().toISOString()
  }
];

// Mock suggested questions
const suggestedQuestions = [
  "Is this wallet address safe?",
  "What are the risks in my portfolio?",
  "Explain the risks of token EPUMP",
  "How can I avoid crypto scams?"
];

const ChatAssistant = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  const sendMessage = (content: string) => {
    if (!content.trim()) return;
    
    // Add user message
    const userMessage = {
      id: messages.length + 1,
      role: "user",
      content,
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);
    
    // Simulate AI response after delay
    setTimeout(() => {
      // Mock different responses based on the question
      let response = "I'm analyzing your question...";
      
      if (content.toLowerCase().includes("epump") || content.toLowerCase().includes("elonpump")) {
        response = "ElonPump (EPUMP) has several high-risk indicators: it appears to be a honeypot contract (meaning you can buy but not sell), the deployer wallet holds 80% of the supply, and the contract contains functions that allow the owner to mint unlimited tokens. I would recommend extreme caution with this token.";
      } else if (content.toLowerCase().includes("safe") && content.toLowerCase().includes("address")) {
        response = "To analyze an address, please provide the full wallet address or contract address you'd like me to check.";
      } else if (content.toLowerCase().includes("risk") && content.toLowerCase().includes("portfolio")) {
        response = "Your portfolio currently has 3 tokens with high risk indicators: ElonPump (EPUMP) shows signs of being a honeypot, SafeMoon V2 has liquidity issues and high sell taxes, and DeFi Token has centralized control mechanisms that could be problematic. These tokens represent about 18% of your portfolio value.";
      } else if (content.toLowerCase().includes("avoid") && content.toLowerCase().includes("scam")) {
        response = "To avoid crypto scams: 1) Research projects thoroughly before investing, 2) Be skeptical of tokens with anonymous teams, 3) Use blockchain explorers to check token contracts and holder distribution, 4) Watch for red flags like unrealistic promises, 5) Never share your seed phrase, and 6) Use hardware wallets for additional security.";
      } else {
        response = "I understand your question about crypto safety. To give you the most accurate advice, I'd need a bit more specific information. Could you provide more details about the token, transaction, or security concern you're asking about?";
      }
      
      const assistantMessage = {
        id: messages.length + 2,
        role: "assistant",
        content: response,
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 2000);
  };
  
  const handleSendMessage = () => {
    sendMessage(inputValue);
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <Card className="bg-[#32384A] border-gray-700 text-white h-[600px] flex flex-col">
      <CardHeader className="border-b border-gray-700">
        <CardTitle className="text-lg flex items-center">
          <Bot className="mr-2 h-5 w-5 text-[#9b87f5]" />
          AI Assistant
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-0">
        <div className="flex-1 overflow-auto p-4 space-y-4">
          {messages.map(message => (
            <div 
              key={message.id}
              className={`flex ${message.role === 'assistant' ? 'justify-start' : 'justify-end'}`}
            >
              <div 
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.role === 'assistant' 
                    ? 'bg-[#3A3F50] text-white' 
                    : 'bg-[#9b87f5] text-white'
                }`}
              >
                <div className="flex items-center mb-1">
                  {message.role === 'assistant' ? (
                    <Bot className="h-4 w-4 mr-1" />
                  ) : (
                    <User className="h-4 w-4 mr-1" />
                  )}
                  <span className="text-xs font-medium">
                    {message.role === 'assistant' ? 'BlockSage AI' : 'You'}
                  </span>
                </div>
                <p className="text-sm">{message.content}</p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-[#3A3F50] p-3 rounded-lg max-w-[80%]">
                <div className="flex items-center">
                  <Bot className="h-4 w-4 mr-1" />
                  <span className="text-xs font-medium">
                    BlockSage AI
                  </span>
                </div>
                <div className="flex space-x-1 mt-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-100"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-200"></div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {messages.length === 1 && (
          <div className="px-4 py-3">
            <p className="text-sm text-gray-400 mb-2">Suggested questions:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {suggestedQuestions.map((question, index) => (
                <Button 
                  key={index}
                  variant="outline" 
                  className="text-left justify-start bg-[#3A3F50] border-gray-700 hover:bg-[#454B5D] text-sm h-auto py-2"
                  onClick={() => sendMessage(question)}
                >
                  <ArrowRight className="h-3.5 w-3.5 mr-2 text-[#9b87f5]" />
                  {question}
                </Button>
              ))}
            </div>
          </div>
        )}
        
        <div className="p-4 border-t border-gray-700">
          <div className="flex items-center">
            <Input 
              placeholder="Ask about token safety, transaction risks, or security tips..." 
              className="bg-[#3A3F50] border-gray-700 focus-visible:ring-[#9b87f5]"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isTyping}
            />
            <Button 
              className="ml-2 bg-[#9b87f5] hover:bg-[#8a76e4]"
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="mt-2 text-xs text-gray-400 flex items-center">
            <AlertCircle className="h-3 w-3 mr-1" />
            For educational purposes only. Always do your own research.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatAssistant;
