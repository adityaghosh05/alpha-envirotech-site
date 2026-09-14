export const navigation = [
  { href: '/about/', label: 'About' },
  { href: '/services/', label: 'Services' },
  { href: '/markets/', label: 'Markets' },
  { href: '/projects/', label: 'Projects' },
  { href: '/careers/', label: 'Careers' },
  { href: '/contact/', label: 'Get in Touch' },
];

export const serviceGroups = [
  {
    slug: 'engineering-field-services',
    number: '01',
    title: 'Engineering & Field Services',
    short:
      'Turn field observations and technical data into clear, defensible decisions.',
    intro:
      'AEC connects engineering judgment, field characterization, and environmental chemistry to define site conditions and guide practical next steps.',
    capabilities: [
      {
        title: 'Engineering Services',
        details: [
          'Environmental and remedial engineering',
          'Water-management and dewatering planning',
        ],
      },
      {
        title: 'Environmental Field Characterization',
        details: [
          'Soil, groundwater, sediment, surface-water, and indoor-air field programs',
        ],
      },
      {
        title: 'Environmental Chemistry and Geochemistry',
        details: [
          'Technical interpretation of environmental sampling and analytical data',
        ],
      },
    ],
  },
  {
    slug: 'ecology-resources',
    number: '02',
    title: 'Ecology, Health & Resources',
    short:
      'Address ecological, cultural, and workplace considerations early in project planning.',
    intro:
      'AEC supports responsible project decisions where natural resources, cultural resources, and industrial-hygiene needs intersect with development and construction.',
    capabilities: [
      {
        title: 'Ecological and Industrial Hygiene',
        details: [
          'Wetland and habitat assessment',
          'Asbestos, lead-based paint, mold, and occupational-environment support',
        ],
      },
      {
        title: 'Natural Resources',
        details: [
          'Wetlands, surface waters, listed species, habitat, and permitting support',
        ],
      },
      {
        title: 'Cultural Resources',
        details: ['Cultural-resource assessment and coordination'],
      },
    ],
  },
  {
    slug: 'assessment-redevelopment',
    number: '03',
    title: 'Assessment & Redevelopment',
    short:
      'Understand contamination, evaluate response options, and support productive reuse.',
    intro:
      'AEC evaluates environmental conditions and develops responsible pathways for remediation, restoration, and redevelopment.',
    capabilities: [
      {
        title: 'Contamination Assessment',
        details: [
          'Due diligence, site assessment, delineation, and risk-focused investigation',
        ],
      },
      {
        title: 'Remediation / Restoration / Redevelopment',
        details: [
          'Remedial planning, restoration support, closure strategy, and redevelopment coordination',
        ],
      },
    ],
  },
  {
    slug: 'construction-support',
    number: '04',
    title: 'Construction Services',
    short:
      'Carry environmental requirements into the field from mobilization through closeout.',
    intro:
      'AEC integrates environmental planning, field oversight, and responsive technical support into active construction programs.',
    capabilities: [
      {
        title: 'Construction Services',
        details: [
          'Environmental compliance, monitoring, documentation, and field coordination',
        ],
      },
      {
        title: 'Construction Support',
        details: [
          'Environmental Management',
          'Environmental Remediation Construction',
          'Facility Decommissioning',
        ],
      },
    ],
  },
  {
    slug: 'air-regulatory-planning',
    number: '05',
    title: 'Air & Regulatory Planning',
    short:
      'Translate air-quality and stormwater requirements into usable project plans.',
    intro:
      'AEC helps clients evaluate air pathways, plan mitigation, and document environmental requirements for construction and ongoing compliance.',
    capabilities: [
      {
        title: 'Air Quality Consulting',
        details: ['Indoor Air', 'Vapor Intrusion', 'Mitigation'],
      },
      {
        title: 'Environmental Regulatory Plans',
        details: [
          'SWPPPs / Stormwater Pollution Prevention Plans',
          'Environmental protection and compliance planning',
        ],
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
    number: '01',
    title: 'Public Works',
    copy: 'Environmental, engineering, permitting, and construction support for infrastructure and community-serving projects.',
    image: '/images/projects/arlington-water-reclamation.webp',
    fallback: '/images/projects/arlington-water-reclamation.jpg',
    alt: 'Water reclamation facility infrastructure in Jacksonville',
  },
  {
    number: '02',
    title: 'Federal',
    copy: 'Responsive environmental support for complex federal planning, design-build, construction, and compliance environments.',
    image: '/images/projects/kings-bay-federal-construction.webp',
    fallback: '/images/projects/kings-bay-federal-construction.png',
    alt: 'Federal waterfront construction facility at Kings Bay',
  },
  {
    number: '03',
    title: 'Development Consulting',
    copy: 'Early environmental insight for property, land-development, redevelopment, and commercial decision-making.',
    image: '/images/wetland-landscape.webp',
    fallback: '/images/wetland-landscape.jpg',
    alt: 'Wetland landscape representing environmental planning',
  },
];

export const mapProjects = [
  {
    city: 'Jacksonville, Florida',
    projectName: 'Sample Project',
    x: 51,
    y: 66,
  },
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
  ['SAM Unique Entity ID', 'NM6CPALCNQL9'],
  ['CAGE Code', '762WB'],
  ['DUNS Number', '042865895'],
  ['NAICS Codes', '541620, 541330, 541690, 541990, 562910'],
  ['Certificate of Authorization', 'CA29370'],
];
