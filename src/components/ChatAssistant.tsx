import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Bot, User, AlertCircle, ArrowRight } from "lucide-react";

// Initial welcome message
const initialMessages = [
  {
    id: 1,
    role: "assistant",
    content: "Hello! I'm your BlockSage AI assistant. How can I help you with your crypto safety today?",
    timestamp: new Date().toISOString()
  }
];

// Suggested questions for the user
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
  const [apiError, setApiError] = useState(null);
  const messagesEndRef = useRef(null);
  
  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Function to call AI API via OpenRouter
  const callAIAPI = async (userMessages) => {
    // Reset any previous errors
    setApiError(null);
    
    try {
      const apiKey = "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";
      
      // Format messages for the API - only include relevant role and content
      const formattedMessages = [
        {
          role: "system",
          content: "You are BlockSage AI, an expert assistant focused on cryptocurrency safety, security, and risk assessment. Provide helpful, accurate information about blockchain security, token risks, wallet safety, and protection against crypto scams."
        },
        ...userMessages.map(msg => ({
          role: msg.role,
          content: msg.content
        }))
      ];
      
      // Log request details for debugging
      console.log("Preparing to send request to OpenRouter API");
      
      // First check response type before parsing JSON
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
          "HTTP-Referer": typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000', 
          "X-Title": "BlockSage AI"
        },
        body: JSON.stringify({
          model: "anthropic/claude-3-haiku", // Use a model that's definitely available on OpenRouter
          messages: formattedMessages,
          temperature: 0.7,
          max_tokens: 1000
        })
      });
      
      console.log("API Response status:", response.status);
      
      // Check if response is OK
      if (!response.ok) {
        // Try to get the response text first to see what's coming back
        const responseText = await response.text();
        console.error("Raw API error response:", responseText);
        
        // Try to parse as JSON if it looks like JSON
        let errorData = {};
        if (responseText.trim().startsWith('{')) {
          try {
            errorData = JSON.parse(responseText);
          } catch (e) {
            console.error("Failed to parse error response as JSON");
          }
        }
        
        throw new Error(`API error: ${response.status} - ${responseText.substring(0, 100)}...`);
      }
      
      // Now safely parse the response as JSON
      const responseText = await response.text();
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        console.error("Failed to parse successful response as JSON:", responseText.substring(0, 200));
        throw new Error("Invalid JSON response from API");
      }
      
      console.log("API Response data:", data);
      
      if (!data.choices || !data.choices[0] || !data.choices[0].message) {
        console.error("Unexpected API response format:", data);
        throw new Error("Unexpected API response format");
      }
      
      return data.choices[0].message.content;
    } catch (error) {
      console.error("Error calling AI API:", error);
      setApiError(error.message || "Unknown API error");
      
      // Fallback to mock response if API fails
      if (userMessages.length > 0) {
        const lastUserMessage = userMessages[userMessages.length - 1].content.toLowerCase();
        
        if (lastUserMessage.includes("epump") || lastUserMessage.includes("elonpump")) {
          return "ElonPump (EPUMP) has several high-risk indicators: it appears to be a honeypot contract (meaning you can buy but not sell), the deployer wallet holds 80% of the supply, and the contract contains functions that allow the owner to mint unlimited tokens. I would recommend extreme caution with this token.";
        } else if (lastUserMessage.includes("safe") && lastUserMessage.includes("address")) {
          return "To analyze an address, please provide the full wallet address or contract address you'd like me to check.";
        } else if (lastUserMessage.includes("risk") && lastUserMessage.includes("portfolio")) {
          return "Your portfolio currently has 3 tokens with high risk indicators: ElonPump (EPUMP) shows signs of being a honeypot, SafeMoon V2 has liquidity issues and high sell taxes, and DeFi Token has centralized control mechanisms that could be problematic. These tokens represent about 18% of your portfolio value.";
        } else if (lastUserMessage.includes("avoid") && lastUserMessage.includes("scam")) {
          return "To avoid crypto scams: 1) Research projects thoroughly before investing, 2) Be skeptical of tokens with anonymous teams, 3) Use blockchain explorers to check token contracts and holder distribution, 4) Watch for red flags like unrealistic promises, 5) Never share your seed phrase, and 6) Use hardware wallets for additional security.";
        }
      }
      
      return "I'm sorry, I encountered an error connecting to my knowledge base. As an alternative, I can provide general advice on crypto safety or you can try asking me again later.";
    }
  };
  
  const sendMessage = async (content) => {
    if (!content.trim()) return;
    
    // Add user message
    const userMessage = {
      id: messages.length + 1,
      role: "user",
      content,
      timestamp: new Date().toISOString()
    };
    
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputValue("");
    setIsTyping(true);
    
    try {
      // Call the real API with the updated message history
      const aiResponse = await callAIAPI(updatedMessages);
      
      const assistantMessage = {
        id: updatedMessages.length + 1,
        role: "assistant",
        content: aiResponse,
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error in AI response:", error);
      
      // More informative error message
      const errorContent = apiError 
        ? `Error: ${apiError}` 
        : "I'm sorry, I encountered an issue processing your request. Please try again later.";
      
      const errorMessage = {
        id: updatedMessages.length + 1,
        role: "assistant",
        content: errorContent,
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };
  
  const handleSendMessage = () => {
    sendMessage(inputValue);
  };
  
  const handleKeyPress = (e) => {
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
          {apiError && <span className="ml-2 text-xs text-red-400">(API Error)</span>}
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
          <div ref={messagesEndRef} />
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