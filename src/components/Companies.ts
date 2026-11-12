import { i18n } from '../i18n/i18n';
import { createLayout, animate } from 'animejs';

export interface CompanyEntity {
  id: string;
  nameEn: string;
  nameAr: string;
  category: 'setup_gov' | 'finance' | 'property' | 'creative_hospitality' | 'investment';
  categoryLabelEn: string;
  categoryLabelAr: string;
  taglineEn: string;
  taglineAr: string;
  descEn: string;
  descAr: string;
  established?: string;
  locationEn: string;
  locationAr: string;
  mapQuery?: string;
  mapLat?: number;
  mapLng?: number;
  googleMapsUrl?: string;
  servicesEn: string[];
  servicesAr: string[];
  statsEn?: string;
  statsAr?: string;
  logo: string;
  accentColor: string;
}

export const COMPANIES_LIST: CompanyEntity[] = [
  {
    id: 'osbic',
    nameEn: 'OSBIC International',
    nameAr: 'شركة أوسبك العالمية',
    category: 'setup_gov',
    categoryLabelEn: 'Business Setup & Formation',
    categoryLabelAr: 'تأسيس الأعمال والخدمات المؤسسية',
    taglineEn: 'Your Premier Corporate Gateway to GCC Business Expansion',
    taglineAr: 'بوابتكم الرائدة لتأسيس الأعمال والتوسع في دول مجلس التعاون الخليجي',
    descEn: 'Established in 2011, OSBIC International is a recognized leader in enterprise formation, foreign investment advisory, and corporate government liaison services across the GCC. Backed by more than 15 years of institutional experience, OSBIC has empowered more than 3,000 corporate entities, foreign investors, and entrepreneurs.',
    descAr: 'منذ تأسيسها عام ٢٠١١، رسخت OSBIC International مكانتها كإحدى الشركات الرائدة في مجال تأسيس الأعمال والخدمات المؤسسية في دول مجلس التعاون الخليجي. وبخبرة تتجاوز ١٥ عامًا، ساهمت الشركة في دعم أكثر من ٣,٠٠٠ رائد أعمال ومستثمر وشركة.',
    established: '2011',
    locationEn: 'Muscat HQ, Sultanate of Oman',
    locationAr: 'المقر الرئيسي، مسقط، سلطنة عُمان',
    mapQuery: 'OSBIC International, Al Khuwair, Muscat, Oman',
    servicesEn: [
      'Commercial Registration (CR) Issuance & Amendments',
      'Foreign Capital Investment Setup & 100% Ownership Structuring',
      'Comprehensive PRO & Government Liaison Operations',
      'Investor, Executive & Workforce Visa Clearances',
      'GCC Cross-Border Expansion Advisory'
    ],
    servicesAr: [
      'إصدار وتعديل السجلات التجارية وتراخيص مزاولة الأنشطة',
      'تأسيس استثمارات رأس المال الأجنبي والتملك الكامل',
      'العلاقات الحكومية وإنجاز المعاملات الرسمية (PRO)',
      'إصدار وتجديد تأشيرات المستثمرين والكوادر والعمالة',
      'استشارات التوسع التجاري بين سلطنة عُمان ودول الخليج'
    ],
    statsEn: '+3,000 Clients | 15+ Years Track Record',
    statsAr: '+٣,٠٠٠ عميل | خبرة +١٥ عاماً',
    logo: '/logos/OSBIC.png',
    accentColor: '#2A93D5',
  },
  {
    id: 'maisarah',
    nameEn: 'Maisarah Auditing & Financial Consultant',
    nameAr: 'شركة ميسرة للتدقيق والاستشارات المالية',
    category: 'finance',
    categoryLabelEn: 'Audit & Financial Advisory',
    categoryLabelAr: 'التدقيق والاستشارات والضرائب',
    taglineEn: 'Financial Precision, Regulatory Clarity, and Sustainable Growth',
    taglineAr: 'دقة مالية، شفافية مهنية، وحلول مبتكرة تعزز النمو والاستدامة',
    descEn: 'Maisarah operates as a specialized advisory firm staffed by senior chartered accountants and financial analysts. The firm provides enterprises with analytical depth, rigorous compliance frameworks, and proactive fiscal strategies tailored to Oman\'s regulatory landscape.',
    descAr: 'فريق مكون من محاسبين ومستشارين ذوي كفاءات عالية يجمع بين الخبرة والدقة. نعمل بكل شفافية لضمان نجاح أعمالكم عبر حلول مالية مبتكرة وامتثال تام للقوانين الضريبية والتنظيمية في سلطنة عُمان.',
    locationEn: 'Muscat, Sultanate of Oman',
    locationAr: 'مسقط، سلطنة عُمان',
    mapQuery: 'Maisarah Auditing, Muscat, Oman',
    servicesEn: [
      'Corporate Income Tax (CIT) & VAT Advisory & Filing',
      'Statutory External Auditing & Internal Accounting Assurance',
      'Corporate Financial Analysis & Viability Diagnostics',
      'Commercial & Technical Project Feasibility Studies',
      'General Ledger, Accounting Services & Payroll Records'
    ],
    servicesAr: [
      'خدمات الضرائب والامتثال لضريبة الدخل والقيمة المضافة',
      'تدقيق الحسابات القانوني والمراجعة المالية المعتمدة',
      'التحليل والتشخيص المالي للشركات والمؤسسات',
      'إعداد دراسات الجدوى الاقتصادية للمشاريع',
      'خدمات المحاسبة المتكاملة ومسك الدفاتر المالية'
    ],
    statsEn: 'Certified Chartered Accountants',
    statsAr: 'محاسبون ومراجعون قانونيون معتمدون',
    logo: '/logos/MAISARAH.png',
    accentColor: '#8F1D38',
  },
  {
    id: 'asas',
    nameEn: 'ASAS Services Center',
    nameAr: 'مركز أساس للخدمات',
    category: 'setup_gov',
    categoryLabelEn: 'Government Liaison & Legal Hub',
    categoryLabelAr: 'مركز استشاري وتخليص معاملات',
    taglineEn: 'Strategic Knowledge Hub & Regulatory Clearance in Ghala',
    taglineAr: 'أكثر من مجرد تخليص معاملات... مركز معرفي واستشاري للأعمال',
    descEn: 'Operates as a strategic knowledge hub going beyond traditional transaction clearance. Delivers legal and administrative advisory to navigate structural business changes and market movements, including Public Offerings (IPOs).',
    descAr: 'يعد "أساس" أكثر من مجرد مكتب لتخليص المعاملات، فهو مركز معرفي يقدم نصائح قانونية وإدارية لمتابعيه، ويواكب التطورات الاقتصادية في السلطنة مثل الاكتتابات العامة، مما يجعله وجهة مفضلة لرواد الأعمال والأفراد.',
    locationEn: 'Muscat – Ghala',
    locationAr: 'مسقط - غلا',
    mapQuery: 'Ghala Industrial Area, Muscat, Oman',
    servicesEn: [
      'Corporate Transaction Clearance & Ministerial Approvals',
      'Legal & Administrative Structuring Advisory',
      'Public Offering (IPO) Tracking & Regulatory Navigation',
      'Municipal & Trade Licensing Procedures'
    ],
    servicesAr: [
      'تخليص المعاملات الحكومية والموافقات الوزارية',
      'تقديم النصائح والاستشارات القانونية والإدارية',
      'مواكبة التطورات الاقتصادية والاكتتابات العامة',
      'تجديد التراخيص البلدية والمهنية والتجارية'
    ],
    statsEn: 'Branch 01 • Ghala Commercial Hub',
    statsAr: 'فرع ٠١ • مركز غلا للأعمال',
    logo: '/logos/ASAS.png',
    accentColor: '#A88836',
  },
  {
    id: 'masar',
    nameEn: 'Masar Services Center',
    nameAr: 'مركز مسار للخدمات',
    category: 'setup_gov',
    categoryLabelEn: 'Tax File Management & Compliance',
    categoryLabelAr: 'إدارة الملفات الضريبية والامتثال',
    taglineEn: 'Corporate Tax Records & Statutory Protection in Al Mawaleh',
    taglineAr: 'شريكك الموثوق لإدارة ملفاتك الضريبية وتجنب الغرامات المالية',
    descEn: 'Specialized center assisting enterprises in handling corporate tax records, guaranteeing full adherence to Omani tax legislation, preventing statutory fines, and safeguarding long-term fiscal stability.',
    descAr: 'خيار ممتاز للشركات التي تبحث عن شريك موثوق لإدارة ملفاتها الضريبية وضمان التزامها بالقوانين العُمانية، مما يساعدها على النمو المستدام وتجنب الغرامات المالية.',
    locationEn: 'Muscat – Al Mawaleh',
    locationAr: 'مسقط - الموالح',
    mapQuery: 'Al Mawaleh, Seeb, Muscat, Oman',
    servicesEn: [
      'Corporate Tax Records Auditing & Assembly',
      'Tax Authority Compliance & Filing Follow-ups',
      'Statutory Penalty Mitigation & Dispute Counseling',
      'Corporate Fiscal Records Archival'
    ],
    servicesAr: [
      'إدارة وتنظيم الملفات والسجلات الضريبية للشركات',
      'متابعة المعاملات مع جهاز الضرائب العُماني',
      'ضمان الالتزام وتجنب الغرامات المالية القانونية',
      'تقديم استشارات الامتثال المالي والضريبي للمؤسسات'
    ],
    statsEn: 'Branch 02 • Al Mawaleh Center',
    statsAr: 'فرع ٠٢ • مركز الموالح',
    logo: '/logos/MASAR.jpeg',
    accentColor: '#0095A8',
  },
  {
    id: 'amer',
    nameEn: 'Amer Service Center',
    nameAr: 'مركز آمر للخدمات',
    category: 'setup_gov',
    categoryLabelEn: 'Commercial Launch Hub',
    categoryLabelAr: 'تأسيس المشاريع وتعقيب المعاملات',
    taglineEn: 'Administrative Clearance & Commercial Launch Enablement in Ruwi',
    taglineAr: 'الوجهة الموثوقة لمن يرغب في بدء مشروع تجاري في قلب مسقط',
    descEn: 'Strategically located center in Ruwi specializing in administrative follow-ups, government transactions, and fast-track clearance for entrepreneurs founding new commercial ventures.',
    descAr: 'مكتب متخصص في تقديم الخدمات الإدارية وتعقيب المعاملات. يعد المركز وجهة موثوقة لمن يرغب في بدء مشروع تجاري نظراً لموقعه الاستراتيجي وخبرته الواسعة.',
    locationEn: 'Muscat – Ruwi Central',
    locationAr: 'مسقط - روي الحي التجاري',
    mapQuery: 'Ruwi High Street, Muscat, Oman',
    servicesEn: [
      'Fast-Track Commercial Startup Setup',
      'Administrative Follow-ups & Ministerial Liaisons',
      'Commercial Registration Documentation',
      'Corporate Municipality & Labour Formalities'
    ],
    servicesAr: [
      'تسريع إجراءات بدء المشاريع والأنشطة التجارية',
      'تعقيب المعاملات ومتابعة الدوائر الحكومية',
      'توثيق وإصدار وتعديل السجلات التجارية',
      'معاملات البلدية والقوى العاملة وتصاريح العمل'
    ],
    statsEn: 'Branch 03 • Ruwi Commercial Area',
    statsAr: 'فرع ٠٣ • روي التجاري',
    logo: '/logos/AMER.png',
    accentColor: '#1E293B',
  },
  {
    id: 'tamkeen',
    nameEn: 'Tamkeen Services Center',
    nameAr: 'مركز تمكين للخدمات',
    category: 'setup_gov',
    categoryLabelEn: 'Single-Window Clearance Hub',
    categoryLabelAr: 'نافذة شاملة لإنجاز المعاملات',
    taglineEn: 'Comprehensive Citizen & Resident Commercial Hub in Al Khuwair',
    taglineAr: 'وجهة شاملة للمواطنين والمقيمين ورواد الأعمال في قلب الخوير',
    descEn: 'A comprehensive single-window center serving citizens and foreign residents across Muscat with day-to-day administrative formalities, Ministry of Labour affairs, commercial registers, and professional licenses.',
    descAr: 'يعد "تمكين" وجهة شاملة للمواطنين والمقيمين في مسقط لإنجاز معاملاتهم اليومية، سواء كانت متعلقة بالسجلات التجارية، التراخيص المهنية أو شؤون القوى العاملة ووزارة العمل.',
    locationEn: 'Muscat – Al Khuwair',
    locationAr: 'مسقط - الخوير',
    mapQuery: 'Al Khuwair, Muscat, Oman',
    servicesEn: [
      'Ministry of Labour Formalities & Manpower Affairs',
      'Commercial Registers & Professional Licenses',
      'Resident & Investor Documentation Services',
      'Day-to-Day Government Transaction Clearance'
    ],
    servicesAr: [
      'شؤون القوى العاملة وتصاريح ومعاملات وزارة العمل',
      'استخراج وتجديد السجلات التجارية والتراخيص المهنية',
      'خدمات توثيق معاملات المستثمرين والمقيمين',
      'إنجاز المعاملات الإدارية اليومية للمواطنين والشركات'
    ],
    statsEn: 'Branch 04 • Al Khuwair Hub',
    statsAr: 'فرع ٠٤ • الخوير',
    logo: '/logos/TAMKEEN.png',
    accentColor: '#234338',
  },
  {
    id: 'nameer',
    nameEn: 'Nameer Properties',
    nameAr: 'شركة نمير للعقارات',
    category: 'property',
    categoryLabelEn: 'Real Estate Asset Management',
    categoryLabelAr: 'الإدارة والتطوير العقاري',
    taglineEn: 'Full-Spectrum Real Estate Management, Brokerage & Investment',
    taglineAr: 'إدارة احترافية للعقارات والمباني وتمكين المستثمرين في عُمان',
    descEn: 'Headquartered in Muscat, Nameer Properties delivers end-to-end real estate brokerage, property management, and asset development services for residential, commercial, and industrial portfolios.',
    descAr: 'شركة عقارية متخصصة تقع في مسقط، تهدف إلى أن تكون الوجهة الأولى للباحثين عن عقارات موثوقة، سواء للشراء، البيع، أو الاستثمار وإدارة الأصول العقارية.',
    locationEn: 'Muscat, Sultanate of Oman',
    locationAr: 'مسقط، سلطنة عُمان',
    mapQuery: 'Nameer Properties, Muscat, Oman',
    servicesEn: [
      'Professional Building & Property Facility Management',
      'Investor Real Estate Matching & High-Yield Acquisition',
      'Multi-Channel Commercial Real Estate Marketing',
      'Efficient Property Project Development',
      'Leasing & Sales Transaction Structuring'
    ],
    servicesAr: [
      'إدارة إحترافية للعقارات والمباني والمجمعات',
      'تمكين المستثمرين من الحصول على العقار المناسب والمجدي',
      'تسويق عقاري احترافي عبر القنوات المتعددة',
      'تطوير المشاريع العقارية بكفاءة استثمارية عالية',
      'دعم وتوثيق عمليات التأجير والبيع والتحصيل'
    ],
    statsEn: 'Portfolio Management | Muscat Real Estate',
    statsAr: 'إدارة أصول | سوق العقارات العُماني',
    logo: '/logos/NAMEER -1.png',
    accentColor: '#0E544A',
  },
  {
    id: 'misk',
    nameEn: 'MUSK Business Center',
    nameAr: 'مركز مسك للأعمال',
    category: 'property',
    categoryLabelEn: 'Coworking & Serviced Offices',
    categoryLabelAr: 'مساحات العمل والمكاتب المجهزة',
    taglineEn: 'Modern, Flexible & Connected Workspaces in Muscat (Ghala)',
    taglineAr: 'مكاتب مؤثثة حديثة وبيئة عمل ملهمة تدعم الشركات ورواد الأعمال',
    descEn: 'Situated in Ghala\'s prime commercial district, MUSK Business Center is an integrated coworking, private serviced office, and business support facility crafted for growing teams, modern consultants, and startups.',
    descAr: 'مساحة عمل مشتركة ومركز خدمات يقع في منطقة غلا بمسقط، مصمم خصيصاً لدعم الشركات الناشئة، رواد الأعمال والمهنيين من خلال توفير بيئة عمل احترافية ومتكاملة بأسعار تنافسية.',
    locationEn: 'Muscat – Ghala District',
    locationAr: 'مسقط - منطقة غلا التجارية',
    mapQuery: 'MUSK Business Center, Ghala, Muscat, Oman',
    servicesEn: [
      'Modern Private Executive Furnished Offices',
      'Ergonomic Shared Coworking Desks',
      'High-Tech Conference & Meeting Suites',
      'Competitive Rental Prices & Highly Flexible Leases',
      'Integrated Corporate Workplace Amenities & Reception'
    ],
    servicesAr: [
      'مكاتب خاصة حديثة مؤثثة بالكامل بمساحات متنوعة',
      'مساحات عمل مشتركة مرنة ومحفزة على الإنتاجية',
      'قاعات اجتماعات ومؤتمرات مجهزة بأحدث التقنيات',
      'أسعار تنافسية وعقود إيجار شهرية وسنوية مرنة',
      'خدمات استقبال وضيافة وإنترنت فائق السرعة'
    ],
    statsEn: 'Serviced Offices • Meeting Suites • Coworking',
    statsAr: 'مكاتب خاصة • قاعات اجتماعات • مساحات مشتركة',
    logo: '/logos/MUSK.png',
    accentColor: '#514E45',
  },
  {
    id: 'omca',
    nameEn: 'OMCA Coffee',
    nameAr: 'أومكا كافيه (OMCA COFFEE LLC)',
    category: 'creative_hospitality',
    categoryLabelEn: 'Specialty Hospitality & Cafe',
    categoryLabelAr: 'الضيافة والمقاهي المختصة',
    taglineEn: 'Specialty Coffee Culture & Exceptional Social Spaces',
    taglineAr: 'ثقافة القهوة المختصة ومساحات اجتماعية تلهم الإبداع واللقاء',
    descEn: 'OSAN GROUP\'s signature brand in specialty hospitality, dedicated to artisanal coffee roasting, exceptional cafe atmospheres, and engaging community hubs (CR LLC 1540400).',
    descAr: 'أومكا كافيه (سجل تجاري ش.م.م ١٥٤٠٤٠٠) هي ذراع المجموعة في قطاع الضيافة والمقاهي المختصة، حيث تقدم تجربة قهوة استثنائية ونكهات مختارة بعناية في أجواء راقية.',
    locationEn: 'Muscat, Sultanate of Oman',
    locationAr: 'مسقط، سلطنة عُمان',
    mapQuery: 'OMCA Coffee, Muscat, Oman',
    servicesEn: [
      'Artisanal Specialty Coffee Roasting & Pour-Overs',
      'Contemporary Design Social Cafe Gathering Spaces',
      'Corporate Catering & Executive Coffee Bars',
      'Commercial Entity Registration LLC 1540400'
    ],
    servicesAr: [
      'تحميص وتقديم محاصيل القهوة المختصة بأعلى المعايير',
      'مساحات مقاهي مصممة لتوفير بيئة اجتماعية ملهمة',
      'خدمات الضيافة وتقديم القهوة للفعاليات والشركات',
      'سجل تجاري معتمد (OMCA COFFEE LLC 1540400)'
    ],
    statsEn: 'CR: LLC 1540400 • Specialty Roastery',
    statsAr: 'سجل تجاري: ١٥٤٠٤٠٠ • محمصة متخصصة',
    logo: '/logos/OMCA.jpeg',
    accentColor: '#6F182A',
  },
  {
    id: 'osan-studio',
    nameEn: 'Osan Studio',
    nameAr: 'أوسان استوديو',
    category: 'creative_hospitality',
    categoryLabelEn: 'Brand Strategy & Media Production',
    categoryLabelAr: 'التسويق الاستراتيجي والإنتاج الإعلامي',
    taglineEn: 'Creative Strategy, Digital Media & Brand Engineering',
    taglineAr: 'أفكارك التسويقية تبدأ من هنا... نخطط وننفذ استراتيجيات تخلي اسمك يوصل صح',
    descEn: 'The creative and digital communications arm of the group, transforming strategic vision into brand identity, digital products, high-impact marketing campaigns, and multimedia production.',
    descAr: 'الذراع الإبداعي والتسويقي لمجموعة أوسان، يتولى تصميم وتخطيط وتنفيذ الحملات التسويقية والاستراتيجيات الإعلامية والهويات البصرية للشركات والمؤسسات.',
    locationEn: 'Muscat HQ, Sultanate of Oman',
    locationAr: 'المقر الرئيسي، مسقط، سلطنة عُمان',
    mapQuery: 'Osan Studio, Muscat, Oman',
    servicesEn: [
      'Corporate Branding & Visual Identity Engineering',
      'Strategic Multi-Channel Digital Marketing',
      'Commercial 4K Video Production & Photography',
      'Interactive Web Experiences & UX/UI Architecture'
    ],
    servicesAr: [
      'تصميم وبناء الهويات البصرية للشركات والمؤسسات',
      'تخطيط وتنفيذ الحملات الإعلانية والتسويقية الرقمية',
      'الإنتاج المرئي وتصوير الإعلانات بجودة عالية 4K',
      'تصميم وتطوير المواقع والتطبيقات والتجارب الرقمية'
    ],
    statsEn: 'Creative Direction • Performance Media',
    statsAr: 'إدارة إبداعية • إنتاج مرئي وتسويق',
    logo: '/logos/OSAN STUDIO -1.png',
    accentColor: '#2E4960',
  },
  {
    id: 'travel',
    nameEn: 'Travel & Tourism Division',
    nameAr: 'شركة السفر والسياحة',
    category: 'creative_hospitality',
    categoryLabelEn: 'Corporate Mobility & Tourism',
    categoryLabelAr: 'السفر والسياحة ورحلات الأعمال',
    taglineEn: 'Seamless Corporate Mobility & Inspiring Global Journeys',
    taglineAr: 'حلول سفر متكاملة للأفراد والشركات بأعلى معايير الراحة والجودة',
    descEn: 'A dedicated travel management entity providing bespoke corporate travel itineraries, commercial airline ticketing, worldwide hotel arrangements, visa concierge, and outbound/inbound tourism programs.',
    descAr: 'شركة متخصصة في تقديم خدمات السفر والسياحة للأفراد والشركات، تشمل حجز تذاكر الطيران، الفنادق، إصدار التأشيرات، وتنظيم الرحلات السياحية وملتقيات الأعمال الرسمية.',
    locationEn: 'Muscat, Sultanate of Oman',
    locationAr: 'مسقط، سلطنة عُمان',
    mapQuery: 'Al Khuwair, Muscat, Oman',
    servicesEn: [
      'Worldwide Commercial Flight Booking & Itinerary Management',
      'Corporate Hotel Bookings & VIP Executive Hospitality',
      'Tourist & Business Entry Visa Issuance Support',
      'Specialized Inbound/Outbound Business Retreats'
    ],
    servicesAr: [
      'حجز وإصدار تذاكر الطيران على كافة الخطوط العالمية',
      'حجوزات الفنادق ومقار الإقامة الفاخرة للوفود',
      'إصدار وتسهيل تأشيرات السفر السياحية والتجارية',
      'تنظيم الرحلات السياحية وملتقيات ووفود الأعمال'
    ],
    statsEn: 'Global Ticketing • Corporate Concierge',
    statsAr: 'تذاكر عالمية • حجوزات وإقامة وفود',
    logo: '/logos/osan-group-logo.png',
    accentColor: '#2473AB',
  },
  {
    id: 'osan-holding',
    nameEn: 'Osan Holding',
    nameAr: 'شركة أوسان القابضة',
    category: 'investment',
    categoryLabelEn: 'Investment Engine & Portfolio',
    categoryLabelAr: 'الذراع الاستثماري وإدارة الأصول',
    taglineEn: 'Strategic Asset Allocation and Long-Term Value Creation',
    taglineAr: 'إدارة وتنمية المحفظة الاستثمارية وبناء الشراكات الاستراتيجية',
    descEn: 'The investment engine of OSAN GROUP, steering a diversified portfolio across high-growth industries, developing strategic joint ventures, and driving long-term economic returns aligned with Oman Vision 2040.',
    descAr: 'أوسان القابضة هي الذراع الاستثمارية لمجموعة أوسان، وتتخصص في إدارة وتنمية المحفظة الاستثمارية للمجموعة من خلال الاستثمار في الشركات الواعدة وبناء الشراكات الاستراتيجية وتطوير المشاريع ذات القيمة المضافة.',
    locationEn: 'Muscat HQ, Sultanate of Oman',
    locationAr: 'المقر الرئيسي، مسقط، سلطنة عُمان',
    mapQuery: 'OSAN Group Holding, Al Khuwair, Muscat, Oman',
    servicesEn: [
      'Revenue Source Diversification & Risk Allocation',
      'Direct Equity Investment in Promising Regional Ventures',
      'Forging High-Yield Strategic Joint Ventures',
      'Empowering the Omani National Economy'
    ],
    servicesAr: [
      'تنويع مصادر الدخل وإدارة المحافظ الاستثمارية',
      'الاستثمار المباشر في القطاعات الواعدة وريادة الأعمال',
      'بناء شراكات وتحالفات استراتيجية مستدامة',
      'تعزيز القيمة الاقتصادية للأصول ودعم رؤية عُمان ٢٠٤٠'
    ],
    statsEn: 'Active Portfolio: Maxphone, United Way, Rakaez, Ozone, Al Somow, Meethaq',
    statsAr: 'استثمارات: ماكس فون، يونايتد وي، ركائز، أوزون، السمو، ميثاق',
    logo: '/logos/osan-group-logo.png',
    accentColor: '#2B2B2B',
  },
];

