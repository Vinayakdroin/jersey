import { ProductCard } from './product-card';
import { Jersey } from '@shared/schema';

interface ProductSectionProps {
  title: string;
  jerseys: Jersey[];
  showViewAll?: boolean;
  id?: string;
}

export function ProductSection({ title, jerseys, showViewAll = true, id }: ProductSectionProps) {
  if (jerseys.length === 0) {
    return null;
  }

  return (
    <section className="mb-12" id={id}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-secondary-custom">{title}</h2>
        {showViewAll && (
          <button className="text-primary-custom hover:text-blue-700 font-medium transition-colors">
            View All
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {jerseys.map((jersey) => (
          <ProductCard key={jersey.id} jersey={jersey} />
        ))}
      </div>
    </section>
  );
}
