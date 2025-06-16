import { jerseys, banners, orders, type Jersey, type InsertJersey, type Banner, type InsertBanner, type Order, type InsertOrder } from "@shared/schema";

export interface IStorage {
  // Jersey methods
  getJerseys(): Promise<Jersey[]>;
  getJersey(id: number): Promise<Jersey | undefined>;
  createJersey(jersey: InsertJersey): Promise<Jersey>;
  updateJersey(id: number, jersey: Partial<InsertJersey>): Promise<Jersey | undefined>;
  deleteJersey(id: number): Promise<boolean>;
  
  // Banner methods
  getBanners(): Promise<Banner[]>;
  getBanner(id: number): Promise<Banner | undefined>;
  createBanner(banner: InsertBanner): Promise<Banner>;
  updateBanner(id: number, banner: Partial<InsertBanner>): Promise<Banner | undefined>;
  deleteBanner(id: number): Promise<boolean>;
  
  // Order methods
  getOrders(): Promise<Order[]>;
  createOrder(order: InsertOrder): Promise<Order>;
}

export class MemStorage implements IStorage {
  private jerseys: Map<number, Jersey>;
  private banners: Map<number, Banner>;
  private orders: Map<number, Order>;
  private currentJerseyId: number;
  private currentBannerId: number;
  private currentOrderId: number;

  constructor() {
    this.jerseys = new Map();
    this.banners = new Map();
    this.orders = new Map();
    this.currentJerseyId = 1;
    this.currentBannerId = 1;
    this.currentOrderId = 1;
    
    // Initialize with sample data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Sample football jerseys
    const sampleJerseys: InsertJersey[] = [
      {
        name: "Barcelona Home 2024",
        price: 249900, // ₹2,499
        originalPrice: 349900,
        imageUrl: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        category: "club",
        tags: ["featured", "popular"],
        team: "FC Barcelona",
        season: "2024-25",
        description: "Official Barcelona home jersey with Nike Dri-FIT technology",
        isActive: true,
      },
      {
        name: "Real Madrid Home 2024",
        price: 269900,
        originalPrice: 369900,
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        category: "club",
        tags: ["featured", "popular"],
        team: "Real Madrid",
        season: "2024-25",
        description: "Official Real Madrid home jersey - Los Blancos iconic white",
        isActive: true,
      },
      {
        name: "Manchester United Home 2024",
        price: 259900,
        originalPrice: 359900,
        imageUrl: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        category: "club",
        tags: ["featured"],
        team: "Manchester United",
        season: "2024-25",
        description: "Official Manchester United home jersey - Red Devils",
        isActive: true,
      },
      {
        name: "Liverpool Home 2024",
        price: 239900,
        originalPrice: 339900,
        imageUrl: "https://images.unsplash.com/photo-1577223625816-7546f13df25d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        category: "club",
        tags: ["featured"],
        team: "Liverpool FC",
        season: "2024-25",
        description: "Official Liverpool home jersey - You'll Never Walk Alone",
        isActive: true,
      },
      {
        name: "Argentina World Cup 2022",
        price: 179900,
        originalPrice: 299900,
        imageUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        category: "national",
        tags: ["top-deals", "world-cup"],
        team: "Argentina National Team",
        season: "2022",
        description: "Messi's World Cup winning jersey - Historic victory",
        isActive: true,
      },
      {
        name: "Brazil Home 2024",
        price: 189900,
        originalPrice: 289900,
        imageUrl: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        category: "national",
        tags: ["top-deals"],
        team: "Brazil National Team",
        season: "2024",
        description: "Seleção jersey - Jogo Bonito tradition",
        isActive: true,
      },
      {
        name: "Manchester City Home 2024",
        price: 279900,
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        category: "club",
        tags: ["new-arrivals", "premium"],
        team: "Manchester City",
        season: "2024-25",
        description: "Citizens home jersey - Treble winners edition",
        isActive: true,
      },
      {
        name: "Arsenal Home 2024",
        price: 259900,
        imageUrl: "https://images.unsplash.com/photo-1577223625816-7546f13df25d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        category: "club",
        tags: ["new-arrivals"],
        team: "Arsenal FC",
        season: "2024-25",
        description: "Gunners home jersey - North London pride",
        isActive: true,
      },
      {
        name: "PSG Home 2024",
        price: 289900,
        originalPrice: 389900,
        imageUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        category: "club",
        tags: ["featured", "premium"],
        team: "Paris Saint-Germain",
        season: "2024-25",
        description: "PSG home jersey with Mbappe legacy design",
        isActive: true,
      },
      {
        name: "Chelsea Home 2024",
        price: 249900,
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        category: "club",
        tags: ["new-arrivals"],
        team: "Chelsea FC",
        season: "2024-25",
        description: "Blues home jersey - Stamford Bridge heritage",
        isActive: true,
      },
      {
        name: "Inter Milan Retro 1990",
        price: 199900,
        originalPrice: 279900,
        imageUrl: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        category: "retro",
        tags: ["retro", "top-deals"],
        team: "Inter Milan",
        season: "1989-90",
        description: "Classic Nerazzurri jersey from legendary season",
        isActive: true,
      },
      {
        name: "AC Milan Retro 2007",
        price: 219900,
        originalPrice: 299900,
        imageUrl: "https://images.unsplash.com/photo-1577223625816-7546f13df25d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        category: "retro",
        tags: ["retro", "champions-league"],
        team: "AC Milan",
        season: "2006-07",
        description: "Champions League winning jersey - Kaká masterpiece",
        isActive: true,
      }
    ];

    sampleJerseys.forEach(jersey => {
      this.createJersey(jersey);
    });

    // Sample football banners
    const sampleBanners: InsertBanner[] = [
      {
        title: "UEFA Champions League Collection",
        subtitle: "Official jerseys from Europe's elite clubs - Up to 40% off",
        imageUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=600",
        ctaText: "Shop Champions League",
        ctaLink: "#featured",
        isActive: true,
        order: 1,
      },
      {
        title: "World Cup Legends",
        subtitle: "Messi's Argentina & iconic national team jerseys available now",
        imageUrl: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=600",
        ctaText: "World Cup Collection",
        ctaLink: "#top-deals",
        isActive: true,
        order: 2,
      },
      {
        title: "Premier League 2024-25",
        subtitle: "Latest season jerseys from Manchester United, Liverpool, Arsenal & more",
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=600",
        ctaText: "Premier League Jerseys",
        ctaLink: "#new-arrivals",
        isActive: true,
        order: 3,
      },
      {
        title: "Retro Football Classics",
        subtitle: "Vintage jerseys from legendary seasons - Inter Milan 1990, AC Milan 2007",
        imageUrl: "https://images.unsplash.com/photo-1577223625816-7546f13df25d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=600",
        ctaText: "Retro Collection",
        ctaLink: "#retro",
        isActive: true,
        order: 4,
      },
      {
        title: "La Liga Giants",
        subtitle: "Real Madrid vs Barcelona - El Clasico rivalry jerseys",
        imageUrl: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=600",
        ctaText: "El Clasico Collection",
        ctaLink: "#featured",
        isActive: true,
        order: 5,
      }
    ];

    sampleBanners.forEach(banner => {
      this.createBanner(banner);
    });
  }

