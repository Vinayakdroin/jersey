import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Save, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function GoogleFormConfig() {
  const [formUrl, setFormUrl] = useState(
    localStorage.getItem('googleFormUrl') || 'https://docs.google.com/forms/d/e/1FAIpQLSfXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/viewform'
  );
  const { toast } = useToast();

  const handleSave = () => {
    localStorage.setItem('googleFormUrl', formUrl);
    toast({ 
      title: 'Success', 
      description: 'Google Form URL updated successfully' 
    });
  };

  const testForm = () => {
    const testUrl = formUrl + '?entry.1234567890=Test Jersey&entry.0987654321=₹2,499';
    window.open(testUrl, '_blank');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <ExternalLink className="h-5 w-5" />
          <span>Google Form Configuration</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block">
            Google Form URL for Order Processing
          </label>
          <Input
            value={formUrl}
            onChange={(e) => setFormUrl(e.target.value)}
            placeholder="https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform"
            className="mb-2"
          />
          <p className="text-xs text-gray-600">
            This form will open when customers click "Buy Now" buttons
          </p>
        </div>
        
        <div className="flex space-x-2">
          <Button onClick={handleSave} className="flex-1">
            <Save className="h-4 w-4 mr-2" />
            Save URL
          </Button>
          <Button onClick={testForm} variant="outline">
            Test Form
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}