export class Companies {
  private container: HTMLElement;
  private selectedCompany: CompanyEntity | null = null;
  private activeMorphCard: HTMLElement | null = null;
  private activeModalLayout: ReturnType<typeof createLayout> | null = null;
  private unsubscribeI18n: (() => void) | null = null;

  constructor() {
    this.container = document.createElement('section');
    this.container.id = 'companies';
    this.container.className = 'relative bg-white min-h-screen flex flex-col justify-center py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-t border-osan-sky/60 overflow-hidden scroll-mt-0';
    this.render();
    this.initGlobalModalListener();

    this.unsubscribeI18n = i18n.onLanguageChange(() => {
      this.render();
    });
  }

  public getElement(): HTMLElement {
    return this.container;
  }

  private getCompanyMapUrls(company: CompanyEntity, isAr: boolean): { embedUrl: string; externalUrl: string } {
    const query =
      company.mapLat !== undefined && company.mapLng !== undefined
        ? `${company.mapLat},${company.mapLng}`
        : company.mapQuery || `${company.locationEn}, Oman`;
    const encoded = encodeURIComponent(query);
    return {
      embedUrl: `https://maps.google.com/maps?q=${encoded}&z=15&hl=${isAr ? 'ar' : 'en'}&output=embed`,
      externalUrl: company.googleMapsUrl || `https://www.google.com/maps/search/?api=1&query=${encoded}`,
    };
  }

