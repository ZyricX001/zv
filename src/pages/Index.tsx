import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, BookOpen, MessageSquare, Users, Upload, CheckCircle, ArrowRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import heroImage from '@/assets/hero-campus.jpg';

const Index = () => {
  const { currentUser } = useAuth();

  const features = [
    {
      icon: BookOpen,
      title: "Resource Sharing",
      description: "Upload and access academic materials, lecture notes, and study guides in one centralized location."
    },
    {
      icon: MessageSquare,
      title: "Q&A System",
      description: "Ask questions, get answers from peers and instructors, and build a collaborative knowledge base."
    },
    {
      icon: Users,
      title: "Course Collaboration",
      description: "Join courses, participate in discussions, and connect with classmates and teachers."
    },
    {
      icon: CheckCircle,
      title: "Verified Content",
      description: "Teachers can verify and endorse high-quality resources and accurate answers."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
                  Connect, Learn,
                  <span className="text-primary"> Collaborate</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl">
                  CampusConnect brings students and teachers together in a modern academic hub. 
                  Share resources, ask questions, and build knowledge collaboratively.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                {currentUser ? (
                  <Link to="/dashboard">
                    <Button size="lg" className="bg-gradient-primary text-lg px-8 py-3">
                      Go to Dashboard
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Link to="/register">
                      <Button size="lg" className="bg-gradient-primary text-lg px-8 py-3">
                        Get Started
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                    <Link to="/login">
                      <Button size="lg" variant="outline" className="text-lg px-8 py-3">
                        Sign In
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
            
            <div className="relative">
              <img
                src={heroImage}
                alt="Students collaborating on campus"
                className="rounded-2xl shadow-elegant w-full"
              />
              <div className="absolute -bottom-6 -right-6 bg-card rounded-xl p-4 shadow-card border">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <GraduationCap className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Academic Excellence</p>
                    <p className="text-sm text-muted-foreground">Powered by collaboration</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything you need for academic success
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Streamlined tools designed to enhance learning, collaboration, and knowledge sharing
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="shadow-card hover:shadow-elegant transition-shadow">
                <CardHeader>
                  <div className="p-3 bg-primary/10 rounded-lg w-fit mb-4">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-primary rounded-3xl p-12 text-primary-foreground">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to transform your academic experience?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of students and teachers already collaborating on CampusConnect
            </p>
            {!currentUser && (
              <Link to="/register">
                <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
                  Create Your Account
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
