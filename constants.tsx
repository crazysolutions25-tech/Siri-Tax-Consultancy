
import React from 'react';

export interface DetailedService {
  id: string;
  title: string;
  category: string;
  description: string;
  metaDescription: string;
  keywords: string;
  fullContent: string;
  process: string[];
  documents: string[];
  features: string[];
  iconId: string;
  imageUrl: string;
}

const IMG_PARAMS = 'auto=format&fit=crop&q=80&w=800';

export const ServiceIcon: React.FC<{ id: string; className?: string }> = ({ id, className = "w-6 h-6" }) => {
  switch (id) {
    case 'shield':
      return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>;
    case 'cash':
      return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
    case 'document-text':
      return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>;
    case 'currency-rupee':
      return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
    case 'office-building':
      return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>;
    case 'clock':
      return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
    case 'credit-card':
      return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a2 2 0 002-2V5a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
    case 'receipt-tax':
      return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293L17.414 5.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" /></svg>;
    case 'trending-up':
      return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>;
    default:
      return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
  }
};

export const SERVICES: DetailedService[] = [
  {
    id: 'gst-license',
    title: 'GST License Registration',
    category: 'Taxation',
    description: 'Expert GST registration in Visakhapatnam and Srikakulam for startups and SMEs.',
    metaDescription: 'Get your GST registration in Vizag or Srikakulam with Siri Tax Consultancy. Fast GSTIN application for businesses, freelancers, and entrepreneurs.',
    keywords: 'GST Registration Vizag, GST License Visakhapatnam, New GST Registration Srikakulam, GSTIN Consultant Andhra Pradesh',
    imageUrl: `https://images.unsplash.com/photo-1554224155-6726b3ff858f?${IMG_PARAMS}`,
    fullContent: 'GST Registration is essential for business growth in India. We handle the entire application process, including document verification and filing, to ensure your business stays compliant in the Vizag and Srikakulam regions.',
    process: [
      'Document Collection & Verification',
      'TRN Generation via OTP',
      'Filing Form GST REG-01',
      'Responding to Officer Queries',
      'Issuance of Registration Certificate'
    ],
    documents: [
      'PAN & Aadhaar of Owner',
      'Business Address Proof',
      'Rent Agreement & NOC',
      'Bank Account Proof'
    ],
    features: ['Compliance Ready', 'ITC Benefits', 'Legal Legitimacy'],
    iconId: 'shield'
  },
  {
    id: 'income-tax',
    title: 'Income Tax Return (ITR)',
    category: 'Taxation',
    description: 'Professional ITR filing for individuals and firms in Vizag & Srikakulam.',
    metaDescription: 'File your Income Tax Returns (ITR) with experts in Visakhapatnam. Specialized services for salaried, capital gains, and business ITR filing.',
    keywords: 'ITR Filing Visakhapatnam, Income Tax Return Vizag, Tax Consultant Srikakulam, Section 80C Tax Savings',
    imageUrl: `https://images.unsplash.com/photo-1554224154-26032ffc0d07?${IMG_PARAMS}`,
    fullContent: 'Maximize your tax savings with our expert ITR filing services. We analyze your income and suggest legal ways to reduce your tax liability while ensuring 100% compliance with Income Tax laws.',
    process: [
      'Income Assessment',
      'Regime Comparison',
      'Deduction Calculation',
      'E-filing via Portal',
      'E-verification via Aadhaar'
    ],
    documents: [
      'PAN & Aadhaar',
      'Form 16/16A',
      'Bank Statements',
      'Investment Proofs'
    ],
    features: ['Maximum Savings', 'Notice Protection', 'Audit Ready'],
    iconId: 'currency-rupee'
  },
  {
    id: 'msme-registration',
    title: 'MSME / Udyam Registration',
    category: 'Business',
    description: 'Instant Udyam registration to unlock government benefits for your business.',
    metaDescription: 'Register your business as an MSME with Udyam Registration in Vizag. Access government subsidies and bank loan benefits easily.',
    keywords: 'Udyam Registration Vizag, MSME Certificate Srikakulam, Small Business Benefits India, Govt Schemes for SMEs',
    imageUrl: `https://images.unsplash.com/photo-1521791136064-7986c2923216?${IMG_PARAMS}`,
    fullContent: 'MSME registration provides your business with legal recognition and access to various government benefits, including subsidies and priority bank loans.',
    process: [
      'Aadhaar Verification',
      'Activity Selection',
      'Investment Declaration',
      'Certificate Issuance'
    ],
    documents: [
      'Aadhaar of Proprietor',
      'Business PAN',
      'Address Proof'
    ],
    features: ['Subsidy Eligible', 'Bank Loan Benefits', 'Legal Recognition'],
    iconId: 'office-building'
  }
  // ... other services would follow same pattern
];
