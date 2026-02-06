 import { useState } from 'react';
 import { Link } from 'react-router-dom';
import { Bookmark, Trash2, ExternalLink, TrendingUp, DollarSign } from 'lucide-react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface SavedCareer {
  id: number;
  title: string;
  description: string;
  salary: string;
  growth: string;
  savedAt: Date;
}

const SavedCareers = () => {
   const [savedCareers, setSavedCareers] = useState<SavedCareer[]>([
    {
      id: 1,
      title: 'AI/ML Engineer',
      description: 'Design and develop artificial intelligence and machine learning solutions.',
      salary: '$120k - $200k',
      growth: '+40%',
      savedAt: new Date(Date.now() - 86400000),
    },
    {
      id: 2,
      title: 'Full Stack Developer',
      description: 'Build complete web applications from frontend to backend.',
      salary: '$90k - $150k',
      growth: '+25%',
      savedAt: new Date(Date.now() - 172800000),
    },
    {
      id: 3,
      title: 'Cloud Solutions Architect',
      description: 'Design scalable cloud infrastructure and lead digital transformation.',
      salary: '$130k - $200k',
      growth: '+35%',
      savedAt: new Date(Date.now() - 259200000),
    },
  ]);
  const { toast } = useToast();

  const handleRemove = (id: number) => {
    setSavedCareers(savedCareers.filter((career) => career.id !== id));
    toast({
      title: 'Career removed',
      description: 'The career has been removed from your saved list.',
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Saved Careers</h1>
          <p className="text-muted-foreground">
            Your bookmarked careers for future reference.
          </p>
        </div>

        {savedCareers.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
              <Bookmark className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No saved careers yet</h3>
            <p className="text-muted-foreground mb-6">
              Explore careers and save your favorites for later.
            </p>
            <Button asChild>
              <Link to="/career-recommendation">Explore Careers</Link>
            </Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedCareers.map((career, index) => (
              <div
                key={career.id}
                className="bg-card rounded-2xl border border-border p-6 card-hover animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                    Saved
                  </Badge>
                  <button
                    onClick={() => handleRemove(career.id)}
                    className="p-2 rounded-lg hover:bg-destructive/10 text-destructive transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <h3 className="text-xl font-bold text-foreground mb-2">{career.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{career.description}</p>

                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1 text-sm">
                    <DollarSign className="w-4 h-4 text-success" />
                    <span className="text-muted-foreground">{career.salary}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <TrendingUp className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground">{career.growth}</span>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground mb-4">
                  Saved {career.savedAt.toLocaleDateString()}
                </p>

                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1" asChild>
                    <Link to="/roadmaps">View Roadmap</Link>
                  </Button>
                  <Button variant="outline" size="icon" asChild>
                    <Link to="/career-recommendation">
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SavedCareers;
