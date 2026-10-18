// Single source of truth for every piece of personal content on the site.
// Strings are copied verbatim from commit 9f4f8be. The only edits are ones the
// owner approved, and each is listed in scripts/verify-content.mjs:
//   - em-dashes replaced with a comma, colon or hyphen
//   - "4+ years" corrected to "5+ years"
//   - Snowflake Summit talk marked as completed
//   - Medium handle displayed as @athex25
//   - 21st.dev footer credit removed
//   - Contact keeps one of the two response-time paragraphs (owner: keep one)
//   - ALO is the current role (Oct 2026); Altimetrik statements moved to past tense
//   - Oct 2026 additions from the owner: two OpenAI HQ recognition entries and
//     the publications list
//   - home-page "Key Achievements" and "Recent Impact" removed: each repeated a
//     project, stat or recognition entry in different words (approved: show one)
//
// Rich paragraphs are arrays of segments: plain strings, { strong: '...' } or { em: '...' }.

export const site = {
  title: 'Atharva Joshi - GenAI Engineer',
  description:
    'Atharva Joshi, GenAI engineer building RAG systems, AI agents, MCPs, and enterprise-grade AI pipelines.'
}

export const identity = {
  name: 'Atharva Joshi',
  firstName: 'Atharva',
  lastName: 'Joshi',
  monogram: 'AJ',
  signature: 'Atharva J',
  titles: {
    nav: 'GenAI Engineer & Data Scientist',
    profile: 'GenAI Engineer & ML Architect',
    resume: 'Atharva Joshi - GenAI Engineer'
  },
  location: {
    short: 'Salt Lake City, UT',
    long: 'Salt Lake City, Utah',
    note: 'Open to remote opportunities & travel'
  },
  availability: 'Available for Consulting'
}

export const links = {
  email: {
    label: 'Email',
    value: 'atharvajoshi77@gmail.com',
    href: 'mailto:atharvajoshi77@gmail.com',
    description: 'Best for detailed inquiries'
  },
  linkedin: {
    label: 'LinkedIn',
    value: '/in/attharvaj3147',
    href: 'https://linkedin.com/in/attharvaj3147',
    description: "Let's connect professionally"
  },
  github: {
    label: 'GitHub',
    value: '@attharva-j',
    href: 'https://github.com/attharva-j',
    description: 'Check out my code'
  },
  medium: {
    label: 'Medium',
    value: '@athex25',
    href: 'https://medium.com/@athex25',
    description: 'Read my articles'
  }
}

export const resume = {
  href: '/resume.pdf',
  filename: 'Atharva_Joshi_Resume.pdf'
}

export const hero = {
  headline: ['Building', 'Production-Grade', 'GenAI', 'Systems'],
  intro:
    'GenAI Engineer specializing in enterprise RAG architectures, agentic workflows, and scalable AI pipelines. I transform complex ML systems into auditable, production-ready solutions that drive measurable business impact.'
}

export const expertise = ['RAG Systems', 'AI Agents', 'LangGraph', 'Vector DBs', 'LLM Fine-tuning', 'MLOps']

export const stats = [
  { label: 'Production Systems', value: '10+' },
  { label: 'Cost Savings', value: '$900K+' },
  { label: 'Years Experience', value: '5+' },
  { label: 'Enterprise Clients', value: '10+' }
]

