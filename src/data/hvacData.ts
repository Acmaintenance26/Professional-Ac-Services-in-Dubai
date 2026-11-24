import { ServiceItem, FeatureItem, TestimonialItem, FAQItem, ServiceArea } from "../types";

export const COMPANY_DETAILS = {
  name: "AC Maintenance Dubai",
  legalName: "Al Naveed AC Maintenance & HVAC Services LLC",
  tagline: "Fast, Reliable & Affordable AC Services in Dubai",
  address: "28C Street, Deira, Dubai, United Arab Emirates",
  phone: "+971 50 297 7603",
  phoneFormatted: "+971502977603",
  whatsapp: "+971 50 297 7603",
  whatsappFormatted: "971502977603",
  email: "info@acmaintenancedubai.ae",
  workingHours: "24 Hours / 7 Days a Week (Same-Day & Emergency Service)",
  googleMapsUrl: "https://maps.google.com/?q=28C+Street+Deira+Dubai",
};

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "ac-maintenance-dubai",
    title: "AC Maintenance Dubai",
    subtitle: "Comprehensive preventive servicing for optimal cooling performance",
    shortDesc: "Comprehensive preventive servicing for optimal cooling, energy savings, and longer unit lifespan across Dubai.",
    fullDesc: "Regular AC maintenance is crucial in Dubai's extreme desert heat. Our comprehensive AC maintenance service includes deep coil cleaning, filter wash, electrical connections inspection, blower motor tuning, refrigerant level verification, and thermostat calibration to ensure peak energy efficiency and zero unexpected breakdowns.",
    iconName: "Wrench",
    startingPrice: "AED 150",
    features: [
      "Filter cleaning & chemical wash",
      "Condenser & evaporator inspection",
      "Electrical wiring & capacitor check",
      "Thermostat calibration & testing",
      "Airflow & cooling performance check"
    ],
    popular: true,
    audioText: "Our AC Maintenance service in Dubai ensures your air conditioner runs at peak cooling efficiency. We clean filters, inspect coils, test electrical components, and prevent sudden breakdowns during summer."
  },
  {
    id: "ac-repair-dubai",
    title: "AC Repair Dubai",
    subtitle: "Fast diagnosis and fix for all AC faults and cooling problems",
    shortDesc: "Fast diagnosis and expert repair for noisy units, water leaks, compressor failures, and weak cooling.",
    fullDesc: "Is your AC blowing warm air, making weird noises, or leaking water inside? Our certified HVAC technicians diagnose and repair all AC brands including O General, Daikin, Mitsubishi, LG, Carrier, York, and Samsung with genuine replacement parts.",
    iconName: "Settings",
    startingPrice: "AED 180",
    features: [
      "Compressor repair & replacement",
      "Water leakage fixing & tray cleaning",
      "Fan motor & PCB repair",
      "Noise & vibration troubleshooting",
      "Genuine OEM spare parts with warranty"
    ],
    popular: true,
    audioText: "Fast AC Repair in Dubai! Whether your AC is leaking water, blowing warm air, or making loud noises, our expert technicians repair all major brands with original parts and warranty."
  },
  {
    id: "ac-gas-refill",
    title: "AC Gas Refill",
    subtitle: "R22, R410A & R32 refrigerant top-up with leak detection",
    shortDesc: "Freon gas top-up and leak detection to restore icy cold air to your home or office instantly.",
    fullDesc: "Low refrigerant levels result in weak cooling, continuous compressor operation, and inflated DEWA electricity bills. We perform thorough pressure testing, detect nitrogen gas leaks, repair copper pipe joints, and refill premium environment-friendly R410A, R22, or R32 gas to factory standards.",
    iconName: "Zap",
    startingPrice: "AED 120",
    features: [
      "Pressure testing & leak inspection",
      "Copper pipe soldering & joint repair",
      "Eco-friendly R410A & R32 gas refill",
      "R22 Freon gas top-up",
      "Post-refill cooling temperature check"
    ],
    popular: true,
    audioText: "AC Gas Refill in Dubai. Is your AC not cooling properly? We conduct pressure checks, repair leaks, and refill high quality R410A, R32, or R22 Freon gas to restore ice-cold cooling."
  },
  {
    id: "ac-installation",
    title: "AC Installation",
    subtitle: "Professional fitting for Split, Ducted & Central AC units",
    shortDesc: "Professional installation and replacement for Split ACs, Package units, and Central HVAC systems.",
    fullDesc: "Ensure maximum efficiency with expert AC installation. We handle copper piping, outdoor unit bracket mounting, drainage tube alignment, vacuuming, and load balancing for villas, apartments, offices, and retail stores across Dubai.",
    iconName: "Hammer",
    startingPrice: "AED 350",
    features: [
      "New Split & Central AC mounting",
      "Insulated copper pipe installation",
      "Outdoor condenser bracket fitting",
      "System vacuuming & pressure test",
      "1-Year installation workmanship warranty"
    ],
    audioText: "Professional AC Installation in Dubai for homes, villas, and commercial spaces. Expert fitting, copper piping, and testing for all AC brands with guaranteed workmanship warranty."
  },
  {
    id: "ac-duct-cleaning",
    title: "AC Duct Cleaning",
    subtitle: "Sanitization and dust removal for clean indoor air quality",
    shortDesc: "Deep duct cleaning and sanitization to remove dust, mold, allergens, and odors from your air supply.",
    fullDesc: "Breathe clean, dust-free air in your home. Accumulated dust and humidity inside AC ducts breed mold, bacteria, and allergens. Our motorized rotary brush cleaning and anti-bacterial fogging eliminate odors and improve indoor air quality for your family.",
    iconName: "Wind",
    startingPrice: "AED 400",
    features: [
      "Rotary brush duct vacuuming",
      "Anti-bacterial & anti-fungal fogging",
      "Grille & diffuser deep washing",
      "Blower fan & plenum box cleaning",
      "Air quality & odor reduction"
    ],
    popular: true,
    audioText: "AC Duct Cleaning Dubai. Remove dust, mold, and allergens from your AC air vents. We use motorized rotary brushes and eco-friendly sanitizers to ensure healthy indoor air quality."
  },
  {
    id: "split-ac-service",
    title: "Split AC Service",
    subtitle: "Dedicated maintenance for wall-mounted Split units",
    shortDesc: "High-pressure chemical jet cleaning and servicing specifically tailored for wall-mounted Split ACs.",
    fullDesc: "Wall-mounted split ACs accumulate grease, dust, and fungi on the evaporator fins. Our specialized Split AC service utilizes waterproof cover bags and high-pressure chemical wash jets to clean deep inside without making any mess in your living room.",
    iconName: "ShieldCheck",
    startingPrice: "AED 130",
    features: [
      "Waterproof indoor unit bag washing",
      "High-pressure chemical coil spray",
      "Drain pipe clearing with nitrogen blower",
      "Filter cleaning & deodorization",
      "Remote control & sensor testing"
    ],
    audioText: "Split AC Service in Dubai. Specialized chemical jet cleaning for wall-mounted split units with zero mess. Keeps your room cold and energy bills low."
  },
  {
    id: "central-ac-maintenance",
    title: "Central AC Maintenance",
    subtitle: "Heavy-duty HVAC maintenance for villas & commercial towers",
    shortDesc: "Maintenance for ducted central ACs, package units, chillers, and VRF systems in villas and buildings.",
    fullDesc: "Central HVAC systems demand specialized technical expertise. We service ducted split systems, package units, FCUs, AHUs, and VRV/VRF systems for residential villas, hotels, warehouses, and commercial offices in Dubai.",
    iconName: "Building2",
    startingPrice: "AED 250",
    features: [
      "FCU & AHU coil chemical wash",
      "Thermostat & actuator motor check",
      "V-belt tensioning & pulley inspection",
      "Chilled water & refrigerant line check",
      "Commercial AMC (Annual Maintenance Contracts)"
    ],
    audioText: "Central AC Maintenance Dubai. Expert HVAC maintenance for villas, warehouses, and commercial buildings. We handle FCUs, AHUs, package units, and VRF systems."
  },
  {
    id: "emergency-ac-repair",
    title: "Emergency AC Repair",
    subtitle: "24/7 rapid response team arriving within 30-45 minutes",
    shortDesc: "24/7 emergency dispatch for sudden AC breakdowns, total power trips, or major refrigerant leaks.",
    fullDesc: "An AC breakdown in Dubai heat is a emergency! Our mobile rapid-response technicians operate 24 hours a day, 7 days a week, carrying emergency spare parts to restore cooling within hours of your call.",
    iconName: "Clock",
    startingPrice: "AED 200",
    features: [
      "24/7 rapid dispatch within 30-45 mins",
      "Night & weekend emergency calls",
      "On-board emergency replacement parts",
      "Main power trip troubleshooting",
      "Instant cooling recovery"
    ],
    popular: true,
    audioText: "Emergency AC Repair Dubai 24/7! Fast arrival within 30 to 45 minutes anywhere in Dubai. Day or night, call us for immediate cooling breakdown help."
  },
  {
    id: "general-ac-services",
    title: "General AC Services",
    subtitle: "Thermostat upgrades, PCB board repair & annual contracts",
    shortDesc: "Smart thermostat installation, PCB repairs, motor rewinding, and custom Annual Maintenance Contracts (AMC).",
    fullDesc: "Looking for comprehensive home climate solutions? We offer Nest/Ecobee smart thermostat installation, electronic control PCB circuit board repairs, capacitor replacements, fan rewinding, and flexible Annual Maintenance Contracts.",
    iconName: "CheckCircle2",
    startingPrice: "AED 100",
    features: [
      "Smart thermostat upgrades (Nest, Honeywell)",
      "Electronic PCB board diagnostics & repair",
      "Blower fan rewinding & bearing swap",
      "Flexible AMC annual packages",
      "Comprehensive HVAC inspection audit"
    ],
    audioText: "General AC Services in Dubai. Smart thermostat upgrades, PCB repairs, capacitor swaps, and flexible Annual Maintenance Contracts for worry-free cooling all year round."
  }
];

