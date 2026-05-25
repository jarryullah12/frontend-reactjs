
import { PricingPlan, ResumeData } from './types';

export const MONTHLY_PLANS: PricingPlan[] = [
  {
    id: 'weekly',
    name: 'Weekly Download',
    description: 'Perfect for a one-time job application or quick update.',
    price: '$1.99',
    duration: '/weekly',
    features: [
      'Unlimited Resumes & CVs',
      'All Premium Templates',
      'Multiple Page Support',
      'Custom Colors & 12 Fonts',
      'Word (.doc) & PDF Exports',
      'Cover Letter Builder',
      'Full Customer Support'
    ]
  },
  {
    id: 'monthly',
    name: 'Monthly Download',
    description: 'Our most popular plan for active job seekers looking to stand out.',
    price: '$7.99',
    duration: '/mo',
    recommended: true,
    features: [
      'Unlimited Resumes & CVs',
      'All Premium Templates',
      'Multiple Page Support',
      'Custom Colors & 12 Fonts',
      'Word (.doc) & PDF Exports',
      'Cover Letter Builder',
      'Priority Email Support',
      'AI Resume Tailoring'
    ]
  }
];

export const AVAILABLE_FONTS = [
  'Inter',
  'Roboto',
  'Open Sans',
  'Lato',
  'Montserrat',
  'Merriweather',
  'Playfair Display',
  'Lora',
  'EB Garamond',
  'PT Sans',
  'Oswald',
  'Raleway'
];

export const INITIAL_RESUME_DATA: ResumeData = {
  id: '1',
  userId: 'user-1',
  title: 'My Professional Resume',
  templateId: 'executive',
  accentColor: '#2563eb',
  font: 'Inter',
  pages: 1,
  personalInfo: {
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (123) 456-7890',
    location: 'New York, NY',
    website: 'www.johndoe.com',
    summary: 'Strategic Senior Project Manager with 8+ years of experience leading cross-functional teams to deliver complex software projects, optimize operational workflows, and achieve key business goals.',
    jobTitle: 'Senior Project Manager',
    profilePicture: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
  },
  experience: [
    {
      id: 'exp-1',
      company: 'Global Innovations Corp',
      position: 'Senior Project Manager',
      startDate: 'Jan 2020',
      endDate: 'Present',
      current: true,
      description: '• Led a cross-functional digital transformation project that automated 45% of manual reporting, saving $250k annually.\n• Managed a diverse portfolio of 5 concurrent high-stakes projects with a combined budget of over $5M.\n• Mentored a team of 4 junior project managers, fostering a culture of continuous improvement and delivery excellence.'
    },
    {
      id: 'exp-2',
      company: 'Premier Solutions Group',
      position: 'Project Manager',
      startDate: 'Mar 2017',
      endDate: 'Dec 2019',
      current: false,
      description: '• Coordinated logistical operations for major international conferences with over 2,000 global attendees.\n• Negotiated and secured vendor contracts that directly reduced event overhead by 15% without compromising quality.\n• Streamlined internal team communication channels, reducing project lifecycle delays by 20% using Agile tools.'
    }
  ],
  education: [
    {
      id: 'edu-1',
      school: 'Columbia University',
      degree: 'Master of Business Administration (MBA)',
      field: 'Strategic Management',
      startDate: '2014',
      endDate: '2016',
      description: 'Presidential Fellowship recipient. Specialized in global operations.'
    },
    {
      id: 'edu-2',
      school: 'University of Texas at Austin',
      degree: 'Bachelor of Science',
      field: 'Business Administration',
      startDate: '2010',
      endDate: '2014',
      description: 'Graduated Cum Laude. Double Major in Finance and Operations.'
    }
  ],
  skills: [
    'Project Management', 
    'Agile & Scrum', 
    'Budget Optimization', 
    'Process Automation', 
    'Stakeholder Management', 
    'Risk Mitigation', 
    'Team Leadership',
    'Data Analytics'
  ],
  languages: [
    'English (Native)', 
    'Spanish (Professional)'
  ],
  projects: [
    {
      id: 'proj-1',
      name: 'Project Excellence Framework',
      link: 'github.com/johndoe/pef',
      description: 'Developed a standardized project management framework adopted across 3 corporate divisions.'
    },
    {
      id: 'proj-2',
      name: 'Operational Efficiency Dashboard',
      link: 'johndoe.com/dashboard',
      description: 'Designed and deployed an interactive PowerBI dashboard tracking key KPIs across regional offices.'
    }
  ],
  references: [
    {
      id: 'ref-1',
      name: 'Sarah Jenkins',
      company: 'Global Innovations Corp',
      email: 's.jenkins@globalinnovations.com',
      phone: '+1 (555) 012-3444'
    }
  ],
  coverLetter: {
    recipientName: 'Hiring Committee',
    recipientTitle: 'Executive Director',
    recipientCompany: 'Innovative Tech Leaders',
    recipientAddress: '500 Innovation Blvd, Silicon Valley, CA',
    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    content: "I am writing to express my profound interest in the Strategic Leadership position at Innovative Tech Leaders. With over a decade of experience driving organizational excellence and delivering high-impact projects, I am confident that my background matches the rigorous requirements of your team.\n\nThroughout my career, I have consistently demonstrated a knack for turning complex challenges into streamlined, successful outcomes. My time at Global Innovations Corp was defined by my ability to lead cross-functional squads through significant digital transformations. I pride myself on not just meeting project goals, but creating frameworks that continue to add value long after the initial delivery phase.\n\nWhat draws me to Innovative Tech Leaders is your unwavering commitment to ethical innovation and your impressive growth trajectory over the last three years. I am eager to bring my strategic mindset and hands-on project management skills to an organization that values both precision and creativity. I am particularly excited about the possibility of optimizing your current development pipelines to support your next phase of global expansion.\n\nThank you for considering my application. I look forward to the opportunity to discuss how my experience can directly contribute to the continued success of Innovative Tech Leaders."
  },
  updatedAt: new Date().toISOString()
};