export const about = {
  summary: 'GenAI Engineer and ML Architect building enterprise-grade AI systems that solve real business problems.',
  intro: [
    [
      "I'm a GenAI engineer who specializes in building ",
      { strong: 'robust, auditable, and production-ready AI systems' },
      '. My work spans the full lifecycle, from architecture and development to deployment and observability.'
    ],
    [
      'What sets my approach apart is a strong focus on ',
      { strong: 'cross-functional collaboration' },
      ". I partner closely with analysts, engineers, and business stakeholders to convert domain knowledge into reliable AI products that drive measurable outcomes. Whether it's a RAG system processing 100GB of support data or an agentic workflow that saves teams 45+ minutes per meeting, my solutions are built to scale."
    ],
    [
      // Owner-approved (Oct 2026): ALO is the current role; Altimetrik in past tense.
      "Currently, I'm a Senior AI Engineer - Product & MarTech at ",
      { strong: 'ALO' },
      '. At ',
      { strong: 'Altimetrik' },
      ', I led GenAI initiatives for Fortune 500 clients, architecting systems that delivered ',
      { strong: '$900K+ in cost savings' },
      ' and ',
      { strong: '60-70% efficiency improvements' },
      '.'
    ]
  ],
  principles: [
    {
      title: 'Production-First Mindset',
      text: 'Every AI system I build is designed for production from day one: auditable, observable, and maintainable.'
    },
    {
      title: 'Cross-Functional Collaboration',
      text: 'I thrive at the intersection of business, engineering, and data science, translating domain knowledge into technical solutions.'
    },
    {
      title: 'Measurable Impact',
      text: 'Focused on driving tangible business outcomes, from cost savings to revenue growth and operational efficiency.'
    }
  ],
  education: [
    {
      date: 'May 2024',
      degree: 'Master of Science in Business Analytics',
      school: 'Carlson School of Management, University of Minnesota',
      text: 'Specialized in predictive analytics, machine learning, and data-driven decision making. Led analytics projects for real-world clients as Analytics Lead at Carlson Analytics Lab.'
    },
    {
      date: 'May 2020',
      degree: 'B.Eng, Computer Engineering',
      school: 'University of Pune, India',
      text: 'Foundation in computer science, algorithms, and software engineering. Transitioned directly into data science and machine learning roles.'
    }
  ],
  recognition: [
    {
      title: 'GEM Award',
      source: 'Altimetrik Corp.',
      text: [
        'Recognized for exceptional performance and innovation in GenAI engineering. Awarded for delivering transformative AI solutions that drove significant business value.'
      ]
    },
    {
      title: 'Snowflake Summit 2025 Speaker',
      source: 'Completed Conference Presentation',
      text: [
        'Selected to present ',
        { em: '"Gaining Customer Insights and Loyalty with Generative AI"' },
        ', sharing enterprise AI implementation strategies and real-world case studies.'
      ]
    },
    // Added by the owner (Oct 2026).
    {
      title: 'Global Codex Hackathon',
      source: 'OpenAI HQ, San Francisco',
      text: ['Represented Altimetrik at the Global Codex Hackathon at OpenAI HQ in San Francisco.']
    },
    {
      title: 'World Partner Bootcamp',
      source: 'OpenAI HQ, San Francisco',
      text: ['Represented Altimetrik at the World Partner Bootcamp at OpenAI HQ in San Francisco.']
    }
  ],
  journey: [
    [
      'My career in AI engineering began at ',
      { strong: 'Altimetrik India' },
      ', where I built ML pipelines for Fortune 500 retail and sportswear brands. I delivered ',
      { strong: '$620K+ in cost savings' },
      ' through SKU optimization, demand forecasting, and churn prediction models processing 14M+ monthly records.'
    ],
    [
      "During my master's program, I served as ",
      { strong: 'Analytics Lead' },
      ' at the Carlson Analytics Lab, leading cross-functional teams on loyalty program optimization projects that increased engagement by 23% for a major Minneapolis mall.'
    ],
    [
      // Owner-approved (Oct 2026): Altimetrik in past tense, ALO as the present.
      'At ',
      { strong: 'Altimetrik Corp' },
      ', I pushed the boundaries of GenAI, architecting enterprise RAG systems and agentic workflows for clients like Lululemon. Today, I am a Senior AI Engineer - Product & MarTech at ',
      { strong: 'ALO' },
      '. My focus is on making AI practical, reliable, and transformative for business operations.'
    ]
  ],
  beyondWork: [
    "When I'm not building AI systems, I'm exploring the latest research in LLMs and agentic systems, contributing to open-source ML projects, and mentoring junior engineers. I'm passionate about making AI accessible and practical, demystifying complex concepts and showing how they translate to real business value.",
    "I'm always open to interesting conversations about AI, collaboration opportunities, and speaking engagements. Feel free to reach out!"
  ]
}

