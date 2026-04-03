export const profile = {
  name: 'MD Shahin Mia Robin',
  shortName: 'Robin',
  title: 'Full-Stack Software Engineer',
  tagline: 'I build systems that don\'t break under pressure.',
  location: 'Dhaka, Bangladesh',
  email: 'msmrobin518@gmail.com',
  phone: '01739299741',
  github: 'https://github.com/robinNcode',
  linkedin: 'https://www.linkedin.com/in/robinNcode/',
  yearsExperience: 5,
  summary: `Engineer who thinks in systems and writes code that outlives its deadline. 
    I'm drawn to the hard parts: the production bug at 2am, the query that's 
    mysteriously slow, the architecture decision that will matter in two years. 
    Not just shipping features — shipping reliability.`,
}

export const bootSequence = [
  '> Initializing system...',
  '> Loading kernel modules: [php-laravel] [react] [mysql] [redis]',
  '> Mounting filesystems: /backend /frontend /devops',
  '> Checking process integrity...',
  '> Starting microfinance-engine v3.1... ✓',
  '> Starting hr-platform v2.4... ✓',
  '> Starting investor-system v1.8... ✓',
  '> All services operational.',
  '> Welcome, Robin. System ready.',
]

export const experiences = [
  {
    id: 'datasoft',
    company: 'DataSoft Systems Bangladesh Ltd.',
    role: 'Software Engineer',
    period: 'Dec 2023 – Present',
    duration: '2+ years',
    location: 'Dhaka',
    product: 'Microfin360Next',
    productUrl: '#',
    process: 'CMMI Level 5',
    status: 'active',
    tagline: 'Production-grade microfinance at scale.',
    problemSolved: 'Financial data mismatches in loan reports were causing double-accounting. Traced root cause to a race condition in concurrent batch jobs.',
    impact: [
      'Eliminated repeat production incidents by fixing root causes, not symptoms',
      'Owned complex production deployments in Team Lead\'s absence',
      'Built 1 complex module from scratch with full ownership',
      'Reduced SQL query execution time for critical reports',
    ],
    leadership: [
      'Conducted pre-merge code reviews with structured feedback',
      'Mentored junior developers on business logic and SDLC processes',
      'Coordinated cross-team deployments across QA and DevOps',
    ],
    award: 'Best Team Player – 2024',
    stack: ['PHP', 'Laravel', 'MySQL', 'Redis', 'Docker', 'Jenkins'],
  },
  {
    id: 'adova-se',
    company: 'AdovaSoft',
    role: 'Software Engineer',
    period: 'Sep 2022 – Nov 2023',
    duration: '1 year 3 months',
    location: 'Dhaka',
    status: 'completed',
    tagline: 'Promoted. Led. Delivered.',
    problemSolved: 'Inherited a codebase with no consistent architecture patterns. Introduced module-based structure that cut onboarding time for new developers.',
    impact: [
      'Led and enhanced HRXpert SaaS platform architecture',
      'Built Investor Management System from ground up',
      'Improved code quality through systematic review practices',
      'Designed scalable backend module structure',
    ],
    leadership: [
      'Led a small development team as promoted Software Engineer',
      'Established coding standards and review culture',
      'Coordinated feature planning and release cycles',
    ],
    stack: ['PHP', 'Laravel', 'Vue.js', 'MySQL', 'Bootstrap'],
  },
  {
    id: 'adova-wd',
    company: 'AdovaSoft',
    role: 'Web Developer',
    period: 'Jun 2020 – Aug 2022',
    duration: '2 years 3 months',
    location: 'Dhaka',
    status: 'completed',
    tagline: 'Built from zero. Learned from everything.',
    problemSolved: 'No existing system for tracking academic thesis submissions — faculty relied on email chains. Designed a full workflow-based platform.',
    impact: [
      'Built multiple business apps from scratch',
      'Created Institute Project Thesis Manager end-to-end',
      'Designed initial HRXpert architecture',
      'Established DB schema and backend patterns used today',
    ],
    leadership: [],
    stack: ['PHP', 'CodeIgniter', 'Laravel', 'MySQL', 'JavaScript', 'Bootstrap'],
  },
]

