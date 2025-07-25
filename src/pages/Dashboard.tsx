import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, BookOpen, Users, MessageSquare, Clock } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { collection, query, orderBy, limit, getDocs, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Navbar from '@/components/Navbar';
import ProtectedRoute from '@/components/ProtectedRoute';

interface Course {
  id: string;
  courseName: string;
  courseCode: string;
  teacherId: string;
  teacherName: string;
}

const Dashboard = () => {
  const { userProfile } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const coursesRef = collection(db, 'courses');
      const q = query(coursesRef, orderBy('courseName'));
      const snapshot = await getDocs(q);
      
      const coursesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Course[];
      
      setCourses(coursesData);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <Navbar />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  Welcome back, {userProfile?.name}!
                </h1>
                <p className="text-muted-foreground mt-2">
                  Manage your courses and collaborate with peers
                </p>
              </div>
              
              {userProfile?.role === 'teacher' && (
                <Button
                  onClick={() => navigate('/create-course')}
                  className="bg-gradient-primary"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Course
                </Button>
              )}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="shadow-card">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">Total Courses</p>
                    <p className="text-2xl font-bold text-foreground">{courses.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-success/10 rounded-lg">
                    <Users className="h-6 w-6 text-success" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">Enrolled</p>
                    <p className="text-2xl font-bold text-foreground">
                      {userProfile?.enrolledCourses?.length || 0}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-warning/10 rounded-lg">
                    <MessageSquare className="h-6 w-6 text-warning" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">Q&A Active</p>
                    <p className="text-2xl font-bold text-foreground">5</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Courses Grid */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Available Courses</h2>
            
            {courses.length === 0 ? (
              <Card className="shadow-card">
                <CardContent className="p-12 text-center">
                  <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">No courses yet</h3>
                  <p className="text-muted-foreground mb-6">
                    {userProfile?.role === 'teacher' 
                      ? 'Create your first course to get started' 
                      : 'No courses available. Check back later!'}
                  </p>
                  {userProfile?.role === 'teacher' && (
                    <Button onClick={() => navigate('/create-course')} className="bg-gradient-primary">
                      <Plus className="h-4 w-4 mr-2" />
                      Create Your First Course
                    </Button>
                  )}
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                  <Card key={course.id} className="shadow-card hover:shadow-elegant transition-shadow cursor-pointer">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{course.courseName}</CardTitle>
                          <CardDescription className="font-mono text-primary">
                            {course.courseCode}
                          </CardDescription>
                        </div>
                        {userProfile?.uid === course.teacherId && (
                          <Badge variant="secondary">Owner</Badge>
                        )}
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Users className="h-4 w-4 mr-2" />
                          Instructor: {course.teacherName}
                        </div>
                        
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="h-4 w-4 mr-2" />
                          Last updated: Recently
                        </div>
                        
                        <Link to={`/course/${course.id}`}>
                          <Button className="w-full bg-gradient-primary">
                            Enter Course
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;