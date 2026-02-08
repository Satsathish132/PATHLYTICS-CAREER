import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, RefreshCw } from 'lucide-react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  id: number;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const quickQuestions = [
  'What career is best for me?',
  'How do I become a Data Scientist?',
  'What skills should I learn first?',
  'Is AI/ML a good career choice?',
  'How to prepare for tech interviews?',
  'Best resources for learning coding?',
];

const botResponses: Record<string, string> = {
  'what career is best for me?':
    "Great question! To recommend the best career for you, I'd need to understand your interests, skills, and goals better. Here are some questions to consider:\n\n1. **What subjects do you enjoy?** (Problem-solving, creativity, data analysis)\n2. **What are your strongest skills?** (Coding, communication, research)\n3. **What work environment do you prefer?** (Remote, collaborative, independent)\n\nBased on your responses, I can suggest careers like Software Development, Data Science, Cloud Engineering, or Cybersecurity. Would you like to explore any of these?",
  'how do i become a data scientist?':
    "Here's a step-by-step roadmap to become a Data Scientist:\n\n**1. Build Strong Foundations (2-3 months)**\n- Learn Python programming\n- Master statistics and probability\n- Understand linear algebra basics\n\n**2. Data Analysis Skills (2-3 months)**\n- Learn Pandas, NumPy for data manipulation\n- Data visualization with Matplotlib, Seaborn\n- SQL for database querying\n\n**3. Machine Learning (3-4 months)**\n- Supervised & unsupervised learning\n- Scikit-learn library\n- Model evaluation techniques\n\n**4. Advanced Topics (2-3 months)**\n- Deep learning basics\n- NLP or Computer Vision\n- Big data tools (Spark)\n\n**5. Portfolio & Job Prep**\n- Build 3-5 projects\n- Contribute to Kaggle competitions\n- Practice interview questions\n\nWould you like specific resources for any of these steps?",
  'what skills should i learn first?':
    "For a career in tech, here are the foundational skills to prioritize:\n\n**1. Programming (Essential)**\n- Start with Python or JavaScript\n- Focus on logic and problem-solving\n- Build small projects to practice\n\n**2. Version Control**\n- Learn Git and GitHub\n- Understand branching and collaboration\n\n**3. Web Basics**\n- HTML, CSS fundamentals\n- How the internet works\n\n**4. Problem-Solving**\n- Data structures (arrays, trees, graphs)\n- Basic algorithms\n- Practice on LeetCode or HackerRank\n\n**5. Soft Skills**\n- Communication\n- Time management\n- Continuous learning mindset\n\nWhich area would you like to dive deeper into?",
  'is ai/ml a good career choice?':
    "Absolutely! AI/ML is one of the most promising career paths in tech. Here's why:\n\n**Growing Demand**\n- 40% projected job growth over the next 5 years\n- Companies across all industries need AI expertise\n- Shortage of qualified professionals\n\n**Excellent Compensation**\n- Entry-level: $100k-$130k\n- Mid-level: $140k-$180k\n- Senior/Lead: $200k+\n\n**Impactful Work**\n- Solve real-world problems\n- Work on cutting-edge technology\n- Make a difference in healthcare, climate, education\n\n**Challenges to Consider**\n- Steep learning curve\n- Requires strong math foundation\n- Rapidly evolving field\n\nWould you like me to share a learning roadmap for AI/ML?",
  default:
    "That's a great question! As your career mentor, I'm here to help you navigate your professional journey. I can assist with:\n\n• **Career Exploration** - Finding the right path for your interests and skills\n• **Learning Roadmaps** - Step-by-step guides for specific careers\n• **Skill Development** - What to learn and how to learn it\n• **Interview Preparation** - Tips and resources for landing your dream job\n• **Industry Insights** - Understanding trends and opportunities\n\nWhat specific area would you like to explore?",
};

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: 'assistant',
      content:
        "Hello! I'm your AI Career Mentor. 👋\n\nI'm here to help you navigate your career journey in tech. Whether you're exploring career options, learning new skills, or preparing for interviews, I've got you covered.\n\nHow can I assist you today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (text?: string) => {
    const messageText = text || input;
    if (!messageText.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      role: 'user',
      content: messageText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const lowerText = messageText.toLowerCase();
      let response = botResponses.default;

      for (const [key, value] of Object.entries(botResponses)) {
        if (lowerText.includes(key) || key.includes(lowerText)) {
          response = value;
          break;
        }
      }

      const botMessage: Message = {
        id: messages.length + 2,
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleReset = () => {
    setMessages([
      {
        id: 1,
        role: 'assistant',
        content:
          "Hello! I'm your AI Career Mentor. 👋\n\nI'm here to help you navigate your career journey in tech. Whether you're exploring career options, learning new skills, or preparing for interviews, I've got you covered.\n\nHow can I assist you today?",
        timestamp: new Date(),
      },
    ]);
  };

  return (
    <Layout showFooter={false}>
      <div className="h-[calc(100vh-5rem)] flex flex-col">
        <div className="container mx-auto px-4 py-4 flex-1 flex flex-col max-w-4xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
                <Bot className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-bold text-foreground">Career Mentor AI</h1>
                <p className="text-xs text-success flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                  Online
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={handleReset}>
              <RefreshCw className="w-4 h-4 mr-2" />
              New Chat
            </Button>
          </div>

          {/* Chat Area */}
          <div className="flex-1 bg-card rounded-2xl border border-border overflow-hidden flex flex-col">
            <ScrollArea className="flex-1 p-4" ref={scrollRef}>
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 animate-fade-in ${
                      message.role === 'user' ? 'flex-row-reverse' : ''
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        message.role === 'assistant'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-accent text-accent-foreground'
                      }`}
                    >
                      {message.role === 'assistant' ? (
                        <Bot className="w-4 h-4" />
                      ) : (
                        <User className="w-4 h-4" />
                      )}
                    </div>
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                        message.role === 'assistant'
                          ? 'bg-muted text-foreground'
                          : 'bg-primary text-primary-foreground'
                      }`}
                    >
                      <div className="whitespace-pre-wrap text-sm leading-relaxed">
                        {message.content}
                      </div>
                      <p
                        className={`text-xs mt-2 ${
                          message.role === 'assistant' ? 'text-muted-foreground' : 'text-primary-foreground/70'
                        }`}
                      >
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex gap-3 animate-fade-in">
                    <div className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className="bg-muted rounded-2xl px-4 py-3">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" />
                        <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce animation-delay-100" />
                        <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce animation-delay-200" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Quick Questions */}
            <div className="px-4 py-3 border-t border-border">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-accent" />
                <span className="text-xs text-muted-foreground">Quick questions</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {quickQuestions.map((question) => (
                  <button
                    key={question}
                    onClick={() => handleSend(question)}
                    className="text-xs px-3 py-1.5 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-border">
              <div className="flex gap-3">
                <Textarea
                  placeholder="Ask me anything about your career..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="min-h-[48px] max-h-32 resize-none"
                  rows={1}
                />
                <Button
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isTyping}
                  className="bg-gradient-primary hover:opacity-90 transition-opacity"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Chatbot;
