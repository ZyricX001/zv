import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Plus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { toast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import ProtectedRoute from '@/components/ProtectedRoute';

const CreateCourse = () => {
  const [formData, setFormData] = useState({
    courseName: '',
    courseCode: '',
    description: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { userProfile } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userProfile) return;

    setIsLoading(true);
    try {
      const courseData = {
        courseName: formData.courseName,
        courseCode: formData.courseCode,
        description: formData.description,
        teacherId: userProfile.uid,
        teacherName: userProfile.name,
        createdAt: new Date()
      };

      const docRef = await addDoc(collection(db, 'courses'), courseData);
      
      toast({
        title: "Course Created!",
        description: `${formData.courseName} has been successfully created.`,
      });

      navigate(`/course/${docRef.id}`);
    } catch (error) {
      console.error('Error creating course:', error);
      toast({
        title: "Error",
        description: "Failed to create course. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ProtectedRoute requiredRole="teacher">
      <div className="min-h-screen bg-background">
        <Navbar />
        
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <Button
              variant="ghost"
              onClick={() => navigate('/dashboard')}
              className="mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            
            <h1 className="text-3xl font-bold text-foreground">Create New Course</h1>
            <p className="text-muted-foreground mt-2">
              Set up a new course for your students to join and collaborate
            </p>
          </div>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Plus className="h-5 w-5 mr-2 text-primary" />
                Course Details
              </CardTitle>
              <CardDescription>
                Provide the basic information for your new course
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="courseName">Course Name *</Label>
                  <Input
                    id="courseName"
                    name="courseName"
                    type="text"
                    value={formData.courseName}
                    onChange={handleInputChange}
                    placeholder="e.g., Data Structures and Algorithms"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="courseCode">Course Code *</Label>
                  <Input
                    id="courseCode"
                    name="courseCode"
                    type="text"
                    value={formData.courseCode}
                    onChange={handleInputChange}
                    placeholder="e.g., CS-301"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Brief description of the course content and objectives..."
                    rows={4}
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate('/dashboard')}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-gradient-primary"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Creating...' : 'Create Course'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default CreateCourse;