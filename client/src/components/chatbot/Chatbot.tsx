import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, Zap } from "lucide-react";

// --- Self-Contained Component Placeholders & Utilities ---
// These replace the imports from "@/components/ui/*" and "@/lib/utils"

/**
 * Placeholder for the Button component.
 * Forwards all props and className to a standard button element.
 */
const Button = ({ className, children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { children: React.ReactNode }) => (
  <button className={className} {...props}>
    {children}
  </button>
);

/**
 * Placeholder for the Input component.
 * Forwards all props and className to a standard input element.
 */
const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(({ className, ...props }, ref) => (
  <input ref={ref} className={className} {...props} />
));
Input.displayName = 'Input';


// --- Main Chatbot Component ---

// Interface for a single message
interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

// Type for the different modes the chatbot can be in
type ChatMode = "automate" | "chat";

// Type for the different steps in an automation flow
type AutomationStep =
  | "idle"
  | "awaiting_policy_name"
  | "awaiting_policy_description"
  | "awaiting_backup_email"
  | "awaiting_user_name"
  | "awaiting_user_email";

// Options for the initial automation menu
const initialAutomationOptions = [
  { id: "create_policy", text: "Create a new policy" },
  { id: "start_backup", text: "Start incremental backup" },
  { id: "create_user", text: "Create user" },
  { id: "other", text: "Others (Live Chat)" },
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [mode, setMode] = useState<ChatMode>("automate");
  const [automationStep, setAutomationStep] = useState<AutomationStep>("idle");
  const [automationData, setAutomationData] = useState<Record<string, string>>({});
  const [messages, setMessages] = useState<Message[]>([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Function to add a new message to the chat
  const addMessage = (text: string, isBot: boolean) => {
    const newMessage: Message = {
      id: crypto.randomUUID(),
      text,
      isBot,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };
  
  // Reset the chat to its initial state
  const resetChat = () => {
    setMessages([]);
    setMode("automate");
    setAutomationStep("idle");
    setAutomationData({});
    addMessage("Hello! I'm your CrashPlan assistant. Please choose an option to automate or select 'Others' to chat with me.", true);
  };
  
  // Initialize chat when it opens for the first time
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      resetChat();
    }
  }, [isOpen]);


  // Effect to scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Effect to focus the input when the chat opens
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen, isLoading]);

  // Main function to handle sending messages and automation logic
  const handleSendMessage = () => {
    const trimmedMessage = message.trim();
    if (!trimmedMessage) return;

    addMessage(trimmedMessage, false);
    setMessage("");
    setIsLoading(true);

    // Process based on the current automation step
    setTimeout(() => {
      if (mode === "automate") {
        handleAutomation(trimmedMessage);
      } else {
        // Regular chat bot response
        addMessage("Thanks for your message! An agent will be with you shortly.", true);
      }
      setIsLoading(false);
    }, 1200);
  };

  // Function to handle the different automation flows
  const handleAutomation = (userResponse: string) => {
    switch (automationStep) {
      case "awaiting_policy_name":
        setAutomationData({ name: userResponse });
        setAutomationStep("awaiting_policy_description");
        addMessage("Great! Now, please provide a description for the policy.", true);
        break;
      case "awaiting_policy_description":
        addMessage(`Policy "${automationData.name}" has been created successfully! What would you like to do next?`, true);
        setAutomationStep("idle");
        break;
      case "awaiting_backup_email":
        addMessage(`Starting incremental backup for ${userResponse}. You will be notified upon completion. What would you like to do next?`, true);
        setAutomationStep("idle");
        break;
      case "awaiting_user_name":
        setAutomationData({ displayName: userResponse });
        setAutomationStep("awaiting_user_email");
        addMessage("Got it. Now, what is the user's email address?", true);
        break;
      case "awaiting_user_email":
        addMessage(`User "${automationData.displayName}" with email ${userResponse} has been created. What would you like to do next?`, true);
        setAutomationStep("idle");
        break;
    }
  };

  // Function to handle when a user clicks an automation option
  const handleOptionClick = (optionId: string) => {
    addMessage(initialAutomationOptions.find(opt => opt.id === optionId)?.text || '', false);
    setIsLoading(true);

    setTimeout(() => {
      switch (optionId) {
        case "create_policy":
          setAutomationStep("awaiting_policy_name");
          addMessage("Okay, let's create a new policy. What is the name of the policy?", true);
          break;
        case "start_backup":
          setAutomationStep("awaiting_backup_email");
          addMessage("Sure, for which user email would you like to start an incremental backup?", true);
          break;
        case "create_user":
          setAutomationStep("awaiting_user_name");
          addMessage("Let's create a new user. What is the user's full display name?", true);
          break;
        case "other":
          setMode("chat");
          addMessage("You are now in live chat mode. How can I help you?", true);
          break;
      }
      setIsLoading(false);
    }, 800);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isLoading) {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 bg-brand-blue text-white rounded-full shadow-lg hover:bg-brand-blue-dark transition-all duration-300 hover:scale-105"
          aria-label={isOpen ? "Close chat" : "Open chat"}
        >
          {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        </Button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 h-[450px] bg-white rounded-lg shadow-xl border border-gray-200 z-50 flex flex-col">
          {/* Header */}
          <div className="p-4 bg-brand-blue text-white rounded-t-lg flex items-center justify-between">
             <div className="flex items-center space-x-2">
                <Bot className="w-5 h-5" />
                <span className="font-medium">CrashPlan Assistant</span>
              </div>
              <Button onClick={resetChat} variant="ghost" className="text-white hover:text-gray-200 hover:bg-transparent">
                  <Zap className="w-4 h-4" />
              </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.isBot ? "justify-start" : "justify-end"}`}
              >
                <div
                  className={`max-w-xs rounded-lg p-3 text-sm ${
                    msg.isBot
                      ? "bg-gray-100 text-gray-700"
                      : "bg-brand-blue text-white"
                  }`}
                >
                  <p>{msg.text}</p>
                </div>
              </div>
            ))}
            
            {/* Automation Options */}
            {mode === 'automate' && automationStep === 'idle' && !isLoading && (
              <div className="space-y-2 pt-2">
                {initialAutomationOptions.map(opt => (
                  <Button key={opt.id} className="w-full justify-start border border-gray-300 bg-white text-gray-800 hover:bg-gray-50" onClick={() => handleOptionClick(opt.id)}>
                    {opt.text}
                  </Button>
                ))}
              </div>
            )}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-700 rounded-lg p-3 text-sm">
                  <span className="animate-pulse">Typing...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          {(mode === 'chat' || (mode === 'automate' && automationStep !== 'idle')) && (
            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <Input
                  ref={inputRef}
                  type="text"
                  placeholder="Type your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={isLoading}
                  className="flex-1 border-gray-300 rounded-md p-2"
                />
                <Button
                  onClick={handleSendMessage}
                  className="bg-brand-blue hover:bg-brand-blue-dark text-white rounded-md p-2"
                  disabled={isLoading}
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
