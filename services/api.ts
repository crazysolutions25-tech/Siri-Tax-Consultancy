
import { SERVICES, DetailedService } from '../constants';

export interface APIResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

/**
 * MOCK BACKEND & DATABASE ENGINE
 * Simulates a real REST API + Database (Local Storage)
 */
export const MockAPI = {
  _delay: (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms)),

  // Database Initialization (Seeding)
  async initialize() {
    if (!localStorage.getItem('siri_services')) {
      localStorage.setItem('siri_services', JSON.stringify(SERVICES));
    }
    if (!localStorage.getItem('siri_leads')) {
      localStorage.setItem('siri_leads', JSON.stringify([]));
    }
    if (!localStorage.getItem('siri_users')) {
      // Seed an admin
      localStorage.setItem('siri_users', JSON.stringify([
        { id: 1, name: 'Siri Admin', email: 'admin@siritax.com', password: 'admin123', role: 'admin' }
      ]));
    }
  },

  services: {
    async getAll(): Promise<APIResponse<DetailedService[]>> {
      await MockAPI._delay(300);
      const data = JSON.parse(localStorage.getItem('siri_services') || '[]');
      return { success: true, data };
    },
    async getById(id: string): Promise<APIResponse<DetailedService>> {
      await MockAPI._delay(200);
      const services = JSON.parse(localStorage.getItem('siri_services') || '[]');
      const service = services.find((s: any) => s.id === id);
      return service ? { success: true, data: service } : { success: false, message: 'Service not found' };
    }
  },

  leads: {
    async getAll(): Promise<APIResponse<any[]>> {
      await MockAPI._delay(600);
      const leads = JSON.parse(localStorage.getItem('siri_leads') || '[]');
      return { success: true, data: leads.sort((a: any, b: any) => b.id - a.id) };
    },

    async create(leadData: any): Promise<APIResponse<any>> {
      await MockAPI._delay(800);
      const leads = JSON.parse(localStorage.getItem('siri_leads') || '[]');
      const newLead = { 
        ...leadData, 
        id: Date.now(), 
        status: 'Pending', 
        createdAt: new Date().toISOString() 
      };
      leads.push(newLead);
      localStorage.setItem('siri_leads', JSON.stringify(leads));
      return { success: true, data: newLead };
    },

    async updateStatus(id: number, status: string): Promise<APIResponse<any>> {
      const leads = JSON.parse(localStorage.getItem('siri_leads') || '[]');
      const index = leads.findIndex((l: any) => l.id === id);
      if (index !== -1) {
        leads[index].status = status;
        localStorage.setItem('siri_leads', JSON.stringify(leads));
        return { success: true, data: leads[index] };
      }
      return { success: false, message: 'Lead not found' };
    },

    async checkStatusByEmail(email: string): Promise<APIResponse<any>> {
      await MockAPI._delay(1000);
      const leads = JSON.parse(localStorage.getItem('siri_leads') || '[]');
      const lead = leads.find((l: any) => l.email.toLowerCase() === email.toLowerCase());
      return lead ? { success: true, data: lead } : { success: false, message: 'No record found.' };
    },

    async getStats(): Promise<APIResponse<any>> {
      const leads = JSON.parse(localStorage.getItem('siri_leads') || '[]');
      return {
        success: true,
        data: {
          totalInquiries: leads.length,
          pendingAction: leads.filter((l: any) => l.status === 'Pending').length,
          resolvedCases: leads.filter((l: any) => l.status === 'Resolved').length
        }
      };
    }
  },

  auth: {
    async login(credentials: any): Promise<APIResponse<any>> {
      await MockAPI._delay(1000);
      const users = JSON.parse(localStorage.getItem('siri_users') || '[]');
      const user = users.find((u: any) => u.email === credentials.email && u.password === credentials.password);
      if (user) {
        const { password, ...safeUser } = user;
        return { success: true, data: safeUser };
      }
      return { success: false, message: 'Invalid credentials' };
    },

    async register(userData: any): Promise<APIResponse<any>> {
      const users = JSON.parse(localStorage.getItem('siri_users') || '[]');
      if (users.find((u: any) => u.email === userData.email)) return { success: false, message: 'User exists' };
      const newUser = { ...userData, id: Date.now(), role: 'user' };
      users.push(newUser);
      localStorage.setItem('siri_users', JSON.stringify(users));
      return { success: true, data: newUser };
    },

    async updateProfile(id: number, profileData: any): Promise<APIResponse<any>> {
      await MockAPI._delay(500);
      const users = JSON.parse(localStorage.getItem('siri_users') || '[]');
      const index = users.findIndex((u: any) => u.id === id);
      if (index !== -1) {
        users[index] = { ...users[index], ...profileData };
        localStorage.setItem('siri_users', JSON.stringify(users));
        const { password, ...safeUser } = users[index];
        return { success: true, data: safeUser };
      }
      return { success: false, message: 'User not found' };
    },

    async getAllUsers(): Promise<APIResponse<any[]>> {
      await MockAPI._delay(500);
      const users = JSON.parse(localStorage.getItem('siri_users') || '[]');
      const safeUsers = users.map(({ password, ...u }: any) => u);
      return { success: true, data: safeUsers };
    }
  }
};
