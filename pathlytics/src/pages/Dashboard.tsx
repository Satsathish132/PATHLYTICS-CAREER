import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Compass, Map, MessageCircle, Bookmark, TrendingUp, Clock, ArrowRight } from 'lucide-react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';

const Dashboard = () => {
  const [user, setUser] = useState<{ name: string; email: string; role: string } | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('pathlytics_user');
     if (storedUser) {
       setUser(JSON.parse(storedUser));
    }
   }, []);

  const quickActions = [
    {
      icon: Compass,
      title: 'Career Recommendation',
      description: 'Get personalized career suggestions',
      path: '/career-recommendation',
      color: 'bg-primary/10 text-primary',
    },
    {
      icon: Map,
      title: 'Career Roadmaps',
      description: 'Explore step-by-step career paths',
      path: '/roadmaps',
      color: 'bg-accent/10 text-accent',
    },
    {
      icon: MessageCircle,
      title: 'Career Chatbot',
      description: 'Get instant career guidance',
      path: '/chatbot',
      color: 'bg-warning/10 text-warning',
    },
    {
      icon: Bookmark,
      title: 'Saved Careers',
      description: 'View your bookmarked careers',
      path: '/saved-careers',
      color: 'bg-success/10 text-success',
    },
  ];

  const recentActivity = [
    { action: 'Viewed', item: 'AI/ML Engineer Roadmap', time: '2 hours ago' },
    { action: 'Saved', item: 'Full Stack Developer', time: '1 day ago' },
    { action: 'Completed', item: 'Skills Assessment', time: '3 days ago' },
  ];

  const recommendedCareers = [
    { title: 'Data Scientist', match: 92, growth: '+28%' },
    { title: 'ML Engineer', match: 88, growth: '+40%' },
    { title: 'Cloud Architect', match: 85, growth: '+35%' },
  ];

  if (!user) return null;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, {user.name || 'User'}! 👋
          </h1>
          <p className="text-muted-foreground">
            Continue your career exploration journey
          </p>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {quickActions.map((action, index) => (
            <Link
              key={action.title}
              to={action.path}
              className="group bg-card rounded-2xl p-6 border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`w-12 h-12 rounded-xl ${action.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <action.icon className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">{action.title}</h3>
              <p className="text-sm text-muted-foreground">{action.description}</p>
            </Link>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recommended Careers */}
          <div className="lg:col-span-2 bg-card rounded-2xl border border-border p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-foreground">Top Career Matches</h2>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/career-recommendation" className="text-primary">
                  View All <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
            </div>
            <div className="space-y-4">
              {recommendedCareers.map((career, index) => (
                <div
                  key={career.title}
                  className="flex items-center justify-between p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-bold">{index + 1}</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">{career.title}</h3>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-success">{career.match}% match</span>
                        <span className="text-muted-foreground">•</span>
                        <span className="text-muted-foreground flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" /> {career.growth}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/roadmaps">View Roadmap</Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-card rounded-2xl border border-border p-6">
            <h2 className="text-xl font-bold text-foreground mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-foreground">
                      <span className="font-medium">{activity.action}</span> {activity.item}
                    </p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
