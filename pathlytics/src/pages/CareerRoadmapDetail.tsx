 import { useState } from 'react';
 import { useParams, useNavigate, Link } from 'react-router-dom';
 import { ArrowLeft, CheckCircle, BookOpen, ExternalLink, TrendingUp, DollarSign, Briefcase } from 'lucide-react';
 import Layout from '@/components/Layout';
 import { Button } from '@/components/ui/button';
 import { Badge } from '@/components/ui/badge';
 import { roadmaps } from '@/data/careers';
 
 const CareerRoadmapDetail = () => {
   const { careerId } = useParams<{ careerId: string }>();
   const navigate = useNavigate();
   const [completedSteps, setCompletedSteps] = useState<number[]>([]);
 
   const roadmap = roadmaps.find((r) => r.id === careerId);
 
   if (!roadmap) {
     return (
       <Layout>
         <div className="container mx-auto px-4 py-16 text-center">
           <h1 className="text-2xl font-bold text-foreground mb-4">Roadmap not found</h1>
           <Button onClick={() => navigate('/roadmaps')}>
             <ArrowLeft className="w-4 h-4 mr-2" />
             Back to Career Roadmaps
           </Button>
         </div>
       </Layout>
     );
   }
 
   const toggleStepComplete = (stepId: number) => {
     if (completedSteps.includes(stepId)) {
       setCompletedSteps(completedSteps.filter((id) => id !== stepId));
     } else {
       setCompletedSteps([...completedSteps, stepId]);
     }
   };
 
   const IconComponent = roadmap.icon;
 
   return (
     <Layout>
       <div className="container mx-auto px-4 py-8">
         {/* Back Button */}
         <Button
           variant="ghost"
           onClick={() => navigate('/roadmaps')}
           className="mb-6 gap-2"
         >
           <ArrowLeft className="w-4 h-4" />
           Back to Career Roadmaps
         </Button>
 
         {/* Roadmap Header */}
         <div className="bg-card rounded-2xl border border-border p-8 mb-8 animate-fade-in-up">
           <div className="flex flex-col md:flex-row md:items-start gap-6">
             <div className={`w-20 h-20 rounded-2xl ${roadmap.color} flex items-center justify-center text-white shrink-0`}>
               <IconComponent className="w-10 h-10" />
             </div>
             <div className="flex-1">
               <h1 className="text-3xl font-bold text-foreground mb-2">{roadmap.title}</h1>
               <p className="text-muted-foreground text-lg mb-4">{roadmap.description}</p>
               
               {/* Stats */}
               <div className="flex flex-wrap gap-4 mb-4">
                 <div className="flex items-center gap-2">
                   <DollarSign className="w-5 h-5 text-success" />
                   <span className="text-foreground font-medium">{roadmap.salary}</span>
                 </div>
                 <div className="flex items-center gap-2">
                   <TrendingUp className="w-5 h-5 text-primary" />
                   <span className="text-foreground font-medium">{roadmap.growth} Growth</span>
                 </div>
                 <div className="flex items-center gap-2">
                   <Briefcase className="w-5 h-5 text-accent" />
                   <span className="text-foreground font-medium">{roadmap.demand} Demand</span>
                 </div>
               </div>
 
               {/* Skills */}
               <div className="flex flex-wrap gap-2 mb-4">
                 {roadmap.skills.map((skill) => (
                   <Badge key={skill} variant="secondary">
                     {skill}
                   </Badge>
                 ))}
               </div>
 
               <div className="flex items-center gap-4">
                 <Badge variant="outline">
                   {roadmap.steps.length} Steps
                 </Badge>
                 <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                   {completedSteps.length}/{roadmap.steps.length} Completed
                 </Badge>
               </div>
             </div>
           </div>
         </div>
 
         {/* Roadmap Steps */}
         <div className="relative">
           {/* Vertical line */}
           <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border hidden md:block" />
 
           <div className="space-y-6">
             {roadmap.steps.map((step, index) => (
               <div
                 key={step.id}
                 className="relative flex gap-4 md:gap-8 animate-fade-in-up"
                 style={{ animationDelay: `${index * 100}ms` }}
               >
                 {/* Step indicator */}
                 <div className="hidden md:flex flex-col items-center">
                   <button
                     onClick={() => toggleStepComplete(step.id)}
                     className={`w-12 h-12 rounded-full flex items-center justify-center z-10 transition-all ${
                       completedSteps.includes(step.id)
                         ? 'bg-success text-success-foreground'
                         : 'bg-card border-2 border-border text-muted-foreground hover:border-primary'
                     }`}
                   >
                     {completedSteps.includes(step.id) ? (
                       <CheckCircle className="w-6 h-6" />
                     ) : (
                       <span className="font-bold">{step.id}</span>
                     )}
                   </button>
                 </div>
 
                 {/* Step content */}
                 <div className="flex-1 bg-card rounded-2xl border border-border p-6 hover:border-primary/50 transition-colors">
                   <div className="flex items-start justify-between mb-4">
                     <div className="flex items-center gap-3">
                       <button
                         onClick={() => toggleStepComplete(step.id)}
                         className={`md:hidden w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                           completedSteps.includes(step.id)
                             ? 'bg-success text-success-foreground'
                             : 'bg-muted text-muted-foreground'
                         }`}
                       >
                         {completedSteps.includes(step.id) ? (
                           <CheckCircle className="w-5 h-5" />
                         ) : (
                           <span className="font-bold text-sm">{step.id}</span>
                         )}
                       </button>
                       <div>
                         <h3 className="text-lg font-bold text-foreground">{step.title}</h3>
                         <p className="text-sm text-muted-foreground">{step.duration}</p>
                       </div>
                     </div>
                   </div>
 
                   <p className="text-muted-foreground mb-4">{step.description}</p>
 
                   {/* Skills */}
                   <div className="flex flex-wrap gap-2 mb-4">
                     {step.skills.map((skill) => (
                       <Badge key={skill} variant="secondary" className="text-xs">
                         {skill}
                       </Badge>
                     ))}
                   </div>
 
                   {/* Resources */}
                   <div className="flex flex-wrap gap-2">
                     {step.resources.map((resource) => (
                       <Button
                         key={resource.name}
                         variant="outline"
                         size="sm"
                         className="gap-2"
                         asChild
                       >
                         <a href={resource.url}>
                           <BookOpen className="w-3 h-3" />
                           {resource.name}
                           <ExternalLink className="w-3 h-3" />
                         </a>
                       </Button>
                     ))}
                   </div>
                 </div>
               </div>
             ))}
           </div>
         </div>
 
         {/* Entry Level Roles */}
         <div className="mt-12 bg-card rounded-2xl border border-border p-6">
           <h2 className="text-xl font-bold text-foreground mb-4">Entry-Level Job Roles</h2>
           <div className="flex flex-wrap gap-3">
             <Badge className="bg-primary/10 text-primary border-primary/20">Junior {roadmap.title}</Badge>
             <Badge className="bg-primary/10 text-primary border-primary/20">{roadmap.title} Intern</Badge>
             <Badge className="bg-primary/10 text-primary border-primary/20">Associate {roadmap.title}</Badge>
           </div>
         </div>
       </div>
     </Layout>
   );
 };
 
 export default CareerRoadmapDetail;