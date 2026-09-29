export const navigation = [
  {
    href: '/about/',
    label: 'About',
    children: [
      { href: '/about/#our-purpose', label: 'Our Purpose' },
      { href: '/about/#core-values', label: 'Core Values' },
      { href: '/about/#leadership', label: 'Amy Fu, President' },
    ],
  },
  {
    href: '/services/',
    label: 'Services',
    children: [
      {
        href: '/services/#assessment-remediation-redevelopment',
        label: 'Assessment, Remediation, and Redevelopment',
      },
      {
        href: '/services/#construction-support',
        label: 'Construction Support Services',
      },
      {
        href: '/services/#cultural-resources',
        label: 'Cultural Resources',
      },
      {
        href: '/services/#ecology-resources',
        label: 'Ecological Services',
      },
      {
        href: '/services/#engineering-services',
        label: 'Engineering Services',
      },
      {
        href: '/services/#industrial-hygiene-services',
        label: 'Industrial Hygiene Services',
      },
    ],
  },
  {
    href: '/markets/',
    label: 'Markets',
    children: [
      { href: '/markets/#public-works', label: 'Public Works' },
      { href: '/markets/#federal', label: 'Federal' },
      {
        href: '/markets/#development-consulting',
        label: 'Development Consulting',
      },
    ],
  },
  { href: '/projects/', label: 'Projects' },
  { href: '/careers/', label: 'Careers' },
  { href: '/contact/', label: 'Get in Touch' },
];

export const serviceGroups = [
  {
    slug: 'assessment-remediation-redevelopment',
    number: '01',
    title: 'Assessment, Remediation, and Redevelopment',
    short:
      'Understand contamination, evaluate response options, and support productive reuse.',
    intro:
      'AEC evaluates environmental conditions and develops responsible pathways for remediation, restoration, and redevelopment.',
    capabilities: [
      {
        title: 'Contamination Assessment',
        details: [
          'Due diligence, contamination delineation, and risk-focused investigation',
        ],
      },
      {
        title: 'Remediation and Site Closure',
        details: [
          'Remedial Action Plan',
          'Remedial System Startup, Operation, and Maintenance',
          'Risk-Based Site Closure',
        ],
      },
      {
        title: 'Redevelopment',
        details: ['Brownfields'],
      },
    ],
  },
  {
    slug: 'construction-support',
    number: '02',
    title: 'Construction Support Services',
    short:
      'Carry environmental requirements into the field from mobilization through closeout.',
    intro:
      'AEC integrates environmental planning, field oversight, and responsive technical support into active construction programs.',
    capabilities: [
      {
        title: 'Environmental Regulatory Planning',
        details: [
          'SWPPPs / Stormwater Pollution Prevention Plans',
          'Environmental protection and compliance planning',
        ],
      },
      {
        title: 'Environmental Compliance',
        details: [
          'Environmental compliance, monitoring, documentation, and field coordination',
        ],
      },
      {
        title: 'Air Quality Management',
        details: ['Air Operating Permits', 'Air Quality Monitoring'],
      },
      {
        title: 'Waste Management',
        details: [
          'Environmental Management',
          'Environmental Remediation Construction',
          'Facility Decommissioning',
        ],
      },
    ],
  },
  {
    slug: 'cultural-resources',
    number: '03',
    title: 'Cultural Resources',
    short:
      'Identify, document, and manage cultural resources throughout project planning and delivery.',
    intro:
      'AEC supports cultural-resource compliance through assessment, archaeology, cemetery studies, architectural history, and integrated management planning.',
    capabilities: [
      {
        title: 'Assessment and Management',
        details: [],
      },
      {
        title: 'Terrestrial Archaeology',
        details: [],
      },
      {
        title: 'Maritime and Underwater Archaeology (AAUS Certification)',
        details: [],
      },
      {
        title: 'Cemetery Studies/Grave Relocation',
        details: [],
      },
      {
        title: 'Architectural History',
        details: [],
      },
      {
        title: 'Integrated Cultural Resource Management Plans',
        details: [],
      },
    ],
  },
  {
    slug: 'ecology-resources',
    number: '04',
    title: 'Ecological Services',
    short:
      'Address ecological, cultural, and workplace considerations early in project planning.',
    intro:
      'AEC supports responsible project decisions where natural resources, cultural resources, and industrial-hygiene needs intersect with development and construction.',
    capabilities: [
      {
        title: 'Wetlands and Surface Water',
        details: [
          'Wetland and habitat assessment',
          'Asbestos, lead-based paint, mold, and occupational-environment support',
        ],
      },
      {
        title: 'Endangered and Threatened Species',
        details: [
          'Wetlands, surface waters, listed species, habitat, and permitting support',
        ],
      },
      {
        title: 'Tree Survey and Tree Mitigation',
        details: ['Cultural-resource assessment and coordination'],
      },
      {
        title: 'Exotic and Invasive Species Management',
        details: [],
      },
    ],
  },
  {
    slug: 'engineering-services',
    number: '05',
    title: 'Engineering Services',
    short:
      'Turn field observations and technical data into clear, defensible decisions.',
    intro:
      'AEC connects engineering judgment, field characterization, and environmental chemistry to define site conditions and guide practical next steps.',
    capabilities: [
      {
        title: 'Environmental Engineering',
        details: [],
      },
      {
        title: 'Stormwater Management',
        details: [],
      },
      {
        title: 'Dewatering Design',
        details: [],
      },
    ],
  },
  {
    slug: 'industrial-hygiene-services',
    number: '06',
    title: 'Industrial Hygiene Services',
    short:
      'Translate air-quality and stormwater requirements into usable project plans.',
    intro:
      'AEC helps clients evaluate air pathways, plan mitigation, and document environmental requirements for construction and ongoing compliance.',
    capabilities: [
      {
        title: 'Asbestos',
        details: [],
      },
      {
        title: 'Lead-Containing Paint',
        details: [],
      },
      {
        title: 'Mold',
        details: [],
      },
      {
        title: 'Health & Safety',
        details: [],
      },
      {
        title: 'Compliance Testing',
        details: [],
      },
    ],
  },
];