// Added by the owner (Oct 2026). White-paper titles are the published titles
// on altimetrik.com; the cookbook has no public link yet.
export const publications = [
  {
    title: 'Cookbook on OpenAI Developers',
    source: 'Feature',
    text: 'Published on OpenAI Developers in collaboration with the OpenAI product team for creating a cookbook with 10K+ views.'
  },
  {
    title: '85% Faster Change Cycles: Transforming Data Platforms with AI-Driven Change Management',
    source: 'White paper, Altimetrik',
    href: 'https://www.altimetrik.com/white-papers/schemaflow-ai-data-platform-change-management/'
  },
  {
    title: 'Evals in Production',
    source: 'White paper, Altimetrik',
    href: 'https://www.altimetrik.com/white-papers/evals-in-production/'
  }
]

export const experience = {
  summary: '5+ years building enterprise-grade AI/ML systems with proven scalability and measurable business impact.',
  roles: [
    {
      // Current role, from the LinkedIn export (Oct 2026). No bullets or metrics
      // are published for it yet, so the entry shows title, company and dates only.
      company: 'ALO',
      location: 'Los Angeles, CA',
      role: 'Senior AI Engineer - Product & MarTech',
      period: 'Aug 2026 - Present',
      highlights: [],
      impact: []
    },
    {
      company: 'Altimetrik Corp.',
      location: 'San Francisco, CA',
      role: 'Gen AI Engineer',
      // Owner-approved: Altimetrik is a past role; tenure ended Aug 2026 (LinkedIn).
      period: 'Nov 2024 - Aug 2026',
      type: 'Full-time',
      highlights: [
        'Architected org-wide GenAI-powered change request automation framework using LangGraph to orchestrate LLM agents across parsing, impact analysis, SQL generation, and validation',
        'Implemented dual retrieval strategy with ChromaDB (RAG over PDF knowledge base) and Neo4j lineage graph, enabling semantic grounding and structural impact analysis',
        'Integrated OpenAI and AWS Bedrock with LangSmith for production-grade tracing, observability, and auditability',
        'Led cross-functional adoption by exposing pipeline via GitHub MCP and TypeScript UI, reducing turnaround from weeks to days',
        'Engineered modular ingestion pipeline integrating 5+ data sources to vectorize 100K+ user story fragments',
        'Built agentic workflow using OpenAI Agents SDK, dynamically synthesizing meeting insights from Pinecone Vector DB',
        'Documented and standardized AWS-based deployment using GitHub Actions, improving implementation velocity by 60%',
        'Mentored 2 junior engineers in productionizing pipelines, scaling knowledge across teams'
      ],
      impact: [
        { label: 'Efficiency', value: '60-70% reduction in request-to-implementation cycle' },
        { label: 'Time saved', value: '45-50 minutes per meeting' },
        { label: 'Revenue impact', value: 'Increased deal win rates' }
      ]
    },
    {
      company: 'Carlson Analytics Lab',
      location: 'Minneapolis, MN',
      role: 'Analytics Lead',
      period: 'Jul 2023 - May 2024',
      type: 'Full-time',
      highlights: [
        'Led cross-functional analytics initiative aligning marketing, customer engagement, and strategy teams to enhance loyalty program ROI',
        'Spearheaded customer segmentation of 13K+ insiders using K-Means clustering, increasing targeting precision and campaign efficiency by 30%',
        'Unlocked 23% surge in engagement by designing personalized promotional strategies using association rule mining',
        'Collaborated with stakeholders to translate business requirements into actionable data insights',
        'Managed end-to-end analytics projects from data collection to presentation of findings'
      ],
      impact: [
        { label: 'Engagement', value: '23% increase in customer engagement' },
        { label: 'Efficiency', value: '30% improvement in campaign targeting' },
        { label: 'Scale', value: '13K+ customers segmented' }
      ]
    },
    {
      company: 'Altimetrik India',
      location: 'Bangalore, India',
      role: 'Associate Data Scientist',
      period: 'Nov 2020 - May 2023',
      type: 'Full-time',
      highlights: [
        'Delivered $150K in cost savings by optimizing SKU planning using ML pipelines for leading Japanese sportswear and Canadian athleisure brands',
        'Boosted quarterly profits by 18% via seasonal product forecasting with LSTM models',
        'Reduced inventory re-stock delays by 70% (from 7 to 2 days) using Python-based time series models',
        'Saved $70.5K through BERT-based employee sentiment classification for workforce insights',
        'Engineered churn prediction models using decision trees that retained $150K in annual revenue for CleverTap',
        'Built automated customer journey pipelines in BigQuery, realizing $400K in savings annually through faster analysis of 14M+ monthly records',
        'Implemented CI/CD pipelines for ML model deployment and monitoring',
        'Collaborated with product teams to integrate ML insights into customer-facing features'
      ],
      impact: [
        { label: 'Cost savings', value: '$620K+ total savings' },
        { label: 'Revenue retained', value: '$150K annual revenue' },
        { label: 'Efficiency', value: '70% reduction in restock delays' },
        { label: 'Scale', value: '14M+ monthly records processed' }
      ]
    }
  ]
}

