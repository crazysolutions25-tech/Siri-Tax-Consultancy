
import React, { useEffect } from 'react';
import { DetailedService } from '../constants';

interface SEOManagerProps {
  currentPage: string;
  selectedService: DetailedService | null;
}

const SEOManager: React.FC<SEOManagerProps> = ({ currentPage, selectedService }) => {
  useEffect(() => {
    let title = "Siri Tax Consultancy | GST & ITR Experts Vizag, Srikakulam";
    let description = "Expert tax filing and financial consultancy in Visakhapatnam and Srikakulam. Best GST, ITR, Tally, and MSME registration services in Andhra Pradesh.";
    let path = "/";

    // Dynamic Page Titles & Path Logic
    if (currentPage === 'home') {
      title = "Siri Tax Consultancy | Best Tax Experts in Visakhapatnam & Srikakulam";
    } else if (currentPage === 'about') {
      title = "About Us | Leading Tax Consultancy in Andhra Pradesh | Siri Tax";
      description = "Learn about Siri Tax Consultancy's mission since 2019 to provide transparent and tech-enabled tax advisory in Vizag and Srikakulam.";
      path = "/about";
    } else if (currentPage === 'services-list') {
      title = "Our Services | GST, Income Tax & Accounting | Siri Tax Consultancy";
      description = "Comprehensive tax services catalog including GST registration, ITR filing, MSME registration, and Tally accounting for SMEs.";
      path = "/services";
    } else if (currentPage === 'service-detail' && selectedService) {
      title = `${selectedService.title} in Visakhapatnam | Siri Tax Consultancy`;
      description = selectedService.metaDescription;
      path = `/services/${selectedService.id}`;
    } else if (currentPage === 'gst-calculator') {
      title = "GST Calculator India | Free Online GST Tool 2024-25";
      description = "Free online GST calculator for India. Calculate GST inclusive and exclusive amounts for 5%, 12%, 18%, and 28% tax slabs.";
      path = "/gst-calculator";
    } else if (currentPage === 'rules') {
      title = "Latest Tax Rules 2024-25 | GST & Income Tax Guide | Siri Tax";
      description = "Stay updated with the latest Indian Income Tax slabs for AY 2025-26 and current GST regulations.";
      path = "/tax-rules";
    }

    // Update Title and Meta Tags
    document.title = title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', description);

    // Handle Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', `https://siritax.com${path}`);

    // Update JSON-LD
    const updateJsonLd = () => {
      const existingScript = document.getElementById('json-ld');
      if (existingScript) existingScript.remove();

      const baseJsonLd = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "Siri Tax Consultancy",
        "image": "https://images.unsplash.com/photo-1554224155-6726b3ff858f",
        "@id": "https://siritax.com",
        "url": "https://siritax.com",
        "telephone": "+91 89777 56671",
        "priceRange": "$$",
        "address": [
          {
            "@type": "PostalAddress",
            "streetAddress": "Visakhapatnam Main Center",
            "addressLocality": "Visakhapatnam",
            "addressRegion": "AP",
            "postalCode": "530001",
            "addressCountry": "IN"
          },
          {
            "@type": "PostalAddress",
            "streetAddress": "Srikakulam Town",
            "addressLocality": "Srikakulam",
            "addressRegion": "AP",
            "postalCode": "532001",
            "addressCountry": "IN"
          }
        ],
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 17.6868,
          "longitude": 83.2185
        }
      };

      // If on a specific service page, add Service schema
      let finalJsonLd: any = baseJsonLd;
      if (currentPage === 'service-detail' && selectedService) {
        finalJsonLd = {
          "@context": "https://schema.org",
          "@type": "Service",
          "serviceType": selectedService.title,
          "provider": {
            "@type": "LocalBusiness",
            "name": "Siri Tax Consultancy"
          },
          "description": selectedService.description,
          "areaServed": ["Visakhapatnam", "Srikakulam"]
        };
      }

      const script = document.createElement('script');
      script.id = 'json-ld';
      script.type = 'application/ld+json';
      script.text = JSON.stringify(finalJsonLd);
      document.head.appendChild(script);
    };

    updateJsonLd();
  }, [currentPage, selectedService]);

  return null;
};

export default SEOManager;