export const FEATURES_DATA: FeatureItem[] = [
  {
    id: "same-day",
    title: "Same-Day AC Service",
    desc: "Fast service response within 2 hours anywhere in Dubai. Same-day appointment guaranteed.",
    iconName: "Zap"
  },
  {
    id: "experienced-techs",
    title: "Experienced HVAC Technicians",
    desc: "Certified and background-checked technicians with 10+ years of Dubai HVAC experience.",
    iconName: "Award"
  },
  {
    id: "transparent-pricing",
    title: "Transparent Pricing",
    desc: "Fixed competitive rates upfront. Upfront price quotes provided before starting work.",
    iconName: "DollarSign"
  },
  {
    id: "no-hidden-charges",
    title: "No Hidden Charges",
    desc: "Zero surprise fees or extra call-out charges when you approve recommended repairs.",
    iconName: "ShieldAlert"
  },
  {
    id: "emergency-support",
    title: "24/7 Emergency Support",
    desc: "Round-the-clock emergency team ready for sudden midnight breakdowns and power trips.",
    iconName: "PhoneCall"
  },
  {
    id: "residential-commercial",
    title: "Residential & Commercial",
    desc: "Servicing apartments, luxury villas, retail stores, restaurants, and office towers.",
    iconName: "Building"
  },
  {
    id: "quality-workmanship",
    title: "Quality Workmanship",
    desc: "Precision repair using specialized tools, high-pressure washers, and genuine spare parts.",
    iconName: "CheckCircle"
  },
  {
    id: "guaranteed-satisfaction",
    title: "Customer Satisfaction Guaranteed",
    desc: "We back all our AC repairs and gas refills with a solid 30 to 90 day service warranty.",
    iconName: "ThumbsUp"
  }
];

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: "test-1",
    name: "Tariq Al-Mansoori",
    location: "Downtown Dubai",
    rating: 5,
    comment: "Our central villa AC stopped cooling on a Friday afternoon during 44°C heat. AC Maintenance Dubai arrived within 35 minutes, found a blown capacitor and restored ice-cold air immediately. Highly professional service!",
    serviceUsed: "Emergency AC Repair",
    date: "July 2026",
    verified: true
  },
  {
    id: "test-2",
    name: "Sarah Jenkins",
    location: "Dubai Marina",
    rating: 5,
    comment: "Exceptional AC duct cleaning and sanitization in Dubai Marina! Our apartment vents had accumulated dust causing allergies. Al Naveed's certified team arrived promptly, used professional rotary brushing and anti-bacterial fogging. The air is completely fresh, odorless, and cooling improved drastically. Highly recommended!",
    serviceUsed: "AC Duct Cleaning",
    date: "June 2026",
    verified: true
  },
  {
    id: "test-3",
    name: "Mohammed Siddiqui",
    location: "Deira, Dubai",
    rating: 5,
    comment: "Very honest pricing with no hidden charges. They refilled R410A gas in my split AC and fixed a copper pipe leak for a very reasonable rate. Will definitely use them for annual maintenance.",
    serviceUsed: "AC Gas Refill",
    date: "July 2026",
    verified: true
  },
  {
    id: "test-4",
    name: "Elena Rostova",
    location: "Palm Jumeirah",
    rating: 5,
    comment: "We signed an Annual Maintenance Contract for our 5-bedroom villa. Their scheduled quarterly servicing keeps DEWA electricity bills low and our air conditioning working perfectly.",
    serviceUsed: "Central AC Maintenance",
    date: "May 2026",
    verified: true
  },
  {
    id: "test-5",
    name: "Rajesh Kumar",
    location: "Jumeirah Village Circle (JVC)",
    rating: 5,
    comment: "My split AC was leaking water down the bedroom wall. Technician arrived on time with waterproof covers, jet cleaned the coil, and cleared the clogged drain pipe in 40 minutes.",
    serviceUsed: "Split AC Service",
    date: "June 2026",
    verified: true
  },
  {
    id: "test-6",
    name: "David O'Connor",
    location: "Business Bay",
    rating: 5,
    comment: "Great experience! Installed two new Daikin inverter ACs in our office. Very neat copper piping and clean mounting work. Best HVAC contractor in Dubai!",
    serviceUsed: "AC Installation",
    date: "July 2026",
    verified: true
  }
];

