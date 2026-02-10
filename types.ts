
import React from 'react';

export interface Service {
  id: string;
  title: string;
  category: string;
  description: string;
  iconId: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface ContactFormData {
  name: string;
  email: string;
  service: string;
  message: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'user' | 'admin';
  pan?: string;
  aadhaar?: string;
  phone?: string;
}
