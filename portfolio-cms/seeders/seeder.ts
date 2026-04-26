import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';

const experiences = [
  {
    exp_id: 'datasoft',
    company: 'DataSoft Systems Bangladesh Ltd.',
    role: 'Software Engineer',
    period: 'Dec 2023 – Present',
    duration: '2+ years',
    location: 'Dhaka',
    product: 'Microfin360Next',
    product_url: '#',
    process: 'CMMI Level 5',
    status: 'active',
    tagline: 'Production-grade microfinance at scale.',
    problem_solved: 'Financial data mismatches in loan reports were causing double-accounting. Traced root cause to a race condition in concurrent batch jobs.',
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
    order: 1
  },
  {
    exp_id: 'adova-se',
    company: 'AdovaSoft',
    role: 'Software Engineer',
    period: 'Sep 2022 – Nov 2023',
    duration: '1 year 3 months',
    location: 'Dhaka',
    status: 'completed',
    tagline: 'Promoted. Led. Delivered.',
    problem_solved: 'Inherited a codebase with no consistent architecture patterns. Introduced module-based structure that cut onboarding time for new developers.',
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
    order: 2
  },
  {
    exp_id: 'adova-wd',
    company: 'AdovaSoft',
    role: 'Web Developer',
    period: 'Jun 2020 – Aug 2022',
    duration: '2 years 3 months',
    location: 'Dhaka',
    status: 'completed',
    tagline: 'Built from zero. Learned from everything.',
    problem_solved: 'No existing system for tracking academic thesis submissions — faculty relied on email chains. Designed a full workflow-based platform.',
    impact: [
      'Built multiple business apps from scratch',
      'Created Institute Project Thesis Manager end-to-end',
      'Designed initial HRXpert architecture',
      'Established DB schema and backend patterns used today',
    ],
    leadership: [],
    stack: ['PHP', 'CodeIgniter', 'Laravel', 'MySQL', 'JavaScript', 'Bootstrap'],
    order: 3
  },
];

const projects = [
  {
    project_id: 'microfin',
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
    order: 1
  },
  {
    project_id: 'hrxpert',
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
    order: 2
  },
  {
    project_id: 'investor',
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
    order: 3
  },
  {
    project_id: 'thesis',
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
    order: 4
  },
  {
    project_id: 'noor',
    name: 'Noor',
    type: 'Islamic Lifestyle Platform',
    status: 'Production',
    problem: 'Muslims needed a unified digital companion for daily spiritual practices that stays relevant throughout the year.',
    solution: 'Built a complete digital experience for daily Ayats, Hadiths, Duas, and Amals. Integrated animated "Sacred Geometry" UI elements and dynamic public statistics tracking.',
    impact: 'Providing a seamless spiritual tracking experience for users.',
    stack: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
    architecture: 'sacred-geometry',
    gradient: 'from-emerald-900/40 to-cyan-900/20',
    accent: '#10b981',
    order: 5
  },
  {
    project_id: 'abmiti',
    name: 'Abmiti (আয় বেয় মিতি)',
    type: 'Personal Finance Tracker',
    status: 'Development',
    problem: 'Difficulty in tracking personal income, expenses, and savings with a clear, localized interface.',
    solution: 'Architected a full-stack personal finance tracker with Node.js/Express/MongoDB backend and React/Vite/Tailwind frontend. Implemented JWT auth, SMS parsing, and Zustand for state management.',
    impact: 'Streamlined financial tracking with aggregated stats and category-wise analysis.',
    stack: ['Node.js', 'Express', 'MongoDB', 'React', 'Zustand', 'Tailwind'],
    architecture: 'mern-stack',
    gradient: 'from-orange-900/30 to-red-900/20',
    accent: '#f97316',
    order: 6
  },
];

const skills = [
  {
    category: 'Frontend Systems',
    icon: '◈',
    color: '#22d3ee',
    items: ['React.js', 'Vue.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'Bootstrap', 'HTML5/CSS3'],
    order: 1
  },
  {
    category: 'Backend Engineering',
    icon: '◉',
    color: '#a78bfa',
    items: ['PHP (Laravel)', 'Node.js (Express)', 'PHP (CodeIgniter)', 'RESTful APIs', 'Authentication', 'SaaS Architecture', 'RBAC Systems'],
    order: 2
  },
  {
    category: 'Data Layer',
    icon: '◐',
    color: '#f97316',
    items: ['MySQL', 'MongoDB', 'Redis', 'Query Optimization', 'Schema Design', 'Database Migration'],
    order: 3
  },
  {
    category: 'DevOps & Tools',
    icon: '◍',
    color: '#34d399',
    items: ['Docker', 'Jenkins', 'Git / GitHub', 'Grafana', 'Prometheus', 'Linux', 'CMMI Level 5'],
    order: 4
  },
];

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  
  const experienceModel = app.get<Model<any>>(getModelToken('Experience'));
  const projectModel = app.get<Model<any>>(getModelToken('Project'));
  const skillModel = app.get<Model<any>>(getModelToken('Skill'));

  console.log('Seeding Experiences...');
  for (const exp of experiences) {
    await experienceModel.updateOne({ exp_id: exp.exp_id }, exp, { upsert: true });
  }

  console.log('Seeding Projects...');
  for (const proj of projects) {
    await projectModel.updateOne({ project_id: proj.project_id }, proj, { upsert: true });
  }

  console.log('Seeding Skills...');
  for (const skill of skills) {
    await skillModel.updateOne({ category: skill.category }, skill, { upsert: true });
  }

  console.log('Seeding completed successfully!');
  await app.close();
}

bootstrap().catch(err => {
  console.error('Seeding failed', err);
  process.exit(1);
});