export const projectHighlights = [
  {
    type: 'Environmental due diligence',
    title: 'Phase I & II site assessment support',
    summary:
      'Environmental site assessments and follow-on investigation support for property, infrastructure, and redevelopment decisions.',
    tags: ['Site assessment', 'Commercial', 'Public sector'],
  },
  {
    type: 'Assessment & remediation',
    title: 'Petroleum-impacted site programs',
    summary:
      'Assessment, remedial planning, engineering, and regulatory coordination for petroleum-impacted soil and groundwater conditions.',
    tags: ['Remediation', 'Groundwater', 'Compliance'],
  },
  {
    type: 'Transportation & ecology',
    title: 'Roadway and bridge environmental support',
    summary:
      'Wetland, wildlife, permitting, and natural-resource services supporting transportation planning and construction delivery.',
    tags: ['Wetlands', 'Permitting', 'Transportation'],
  },
  {
    type: 'Utilities & construction',
    title: 'Pipeline environmental compliance',
    summary:
      'Contamination assessment, permitting, compliance, health and safety, and construction-phase support for utility pipeline work.',
    tags: ['Utilities', 'Construction', 'Safety'],
  },
  {
    type: 'Federal delivery',
    title: 'Design-build environmental support',
    summary:
      'Cross-disciplinary environmental subcontracting and project-management support for federal design-build and construction teams.',
    tags: ['Federal', 'Design-build', 'Project management'],
  },
  {
    type: 'Sustainable buildings',
    title: 'LEED and WELL services',
    summary:
      'Technical coordination and documentation to support healthy, efficient, and sustainability-focused building programs.',
    tags: ['LEED', 'WELL', 'Buildings'],
  },
];

export const markets = [
  {
    slug: 'public-works',
    number: '01',
    title: 'Public Works',
    copy: 'Environmental, engineering, permitting, and construction support for infrastructure and community-serving projects.',
    image: '/images/projects/arlington-water-reclamation.webp',
    fallback: '/images/projects/arlington-water-reclamation.jpg',
    alt: 'Water reclamation facility infrastructure in Jacksonville',
  },
  {
    slug: 'federal',
    number: '02',
    title: 'Federal',
    copy: 'Responsive environmental support for complex federal planning, design-build, construction, and compliance environments.',
    image: '/images/projects/kings-bay-federal-construction.webp',
    fallback: '/images/projects/kings-bay-federal-construction.png',
    alt: 'Federal waterfront construction facility at Kings Bay',
  },
  {
    slug: 'development-consulting',
    number: '03',
    title: 'Development Consulting',
    copy: 'Early environmental insight for property, land-development, redevelopment, and commercial decision-making.',
    image: '/images/wetland-landscape.webp',
    fallback: '/images/wetland-landscape.jpg',
    alt: 'Wetland landscape representing environmental planning',
  },
];

// Approximate positions on the focused four-state illustration.
export const mapLocations = [
  { id: 'jacksonville', name: 'Jacksonville', state: 'Florida', x: 84.8, y: 45.2 },
  { id: 'yulee', name: 'Yulee', state: 'Florida', x: 84.4, y: 43.5 },
  { id: 'keystone-heights', name: 'Keystone Heights', state: 'Florida', x: 82.2, y: 50.0 },
  { id: 'st-augustine', name: 'St. Augustine', state: 'Florida', x: 85.8, y: 50.1 },
  { id: 'green-cove-springs', name: 'Green Cove Springs', state: 'Florida', x: 83.9, y: 48.2 },
  { id: 'astor', name: 'Astor', state: 'Florida', x: 86.1, y: 55.5 },
  { id: 'miami', name: 'Miami', state: 'Florida', x: 95.4, y: 86.3 },
  { id: 'st-petersburg', name: 'St. Petersburg', state: 'Florida', x: 76.8, y: 66.8 },
  { id: 'fernandina-beach', name: 'Fernandina Beach', state: 'Florida', x: 85.5, y: 42.7 },
  { id: 'avon-park', name: 'Avon Park', state: 'Florida', x: 86.9, y: 68.4 },
  { id: 'panama-city', name: 'Panama City', state: 'Florida', x: 51.5, y: 44.6 },
  { id: 'mulberry', name: 'Mulberry', state: 'Florida', x: 83.0, y: 65.6 },
  { id: 'monticello', name: 'Monticello', state: 'Florida', x: 68.1, y: 44.5 },
  { id: 'westlake', name: 'Westlake', state: 'Florida', x: 96.2, y: 76.5 },
  { id: 'nassau-county', name: 'Nassau County', state: 'Florida', x: 82.7, y: 43.3 },
  { id: 'alachua-county', name: 'Alachua County', state: 'Florida', x: 80.0, y: 50.0 },
  { id: 'albertville', name: 'Albertville', state: 'Alabama', x: 50.3, y: 9.4 },
  { id: 'jackson', name: 'Jackson', state: 'Mississippi', x: 12.3, y: 25.8 },
  { id: 'west-point', name: 'West Point', state: 'Georgia', x: 58.3, y: 20.9 },
];

export const sectors = [
  'Transportation',
  'Energy & utilities',
  'Federal',
  'Education',
  'Healthcare',
  'Hospitality',
  'Commercial & industrial',
  'Land development',
  'Construction',
  'Manufacturing',
];

export const companyData = [
  ['NAICS Codes', '541620, 541330, 541690, 541990, 562910'],
];
