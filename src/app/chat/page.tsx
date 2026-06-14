"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useChat } from "ai/react";
import { createClient } from "@/utils/supabase/client";
import { Heart, Send, Bot, Users, User, ArrowLeft } from "lucide-react";
import Link from "next/link";

type ChatUser = {
  id: string;
  full_name: string;
  avatar_url: string | null;
  role: string;
};

type DBMessage = {
  id: string;
  sender_id: string;
  content: string;
  created_at: string;
  is_group_chat: boolean;
};

export default function ChatPage() {
  const router = useRouter();
  const supabase = createClient();
  const [currentUser, setCurrentUser] = useState<ChatUser | null>(null);
  
  // App state
  const [activeTab, setActiveTab] = useState<"general" | "ai">("general");
  
  // DB Group Chat State
  const [groupMessages, setGroupMessages] = useState<DBMessage[]>([]);
  const [groupInput, setGroupInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Vercel AI SDK hook for AI Support Buddy
  const { messages: aiMessages, input: aiInput, handleInputChange: handleAiInputChange, handleSubmit: handleAiSubmit, isLoading: isAiLoading } = useChat({
    api: '/api/ai-assist',
  });

  // Fetch current user & initial group messages
  useEffect(() => {
    const initChat = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }
      
      const { data: userData } = await supabase.from('users').select('*').eq('id', user.id).single();
      if (userData) {
        setCurrentUser(userData);
      } else {
        // Fallback if trigger hasn't completed or manual signup
        setCurrentUser({
          id: user.id,
          full_name: user.user_metadata?.full_name || 'Volunteer',
          avatar_url: user.user_metadata?.avatar_url || null,
          role: 'volunteer'
        });
      }

      // Fetch group messages
      const { data: msgs } = await supabase
        .from('messages')
        .select('*')
        .eq('is_group_chat', true)
        .order('created_at', { ascending: true })
        .limit(50);
        
      if (msgs) setGroupMessages(msgs);
    };

    initChat();
  }, [router, supabase]);

  // Subscribe to real-time group messages
  useEffect(() => {
    if (!currentUser) return;

    const channel = supabase
      .channel('public:messages')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages', filter: 'is_group_chat=eq.true' },
        (payload) => {
          setGroupMessages((prev) => [...prev, payload.new as DBMessage]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [currentUser, supabase]);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [groupMessages, aiMessages, activeTab]);

  const sendGroupMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!groupInput.trim() || !currentUser) return;
    
    const content = groupInput.trim();
    setGroupInput("");

    await supabase.from('messages').insert({
      sender_id: currentUser.id,
      content,
      is_group_chat: true,
    });
  };

  if (!currentUser) {
    return <div className="flex h-full w-full items-center justify-center"><Heart className="animate-pulse text-nayepankh-orange" size={48} /></div>;
  }

  return (
    <div className="flex h-full w-full">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col shadow-sm z-10">
        <div className="p-4 border-b border-gray-100 flex items-center gap-2">
          <Link href="/dashboard" className="text-gray-400 hover:text-primary transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <Heart className="text-nayepankh-orange" size={24} />
          <h1 className="font-bold text-gray-800 text-lg">Community</h1>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4">
          <div className="px-3 mb-2">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-3">Channels</h2>
            <button 
              onClick={() => setActiveTab("general")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${activeTab === 'general' ? 'bg-green-50 text-primary font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              <Users size={18} className={activeTab === 'general' ? 'text-primary' : 'text-gray-400'} />
              Nayepankh General
            </button>
            <button 
              onClick={() => setActiveTab("ai")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all mt-1 ${activeTab === 'ai' ? 'bg-green-50 text-primary font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              <Bot size={18} className={activeTab === 'ai' ? 'text-primary' : 'text-gray-400'} />
              AI Support Buddy
            </button>
          </div>
        </div>
        
        <div className="p-4 border-t border-gray-100 flex items-center gap-3 bg-gray-50">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm">
            {currentUser.full_name.charAt(0)}
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-semibold text-gray-800 truncate">{currentUser.full_name}</p>
            <p className="text-xs text-gray-500 capitalize">{currentUser.role}</p>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Chat Header */}
        <div className="h-16 border-b border-gray-100 flex items-center px-6 bg-white z-0 shadow-sm">
          {activeTab === 'general' ? (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-primary">
                <Users size={20} />
              </div>
              <div>
                <h2 className="font-bold text-gray-800">Nayepankh General</h2>
                <p className="text-xs text-gray-500">Global announcements and volunteer community</p>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <Bot size={20} />
              </div>
              <div>
                <h2 className="font-bold text-gray-800">AI Support Buddy</h2>
                <p className="text-xs text-gray-500">Ask me about NGO guidelines or drafting emails!</p>
              </div>
            </div>
          )}
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50/50 space-y-6">
          {activeTab === 'general' ? (
            groupMessages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-3">
                <Heart size={48} className="text-gray-200" />
                <p>No messages yet. Say hello to the community!</p>
              </div>
            ) : (
              groupMessages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender_id === currentUser.id ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[70%] rounded-2xl px-5 py-3 shadow-sm ${msg.sender_id === currentUser.id ? 'bg-primary text-white rounded-tr-none' : 'bg-white border border-gray-100 text-gray-800 rounded-tl-none'}`}>
                    {msg.sender_id !== currentUser.id && (
                      <div className="text-xs font-semibold mb-1 text-nayepankh-orange">Volunteer</div>
                    )}
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </div>
              ))
            )
          ) : (
            aiMessages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-3">
                <Bot size={48} className="text-gray-200" />
                <p>Hi! I'm your AI Support Buddy. How can I help you today?</p>
              </div>
            ) : (
              aiMessages.map((m) => (
                <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-2xl px-5 py-3 shadow-sm ${m.role === 'user' ? 'bg-primary text-white rounded-tr-none' : 'bg-white border border-gray-100 text-gray-800 rounded-tl-none'}`}>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{m.content}</p>
                  </div>
                </div>
              ))
            )
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-gray-100">
          {activeTab === 'general' ? (
            <form onSubmit={sendGroupMessage} className="flex gap-2 max-w-4xl mx-auto">
              <input
                type="text"
                value={groupInput}
                onChange={(e) => setGroupInput(e.target.value)}
                placeholder="Message the community..."
                className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-gray-800"
              />
              <button 
                type="submit"
                disabled={!groupInput.trim()}
                className="bg-nayepankh-orange text-white p-3 rounded-full hover:bg-orange-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
              >
                <Send size={18} />
              </button>
            </form>
          ) : (
            <form onSubmit={handleAiSubmit} className="flex gap-2 max-w-4xl mx-auto">
              <input
                type="text"
                value={aiInput}
                onChange={handleAiInputChange}
                placeholder="Ask your AI buddy..."
                className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-gray-800"
              />
              <button 
                type="submit"
                disabled={!aiInput.trim() || isAiLoading}
                className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
              >
                <Send size={18} />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
