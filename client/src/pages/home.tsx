import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Header } from '@/components/header';
import { BannerCarousel } from '@/components/banner-carousel';
import { ProductSection } from '@/components/product-section';
import { Footer } from '@/components/footer';
import { Jersey, Banner } from '@shared/schema';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const { data: jerseys = [], isLoading: jerseysLoading } = useQuery<Jersey[]>({
    queryKey: ['/api/jerseys'],
  });

  const { data: banners = [], isLoading: bannersLoading } = useQuery<Banner[]>({
    queryKey: ['/api/banners'],
  });

  // Filter and sort jerseys
  const filteredJerseys = useMemo(() => {
    let filtered = jerseys;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(jersey => jersey.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(jersey => 
        jersey.name.toLowerCase().includes(query) ||
        jersey.team.toLowerCase().includes(query) ||
        jersey.description?.toLowerCase().includes(query)
      );
    }

    // Sort jerseys
    if (sortBy) {
      filtered = [...filtered].sort((a, b) => {
        switch (sortBy) {
          case 'price-low':
            return a.price - b.price;
          case 'price-high':
            return b.price - a.price;
          case 'popular':
            return (b.tags?.includes('popular') ? 1 : 0) - (a.tags?.includes('popular') ? 1 : 0);
          case 'featured':
            return (b.tags?.includes('featured') ? 1 : 0) - (a.tags?.includes('featured') ? 1 : 0);
          default:
            return 0;
        }
      });
    }

    return filtered;
  }, [jerseys, selectedCategory, searchQuery, sortBy]);

  // Group jerseys by tags
  const featuredJerseys = filteredJerseys.filter(jersey => 
    jersey.tags?.includes('featured')
  ).slice(0, 8);

  const topDeals = filteredJerseys.filter(jersey => 
    jersey.tags?.includes('top-deals')
  ).slice(0, 8);

  const newArrivals = filteredJerseys.filter(jersey => 
    jersey.tags?.includes('new-arrivals')
  ).slice(0, 8);

  if (jerseysLoading || bannersLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-custom mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading jerseys...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortBy={sortBy}
        onSortChange={setSortBy}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <BannerCarousel banners={banners} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Show filtered results if searching/filtering */}
        {(searchQuery || selectedCategory !== 'all' || sortBy) && (
          <ProductSection
            title={`${searchQuery ? `Results for "${searchQuery}"` : 'All Jerseys'} (${filteredJerseys.length})`}
            jerseys={filteredJerseys}
            showViewAll={false}
          />
        )}

        {/* Show sections only if not filtering */}
        {!searchQuery && selectedCategory === 'all' && !sortBy && (
          <>
            <ProductSection
              title="Featured Jerseys"
              jerseys={featuredJerseys}
              id="featured"
            />

            <ProductSection
              title="Top Deals"
              jerseys={topDeals}
              id="top-deals"
            />

            <ProductSection
              title="New Arrivals"
              jerseys={newArrivals}
              id="new-arrivals"
            />
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