export const projects = [
  {
    id: 'microfin',
    name: 'Microfin360Next',
    type: 'Enterprise Financial System',
    status: 'Production',
    problem: 'Microfinance institutions needed a platform to manage thousands of loan accounts, branch operations, and regulatory reports — with zero tolerance for data inconsistency.',
    solution: 'Contributed to and optimized the core loan engine, financial reporting pipeline, and branch-level data flows. Resolved critical production incidents including a race condition causing balance discrepancies.',
    impact: 'Serves real microfinance clients managing millions in loan portfolios. Followed CMMI Level 5 processes throughout.',
    stack: ['PHP', 'Laravel', 'MySQL', 'Redis', 'Docker', 'Jenkins'],
    architecture: 'microfinance',
    gradient: 'from-cyan-900/30 to-blue-900/20',
    accent: '#22d3ee',
  },
  {
    id: 'hrxpert',
    name: 'HRXpert',
    type: 'SaaS HR Management Platform',
    status: 'Production',
    problem: 'SMEs lacked affordable, configurable HR software that could scale from 50 to 5000 employees without re-architecting.',
    solution: 'Architected backend modules for user management, multi-tenant workflows, and reporting. Led a team through the platform\'s evolution from single-tenant to SaaS structure.',
    impact: 'Deployed for multiple organizations. Workflow engine handles complex leave, payroll, and attendance flows.',
    stack: ['PHP', 'Laravel', 'Vue.js', 'MySQL', 'Redis'],
    architecture: 'saas',
    gradient: 'from-violet-900/30 to-purple-900/20',
    accent: '#a78bfa',
  },
  {
    id: 'investor',
    name: 'Investor Management System',
    type: 'Financial Data Platform',
    status: 'Production',
    problem: 'Manual tracking of investment portfolios, profit distributions, and withdrawal schedules was error-prone and unauditable.',
    solution: 'Built backend architecture for investment tracking, profit allocation algorithms, and withdrawal management. Structured complex reporting queries ensuring data consistency.',
    impact: 'Accurate, auditable financial records for investor operations.',
    stack: ['PHP', 'Laravel', 'MySQL', 'Bootstrap'],
    architecture: 'investor',
    gradient: 'from-amber-900/30 to-orange-900/20',
    accent: '#f97316',
  },
  {
    id: 'thesis',
    name: 'Institute Project Thesis Manager',
    type: 'Academic Workflow System',
    status: 'Delivered',
    problem: 'Academic institutions tracked student project submissions via email and spreadsheets — with no audit trail, deadlines, or approval workflows.',
    solution: 'Built end-to-end: designed DB schema, role-based access for students/faculty/admin, workflow state machine for submission → review → approval.',
    impact: 'Replaced manual processes with a structured, auditable platform.',
    stack: ['PHP', 'CodeIgniter', 'MySQL', 'JavaScript', 'Bootstrap'],
    architecture: 'thesis',
    gradient: 'from-emerald-900/30 to-green-900/20',
    accent: '#34d399',
  },
]

export const skills = {
  'Frontend Systems': {
    icon: '◈',
    color: '#22d3ee',
    items: ['React.js', 'Vue.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'Bootstrap', 'HTML5/CSS3'],
  },
  'Backend Engineering': {
    icon: '◉',
    color: '#a78bfa',
    items: ['PHP (Laravel)', 'PHP (CodeIgniter)', 'RESTful APIs', 'Authentication', 'SaaS Architecture', 'RBAC Systems'],
  },
  'Data Layer': {
    icon: '◐',
    color: '#f97316',
    items: ['MySQL', 'Redis', 'MongoDB', 'Query Optimization', 'Schema Design', 'Database Migration'],
  },
  'DevOps & Tools': {
    icon: '◍',
    color: '#34d399',
    items: ['Docker', 'Jenkins', 'Git / GitHub', 'Grafana', 'Prometheus', 'Linux', 'CMMI Level 5'],
  },
}

export const openSource = {
  name: 'DB-Craft',
  package: 'msmrobin/db-craft',
  platform: 'Packagist',
  language: 'PHP / CodeIgniter 4',
  description: 'A CodeIgniter 4 toolkit that automates database migrations and seeders — giving CI4 developers a Laravel Artisan-like workflow for schema versioning.',
  problem: 'CodeIgniter 4 had no built-in migration runner with seeder support. Developers were manually managing schema changes, leading to environment drift and deployment errors.',
  stats: {
    installs: '3,709',
    stars: 19,
    version: '1.x',
  },
  github: 'https://github.com/msmrobin/db-craft',
  packagist: 'https://packagist.org/packages/msmrobin/db-craft',
  snippet: `// Install
composer require msmrobin/db-craft

// Run all pending migrations
php spark db:migrate

// Seed the database  
php spark db:seed UserSeeder

// Rollback last batch
php spark db:rollback`,
}

export const debuggingStories = [
  {
    title: 'The Silent Race Condition',
    severity: 'critical',
    context: 'Microfin360Next production',
    symptom: 'Loan account balances were occasionally off by small amounts. Reports reconciled daily but discrepancies appeared under load.',
    diagnosis: 'After adding query logging and analyzing the execution timeline, discovered two concurrent batch jobs were both reading and updating the same loan record without locking.',
    fix: 'Introduced pessimistic locking on loan records during batch processing. Added idempotency keys to prevent duplicate processing.',
    lesson: 'Silent data corruption is worse than a crash. If it doesn\'t throw an error, you might not find it until it matters.',
  },
  {
    title: 'The Report That Took 40 Seconds',
    severity: 'performance',
    context: 'AdovaSoft HR Platform',
    symptom: 'A monthly payroll summary report was timing out for clients with 500+ employees. Database was not under load.',
    diagnosis: 'EXPLAIN ANALYZE revealed the query was doing a full table scan on a 200k-row attendance table. A missing composite index on (employee_id, date) was forcing row-by-row evaluation.',
    fix: 'Added the composite index. Added a covering index for the SELECT columns. Report now runs in under 800ms.',
    lesson: 'Always EXPLAIN before you optimize. The answer is usually in the query plan.',
  },
]

export const leadership = [
  {
    icon: '⬡',
    title: 'Code Review Philosophy',
    description: 'I review for understanding, not just correctness. A good review leaves the author better equipped for next time — not just fixes this PR.',
  },
  {
    icon: '⬡',
    title: 'Mentoring Approach',
    description: 'Start with the "why". Junior devs don\'t need more syntax — they need context: why this architecture, why this tradeoff, why this process exists.',
  },
  {
    icon: '⬡',
    title: 'Ownership Under Pressure',
    description: 'When production breaks and the lead is unavailable, someone has to drive. I\'ve learned that being calm, systematic, and communicative matters more than being the fastest coder in the room.',
  },
  {
    icon: '⬡',
    title: 'Process Over Heroism',
    description: 'A team that ships reliably beats a team of solo heroes. I prefer solid SDLC, good documentation, and reproducible deployments over last-minute brilliance.',
  },
]
