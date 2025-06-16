import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { AdminLogin } from '@/components/admin-login';
import { Plus, Pencil, Trash2, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { Jersey, Banner, InsertJersey, InsertBanner } from '@shared/schema';
import { formatPrice } from '@/lib/google-forms';

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [editingJersey, setEditingJersey] = useState<Jersey | null>(null);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);
  const [isAddingJersey, setIsAddingJersey] = useState(false);
  const [isAddingBanner, setIsAddingBanner] = useState(false);
  const { toast } = useToast();

  if (!isLoggedIn) {
    return <AdminLogin onLogin={() => setIsLoggedIn(true)} />;
  }

  const { data: jerseys = [], isLoading: jerseysLoading } = useQuery<Jersey[]>({
    queryKey: ['/api/jerseys'],
  });

  const { data: banners = [], isLoading: bannersLoading } = useQuery<Banner[]>({
    queryKey: ['/api/banners'],
  });

  // Jersey mutations
  const createJerseyMutation = useMutation({
    mutationFn: (jersey: InsertJersey) => apiRequest('POST', '/api/jerseys', jersey),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/jerseys'] });
      setIsAddingJersey(false);
      toast({ title: 'Success', description: 'Jersey created successfully' });
    },
    onError: () => {
      toast({ title: 'Error', description: 'Failed to create jersey', variant: 'destructive' });
    },
  });

  const updateJerseyMutation = useMutation({
    mutationFn: ({ id, ...jersey }: Partial<Jersey> & { id: number }) => 
      apiRequest('PUT', `/api/jerseys/${id}`, jersey),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/jerseys'] });
      setEditingJersey(null);
      toast({ title: 'Success', description: 'Jersey updated successfully' });
    },
    onError: () => {
      toast({ title: 'Error', description: 'Failed to update jersey', variant: 'destructive' });
    },
  });

  const deleteJerseyMutation = useMutation({
    mutationFn: (id: number) => apiRequest('DELETE', `/api/jerseys/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/jerseys'] });
      toast({ title: 'Success', description: 'Jersey deleted successfully' });
    },
    onError: () => {
      toast({ title: 'Error', description: 'Failed to delete jersey', variant: 'destructive' });
    },
  });

  // Banner mutations
  const createBannerMutation = useMutation({
    mutationFn: (banner: InsertBanner) => apiRequest('POST', '/api/banners', banner),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/banners'] });
      setIsAddingBanner(false);
      toast({ title: 'Success', description: 'Banner created successfully' });
    },
    onError: () => {
      toast({ title: 'Error', description: 'Failed to create banner', variant: 'destructive' });
    },
  });

  const updateBannerMutation = useMutation({
    mutationFn: ({ id, ...banner }: Partial<Banner> & { id: number }) => 
      apiRequest('PUT', `/api/banners/${id}`, banner),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/banners'] });
      setEditingBanner(null);
      toast({ title: 'Success', description: 'Banner updated successfully' });
    },
    onError: () => {
      toast({ title: 'Error', description: 'Failed to update banner', variant: 'destructive' });
    },
  });

  const deleteBannerMutation = useMutation({
    mutationFn: (id: number) => apiRequest('DELETE', `/api/banners/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/banners'] });
      toast({ title: 'Success', description: 'Banner deleted successfully' });
    },
    onError: () => {
      toast({ title: 'Error', description: 'Failed to delete banner', variant: 'destructive' });
    },
  });

  const JerseyForm = ({ jersey, onSave, onCancel }: any) => {
    const [formData, setFormData] = useState({
      name: jersey?.name || '',
      price: jersey?.price || 0,
      originalPrice: jersey?.originalPrice || 0,
      imageUrl: jersey?.imageUrl || '',
      category: jersey?.category || 'club',
      tags: jersey?.tags?.join(', ') || '',
      description: jersey?.description || '',
      team: jersey?.team || '',
      season: jersey?.season || '',
      isActive: jersey?.isActive ?? true,
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const jerseyData = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
        price: Number(formData.price),
        originalPrice: formData.originalPrice ? Number(formData.originalPrice) : undefined,
      };
      onSave(jerseyData);
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input
            placeholder="Jersey Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <Input
            placeholder="Team"
            value={formData.team}
            onChange={(e) => setFormData({ ...formData, team: e.target.value })}
            required
          />
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <Input
            type="number"
            placeholder="Price (in paise)"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
            required
          />
          <Input
            type="number"
            placeholder="Original Price (optional)"
            value={formData.originalPrice}
            onChange={(e) => setFormData({ ...formData, originalPrice: Number(e.target.value) })}
          />
          <Input
            placeholder="Season"
            value={formData.season}
            onChange={(e) => setFormData({ ...formData, season: e.target.value })}
          />
        </div>

        <Input
          placeholder="Image URL"
          value={formData.imageUrl}
          onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
          required
        />

        <div className="grid grid-cols-2 gap-4">
          <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="club">Club</SelectItem>
              <SelectItem value="national">National</SelectItem>
              <SelectItem value="retro">Retro</SelectItem>
            </SelectContent>
          </Select>
          
          <Input
            placeholder="Tags (comma separated)"
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
          />
        </div>

        <Textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />

        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
          <Button type="submit">
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
        </div>
      </form>
    );
  };

  const BannerForm = ({ banner, onSave, onCancel }: any) => {
    const [formData, setFormData] = useState({
      title: banner?.title || '',
      subtitle: banner?.subtitle || '',
      imageUrl: banner?.imageUrl || '',
      ctaText: banner?.ctaText || '',
      ctaLink: banner?.ctaLink || '',
      order: banner?.order || 0,
      isActive: banner?.isActive ?? true,
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSave(formData);
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input
            placeholder="Banner Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
          <Input
            placeholder="Subtitle"
            value={formData.subtitle}
            onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
          />
        </div>

        <Input
          placeholder="Image URL"
          value={formData.imageUrl}
          onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
          required
        />

        <div className="grid grid-cols-3 gap-4">
          <Input
            placeholder="CTA Text"
            value={formData.ctaText}
            onChange={(e) => setFormData({ ...formData, ctaText: e.target.value })}
          />
          <Input
            placeholder="CTA Link"
            value={formData.ctaLink}
            onChange={(e) => setFormData({ ...formData, ctaLink: e.target.value })}
          />
          <Input
            type="number"
            placeholder="Order"
            value={formData.order}
            onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
          />
        </div>

        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
          <Button type="submit">
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
        </div>
      </form>
    );
  };

  if (jerseysLoading || bannersLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-custom mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-secondary-custom mb-8">Admin Panel</h1>

        <Tabs defaultValue="jerseys" className="space-y-6">
          <TabsList>
            <TabsTrigger value="jerseys">Jerseys</TabsTrigger>
            <TabsTrigger value="banners">Banners</TabsTrigger>
          </TabsList>

          <TabsContent value="jerseys" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Manage Jerseys</h2>
              <Button onClick={() => setIsAddingJersey(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Jersey
              </Button>
            </div>

            {isAddingJersey && (
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">Add New Jersey</h3>
                <JerseyForm
                  onSave={(data: InsertJersey) => createJerseyMutation.mutate(data)}
                  onCancel={() => setIsAddingJersey(false)}
                />
              </div>
            )}

            <div className="grid gap-6">
              {jerseys.map((jersey) => (
                <div key={jersey.id} className="bg-white p-6 rounded-lg shadow">
                  {editingJersey?.id === jersey.id ? (
                    <JerseyForm
                      jersey={jersey}
                      onSave={(data: Partial<Jersey>) => updateJerseyMutation.mutate({ id: jersey.id, ...data })}
                      onCancel={() => setEditingJersey(null)}
                    />
                  ) : (
                    <div className="flex items-start justify-between">
                      <div className="flex space-x-4">
                        <img src={jersey.imageUrl} alt={jersey.name} className="w-20 h-20 object-cover rounded" />
                        <div>
                          <h3 className="text-lg font-semibold">{jersey.name}</h3>
                          <p className="text-gray-600">{jersey.team} - {jersey.season}</p>
                          <p className="text-primary-custom font-bold">{formatPrice(jersey.price)}</p>
                          <div className="flex space-x-2 mt-2">
                            {jersey.tags?.map((tag) => (
                              <Badge key={tag} variant="outline">{tag}</Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditingJersey(jersey)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => deleteJerseyMutation.mutate(jersey.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="banners" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Manage Banners</h2>
              <Button onClick={() => setIsAddingBanner(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Banner
              </Button>
            </div>

            {isAddingBanner && (
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">Add New Banner</h3>
                <BannerForm
                  onSave={(data: InsertBanner) => createBannerMutation.mutate(data)}
                  onCancel={() => setIsAddingBanner(false)}
                />
              </div>
            )}

            <div className="grid gap-6">
              {banners.map((banner) => (
                <div key={banner.id} className="bg-white p-6 rounded-lg shadow">
                  {editingBanner?.id === banner.id ? (
                    <BannerForm
                      banner={banner}
                      onSave={(data: Partial<Banner>) => updateBannerMutation.mutate({ id: banner.id, ...data })}
                      onCancel={() => setEditingBanner(null)}
                    />
                  ) : (
                    <div className="flex items-start justify-between">
                      <div className="flex space-x-4">
                        <img src={banner.imageUrl} alt={banner.title} className="w-32 h-20 object-cover rounded" />
                        <div>
                          <h3 className="text-lg font-semibold">{banner.title}</h3>
                          <p className="text-gray-600">{banner.subtitle}</p>
                          <p className="text-sm text-gray-500">Order: {banner.order}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditingBanner(banner)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => deleteBannerMutation.mutate(banner.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
