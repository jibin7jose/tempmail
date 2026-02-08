const BASE_URL = 'https://api.mail.tm';

export interface Domain {
  id: string;
  domain: string;
  isActive: boolean;
  isPrivate: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Account {
  id: string;
  address: string;
  quota: number;
  used: number;
  isDisabled: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  accountId: string;
  msgid: string;
  from: {
    address: string;
    name: string;
  };
  to: Array<{
    address: string;
    name: string;
  }>;
  subject: string;
  intro: string;
  seen: boolean;
  isDeleted: boolean;
  hasAttachments: boolean;
  size: number;
  downloadUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface MessageDetail extends Message {
  text: string;
  html: string[];
}

export const mailApi = {
  async getDomains(): Promise<Domain[]> {
    const res = await fetch(`${BASE_URL}/domains`);
    const data = await res.json();
    return data['hydra:member'];
  },

  async createAccount(address: string, password: string): Promise<Account> {
    const res = await fetch(`${BASE_URL}/accounts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ address, password }),
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.detail || 'Failed to create account');
    }
    return res.json();
  },

  async getToken(address: string, password: string): Promise<string> {
    const res = await fetch(`${BASE_URL}/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ address, password }),
    });
    if (!res.ok) throw new Error('Failed to get token');
    const data = await res.json();
    return data.token;
  },

  async getMessages(token: string): Promise<Message[]> {
    const res = await fetch(`${BASE_URL}/messages`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    return data['hydra:member'];
  },

  async getMessage(id: string, token: string): Promise<MessageDetail> {
    const res = await fetch(`${BASE_URL}/messages/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.json();
  },

  async deleteMessage(id: string, token: string): Promise<void> {
    await fetch(`${BASE_URL}/messages/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  async deleteAccount(id: string, token: string): Promise<void> {
    await fetch(`${BASE_URL}/accounts/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};
