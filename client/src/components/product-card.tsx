import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Jersey } from '@shared/schema';
import { useWishlist } from '@/hooks/use-wishlist';
import { formatPrice, openGoogleForm } from '@/lib/google-forms';
import { WishlistItem } from '@/lib/types';

interface ProductCardProps {
  jersey: Jersey;
}

export function ProductCard({ jersey }: ProductCardProps) {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const isWishlisted = isInWishlist(jersey.id);
  const hasDiscount = jersey.originalPrice && jersey.originalPrice > jersey.price;
  const discountPercentage = hasDiscount 
    ? Math.round(((jersey.originalPrice! - jersey.price) / jersey.originalPrice!) * 100)
    : 0;

  const handleWishlistToggle = () => {
    if (isWishlisted) {
      removeFromWishlist(jersey.id);
    } else {
      const wishlistItem: WishlistItem = {
        id: jersey.id,
        name: jersey.name,
        price: jersey.price,
        imageUrl: jersey.imageUrl,
        team: jersey.team,
      };
      addToWishlist(wishlistItem);
    }
  };

  const handleBuyNow = () => {
    openGoogleForm({
      jerseyName: jersey.name,
      jerseyPrice: formatPrice(jersey.price),
    });
  };

  const getBadgeVariant = (tag: string) => {
    switch (tag) {
      case 'featured':
        return 'default';
      case 'new-arrivals':
        return 'secondary';
      case 'top-deals':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  return (
    <div className="jersey-card">
      <div className="relative overflow-hidden">
        <img 
          src={jersey.imageUrl} 
          alt={jersey.name}
          className="jersey-card-image"
        />
        
        {/* Discount Badge */}
        {hasDiscount && (
          <Badge 
            variant="destructive" 
            className="absolute top-3 left-3 bg-accent-custom text-white"
          >
            {discountPercentage}% OFF
          </Badge>
        )}
        
        {/* Tag Badges */}
        {jersey.tags && jersey.tags.length > 0 && !hasDiscount && (
          <div className="absolute top-3 left-3 flex flex-wrap gap-1">
            {jersey.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant={getBadgeVariant(tag)} className="text-xs">
                {tag.replace('-', ' ').toUpperCase()}
              </Badge>
            ))}
          </div>
        )}
        
        {/* Wishlist Button */}
        <Button
          variant="ghost"
          size="icon"
          className="wishlist-button absolute top-3 right-3"
          onClick={handleWishlistToggle}
        >
          <Heart 
            className={`h-4 w-4 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600 hover:text-red-500'}`} 
          />
        </Button>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">{jersey.name}</h3>
        <p className="text-sm text-gray-600 mb-3">{jersey.team}</p>
        
        <div className="flex items-center justify-between mb-3">
          <span className="text-2xl font-bold text-primary-custom">
            {formatPrice(jersey.price)}
          </span>
          {hasDiscount && (
            <span className="text-sm text-gray-500 line-through">
              {formatPrice(jersey.originalPrice!)}
            </span>
          )}
        </div>
        
        <Button 
          className="buy-button"
          onClick={handleBuyNow}
        >
          Buy Now
        </Button>
      </div>
    </div>
  );
}
