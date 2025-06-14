import { X, ShoppingBag, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWishlist } from '@/hooks/use-wishlist';
import { formatPrice, openGoogleForm } from '@/lib/google-forms';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WishlistModal({ isOpen, onClose }: WishlistModalProps) {
  const { wishlist, removeFromWishlist } = useWishlist();

  const handleBuyFromWishlist = (item: any) => {
    openGoogleForm({
      jerseyName: item.name,
      jerseyPrice: formatPrice(item.price),
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="w-full md:w-96 h-full bg-white shadow-lg transform transition-transform duration-300">
        <div className="p-6 h-full flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-secondary-custom">My Wishlist</h3>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          {wishlist.length === 0 ? (
            <div className="flex-1 flex items-center justify-center text-center">
              <div>
                <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg mb-2">Your wishlist is empty</p>
                <p className="text-gray-400 text-sm">Add some jerseys to your wishlist to see them here</p>
              </div>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto space-y-4">
              {wishlist.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                  <img 
                    src={item.imageUrl} 
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold truncate">{item.name}</h4>
                    <p className="text-sm text-gray-600">{item.team}</p>
                    <p className="text-primary-custom font-bold">{formatPrice(item.price)}</p>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <Button
                      size="sm"
                      className="text-xs"
                      onClick={() => handleBuyFromWishlist(item)}
                    >
                      <ShoppingBag className="h-3 w-3 mr-1" />
                      Buy
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs text-red-600 hover:text-red-700"
                      onClick={() => removeFromWishlist(item.id)}
                    >
                      <Trash2 className="h-3 w-3 mr-1" />
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