export const TEMPLATE_PREVIEW_DATA: ResumeData = {
  ...INITIAL_RESUME_DATA,
  title: 'Template Preview Resume',
  personalInfo: {
    ...INITIAL_RESUME_DATA.personalInfo,
    fullName: 'Maya Bennett',
    email: 'maya.bennett@northmail.com',
    phone: '+1 (415) 555-0186',
    location: 'San Francisco, CA',
    website: 'linkedin.com/in/mayabennett',
    jobTitle: 'Senior Operations Manager',
    summary: 'Senior Operations Manager with 8 years of experience improving service delivery, team performance, and cross-functional execution in fast-paced technology and professional services environments. Skilled at turning complex workflows into scalable processes, building practical reporting frameworks, and aligning people, systems, and priorities around measurable business goals. Known for calm leadership, disciplined planning, and partnering closely with product, finance, sales, and customer success teams to deliver efficient operations and a stronger client experience. Brings a hands-on management style, strong communication skills, and a consistent record of creating clear processes that support growth, reduce friction, and help teams make faster, better-informed decisions across distributed teams, changing priorities, and high-visibility client programs.',
  },
  experience: [
    {
      id: 'preview-exp-1',
      company: 'Northstar Systems',
      position: 'Senior Operations Manager',
      startDate: '2020',
      endDate: 'Present',
      current: true,
      description: 'Lead daily operations for a 45-person client delivery organization serving enterprise accounts across North America. Redesigned intake, staffing, and escalation workflows, reducing project cycle time by 22% and improving on-time delivery from 81% to 95%. Partner with finance and department leads on capacity planning, vendor management, and quarterly forecasts while coaching team managers on service quality, accountability, and performance reviews. Introduced monthly business review dashboards, improved escalation ownership, and created staffing playbooks that helped leaders balance workload, maintain service standards, and support predictable delivery during periods of rapid client growth.'
    },
    {
      id: 'preview-exp-2',
      company: 'ClearBridge Solutions',
      position: 'Operations Manager',
      startDate: '2017',
      endDate: '2020',
      current: false,
      description: 'Managed process improvement initiatives across onboarding, support, and implementation teams for a growing SaaS business. Introduced weekly KPI reviews, standardized documentation, and service level reporting that improved response consistency and reduced avoidable rework by 18%. Coordinated cross-functional launches with product and customer success teams to support new enterprise clients and improve retention during key renewal periods. Also trained supervisors on planning routines, issue tracking, and decision logs, helping teams resolve blockers faster and improve communication across regional stakeholders and senior leadership.'
    },
    {
      id: 'preview-exp-3',
      company: 'Horizon Advisory Group',
      position: 'Business Operations Analyst',
      startDate: '2014',
      endDate: '2017',
      current: false,
      description: 'Supported leadership with reporting, workflow analysis, and operational planning for client-facing consulting teams. Built Excel and SQL-based dashboards to track utilization, margin, and delivery health, giving managers clearer visibility into resource gaps and project risks. Documented procedures, improved handoff processes, and helped prepare executive summaries for monthly business reviews. Worked closely with team leads to organize data inputs, monitor deadlines, and standardize reporting formats so decisions could be made more quickly and with stronger operational context.'
    }
  ],
  education: [
    {
      id: 'preview-edu-1',
      school: 'University of Washington',
      degree: 'Master of Business Administration',
      field: 'Operations and Strategy',
      startDate: '2015',
      endDate: '2017',
      description: 'Focused on operations strategy, financial decision-making, and organizational leadership.'
    },
    {
      id: 'preview-edu-2',
      school: 'San Diego State University',
      degree: 'Bachelor of Science',
      field: 'Business Administration',
      startDate: '2010',
      endDate: '2014',
      description: 'Graduated with honors and completed applied coursework in analytics and project management.'
    },
    {
      id: 'preview-edu-3',
      school: 'Coursera',
      degree: 'Operations Analytics Certificate',
      field: 'Business Analytics',
      startDate: '2019',
      endDate: '2019',
      description: 'Completed coursework in dashboard design, reporting logic, and decision support.'
    }
  ],
  skills: [
    'Operations Management',
    'Process Improvement',
    'KPI Reporting',
    'Capacity Planning',
    'Cross-Functional Leadership',
    'Vendor Management',
    'Budget Coordination',
    'SQL',
    'Excel',
    'Project Management',
    'Reporting Automation',
    'Service Delivery'
  ],
  languages: [
    'English (Native)',
    'Spanish (Professional)',
    'French (Conversational)'
  ],
};

