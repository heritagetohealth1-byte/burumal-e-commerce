export type VIPTier = 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';

export interface VIPBenefits {
  freeShipping: boolean;
  discountPercentage: number;
  prioritySupport: boolean;
  exclusiveDeals: boolean;
  birthdayBonus: number;
  referralBonus: number;
  pointsMultiplier: number;
}

export interface VIPTierInfo {
  tier: VIPTier;
  name: string;
  minSpend: number;
  color: string;
  icon: string;
  benefits: VIPBenefits;
}

const VIP_TIERS: Record<VIPTier, VIPTierInfo> = {
  bronze: {
    tier: 'bronze',
    name: 'Bronze',
    minSpend: 0,
    color: '#CD7F32',
    icon: '🥉',
    benefits: {
      freeShipping: false,
      discountPercentage: 0,
      prioritySupport: false,
      exclusiveDeals: false,
      birthdayBonus: 5000,
      referralBonus: 2000,
      pointsMultiplier: 1,
    },
  },
  silver: {
    tier: 'silver',
    name: 'Silver',
    minSpend: 500000,
    color: '#C0C0C0',
    icon: '🥈',
    benefits: {
      freeShipping: true,
      discountPercentage: 5,
      prioritySupport: false,
      exclusiveDeals: true,
      birthdayBonus: 10000,
      referralBonus: 5000,
      pointsMultiplier: 1.2,
    },
  },
  gold: {
    tier: 'gold',
    name: 'Gold',
    minSpend: 2000000,
    color: '#FFD700',
    icon: '🥇',
    benefits: {
      freeShipping: true,
      discountPercentage: 10,
      prioritySupport: true,
      exclusiveDeals: true,
      birthdayBonus: 25000,
      referralBonus: 10000,
      pointsMultiplier: 1.5,
    },
  },
  platinum: {
    tier: 'platinum',
    name: 'Platinum',
    minSpend: 5000000,
    color: '#E5E4E2',
    icon: '💎',
    benefits: {
      freeShipping: true,
      discountPercentage: 15,
      prioritySupport: true,
      exclusiveDeals: true,
      birthdayBonus: 50000,
      referralBonus: 20000,
      pointsMultiplier: 2,
    },
  },
  diamond: {
    tier: 'diamond',
    name: 'Diamond',
    minSpend: 10000000,
    color: '#B9F2FF',
    icon: '👑',
    benefits: {
      freeShipping: true,
      discountPercentage: 20,
      prioritySupport: true,
      exclusiveDeals: true,
      birthdayBonus: 100000,
      referralBonus: 50000,
      pointsMultiplier: 3,
    },
  },
};

export interface VIPStatus {
  tier: VIPTier;
  totalSpent: number;
  points: number;
  nextTier: VIPTier | null;
  progressToNext: number;
}

class VIPService {
  private readonly STORAGE_KEY = 'burumal_vip';

  getVIPStatus(): VIPStatus {
    if (typeof window === 'undefined') {
      return this.getDefaultVIPStatus();
    }
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    return this.getDefaultVIPStatus();
  }

  private getDefaultVIPStatus(): VIPStatus {
    return {
      tier: 'bronze',
      totalSpent: 0,
      points: 0,
      nextTier: 'silver',
      progressToNext: 0,
    };
  }

  updateTotalSpent(amount: number): void {
    const current = this.getVIPStatus();
    const newTotal = current.totalSpent + amount;
    const newTier = this.calculateTier(newTotal);
    
    const nextTier = this.getNextTier(newTier);
    const progressToNext = nextTier 
      ? ((newTotal - VIP_TIERS[newTier].minSpend) / (VIP_TIERS[nextTier].minSpend - VIP_TIERS[newTier].minSpend)) * 100
      : 100;

    const updated: VIPStatus = {
      tier: newTier,
      totalSpent: newTotal,
      points: current.points + Math.floor(amount * VIP_TIERS[newTier].benefits.pointsMultiplier),
      nextTier,
      progressToNext: Math.min(progressToNext, 100),
    };

    this.saveVIPStatus(updated);
  }

  addPoints(points: number): void {
    const current = this.getVIPStatus();
    current.points += points;
    this.saveVIPStatus(current);
  }

  private calculateTier(totalSpent: number): VIPTier {
    if (totalSpent >= 10000000) return 'diamond';
    if (totalSpent >= 5000000) return 'platinum';
    if (totalSpent >= 2000000) return 'gold';
    if (totalSpent >= 500000) return 'silver';
    return 'bronze';
  }

  private getNextTier(currentTier: VIPTier): VIPTier | null {
    const tiers: VIPTier[] = ['bronze', 'silver', 'gold', 'platinum', 'diamond'];
    const currentIndex = tiers.indexOf(currentTier);
    return currentIndex < tiers.length - 1 ? tiers[currentIndex + 1] : null;
  }

  getTierInfo(tier: VIPTier): VIPTierInfo {
    return VIP_TIERS[tier];
  }

  private saveVIPStatus(status: VIPStatus): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(status));
    }
  }

  resetVIPStatus(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.STORAGE_KEY);
    }
  }
}

export const vipService = new VIPService();
