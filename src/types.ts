export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  startingPrice: string;
  features: string[];
  popular?: boolean;
  audioText: string;
}

export interface FeatureItem {
  id: string;
  title: string;
  desc: string;
  iconName: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  location: string;
  rating: number;
  comment: string;
  serviceUsed: string;
  date: string;
  verified: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: "General" | "Pricing" | "Services" | "Emergency";
}

export interface BookingFormData {
  fullName: string;
  phone: string;
  email: string;
  serviceRequired: string;
  location: string;
  preferredDate: string;
  preferredTime: string;
  message: string;
}

export interface ServiceArea {
  name: string;
  region: "Old Dubai" | "New Dubai" | "Suburbs" | "Commercial";
  responseTime: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: "Energy Saving" | "AC Repair" | "Duct & Air Quality" | "Buying Guide" | "Maintenance Tips";
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  teaser: string;
  content: string;
  image: string;
  tags: string[];
  audioText?: string;
  featured?: boolean;
}

