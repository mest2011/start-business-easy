export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  businessName: string;
  segment: string;
}

export interface SocialPost {
  id: string;
  title: string;
  content: string;
  status: 'draft' | 'scheduled' | 'published';
  scheduledAt?: string;
  channels: ('facebook' | 'instagram' | 'twitter' | 'linkedin' | 'tiktok')[];
  metrics?: {
    views: number;
    likes: number;
    comments: number;
  };
}

export interface KpiMetric {
  id: string;
  title: string;
  value: string | number;
  trend: 'up' | 'down';
  trendValue: string;
  period: string;
}

export interface Campaign {
  id: string;
  name: string;
  budget: number;
  spent: number;
  status: 'active' | 'paused' | 'completed';
  clicks: number;
  conversions: number;
}

export interface SalesLead {
  id: string;
  clientName: string;
  value: number;
  stage: 'lead' | 'negotiation' | 'won' | 'lost';
  lastContact: string;
}

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  status: 'paid' | 'pending';
  date: string;
}