export const FAQ_DATA: FAQItem[] = [
  {
    id: "faq-1",
    question: "How much does AC maintenance cost in Dubai?",
    answer: "Basic AC servicing in Dubai starts from AED 120 to AED 180 for single Split units, and AED 250 to AED 350 for ducted Central ACs. We provide transparent upfront quotes with zero hidden charges.",
    category: "Pricing"
  },
  {
    id: "faq-2",
    question: "Do you provide same-day AC repair in Dubai?",
    answer: "Yes! We guarantee same-day AC repair and maintenance across all Dubai areas. Our mobile rapid-response units reach most locations within 30 to 60 minutes of booking.",
    category: "Services"
  },
  {
    id: "faq-3",
    question: "Do you offer 24/7 emergency AC services?",
    answer: "Absoluty. Our emergency HVAC technicians operate 24/7 including weekends and public holidays for urgent breakdowns, power trips, or severe water leaks.",
    category: "Emergency"
  },
  {
    id: "faq-4",
    question: "Do you repair both Split AC and Central AC systems?",
    answer: "Yes, our certified technicians are trained to repair and service Split ACs, Ducted Split units, Package units, Central HVAC systems, FCU/AHU, and VRV/VRF systems from all major manufacturers.",
    category: "Services"
  },
  {
    id: "faq-5",
    question: "How often should AC duct cleaning be done in Dubai?",
    answer: "Due to Dubai's high ambient dust and humidity, we recommend professional AC duct cleaning and sanitization every 12 to 18 months to prevent mold growth and maintain healthy indoor air quality.",
    category: "General"
  },
  {
    id: "faq-6",
    question: "Which areas of Dubai do you cover?",
    answer: "We cover all areas of Dubai including Deira, Bur Dubai, Downtown Dubai, Business Bay, Dubai Marina, JLT, Palm Jumeirah, JVC, JVT, Mirdif, Arabian Ranches, Dubai Hills, Silicon Oasis, Al Barsha, and surrounding regions.",
    category: "General"
  }
];

