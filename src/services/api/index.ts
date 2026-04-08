import type { UserProfile, SocialPost, KpiMetric, Campaign, SalesLead, Transaction } from '../../types';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const initialPosts: SocialPost[] = [
  { id: '1', title: 'Dicas de produtividade', content: '5 estratégias...', status: 'published', channels: ['instagram', 'facebook'] },
  { id: '2', title: 'Como criar conteúdo que vende', content: 'Aprenda...', status: 'scheduled', channels: ['instagram', 'tiktok'] }
];

const initialCampaigns: Campaign[] = [
  { id: 'c1', name: 'Google Ads - Pesquisa Institucional', budget: 1500, spent: 1200, status: 'active', clicks: 840, conversions: 42 },
];

const initialLeads: SalesLead[] = [
  { id: 'l1', clientName: 'João Silva', value: 2500, stage: 'lead', lastContact: '2025-04-15' },
];

const initialTransactions: Transaction[] = [
  { id: 't1', description: 'Venda Consultoria', amount: 6000, type: 'income', status: 'paid', date: new Date().toISOString() },
];

const initialKpis: KpiMetric[] = [
  { id: 'kpi-1', title: 'Novos Leads', value: 247, trend: 'up', trendValue: '+12%', period: 'Este mês' },
];

const initialUser: UserProfile = {
  id: 'u-1',
  name: 'João Silva',
  email: 'joao.ceo@techcorp.com',
  businessName: 'Tech Corp',
  segment: 'Software & SaaS',
  avatarUrl: 'https://api.dicebear.com/7.x/notionists/svg?scale=200&seed=4782'
};

// Funções de Storage Helper
const getStorage = <T>(key: string, initialData: T): T => {
  const data = localStorage.getItem(key);
  if (data) return JSON.parse(data);
  localStorage.setItem(key, JSON.stringify(initialData));
  return initialData;
};

const setStorage = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const api = {
  user: {
    getProfile: async () => {
      await delay(200);
      return getStorage('mockProfile', initialUser);
    },
    updateProfile: async (data: Partial<typeof initialUser>) => {
      await delay(500);
      const user = getStorage('mockProfile', initialUser);
      const updated = { ...user, ...data };
      setStorage('mockProfile', updated);
      return updated;
    }
  },
  social: {
    getPosts: async (statusFilter?: string): Promise<SocialPost[]> => {
      await delay(500);
      let posts = getStorage('mockPosts', initialPosts);
      if (statusFilter && statusFilter !== 'all') {
        return posts.filter(p => p.status === statusFilter);
      }
      return posts;
    },
    publishDraft: async (id: string): Promise<boolean> => {
      await delay(300);
      const posts = getStorage('mockPosts', initialPosts);
      const idx = posts.findIndex(p => p.id === id);
      if (idx > -1) {
        posts[idx].status = 'published';
        setStorage('mockPosts', posts);
        return true;
      }
      return false;
    },
    createPost: async (postData: Omit<SocialPost, 'id'>): Promise<boolean> => {
      await delay(400);
      const posts = getStorage('mockPosts', initialPosts);
      posts.push({ ...postData, id: Math.random().toString(36).substring(7) });
      setStorage('mockPosts', posts);
      return true;
    }
  },
  marketing: {
    getCampaigns: async (): Promise<Campaign[]> => {
      await delay(500);
      return getStorage('mockCampaigns', initialCampaigns);
    },
    toggleCampaignStatus: async (id: string): Promise<boolean> => {
      await delay(300);
      const camps = getStorage('mockCampaigns', initialCampaigns);
      const camp = camps.find(c => c.id === id);
      if (camp) {
        camp.status = camp.status === 'active' ? 'paused' : 'active';
        setStorage('mockCampaigns', camps);
        return true;
      }
      return false;
    },
    createCampaign: async (campData: Omit<Campaign, 'id' | 'spent' | 'status' | 'clicks' | 'conversions'>): Promise<boolean> => {
      await delay(400);
      const camps = getStorage('mockCampaigns', initialCampaigns);
      camps.push({
        ...campData,
        id: Math.random().toString(36).substring(7),
        spent: 0,
        status: 'active',
        clicks: 0,
        conversions: 0
      });
      setStorage('mockCampaigns', camps);
      return true;
    }
  },
  vendas: {
    getLeads: async (): Promise<SalesLead[]> => {
      await delay(500);
      return getStorage('mockLeads', initialLeads);
    },
    moveLeadStage: async (id: string, newStage: SalesLead['stage']): Promise<boolean> => {
      await delay(300);
      const leads = getStorage('mockLeads', initialLeads);
      const lead = leads.find(l => l.id === id);
      if (lead) {
        lead.stage = newStage;
        setStorage('mockLeads', leads);
        return true;
      }
      return false;
    },
    createLead: async (leadData: Omit<SalesLead, 'id' | 'stage' | 'lastContact'>): Promise<boolean> => {
      await delay(400);
      const leads = getStorage('mockLeads', initialLeads);
      leads.push({
        ...leadData,
        id: Math.random().toString(36).substring(7),
        stage: 'lead',
        lastContact: new Date().toISOString()
      });
      setStorage('mockLeads', leads);
      return true;
    }
  },
  financeiro: {
    getTransactions: async (): Promise<Transaction[]> => {
      await delay(400);
      return getStorage('mockTransactions', initialTransactions);
    },
    payTransaction: async (id: string): Promise<boolean> => {
      await delay(300);
      const trans = getStorage('mockTransactions', initialTransactions);
      const t = trans.find(x => x.id === id);
      if (t) {
        t.status = 'paid';
        setStorage('mockTransactions', trans);
        return true;
      }
      return false;
    },
    createTransaction: async (data: Omit<Transaction, 'id' | 'status' | 'date'>): Promise<boolean> => {
      await delay(400);
      const trans = getStorage('mockTransactions', initialTransactions);
      trans.push({
        ...data,
        id: Math.random().toString(36).substring(7),
        status: 'paid', // assumes new entries are already paid
        date: new Date().toISOString()
      });
      setStorage('mockTransactions', trans);
      return true;
    }
  },
  dashboard: {
    getKpis: async (): Promise<KpiMetric[]> => {
      await delay(300);
      return getStorage('mockKpis', initialKpis);
    }
  }
};
