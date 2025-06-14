import { Heart, ShoppingBag, Trash2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWishlist } from '@/hooks/use-wishlist';
import { formatPrice, openGoogleForm } from '@/lib/google-forms';
import { Link } from 'wouter';

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();

  const handleBuyFromWishlist = (item: any) => {
    openGoogleForm({
      jerseyName: item.name,
      jerseyPrice: formatPrice(item.price),
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-secondary-custom">My Wishlist</h1>
          </div>
          <div className="text-gray-600">
            {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'}
          </div>
        </div>

        {wishlist.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="h-24 w-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-600 mb-4">Your wishlist is empty</h2>
            <p className="text-gray-500 mb-8">Discover amazing jerseys and add them to your wishlist</p>
            <Link href="/">
              <Button className="bg-primary-custom hover:bg-blue-700">
                Start Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlist.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative">
                  <img 
                    src={item.imageUrl} 
                    alt={item.name}
                    className="w-full h-64 object-cover"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-3 right-3 bg-white rounded-full shadow-md hover:bg-gray-50"
                    onClick={() => removeFromWishlist(item.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </Button>
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{item.team}</p>
                  <p className="text-2xl font-bold text-primary-custom mb-4">
                    {formatPrice(item.price)}
                  </p>
                  
                  <div className="space-y-2">
                    <Button
                      className="w-full bg-primary-custom hover:bg-blue-700"
                      onClick={() => handleBuyFromWishlist(item)}
                    >
                      <ShoppingBag className="h-4 w-4 mr-2" />
                      Buy Now
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
                      onClick={() => removeFromWishlist(item.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Remove from Wishlist
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