export const SERVICE_AREAS: ServiceArea[] = [
  { name: "Deira", region: "Old Dubai", responseTime: "20-30 Mins" },
  { name: "Bur Dubai", region: "Old Dubai", responseTime: "20-30 Mins" },
  { name: "Downtown Dubai", region: "New Dubai", responseTime: "30-40 Mins" },
  { name: "Business Bay", region: "New Dubai", responseTime: "30-40 Mins" },
  { name: "Dubai Marina", region: "New Dubai", responseTime: "30-40 Mins" },
  { name: "Jumeirah Lakes Towers (JLT)", region: "New Dubai", responseTime: "30-40 Mins" },
  { name: "Palm Jumeirah", region: "New Dubai", responseTime: "35-45 Mins" },
  { name: "Jumeirah Village Circle (JVC)", region: "Suburbs", responseTime: "30-40 Mins" },
  { name: "Al Barsha", region: "New Dubai", responseTime: "25-35 Mins" },
  { name: "Mirdif", region: "Suburbs", responseTime: "25-35 Mins" },
  { name: "Arabian Ranches", region: "Suburbs", responseTime: "35-45 Mins" },
  { name: "Dubai Hills Estate", region: "Suburbs", responseTime: "30-40 Mins" },
  { name: "Silicon Oasis", region: "Suburbs", responseTime: "30-40 Mins" },
  { name: "Motor City / Sports City", region: "Suburbs", responseTime: "30-40 Mins" },
  { name: "Jumeirah / Umm Suqeim", region: "New Dubai", responseTime: "25-35 Mins" },
  { name: "DIFC", region: "Commercial", responseTime: "25-35 Mins" },
];
