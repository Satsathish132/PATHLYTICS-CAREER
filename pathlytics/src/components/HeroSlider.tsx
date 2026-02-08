import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, TrendingUp, Users, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
interface Job {
  id: number;
  title: string;
  description: string;
  growth: string;
  demand: 'High' | 'Very High' | 'Growing';
  salary: string;
  icon: string;
}
const jobs: Job[] = [{
  id: 1,
  title: 'AI/ML Engineer',
  description: 'Design and develop artificial intelligence and machine learning solutions for complex problems.',
  growth: '+40%',
  demand: 'Very High',
  salary: '$120k - $200k',
  icon: '🤖'
}, {
  id: 2,
  title: 'Full Stack Developer',
  description: 'Build complete web applications from frontend interfaces to backend systems and databases.',
  growth: '+25%',
  demand: 'High',
  salary: '$90k - $150k',
  icon: '💻'
}, {
  id: 3,
  title: 'Cloud Solutions Architect',
  description: 'Design scalable cloud infrastructure and lead digital transformation initiatives.',
  growth: '+35%',
  demand: 'Very High',
  salary: '$130k - $200k',
  icon: '☁️'
}, {
  id: 4,
  title: 'Cybersecurity Analyst',
  description: 'Protect organizations from cyber threats and ensure data security compliance.',
  growth: '+32%',
  demand: 'Very High',
  salary: '$100k - $160k',
  icon: '🔐'
}, {
  id: 5,
  title: 'Data Scientist',
  description: 'Extract insights from complex data sets to drive business decisions and strategy.',
  growth: '+28%',
  demand: 'High',
  salary: '$110k - $170k',
  icon: '📊'
}];
const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const nextSlide = useCallback(() => {
    setCurrentSlide(prev => (prev + 1) % jobs.length);
  }, []);
  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + jobs.length) % jobs.length);
  };
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);
  const currentJob = jobs[currentSlide];
  return <section className="relative min-h-[90vh] flex items-center bg-gradient-hero hero-pattern overflow-hidden" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden text-secondary-foreground bg-secondary-foreground">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float animation-delay-200" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary-foreground text-sm font-medium mb-6 animate-fade-in">
              <TrendingUp className="w-4 h-4" />
              <span>High Demand Career</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 animate-fade-in animation-delay-100">
              Discover Your Path to{' '}
              
            </h1>
            
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-xl animate-fade-in animation-delay-200">
              AI-powered career guidance for Computer Science students and tech professionals. 
              Find your perfect career match today.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in animation-delay-300">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                Explore Careers
              </Button>
            </div>
          </div>

          {/* Job Card Slider */}
          <div className="relative">
            <div className="bg-card/95 backdrop-blur-lg rounded-3xl p-8 shadow-2xl animate-scale-in">
              {/* Job Icon */}
              <div className="text-6xl mb-6">{currentJob.icon}</div>
              
              {/* Job Title */}
              <h2 className="text-2xl md:text-3xl font-bold text-card-foreground mb-3">
                {currentJob.title}
              </h2>
              
              {/* Description */}
              <p className="text-muted-foreground mb-6">
                {currentJob.description}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-3 rounded-xl bg-success/10">
                  <TrendingUp className="w-5 h-5 text-success mx-auto mb-1" />
                  <p className="text-xs text-muted-foreground">Growth</p>
                  <p className="font-bold text-success">{currentJob.growth}</p>
                </div>
                <div className="text-center p-3 rounded-xl bg-primary/10">
                  <Users className="w-5 h-5 text-primary mx-auto mb-1" />
                  <p className="text-xs text-muted-foreground">Demand</p>
                  <p className="font-bold text-primary">{currentJob.demand}</p>
                </div>
                <div className="text-center p-3 rounded-xl bg-accent/10">
                  <DollarSign className="w-5 h-5 text-accent mx-auto mb-1" />
                  <p className="text-xs text-muted-foreground">Salary</p>
                  <p className="font-bold text-accent text-sm">{currentJob.salary}</p>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  {jobs.map((_, index) => <button key={index} onClick={() => setCurrentSlide(index)} className={`slider-dot ${index === currentSlide ? 'active bg-primary' : 'bg-muted'}`} />)}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" onClick={prevSlide}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={nextSlide}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default HeroSlider;