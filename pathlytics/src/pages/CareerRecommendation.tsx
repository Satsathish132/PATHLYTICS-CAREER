 import { useState } from 'react';
 import { Search, Bookmark, BookmarkCheck, TrendingUp, DollarSign, Briefcase, X } from 'lucide-react';
 import Layout from '@/components/Layout';
 import { Button } from '@/components/ui/button';
 import { Input } from '@/components/ui/input';
 import { Badge } from '@/components/ui/badge';
 import { useToast } from '@/hooks/use-toast';
 
 interface Career {
   id: number;
   title: string;
   description: string;
   skills: string[];
   education: string;
   salary: string;
   growth: string;
   demand: 'High' | 'Very High' | 'Growing';
   category: string;
 }
 
 const careers: Career[] = [
   {
     id: 1,
     title: 'AI/ML Engineer',
     description: 'Design, develop, and deploy machine learning models and AI systems for real-world applications.',
     skills: ['Python', 'TensorFlow', 'PyTorch', 'Machine Learning', 'Deep Learning'],
     education: "Bachelor's in CS/Engineering",
     salary: '$120k - $200k',
     growth: '+40%',
     demand: 'Very High',
     category: 'AI & Data',
   },
   {
     id: 2,
     title: 'Full Stack Developer',
     description: 'Build complete web applications handling both frontend user interfaces and backend server logic.',
     skills: ['JavaScript', 'React', 'Node.js', 'SQL', 'REST APIs'],
     education: "Bachelor's in CS/IT",
     salary: '$90k - $150k',
     growth: '+25%',
     demand: 'High',
     category: 'Web Development',
   },
   {
     id: 3,
     title: 'Cloud Solutions Architect',
     description: 'Design scalable cloud infrastructure and lead digital transformation initiatives.',
     skills: ['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes'],
     education: "Bachelor's + Certifications",
     salary: '$130k - $200k',
     growth: '+35%',
     demand: 'Very High',
     category: 'Cloud & DevOps',
   },
   {
     id: 4,
     title: 'Data Scientist',
     description: 'Extract insights from complex data sets using statistical analysis and machine learning.',
     skills: ['Python', 'R', 'SQL', 'Statistics', 'Data Visualization'],
     education: "Master's preferred",
     salary: '$110k - $170k',
     growth: '+28%',
     demand: 'High',
     category: 'AI & Data',
   },
   {
     id: 5,
     title: 'Cybersecurity Analyst',
     description: 'Protect organizations from cyber threats and ensure data security compliance.',
     skills: ['Network Security', 'Penetration Testing', 'SIEM', 'Incident Response'],
     education: "Bachelor's + Certifications",
     salary: '$100k - $160k',
     growth: '+32%',
     demand: 'Very High',
     category: 'Security',
   },
   {
     id: 6,
     title: 'DevOps Engineer',
     description: 'Bridge development and operations with automation, CI/CD, and infrastructure as code.',
     skills: ['Jenkins', 'Docker', 'Terraform', 'Linux', 'Scripting'],
     education: "Bachelor's in CS/IT",
     salary: '$100k - $160k',
     growth: '+24%',
     demand: 'High',
     category: 'Cloud & DevOps',
   },
 ];
 
 const allSkillTags = [
   'Python',
   'JavaScript',
   'Java',
   'SQL',
   'React',
   'Node.js',
   'Machine Learning',
   'Cloud Computing',
   'AWS',
   'Docker',
   'TensorFlow',
   'Kubernetes',
   'Network Security',
   'Penetration Testing',
 ];
 
 const CareerRecommendation = () => {
   const [searchQuery, setSearchQuery] = useState('');
   const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
   const [savedCareers, setSavedCareers] = useState<number[]>([]);
   const { toast } = useToast();
 
   const filteredCareers = careers.filter((career) => {
     const matchesSearch =
       searchQuery === '' ||
       career.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
       career.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase()));
     const matchesSkills =
       selectedSkills.length === 0 ||
       selectedSkills.some((skill) =>
         career.skills.some((careerSkill) =>
           careerSkill.toLowerCase().includes(skill.toLowerCase())
         )
       );
     return matchesSearch && matchesSkills;
   });
 
   const toggleSkill = (skill: string) => {
     if (selectedSkills.includes(skill)) {
       setSelectedSkills(selectedSkills.filter((s) => s !== skill));
     } else {
       setSelectedSkills([...selectedSkills, skill]);
     }
   };
 
   const clearFilters = () => {
     setSearchQuery('');
     setSelectedSkills([]);
   };
 
   const toggleSave = (careerId: number) => {
     if (savedCareers.includes(careerId)) {
       setSavedCareers(savedCareers.filter((id) => id !== careerId));
       toast({
         title: 'Career removed',
         description: 'Career has been removed from your saved list.',
       });
     } else {
       setSavedCareers([...savedCareers, careerId]);
       toast({
         title: 'Career saved!',
         description: 'Career has been added to your saved list.',
       });
     }
   };
 
   const getMatchedSkills = (careerSkills: string[]) => {
     if (selectedSkills.length === 0) return [];
     return careerSkills.filter((skill) =>
       selectedSkills.some((selected) =>
         skill.toLowerCase().includes(selected.toLowerCase())
       )
     );
   };
 
   const getDemandColor = (demand: string) => {
     switch (demand) {
       case 'Very High':
         return 'bg-success/10 text-success border-success/20';
       case 'High':
         return 'bg-primary/10 text-primary border-primary/20';
       default:
         return 'bg-accent/10 text-accent border-accent/20';
     }
   };
 
   return (
     <Layout>
       <div className="container mx-auto px-4 py-8">
         {/* Header */}
         <div className="mb-8">
           <h1 className="text-3xl font-bold text-foreground mb-2">Career Recommendations</h1>
           <p className="text-muted-foreground">
             Discover careers that match your skills and interests.
           </p>
         </div>
 
         {/* Filters */}
         <div className="bg-card rounded-2xl border border-border p-6 mb-8">
           {/* Search Input */}
           <div className="relative mb-6">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
             <Input
               placeholder="Search by career title..."
               className="pl-10"
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
             />
           </div>
 
           {/* Skill Tags */}
           <div>
             <div className="flex items-center justify-between mb-3">
               <p className="text-sm font-medium text-foreground">Select Skills</p>
               {(selectedSkills.length > 0 || searchQuery) && (
                 <Button variant="ghost" size="sm" onClick={clearFilters} className="text-muted-foreground">
                   <X className="w-4 h-4 mr-1" />
                   Clear Filters
                 </Button>
               )}
             </div>
             <div className="flex flex-wrap gap-2">
               {allSkillTags.map((skill) => (
                 <button
                   key={skill}
                   onClick={() => toggleSkill(skill)}
                   className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                     selectedSkills.includes(skill)
                       ? 'bg-primary text-primary-foreground'
                       : 'bg-muted text-muted-foreground hover:bg-muted/80'
                   }`}
                 >
                   {skill}
                 </button>
               ))}
             </div>
           </div>
 
           {/* Selected Skills Display */}
           {selectedSkills.length > 0 && (
             <div className="mt-4 pt-4 border-t border-border">
               <p className="text-sm text-muted-foreground mb-2">
                 Selected: {selectedSkills.length} skill{selectedSkills.length > 1 ? 's' : ''}
               </p>
               <div className="flex flex-wrap gap-2">
                 {selectedSkills.map((skill) => (
                   <Badge
                     key={skill}
                     variant="default"
                     className="gap-1 cursor-pointer"
                     onClick={() => toggleSkill(skill)}
                   >
                     {skill}
                     <X className="w-3 h-3" />
                   </Badge>
                 ))}
               </div>
             </div>
           )}
         </div>
 
         {/* Results Count */}
         <p className="text-muted-foreground mb-6">
           Showing {filteredCareers.length} career{filteredCareers.length !== 1 ? 's' : ''}
         </p>
 
         {/* Career Cards */}
         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
           {filteredCareers.map((career, index) => {
             const matchedSkills = getMatchedSkills(career.skills);
             return (
               <div
                 key={career.id}
                 className="bg-card rounded-2xl border border-border p-6 card-hover animate-fade-in-up"
                 style={{ animationDelay: `${index * 50}ms` }}
               >
                 <div className="flex justify-between items-start mb-4">
                   <Badge variant="outline" className={getDemandColor(career.demand)}>
                     {career.demand} Demand
                   </Badge>
                   <button
                     onClick={() => toggleSave(career.id)}
                     className="p-2 rounded-lg hover:bg-muted transition-colors"
                   >
                     {savedCareers.includes(career.id) ? (
                       <BookmarkCheck className="w-5 h-5 text-primary" />
                     ) : (
                       <Bookmark className="w-5 h-5 text-muted-foreground" />
                     )}
                   </button>
                 </div>
 
                 <h3 className="text-xl font-bold text-foreground mb-2">{career.title}</h3>
                 <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                   {career.description}
                 </p>
 
                 {/* Skills with Highlighting */}
                 <div className="flex flex-wrap gap-2 mb-4">
                   {career.skills.slice(0, 4).map((skill) => (
                     <Badge
                       key={skill}
                       variant={matchedSkills.includes(skill) ? 'default' : 'secondary'}
                       className="text-xs"
                     >
                       {skill}
                     </Badge>
                   ))}
                   {career.skills.length > 4 && (
                     <Badge variant="secondary" className="text-xs">
                       +{career.skills.length - 4} more
                     </Badge>
                   )}
                 </div>
 
                 {/* Stats */}
                 <div className="grid grid-cols-3 gap-2 pt-4 border-t border-border">
                   <div className="text-center">
                     <DollarSign className="w-4 h-4 mx-auto text-success mb-1" />
                     <p className="text-xs text-muted-foreground">Salary</p>
                     <p className="text-xs font-medium text-foreground">{career.salary}</p>
                   </div>
                   <div className="text-center">
                     <TrendingUp className="w-4 h-4 mx-auto text-primary mb-1" />
                     <p className="text-xs text-muted-foreground">Growth</p>
                     <p className="text-xs font-medium text-foreground">{career.growth}</p>
                   </div>
                   <div className="text-center">
                     <Briefcase className="w-4 h-4 mx-auto text-accent mb-1" />
                     <p className="text-xs text-muted-foreground">Education</p>
                     <p className="text-xs font-medium text-foreground">{career.education.split(' ')[0]}</p>
                   </div>
                 </div>
 
                 <Button className="w-full mt-4" variant="outline" asChild>
                   <a href="/roadmaps">View Roadmap</a>
                 </Button>
               </div>
             );
           })}
         </div>
 
         {filteredCareers.length === 0 && (
           <div className="text-center py-16">
             <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
               <Search className="w-8 h-8 text-muted-foreground" />
             </div>
             <h3 className="text-xl font-semibold text-foreground mb-2">No careers found</h3>
             <p className="text-muted-foreground mb-4">Try adjusting your filters or search query.</p>
             <Button onClick={clearFilters} variant="outline">
               Clear All Filters
             </Button>
           </div>
         )}
       </div>
     </Layout>
   );
 };
 
 export default CareerRecommendation;