const createDummyProfile = (title: string, data: Partial<ResumeData>): ResumeData => ({
  ...INITIAL_RESUME_DATA,
  ...data,
  id: 'preset-' + title.toLowerCase().replace(/[^a-z0-9]/g, '-'),
  title: title,
});

export const PROFILE_PRESETS: Record<string, ResumeData> = {
  'frontend': createDummyProfile('Frontend Developer', {
    personalInfo: {
      fullName: 'Alex Rivera',
      email: 'alex.rivera@devmail.com',
      phone: '(415) 555-0123',
      location: 'San Francisco, CA',
      website: 'alexrivera.dev',
      jobTitle: 'Senior Frontend Developer',
      profilePicture: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      summary: 'Creative Senior Frontend Developer with 6+ years of experience building responsive, accessible web applications. Expert in the React ecosystem, modern CSS architecture, and performance optimization for high-traffic SaaS platforms. Passionate about UI/UX standards and mentoring junior developers.'
    },
    skills: ['React.js', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Redux Toolkit', 'GraphQL', 'Jest & Cypress', 'Web Performance', 'Accessibility', 'Figma', 'Node.js', 'Express', 'Monorepos', 'CI/CD Pipelines'],
    languages: ['English (Native)', 'Spanish (Professional)', 'German (Basic)'],
    education: [
      {
        id: 'edu-1', school: 'University of California, Berkeley', degree: 'Bachelor of Science', field: 'Computer Science', startDate: '2012', endDate: '2016',
        description: 'Specialized in Human-Computer Interaction and Software Engineering. Graduated with Honors (GPA 3.8/4.0). Led the Web Development Club and organized three campus hackathons.'
      },
      {
        id: 'edu-2', school: 'General Assembly', degree: 'Certificate', field: 'Full Stack Web Development', startDate: '2016', endDate: '2016',
        description: 'Intensive 12-week immersive program focused on modern web development practices and team collaboration.'
      }
    ],
    experience: [
      {
        id: 'fe-1', company: 'TechFlow Systems', position: 'Senior Frontend Engineer', startDate: '2020', endDate: 'Present', current: true,
        description: '• Led the migration of a legacy jQuery dashboard to React 18/Next.js, improving initial load times by 40% and SEO rankings.\n• Architected a shared UI component library (Design System) used by 5 internal squads, reducing UI technical debt by 60%.\n• Mentored 3 junior developers, introducing strict code review standards and pair programming sessions.\n• Implemented server-side rendering (SSR) for key landing pages, resulting in a 25% increase in conversion rates.\n• Collaborated closely with product designers to implement complex animations using Framer Motion.'
      },
      {
        id: 'fe-2', company: 'Creative Pulse Agency', position: 'Frontend Developer', startDate: '2018', endDate: '2020', current: false,
        description: '• Built pixel-perfect responsive landing pages for high-profile clients like Nike and Adidas using Vue.js and SCSS.\n• Integrated headless CMS (Contentful) with Gatsby for a static site generator workflow, ensuring 99.9% uptime.\n• Optimized complex SVG animations using Framer Motion to enhance user engagement without compromising performance.\n• Worked within an Agile environment with bi-weekly sprints and daily stand-ups.'
      },
      {
        id: 'fe-3', company: 'WebStartups Inc.', position: 'Junior Web Developer', startDate: '2016', endDate: '2018', current: false,
        description: '• Developed and maintained 15+ client websites using HTML5, CSS3, and JavaScript (ES6).\n• Fixed cross-browser compatibility issues for IE11 and mobile browsers.\n• Assisted in the implementation of Google Analytics and Tag Manager events.\n• Optimized images and assets for web delivery using modern compression techniques.'
      }
    ],
    references: [
      { id: 'ref-1', name: 'Sarah Jenkins', company: 'TechFlow Systems', email: 's.jenkins@techflow.com', phone: '+1 415 555 1022' },
      { id: 'ref-2', name: 'Michael Chen', company: 'Creative Pulse', email: 'mchen@creativepulse.com', phone: '+1 415 555 3344' }
    ],
    projects: [
      { id: 'proj-1', name: 'OpenUI Design System', link: 'github.com/alexrivera/open-ui', description: 'A highly customizable, accessible React component library built with Tailwind CSS and Radix UI. 2k+ GitHub stars.' },
      { id: 'proj-2', name: 'SaaS Metrics Dashboard', link: 'metrics-dash.io', description: 'Real-time analytics dashboard for SaaS companies featuring interactive charts using D3.js and WebSockets.' }
    ]
  }),
  'web-developer': createDummyProfile('Web Developer (Full Stack)', {
    personalInfo: {
        fullName: 'Jordan Smith',
        email: 'jordan.dev@example.com',
        phone: '(555) 123-4567',
        location: 'Austin, TX',
        website: 'jordan.tech',
        jobTitle: 'Full Stack Web Developer',
        profilePicture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        summary: 'Versatile Full Stack Developer with 5+ years of experience designing and deploying scalable web applications using the MERN stack. Proven ability to lead development teams and optimize backend performance.'
    },
    skills: ['React.js', 'Node.js', 'MongoDB', 'Express', 'Docker', 'AWS', 'PostgreSQL', 'Redis', 'GraphQL', 'Python', 'Kubernetes', 'Microservices'],
    languages: ['English (Native)', 'French (Intermediate)'],
    education: [
        {
            id: 'edu-fs-1', school: 'Texas A&M University', degree: 'Bachelor of Computer Science', field: 'Software Engineering', startDate: '2014', endDate: '2018',
            description: 'Focus on Distributed Systems and Web Architecture. Recipient of the Academic Excellence Award.'
        }
    ],
    experience: [
        {
            id: 'fs-1', company: 'TechNova', position: 'Senior Full Stack Developer', startDate: '2021', endDate: 'Present', current: true,
            description: '• Architected a microservices-based e-commerce platform handling 50k+ daily transactions.\n• Optimized database queries, reducing API response time by 35%.\n• Integrated Stripe payment gateway and managed secure user authentication flows.\n• Led a team of 8 developers in an Agile environment, improving sprint velocity by 25%.'
        },
         {
            id: 'fs-2', company: 'StartUp Hub', position: 'Web Developer', startDate: '2018', endDate: '2021', current: false,
            description: '• Developed responsive UI components using React and Redux.\n• Built RESTful APIs for mobile app consumption.\n• Automated deployment pipelines using Jenkins and Docker.\n• Maintained 99.9% uptime for core services during high-traffic product launches.'
        }
    ],
    references: [
        { id: 'ref-fs-1', name: 'David Miller', company: 'TechNova', email: 'dmiller@technova.com', phone: '+1 512 555 8899' }
    ]
  }),
  'network-engineer': createDummyProfile('Network Engineer', {
    personalInfo: {
        fullName: 'Thomas Anderson',
        email: 'thomas.net@example.com',
        phone: '(202) 555-0199',
        location: 'Washington, DC',
        website: 'thomas-net-eng.io',
        jobTitle: 'Senior Network Engineer',
        profilePicture: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        summary: 'CCIE-certified Network Engineer with 8 years of experience designing, implementing, and maintaining enterprise-grade network infrastructure. Expert in routing, switching, and firewall configuration. Dedicated to ensuring 99.99% network uptime and security.',
    },
    skills: ['Cisco IOS/NX-OS', 'BGP/OSPF/EIGRP', 'Firewalls (Palo Alto, ASA)', 'VPN & MPLS', 'Network Automation (Python, Ansible)', 'Wireshark', 'Load Balancing (F5)', 'Cloud Networking (AWS VPC)'],
    experience: [
        {
            id: 'net-1', company: 'Global Comm Systems', position: 'Senior Network Engineer', startDate: '2019', endDate: 'Present', current: true,
            description: '• Redesigned the core network infrastructure for 10 global offices, improving throughput by 40%.\n• Automated routine configuration updates using Python and Ansible, reducing manual errors by 90%.\n• Diagnosed and resolved complex network latency issues, ensuring smooth VoIP and video conferencing operations.'
        },
        {
            id: 'net-2', company: 'TechSolutions Provider', position: 'Network Administrator', startDate: '2016', endDate: '2019', current: false,
            description: '• Managed daily operations of LAN/WAN infrastructure for 500+ users.\n• Configured and maintained Cisco switches, routers, and firewalls.\n• Implemented secure VPN access for remote employees, maintaining strict security protocols.'
        }
    ]
  }),
  'cyber-security': createDummyProfile('Cyber Security Analyst', {
    personalInfo: {
        fullName: 'Elliot Alderson',
        email: 'elliot.sec@example.com',
        phone: '(212) 555-0100',
        location: 'New York, NY',
        website: 'elliot-sec.io',
        jobTitle: 'Cyber Security Analyst',
        summary: 'Vigilant Cyber Security Analyst with a strong background in threat detection, incident response, and vulnerability management. Proficient in using SIEM tools and conducting security audits to protect organizational assets from evolving cyber threats.',
    },
    skills: ['SIEM (Splunk, QRadar)', 'Incident Response', 'Vulnerability Assessment (Nessus)', 'Network Security', 'IDS/IPS', 'Malware Analysis', 'NIST/ISO Frameworks', 'Python for Security', 'Cloud Security (AWS)', 'Cryptography'],
    languages: ['English (Native)', 'Mandarin (Professional)'],
    education: [
        {
            id: 'edu-sec-1', school: 'Purdue University', degree: 'Bachelor of Science', field: 'Cybersecurity', startDate: '2013', endDate: '2017',
            description: 'Specialized in Information Assurance and Digital Forensics. Participated in several Capture The Flag (CTF) competitions.'
        }
    ],
    experience: [
        {
            id: 'sec-1', company: 'SecureBank Corp', position: 'Senior Security Analyst', startDate: '2020', endDate: 'Present', current: true,
            description: '• Monitored and analyzed security events using Splunk, reducing mean time to detect (MTTD) by 35%.\n• Led incident response for a major ransomware attempt, successfully containing the threat with zero data loss.\n• Conducted quarterly vulnerability assessments and coordinated patching efforts with IT teams.\n• Developed and updated security policies in alignment with ISO 27001 standards.'
        },
        {
            id: 'sec-2', company: 'InfoDefend Agency', position: 'SOC Analyst', startDate: '2017', endDate: '2020', current: false,
            description: '• Triaged Level 1 and Level 2 security alerts in a 24/7 SOC environment.\n• Developed correlation rules to identify potential phishing campaigns.\n• Generated weekly threat intelligence reports for management.\n• Conducted regular security awareness training for staff.'
        }
    ],
    references: [
        { id: 'ref-sec-1', name: 'Angela Moss', company: 'Allsafe Cybersecurity', email: 'a.moss@allsafe.com', phone: '+1 212 555 1212' }
    ]
  }),
  'ethical-hacker': createDummyProfile('Ethical Hacker', {
    personalInfo: {
        fullName: 'Lisbeth Salander',
        email: 'lisbeth.hack@example.com',
        phone: '(468) 555-0122',
        location: 'Stockholm, SE',
        website: 'lisbeth-pentest.com',
        jobTitle: 'Penetration Tester / Ethical Hacker',
        profilePicture: 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        summary: 'Certified Ethical Hacker (CEH) with expertise in web application security and network penetration testing. Skilled in identifying security weaknesses before malicious actors can exploit them. Passionate about helping organizations strengthen their security posture.',
    },
    skills: ['Penetration Testing', 'Burp Suite', 'Metasploit', 'Kali Linux', 'OWASP Top 10', 'Python/Bash Scripting', 'Social Engineering', 'Report Writing', 'Reverse Engineering', 'Cryptography'],
    languages: ['Swedish (Native)', 'English (Fluent)', 'Russian (Intermediate)'],
    education: [
        {
            id: 'edu-hack-1', school: 'KTH Royal Institute of Technology', degree: 'Bachelor of Science', field: 'Information Technology', startDate: '2014', endDate: '2017',
            description: 'Graduated with a focus on Computer Security and Cryptography.'
        }
    ],
    experience: [
        {
            id: 'hack-1', company: 'RedTeam Security', position: 'Senior Penetration Tester', startDate: '2021', endDate: 'Present', current: true,
            description: '• Conducted black-box and white-box penetration tests for financial and healthcare clients.\n• Discovered and reported critical SQL injection and XSS vulnerabilities in client web applications.\n• Presented detailed technical findings and remediation strategies to executive leadership.\n• Developed custom scripts in Python to automate vulnerability discovery.'
        },
        {
            id: 'hack-2', company: 'CyberGuard Inc', position: 'Security Consultant', startDate: '2018', endDate: '2021', current: false,
            description: '• Performed internal and external network vulnerability scans.\n• Executed simulated phishing campaigns to assess employee security awareness.\n• Assisted developers in remediation of identified code vulnerabilities.'
        }
    ],
    references: [
        { id: 'ref-hack-1', name: 'Mikael Blomkvist', company: 'Millennium Magazine', email: 'm.blomkvist@millennium.se', phone: '+46 8 555 1234' }
    ],
    projects: [
        { id: 'proj-hack-1', name: 'VulnScanner-Lite', link: 'github.com/lisbeth/vulnscanner', description: 'A lightweight Python tool for scanning common web server misconfigurations.' }
    ]
  }),
  'blockchain-developer': createDummyProfile('Blockchain Developer', {
    personalInfo: {
        fullName: 'Satoshi Nakamoto',
        email: 'satoshi.chain@example.com',
        phone: '(415) 555-0199',
        location: 'San Francisco, CA',
        website: 'decentralized.dev',
        jobTitle: 'Blockchain Developer',
        summary: 'Passionate Blockchain Developer with deep expertise in Ethereum, smart contract development, and decentralized applications (dApps). Committed to building secure, transparent, and efficient blockchain solutions.',
    },
    skills: ['Solidity', 'Ethereum', 'Web3.js / Ethers.js', 'Smart Contracts', 'Truffle / Hardhat', 'DeFi Protocols', 'Rust (Solana)', 'Cryptography', 'Go', 'Distributed Systems'],
    languages: ['English (Fluent)', 'Japanese (Native)'],
    education: [
        {
            id: 'edu-chain-1', school: 'MIT', degree: 'Ph.D.', field: 'Computer Science & Cryptography', startDate: '2015', endDate: '2019',
            description: 'Dissertation on "Scaling Decentralized Ledgers through State Sharding".'
        }
    ],
    experience: [
        {
            id: 'chain-1', company: 'DeFi Innovations', position: 'Lead Blockchain Developer', startDate: '2021', endDate: 'Present', current: true,
            description: '• Architected and deployed secure smart contracts for a decentralized exchange (DEX) handling $10M+ TVL.\n• Audited smart contracts to ensure gas optimization and security against reentrancy attacks.\n• Integrated frontend applications with blockchain backend using Web3.js.\n• Mentored a team of 4 junior blockchain developers.'
        },
        {
            id: 'chain-2', company: 'CryptoStart', position: 'Smart Contract Engineer', startDate: '2019', endDate: '2021', current: false,
            description: '• Developed and tested ERC-20 and ERC-721 tokens for various client projects.\n• Implemented automated testing pipelines for smart contracts using Hardhat.\n• Collaborated with researchers to implement novel consensus mechanisms.'
        }
    ],
    references: [
        { id: 'ref-chain-1', name: 'Vitalik Buterin', company: 'Ethereum Foundation', email: 'v.buterin@ethereum.org', phone: '+1 415 555 9999' }
    ],
    projects: [
        { id: 'proj-chain-1', name: 'SafeSwap SDK', link: 'npm.org/safeswap-sdk', description: 'Comprehensive SDK for building secure token swaps on EVM-compatible chains.' }
    ]
  }),
  'data-analyst': createDummyProfile('Data Analyst', {
    personalInfo: {
        fullName: 'Jennifer Data',
        email: 'jen.analyst@example.com',
        phone: '(617) 555-0144',
        location: 'Boston, MA',
        website: 'jen-analytics.io',
        jobTitle: 'Data Analyst',
        profilePicture: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        summary: 'Analytical Data Analyst with 5+ years of experience interpreting complex datasets to drive business decision-making. Expert in SQL querying, data cleaning, and creating interactive dashboards in Tableau and Power BI.',
    },
    skills: ['SQL', 'Tableau', 'Power BI', 'Excel (VLOOKUP, Pivot Tables)', 'Python (Pandas, Matplotlib)', 'Data Cleaning', 'Statistical Analysis', 'A/B Testing', 'R Programming', 'Google Analytics'],
    languages: ['English (Fluent)', 'Mandarin (Basic)'],
    education: [
        {
            id: 'edu-da-1', school: 'Boston University', degree: 'Bachelor of Science', field: 'Business Analytics', startDate: '2013', endDate: '2017',
            description: 'Dean\'s list for 4 consecutive semesters. Focused on Quantitative Research Methods.'
        }
    ],
    experience: [
        {
            id: 'da-1', company: 'MarketInsight Corp', position: 'Senior Data Analyst', startDate: '2019', endDate: 'Present', current: true,
            description: '• Designed and maintained interactive dashboards in Tableau to track key marketing KPIs, improving ad spend efficiency by 20%.\n• Conducted A/B test analysis to optimize website landing pages, increasing conversion rates by 15%.\n• Automated weekly reporting processes using SQL and Python scripts, saving 10 hours per week.'
        },
        {
            id: 'da-2', company: 'RetailGiant', position: 'Junior Data Analyst', startDate: '2017', endDate: '2019', current: false,
            description: '• Extracted and cleaned sales data from SQL databases for monthly performance reviews.\n• Identified trends in customer purchasing behavior to support inventory planning.\n• Assisted in the migration of data to a new cloud-based warehousing solution.'
        }
    ],
    references: [
        { id: 'ref-da-1', name: 'Linda Analytics', company: 'MarketInsight', email: 'linda@marketinsight.io', phone: '+1 617 555 1022' }
    ]
  }),
  'graphic-designer': createDummyProfile('Graphic Designer', {
    personalInfo: {
        fullName: 'Mia Chang',
        email: 'mia.design@example.com',
        phone: '(212) 555-9988',
        location: 'New York, NY',
        website: 'mia.portfolio',
        jobTitle: 'Senior Graphic Designer',
        profilePicture: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        summary: 'Award-winning Graphic Designer with extensive experience in branding, print design, and digital marketing assets. Expert in Adobe Creative Suite and translating business goals into visual storytelling.'
    },
    skills: ['Adobe Photoshop', 'Illustrator', 'InDesign', 'Figma', 'Branding', 'Typography', 'Print Design', 'Motion Graphics', 'UI Design'],
    experience: [
        {
            id: 'gd-1', company: 'Visionary Studio', position: 'Senior Graphic Designer', startDate: '2019', endDate: 'Present', current: true,
            description: '• Led the rebranding initiative for a Fortune 500 client, resulting in a 20% increase in brand recognition.\n• Managed a team of 4 designers to deliver high-quality marketing collateral under tight deadlines.\n• Designed interactive social media assets that boosted engagement by 45%.'
        }
    ]
  }),
  'business-dev': createDummyProfile('Business Development Manager', {
    personalInfo: {
        fullName: 'Robert Fox',
        email: 'robert.fox@biz.com',
        phone: '(312) 555-0011',
        location: 'Chicago, IL',
        website: 'linkedin.com/in/robertfox',
        jobTitle: 'Business Development Manager',
        profilePicture: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        summary: 'Strategic Business Development Manager with a track record of driving revenue growth and expanding market share. Skilled in negotiation, partnership building, and sales strategy execution.'
    },
    skills: ['Strategic Planning', 'B2B Sales', 'Negotiation', 'CRM (Salesforce)', 'Market Analysis', 'Lead Generation', 'Account Management', 'Financial Modeling', 'Public Speaking'],
    languages: ['English (Native)', 'Spanish (Basic)'],
    education: [
        {
            id: 'edu-bd-1', school: 'University of Chicago', degree: 'MBA', field: 'Strategy & Finance', startDate: '2014', endDate: '2016',
            description: 'Graduated with high honors. President of the Business Sales Club.'
        }
    ],
    experience: [
        {
            id: 'bm-1', company: 'Global Corp', position: 'Business Development Manager', startDate: '2018', endDate: 'Present', current: true,
            description: '• Generated $2M in new revenue through strategic partnerships and key account acquisitions.\n• Developed and executed a market entry strategy for the APAC region, exceeding targets by 15%.\n• Mentored a sales team of 10, improving conversion rates by 10% year-over-year.\n• Negotiated high-value contracts with Fortune 500 companies.'
        }
    ],
    references: [
        { id: 'ref-bd-1', name: 'John Doe', company: 'Global Corp', email: 'j.doe@global.com', phone: '+1 312 555 1234' }
    ]
  }),
  'ai-ml': createDummyProfile('AI/ML Engineer', {
    personalInfo: {
        fullName: 'Sarah Connor',
        email: 'sarah.ai@tech.net',
        phone: '(650) 555-4433',
        location: 'San Francisco, CA',
        website: 'github.com/sarah-ai',
        jobTitle: 'Machine Learning Engineer',
        profilePicture: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        summary: 'Innovative Machine Learning Engineer specializing in NLP and computer vision. Experienced in building and deploying scalable AI models into production environments using TensorFlow and PyTorch.'
    },
    skills: ['Python', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'NLP', 'Computer Vision', 'MLOps', 'AWS SageMaker', 'Docker', 'Keras', 'Hugging Face'],
    languages: ['English (Native)', 'French (Basic)'],
    education: [
        {
            id: 'edu-ai-1', school: 'Stanford University', degree: 'Master of Science', field: 'Artificial Intelligence', startDate: '2016', endDate: '2018',
            description: 'Focused on Neural Networks and Deep Learning. Research assistant in the Stanford AI Lab.'
        }
    ],
    experience: [
        {
            id: 'ai-1', company: 'DeepMind Solutions', position: 'Senior ML Engineer', startDate: '2020', endDate: 'Present', current: true,
            description: '• Developed a recommendation engine that improved user retention by 25%.\n• Deployed NLP models for automated customer support, reducing ticket resolution time by 50%.\n• Optimized model inference latency, enabling real-time processing on edge devices.\n• Led research on generative models for synthetic data generation.'
        },
        {
            id: 'ai-2', company: 'AI Vision Inc', position: 'ML Developer', startDate: '2018', endDate: '2020', current: false,
            description: '• Built and trained computer vision models for defect detection in manufacturing pipelines.\n• Automated data labeling processes using semi-supervised learning techniques.\n• Collaborated with cross-functional teams to integrate AI models into existing hardware platforms.'
        }
    ],
    references: [
        { id: 'ref-ai-1', name: 'Andrew Ng', company: 'Stanford', email: 'ang@stanford.edu', phone: '+1 650 555 0000' }
    ]
  }),
  'data-engineer': createDummyProfile('Data Engineer', {
    personalInfo: {
        fullName: 'David Chen',
        email: 'david.data@data.io',
        phone: '(206) 555-7788',
        location: 'Seattle, WA',
        website: 'davidchen.data',
        jobTitle: 'Senior Data Engineer',
        summary: 'Detail-oriented Data Engineer with expertise in building robust data pipelines and warehousing solutions. Proficient in big data technologies and ensuring data quality for analytics teams.'
    },
    skills: ['Python', 'SQL', 'Apache Spark', 'Kafka', 'Airflow', 'Snowflake', 'AWS (Redshift, Glue)', 'ETL/ELT', 'Data Modeling'],
    experience: [
        {
            id: 'de-1', company: 'CloudStream', position: 'Senior Data Engineer', startDate: '2019', endDate: 'Present', current: true,
            description: '• Built and maintained ETL pipelines processing 1TB+ of data daily.\n• Migrated on-premise data warehouse to Snowflake, reducing infrastructure costs by 30%.\n• Implemented data quality checks using Great Expectations to ensure 99.9% data accuracy.'
        }
    ]
  }),
  'seo-specialist': createDummyProfile('SEO Specialist', {
    personalInfo: {
        fullName: 'Emily Rose',
        email: 'emily.seo@marketing.com',
        phone: '(305) 555-2244',
        location: 'Miami, FL',
        website: 'emilyrose.marketing',
        jobTitle: 'SEO Specialist',
        profilePicture: 'https://images.unsplash.com/photo-1598550874175-4d7112ee7f43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        summary: 'Results-driven SEO Specialist with a deep understanding of search engine algorithms and content strategy. Proven ability to increase organic traffic and improve keyword rankings for diverse clients.'
    },
    skills: ['Keyword Research', 'On-Page SEO', 'Technical SEO', 'Link Building', 'Google Analytics', 'SEMrush', 'Ahrefs', 'Content Strategy', 'HTML/CSS Basics'],
    experience: [
        {
            id: 'seo-1', company: 'Growth Hackers', position: 'SEO Manager', startDate: '2020', endDate: 'Present', current: true,
            description: '• Increased organic traffic by 150% within 12 months for a key e-commerce client.\n• Conducted technical SEO audits and resolved over 500 crawl errors.\n• Managed a content team to produce high-quality, SEO-optimized blog posts.'
        }
    ]
  })
};
