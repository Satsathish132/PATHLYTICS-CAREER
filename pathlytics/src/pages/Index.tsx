import { Compass, Map, MessageCircle, TrendingUp, Award, Users } from 'lucide-react';
import Layout from '@/components/Layout';
import HeroSlider from '@/components/HeroSlider';
import FeatureCard from '@/components/FeatureCard';

const features = [
  {
    icon: Compass,
    title: 'Career Recommendation',
    description: 'Get personalized career suggestions based on your skills, interests, and education level.',
    path: '/career-recommendation',
    gradient: 'bg-gradient-primary',
    delay: 0,
  },
  {
    icon: Map,
    title: 'Career Roadmaps',
    description: 'Visual step-by-step guides showing the path from where you are to where you want to be.',
    path: '/roadmaps',
    gradient: 'bg-gradient-accent',
    delay: 100,
  },
  {
    icon: MessageCircle,
    title: 'Career Guidance Chatbot',
    description: 'Chat with our AI mentor for instant career advice, learning paths, and skill guidance.',
    path: '/chatbot',
    gradient: 'bg-gradient-to-br from-amber-500 to-orange-600',
    delay: 200,
  },
];

const stats = [
  { icon: Users, value: '95%', label: 'Clear Action Plan' },
  { icon: TrendingUp, value: '95%', label: 'Success Rate' },
  { icon: Award, value: '200+', label: 'Career Paths' },
];

const Index = () => {
  return (
    <Layout>
      {/* Hero Slider Section */}
      <HeroSlider />

      {/* Features Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Your Career Journey Starts Here
            </h2>
            <p className="text-lg text-muted-foreground">
              Explore our powerful tools designed to guide you towards your dream career in tech.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="text-center p-8 rounded-2xl bg-card shadow-lg animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
                  <stat.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-4xl font-bold text-foreground mb-2">{stat.value}</h3>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 hero-pattern opacity-50" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
              Ready to Shape Your Future?
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8">
              Join thousands of students who have discovered their perfect career path with PATHLYTICS-CAREER.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/signup"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-colors shadow-lg"
              >
                Get Started Free
              </a>
              <a
                href="/career-recommendation"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl border-2 border-primary-foreground/30 text-primary-foreground font-semibold hover:bg-primary-foreground/10 transition-colors"
              >
                Explore Careers
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
