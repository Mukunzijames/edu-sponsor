"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Loader2, School } from "lucide-react";
import { toast } from "sonner";
import { schoolService, CreateSchoolData } from "@/services/schoolService";
import { SchoolOnly } from "@/components/RoleGuard";

interface AddSchoolFormProps {
  onSchoolAdded?: () => void;
}

export const AddSchoolForm = ({ onSchoolAdded }: AddSchoolFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<CreateSchoolData>({
    name: '',
    description: '',
    district: ''
  });

  const handleInputChange = (field: keyof CreateSchoolData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name.trim() || !formData.description.trim() || !formData.district.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    
    try {
      await schoolService.createSchool(formData);
      toast.success('School added successfully!');
      
      // Reset form
      setFormData({
        name: '',
        description: '',
        district: ''
      });
      
      setIsOpen(false);
      onSchoolAdded?.();
    } catch (error: any) {
      console.error('Error adding school:', error);
      toast.error(error.response?.data?.message || 'Failed to add school. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SchoolOnly>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button className="bg-indigo-600 hover:bg-indigo-700">
            <Plus className="w-4 h-4 mr-2" />
            Add School
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-indigo-600">
              <School className="w-5 h-5" />
              Add New School
            </DialogTitle>
          </DialogHeader>
          <Card className="border-0 shadow-none">
            <CardContent className="p-0">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">
                    School Name *
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter school name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="district" className="text-sm font-medium">
                    District *
                  </Label>
                  <Input
                    id="district"
                    type="text"
                    placeholder="Enter district name"
                    value={formData.district}
                    onChange={(e) => handleInputChange('district', e.target.value)}
                    className="w-full"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-sm font-medium">
                    Description *
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Enter school description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className="w-full resize-none"
                    rows={4}
                    required
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsOpen(false)}
                    disabled={isLoading}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-700"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Adding School...
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4 mr-2" />
                        Add School
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog>
    </SchoolOnly>
  );
}; 