export const projects = {
  summary:
    'Production-ready AI systems delivering measurable business impact across enterprise clients. Focus on RAG architectures, agentic workflows, and scalable ML pipelines.',
  collaboration: {
    title: 'Interested in collaboration?',
    text: "Let's discuss how AI can transform your business operations."
  },
  items: [
    {
      id: 'lululemon',
      title: 'AI-Powered Workflow Automation - Leading Athleisure Brand',
      company: 'Altimetrik Corp.',
      description:
        'First-of-its-kind GenAI-powered change request automation framework reducing manual effort across analysts, engineers, and QE teams.',
      impact: [
        '60-70% reduction in request-to-implementation cycle time',
        'Eliminated error-prone dependencies in schema modifications',
        'Established repeatable blueprint for data workflow governance'
      ],
      tech: ['LangGraph', 'LangSmith', 'OpenAI', 'AWS Bedrock', 'ChromaDB', 'Neo4j', 'GitHub MCP', 'TypeScript'],
      highlights: [
        'Dual retrieval strategy: ChromaDB for semantic grounding + Neo4j for lineage analysis',
        'LLM orchestration across parsing, impact analysis, SQL generation, and validation',
        'Production-grade observability with LangSmith tracing',
        'Self-serve schema changes via TypeScript UI while maintaining engineering oversight'
      ]
    },
    {
      id: 'meeting-prep',
      title: 'Customer Meeting Prep Agent',
      company: 'Enterprise Monitoring Platform',
      description:
        'Modular ingestion pipeline integrating 5+ data sources to vectorize 100K+ user story fragments for context-aware meeting insights.',
      impact: [
        '45-50 minutes saved per meeting in prep time',
        'Increased deal win rates through better personalization',
        'Enhanced seller confidence across organization'
      ],
      tech: ['OpenAI Agents SDK', 'Pinecone', 'AWS', 'GitHub Actions'],
      highlights: [
        'Agentic workflow dynamically fetching and synthesizing insights',
        'Documented AWS-based deployment for 60% faster implementation',
        'Reusable enterprise template enabling parallel team adoption',
        'Mentored 2 junior engineers in production pipeline development'
      ]
    },
    {
      id: 'support-assistant',
      title: 'RAG-Based Support Assistant',
      company: 'Pricing Analytics Company',
      description:
        'Vectorized knowledge base from 100GB of historical support data across multiple formats using OpenAI embeddings and Pinecone.',
      impact: [
        '75% reduction in manual support search time',
        'Faster case resolution across support teams',
        'Scalable RAG architecture for enterprise support'
      ],
      tech: ['OpenAI Embeddings', 'Pinecone', 'Custom GPTs', 'AWS'],
      highlights: [
        'Structured and ingested multi-format historical data',
        'CustomGPT assistant with retrieval-augmented responses',
        'Production-ready vector search infrastructure'
      ]
    },
    {
      id: 'product-analysis',
      title: 'Product Performance Analysis',
      company: "Leading Women's Apparel Brand",
      description: 'LLM-powered analysis of multi-channel product reviews identifying hidden customer segments.',
      impact: [
        '$135K in potential revenue unlocked',
        'Discovered new customer segments',
        'Actionable insights from unstructured data'
      ],
      tech: ['LLaMA', 'Snowflake Cortex', 'Python', 'SQL'],
      highlights: [
        'Multi-channel review sentiment analysis',
        'Customer segmentation using LLM embeddings',
        'Snowflake Cortex integration for scalable analysis'
      ]
    },
    {
      id: 'churn-prediction',
      title: 'Churn Prediction & Journey Automation',
      company: 'CleverTap (MarTech SaaS)',
      description:
        'Decision tree models for churn prediction and automated customer journey pipelines processing 14M+ monthly records.',
      impact: [
        '$150K annual revenue retained',
        '$400K annual savings through automation',
        '14M+ records processed monthly'
      ],
      tech: ['BigQuery', 'CI/CD', 'Spark', 'Python'],
      highlights: [
        'Production ML pipeline with CI/CD integration',
        'Automated customer journey analysis at scale',
        'Real-time churn risk scoring'
      ]
    },
    {
      id: 'sku-planning',
      title: 'ML-Powered SKU Planning & Forecasting',
      company: 'Japanese Sportswear & Canadian Athleisure',
      description: 'LSTM models for seasonal forecasting and optimization pipelines for inventory planning.',
      impact: [
        '$150K cost savings through optimization',
        '18% quarterly profit boost',
        '70% reduction in restock delays (7→2 days)'
      ],
      tech: ['LSTM', 'PyCaret', 'Python', 'Time Series'],
      highlights: [
        'Seasonal demand forecasting with LSTM',
        'SKU-level optimization across product lines',
        'Automated restock trigger systems'
      ]
    }
  ]
}