  // Jersey methods
  async getJerseys(): Promise<Jersey[]> {
    return Array.from(this.jerseys.values()).filter(jersey => jersey.isActive);
  }

  async getJersey(id: number): Promise<Jersey | undefined> {
    return this.jerseys.get(id);
  }

  async createJersey(insertJersey: InsertJersey): Promise<Jersey> {
    const id = this.currentJerseyId++;
    const jersey: Jersey = { 
      ...insertJersey, 
      id,
      originalPrice: insertJersey.originalPrice ?? null,
      tags: insertJersey.tags ?? null,
      description: insertJersey.description ?? null,
      season: insertJersey.season ?? null,
      isActive: insertJersey.isActive ?? true
    };
    this.jerseys.set(id, jersey);
    return jersey;
  }

  async updateJersey(id: number, updates: Partial<InsertJersey>): Promise<Jersey | undefined> {
    const jersey = this.jerseys.get(id);
    if (!jersey) return undefined;
    
    const updatedJersey = { ...jersey, ...updates };
    this.jerseys.set(id, updatedJersey);
    return updatedJersey;
  }

  async deleteJersey(id: number): Promise<boolean> {
    return this.jerseys.delete(id);
  }

  // Banner methods
  async getBanners(): Promise<Banner[]> {
    return Array.from(this.banners.values())
      .filter(banner => banner.isActive)
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }

  async getBanner(id: number): Promise<Banner | undefined> {
    return this.banners.get(id);
  }

  async createBanner(insertBanner: InsertBanner): Promise<Banner> {
    const id = this.currentBannerId++;
    const banner: Banner = { 
      ...insertBanner, 
      id,
      subtitle: insertBanner.subtitle ?? null,
      ctaText: insertBanner.ctaText ?? null,
      ctaLink: insertBanner.ctaLink ?? null,
      isActive: insertBanner.isActive ?? true,
      order: insertBanner.order ?? 0
    };
    this.banners.set(id, banner);
    return banner;
  }

  async updateBanner(id: number, updates: Partial<InsertBanner>): Promise<Banner | undefined> {
    const banner = this.banners.get(id);
    if (!banner) return undefined;
    
    const updatedBanner = { ...banner, ...updates };
    this.banners.set(id, updatedBanner);
    return updatedBanner;
  }

  async deleteBanner(id: number): Promise<boolean> {
    return this.banners.delete(id);
  }

  // Order methods
  async getOrders(): Promise<Order[]> {
    return Array.from(this.orders.values());
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = this.currentOrderId++;
    const order: Order = { 
      id,
      jerseyId: insertOrder.jerseyId ?? null,
      customerName: insertOrder.customerName ?? null,
      customerEmail: insertOrder.customerEmail ?? null,
      customerPhone: insertOrder.customerPhone ?? null,
      size: insertOrder.size ?? null,
      status: insertOrder.status ?? "pending",
      createdAt: new Date()
    };
    this.orders.set(id, order);
    return order;
  }
}

export const storage = new MemStorage();