  private render(): void {
    const isAr = i18n.isRTL();

    this.container.innerHTML = `
      <div class="max-w-7xl mx-auto space-y-10 sm:space-y-12">
        
        <!-- Section Header (Entrance Motion) -->
        <div class="flex flex-col items-center text-center max-w-3xl mx-auto reveal-text-fade">
          <h2 class="text-3xl sm:text-4xl md:text-5xl font-heading font-light sm:font-normal text-osan-ink tracking-tight">
            ${isAr 
              ? 'شركات متخصصة تعمل بتكامل لتحقيق أهدافك' 
              : 'Our Specialized Corporate Companies & Brands'}
          </h2>
        </div>

        <!-- Companies Grid (Staggered Cascade) -->
        <div 
          id="companies-grid" 
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch reveal-stagger-cascade"
        >
          ${COMPANIES_LIST
            .map((company) => {
              const isSolidLogo = ['osbic', 'osan-studio', 'masar', 'omca'].includes(company.id);
              return `
              <div 
                data-layout-id="company-morph-shell-${company.id}"
                data-company-card-id="${company.id}"
                class="company-morph-shell company-interactive-card cursor-pointer group bg-white p-6 rounded-3xl border border-osan-sky/80 shadow-subtle hover:shadow-elevated transition-shadow duration-300 flex flex-col justify-between relative overflow-hidden"
              >
                <!-- Top Accent Line -->
                <div class="absolute top-0 inset-x-0 h-1.5" style="background-color: ${company.accentColor};"></div>

                <div>
                  <!-- Logo Container: Shared FLIP Morph Source -->
                  <div 
                    data-layout-id="company-morph-logo-${company.id}"
                    class="company-morph-logo w-20 h-20 rounded-2xl border border-osan-sky/60 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-300 overflow-hidden ${
                      isSolidLogo
                        ? 'p-0 bg-transparent'
                        : 'p-2 bg-osan-light/60'
                    }"
                  >
                    <img 
                      src="${company.logo}" 
                      alt="${company.nameEn}" 
                      class="${
                        isSolidLogo
                          ? 'w-full h-full object-cover'
                          : 'max-h-full max-w-full object-contain filter drop-shadow-xs'
                      }"
                      loading="lazy"
                    />
                  </div>

                  <!-- Category Tag -->
                  <span class="text-[11px] font-normal px-2.5 py-1 rounded-full bg-osan-light text-osan-grey border border-osan-sky/70 mb-2 inline-block">
                    ${isAr ? company.categoryLabelAr : company.categoryLabelEn}
                  </span>

                  <!-- Title: Shared FLIP Morph Source -->
                  <h3 
                    data-layout-id="company-morph-title-${company.id}"
                    class="company-morph-title text-xl font-heading font-normal text-osan-ink mt-2 mb-2 group-hover:text-osan-blue transition-colors line-clamp-1"
                  >
                    ${isAr ? company.nameAr : company.nameEn}
                  </h3>

                  <!-- Tagline -->
                  <p class="text-xs sm:text-sm font-light text-osan-grey line-clamp-2 leading-relaxed mb-4">
                    ${isAr ? company.taglineAr : company.taglineEn}
                  </p>
                </div>

                <!-- Footer: Location & Arrow -->
                <div class="pt-4 border-t border-osan-sky/50 flex items-center justify-between text-xs text-osan-grey font-light">
                  <span class="flex items-center gap-1.5">
                    <svg class="w-3.5 h-3.5 text-osan-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                    <span class="line-clamp-1">${isAr ? company.locationAr : company.locationEn}</span>
                  </span>

                  <span class="w-7 h-7 rounded-full bg-osan-light group-hover:bg-osan-blue group-hover:text-white flex items-center justify-center transition-colors">
                    <svg class="w-3.5 h-3.5 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                    </svg>
                  </span>
                </div>

              </div>
            `;
            })
            .join('')}
        </div>

        <!-- HTML5 Rich Modal <dialog> (Anime.js v4 Shared-Element Morph Target centered at 0,0) -->
        <dialog 
          id="company-details-dialog" 
          class="focus:outline-none"
          aria-labelledby="dialog-company-title"
          aria-modal="true"
        >
          <div id="company-dialog-inner" class="company-morph-shell bg-white rounded-3xl border-2 border-osan-sky shadow-2xl p-5 sm:p-7 lg:p-8 relative overflow-hidden flex flex-col w-full max-w-6xl max-h-[90vh] m-auto">
            <!-- Dynamic Modal Content rendered here -->
          </div>
        </dialog>

      </div>
    `;

    this.bindEvents();
  }

  private bindEvents(): void {

    // Company Cards Click -> Open Shared-Element Morph Dialog
    const cards = this.container.querySelectorAll<HTMLElement>('[data-company-card-id]');
    cards.forEach((card) => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-company-card-id');
        if (id) {
          this.openModal(id, card);
        }
      });
    });

    // Backdrop click on native dialog
    const dialog = this.container.querySelector<HTMLDialogElement>('#company-details-dialog');
    dialog?.addEventListener('click', (e) => {
      if (e.target === dialog) {
        this.closeModal();
      }
    });

    // Escape key handling
    dialog?.addEventListener('cancel', (e) => {
      e.preventDefault();
      this.closeModal();
    });
  }

  private initGlobalModalListener(): void {
    window.addEventListener('osan:open-company-modal', (e: Event) => {
      const customEvent = e as CustomEvent<{ companyId: string }>;
      const id = customEvent.detail?.companyId;
      if (id) {
        // Handle special network alias
        const targetId = id === 'service-centers' ? 'asas' : id;
        this.openModal(targetId);
      }
    });
  }

  private restoreMorphSourceCard(): void {
    if (!this.activeMorphCard) return;
    const saved = [
      ...(this.activeMorphCard.hasAttribute('data-saved-layout-id') ? [this.activeMorphCard] : []),
      ...Array.from(this.activeMorphCard.querySelectorAll<HTMLElement>('[data-saved-layout-id]')),
    ];
    saved.forEach((el) => {
      const originalId = el.getAttribute('data-saved-layout-id');
      if (originalId) {
        el.setAttribute('data-layout-id', originalId);
        el.removeAttribute('data-saved-layout-id');
      }
    });
    this.activeMorphCard.style.opacity = '';
    this.activeMorphCard = null;
  }

  public openModal(companyId: string, sourceCardEl?: HTMLElement): void {
    const company = COMPANIES_LIST.find((c) => c.id === companyId);
    if (!company) return;

    this.restoreMorphSourceCard();
    this.selectedCompany = company;

    const dialog = this.container.querySelector<HTMLDialogElement>('#company-details-dialog');
    const inner = this.container.querySelector<HTMLElement>('#company-dialog-inner');
    if (!dialog || !inner) return;

    const isAr = i18n.isRTL();
    const isSolidLogo = ['osbic', 'osan-studio', 'masar', 'omca'].includes(company.id);
    const { embedUrl, externalUrl } = this.getCompanyMapUrls(company, isAr);

    // Populate 3-Column Modal HTML: Left (Logo), Center (Contents), Right/Bottom (Location + Real Map)
    inner.innerHTML = `
      <!-- Accent Top Bar -->
      <div class="absolute top-0 inset-x-0 h-2 z-20" style="background-color: ${company.accentColor};"></div>

      <!-- Close Button -->
      <button 
        type="button" 
        id="dialog-close-btn"
        class="absolute top-4 right-4 rtl:right-auto rtl:left-4 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-osan-light hover:bg-osan-sky text-osan-ink hover:text-osan-blue flex items-center justify-center transition-colors shadow-xs z-30 focus:outline-none cursor-pointer"
        aria-label="Close dialog"
      >
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>

      <!-- Scrollable 3-Zone Responsive Layout -->
      <div class="overflow-y-auto pr-1 rtl:pr-0 rtl:pl-1 pt-2">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-stretch">
          
          <!-- ==================================================== -->
          <!-- LEFT COLUMN: Brand Logo Showcase (Morph Destination) -->
          <!-- ==================================================== -->
          <div 
            class="lg:col-span-3 rounded-2xl p-5 sm:p-6 border border-osan-sky/70 flex flex-col items-center justify-center relative overflow-hidden"
            style="background: linear-gradient(155deg, ${company.accentColor}16 0%, rgba(248,250,252,0.95) 65%, ${company.accentColor}10 100%);"
          >
            <!-- Soft Radial Brand Glow Behind Logo -->
            <div 
              class="absolute -top-10 -left-10 w-36 h-36 rounded-full opacity-25 blur-2xl pointer-events-none"
              style="background-color: ${company.accentColor};"
            ></div>

            <div 
              data-layout-id="company-morph-logo-${company.id}"
              class="company-morph-logo relative z-10 w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-3xl border border-osan-sky/70 shadow-md flex items-center justify-center flex-shrink-0 overflow-hidden ${
                isSolidLogo ? 'p-0 bg-transparent' : 'p-3 bg-white'
              }"
            >
              <img 
                src="${company.logo}" 
                alt="${company.nameEn}" 
                class="${
                  isSolidLogo
                    ? 'w-full h-full object-cover'
                    : 'max-h-full max-w-full object-contain filter drop-shadow-xs'
                }"
              />
            </div>
          </div>

          <!-- ==================================================== -->
          <!-- CENTER COLUMN: Corporate Overview & Core Services    -->
          <!-- ==================================================== -->
          <div class="lg:col-span-5 flex flex-col justify-center">
            <div class="space-y-4">
              <!-- Title Header -->
              <div class="pb-3.5 border-b border-osan-sky/70 pr-8 rtl:pr-0 rtl:pl-8 lg:pr-0 lg:rtl:pl-0">
                <h3 
                  id="dialog-company-title"
                  data-layout-id="company-morph-title-${company.id}"
                  class="company-morph-title text-2xl sm:text-[1.65rem] font-heading font-normal text-osan-ink leading-tight"
                >
                  ${isAr ? company.nameAr : company.nameEn}
                </h3>
              </div>

              <!-- Secondary Center Content (Fades smoothly in synced with morph) -->
              <div id="company-modal-center-body" class="space-y-4">
                <!-- Description -->
                <div class="space-y-1.5">
                  <span class="text-[11px] font-normal uppercase tracking-wider text-osan-grey block">
                    ${isAr ? 'نبذة عن الشركة ومسار الأعمال' : 'Corporate Overview'}
                  </span>
                  <p class="text-xs sm:text-sm font-light text-osan-ink leading-relaxed">
                    ${isAr ? company.descAr : company.descEn}
                  </p>
                </div>

                <!-- Scope & Catalogued Services -->
                <div class="space-y-2.5">
                  <span class="text-[11px] font-normal uppercase tracking-wider text-osan-blue block">
                    ${isAr ? 'الخدمات والحلول المعتمدة' : 'Catalogued Capabilities & Services'}
                  </span>
                  <div class="grid grid-cols-1 gap-2">
                    ${(isAr ? company.servicesAr : company.servicesEn)
                      .map(
                        (srv) => `
                      <div class="flex items-start gap-2.5 px-3 py-2.5 rounded-xl bg-osan-light/70 border border-osan-sky/60 text-xs sm:text-[13px] font-light text-osan-ink">
                        <span class="text-osan-blue font-normal flex-shrink-0 mt-0.5">✓</span>
                        <span>${srv}</span>
                      </div>
                    `
                      )
                      .join('')}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- ==================================================== -->
          <!-- RIGHT / BOTTOM COLUMN: Location & Real Map Preview   -->
          <!-- ==================================================== -->
          <div id="company-modal-map-panel" class="lg:col-span-4 flex flex-col justify-between rounded-2xl bg-osan-light/60 border border-osan-sky/80 p-4 gap-3.5">
            <div class="flex items-start gap-2.5 pr-7 rtl:pr-0 rtl:pl-7">
              <div class="w-8 h-8 rounded-xl bg-osan-blue/10 text-osan-blue flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
              </div>
              <div class="min-w-0">
                <span class="text-[10.5px] font-normal uppercase tracking-wider text-osan-grey block">
                  ${isAr ? 'موقع الشركة' : 'Office Location'}
                </span>
                <p class="text-xs sm:text-sm font-medium text-osan-ink leading-snug mt-0.5">
                  ${isAr ? company.locationAr : company.locationEn}
                </p>
              </div>
            </div>

            <!-- Interactive Real Map Frame -->
            <div class="relative w-full h-52 sm:h-60 lg:flex-1 lg:min-h-[250px] rounded-2xl overflow-hidden border border-osan-sky shadow-inner bg-slate-100">
              <iframe
                src="${embedUrl}"
                title="${company.nameEn} Location Map"
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                allowfullscreen
                class="w-full h-full border-0 block"
              ></iframe>
            </div>

            <!-- Direct Google Maps Launch Link -->
            <a 
              href="${externalUrl}"
              target="_blank"
              rel="noopener noreferrer"
              class="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-osan-blue text-osan-ink hover:text-white border border-osan-sky hover:border-osan-blue text-xs font-medium flex items-center justify-center gap-2 transition-all shadow-xs"
            >
              <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
              </svg>
              <span>${isAr ? 'فتح الموقع في خرائط جوجل' : 'Open in Google Maps'}</span>
            </a>
          </div>

        </div>
      </div>
    `;

    // Bind Close Button
    inner.querySelector('#dialog-close-btn')?.addEventListener('click', () => this.closeModal());

    // Resolve visible grid source card for shared-element FLIP morph
    const sourceCard =
      sourceCardEl ||
      this.container.querySelector<HTMLElement>(`[data-company-card-id="${companyId}"]`) ||
      undefined;
    const cardRect = sourceCard?.getBoundingClientRect();
    const isCardVisible =
      !!cardRect &&
      cardRect.width > 0 &&
      cardRect.bottom > 0 &&
      cardRect.top < window.innerHeight;

    if (sourceCard && isCardVisible) {
      try {
        this.activeModalLayout?.revert();
        this.activeModalLayout = null;
        inner.setAttribute('data-layout-id', `company-morph-shell-${company.id}`);

        // Initialize Anime.js v4 Modal Layout BEFORE opening dialog so oldState captures grid card geometry
        const modalLayout = createLayout(dialog, {
          children: ['.company-morph-shell', '.company-morph-logo', '.company-morph-title'],
          properties: ['--overlay-alpha'],
          duration: 540,
          ease: 'out(4)',
        });
        this.activeModalLayout = modalLayout;

        modalLayout.update(() => {
          this.activeMorphCard = sourceCard;
          const morphEls = [sourceCard, ...Array.from(sourceCard.querySelectorAll<HTMLElement>('[data-layout-id]'))];
          morphEls.forEach((el) => {
            const layoutId = el.getAttribute('data-layout-id');
            if (layoutId) {
              el.setAttribute('data-saved-layout-id', layoutId);
              el.removeAttribute('data-layout-id');
            }
          });
          sourceCard.style.opacity = '0.35';
          dialog.style.setProperty('--overlay-alpha', '0.68');
          dialog.showModal();
        });

        const secondaryPanels = inner.querySelectorAll('#company-modal-center-body, #company-modal-map-panel');
        animate(secondaryPanels, {
          opacity: [0, 1],
          translateY: [12, 0],
          delay: 130,
          duration: 380,
          ease: 'out(3)',
        });
        return;
      } catch (err) {
        this.activeModalLayout?.revert();
        this.activeModalLayout = null;
        this.restoreMorphSourceCard();
        console.warn('Shared-element modal morph fallback:', err);
      }
    }

    // Fallback centered scale + fade entrance when opened from outside #companies
    inner.removeAttribute('data-layout-id');
    dialog.style.setProperty('--overlay-alpha', '0.68');
    dialog.showModal();
    animate(inner, {
      opacity: [0, 1],
      scale: [0.92, 1],
      translateY: [20, 0],
      duration: 380,
      ease: 'out(3)',
    });
  }

  public closeModal(): void {
    const dialog = this.container.querySelector<HTMLDialogElement>('#company-details-dialog');
    const inner = this.container.querySelector<HTMLElement>('#company-dialog-inner');
    if (!dialog || !dialog.open || !inner) return;

    dialog.style.setProperty('--overlay-alpha', '0');

    animate(inner, {
      opacity: [1, 0],
      scale: [1, 0.94],
      translateY: [0, 14],
      duration: 240,
      ease: 'in(2)',
      onComplete: () => {
        this.activeModalLayout?.revert();
        this.activeModalLayout = null;
        dialog.close();
        inner.innerHTML = '';
        this.restoreMorphSourceCard();
        this.selectedCompany = null;
      },
    });
  }

  public destroy(): void {
    this.activeModalLayout?.revert();
    this.activeModalLayout = null;
    this.restoreMorphSourceCard();
    if (this.unsubscribeI18n) {
      this.unsubscribeI18n();
      this.unsubscribeI18n = null;
    }
  }
}