export const skills = {
  summary: 'Comprehensive technical expertise across the AI/ML stack, from research to production deployment.',
  network: {
    title: 'Interactive Skills × Projects Network',
    description:
      'Explore the relationships between my technical skills and real-world projects through an interactive network visualization. Hover to see connections, click projects to learn more.'
  },
  skillProjectMap: {
    LangGraph: ['lululemon'],
    ChromaDB: ['lululemon'],
    Neo4j: ['lululemon'],
    OpenAI: ['lululemon', 'meeting-prep', 'support-assistant'],
    'AWS Bedrock': ['lululemon'],
    LangSmith: ['lululemon'],
    TypeScript: ['lululemon'],
    'Agents SDK': ['meeting-prep'],
    Pinecone: ['meeting-prep', 'support-assistant'],
    'GitHub Actions': ['meeting-prep'],
    'Custom GPTs': ['support-assistant'],
    AWS: ['lululemon', 'meeting-prep', 'support-assistant'],
    LLaMA: ['product-analysis'],
    Snowflake: ['product-analysis'],
    SQL: ['product-analysis', 'churn-prediction'],
    BigQuery: ['churn-prediction'],
    Spark: ['churn-prediction'],
    'CI/CD': ['churn-prediction'],
    LSTM: ['sku-planning'],
    PyCaret: ['sku-planning'],
    'Time Series': ['sku-planning'],
    Python: ['lululemon', 'meeting-prep', 'support-assistant', 'product-analysis', 'churn-prediction', 'sku-planning']
  },
  projectLabels: {
    lululemon: { name: 'Lululemon', fullName: 'Workflow Automation', impact: '60-70% faster' },
    'meeting-prep': { name: 'Meeting Prep', fullName: 'AI Agent', impact: '45-50min saved' },
    'support-assistant': { name: 'Support', fullName: 'RAG Assistant', impact: '75% reduction' },
    'product-analysis': { name: 'Product', fullName: 'Analytics', impact: '$135K revenue' },
    'churn-prediction': { name: 'Churn', fullName: 'Prediction', impact: '$150K retained' },
    'sku-planning': { name: 'SKU', fullName: 'Planning', impact: '$150K savings' }
  },
  categories: [
    {
      category: 'GenAI & LLM Systems',
      skills: [
        'Retrieval-Augmented Generation (RAG)',
        'Prompt Engineering & Optimization',
        'Agentic AI Design',
        'LLM Orchestration (LangGraph)',
        'OpenAI Agents SDK',
        'Custom GPTs Development',
        'LLaMA / Open-source LLMs',
        'BERT & Transformer Models'
      ]
    },
    {
      category: 'ML & Predictive Analytics',
      skills: [
        'Demand Forecasting',
        'Churn Prediction',
        'LSTM & RNN',
        'Decision Trees & Ensemble Methods',
        'PyCaret & AutoML',
        'Model Explainability (SHAP, LIME)',
        'NLP & Sentiment Analysis',
        'Customer Segmentation'
      ]
    },
    {
      category: 'Vector DBs & Data Infrastructure',
      skills: [
        'Pinecone',
        'ChromaDB',
        'Neo4j (Graph DB)',
        'Snowflake & Snowflake Cortex',
        'BigQuery',
        'PostgreSQL / MySQL',
        'S3 & Data Lakes'
      ]
    },
    {
      category: 'Cloud & MLOps',
      skills: [
        'AWS (Lambda, EC2, Bedrock)',
        'GCP',
        'CI/CD (GitHub Actions, Airflow)',
        'Docker & Containerization',
        'ML Lifecycle Ownership',
        'LangSmith (Observability)',
        'Model Monitoring & Deployment'
      ]
    },
    {
      category: 'Programming & Tools',
      skills: [
        'Python',
        'SQL',
        'TypeScript / JavaScript',
        'Spark',
        'Git & Version Control',
        'Cursor AI / VS Code',
        'Jupyter / PyCharm'
      ]
    },
    {
      category: 'Frameworks & Libraries',
      skills: [
        'LangChain / LangGraph',
        'Pandas / NumPy',
        'Scikit-learn',
        'TensorFlow / PyTorch',
        'FastAPI / Flask',
        'Streamlit'
      ]
    },
    {
      category: 'Leadership & Strategy',
      skills: [
        'Cross-functional Collaboration',
        'Technical Mentorship',
        'Enterprise AI Strategy',
        'Stakeholder Communication',
        'Project Management',
        'Knowledge Scaling'
      ]
    },
    {
      category: 'Domain Expertise',
      skills: [
        'SaaS & Enterprise Software',
        'Retail & E-commerce',
        'MarTech & Customer Analytics',
        'Pricing Analytics',
        'Supply Chain Optimization',
        'CX Optimization'
      ]
    }
  ]
}

export const contact = {
  heading: "Let's Connect",
  intro: "Open to consulting, collaborations, and speaking opportunities. Let's discuss how AI can transform your business.",
  responseTime: '24-48 hours',
  responseNote:
    'I respond to all professional inquiries within 24-48 hours. For consulting, speaking, or collaboration opportunities, please reach out via email or LinkedIn.',
  collaborations: [
    { title: 'Consulting', text: 'Enterprise AI strategy, RAG architecture design, and ML system optimization' },
    { title: 'Speaking', text: 'Conference talks, workshops, and technical presentations on GenAI and MLOps' },
    { title: 'Collaboration', text: 'Open-source projects, research partnerships, and technical advisory roles' }
  ],
  topicsHeading: "Topics I'm Excited About",
  topics: [
    'Enterprise RAG Systems',
    'Agentic AI Workflows',
    'LLM Fine-tuning',
    'Vector Search Optimization',
    'MLOps at Scale',
    'AI for Business Ops',
    'Production ML Systems',
    'Data Quality for AI'
  ]
}

export const footer = {
  authorship: 'Created and maintained by - Atharva J'
}
