/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Project, SystemProfile, TimelineStep } from './types';

export const systemProfile: SystemProfile = {
  name: 'Slaviša Milinković',
  email: 'smilinkovic@outlook.com',
  location: 'Beograd, Srbija',
  title: 'Senior Business Analyst, IT Specialist & Data Architect',
  bio: 'Preko 25 godina iskustva u analizi, integraciji i modeliranju Enterprise i Data sistema (ERP, MES, DWH, ML).',
  fullBio: 'Senior poslovni analitičar i IT specijalista sa više od 25 godina iskustva u konfiguraciji, implementaciji i optimizaciji Enterprise aplikativnih rešenja (ERP, MES, DWH). Dokazani ekspert za upravljanje celokupnim životnim ciklusom softvera (SAP, Workday, OneStream, Odoo), od prikupljanja zahteva i API integracija do mentorisanja kros-funkcionalnih timova i vođenja projekata u automobilskoj industriji, bankarstvu i državnoj upravi.',
  skills: [
    {
      category: 'Enterprise Systems & ERP',
      list: ['SAP (EAM, ACDOCA, HR)', 'Workday', 'OneStream', 'Odoo ERP', 'WMS', 'Legacy Systems Decommissioning']
    },
    {
      category: 'Data Engineering & Databases',
      list: ['Python (Pandas, PySpark, NumPy)', 'Advanced SQL', 'Oracle', 'PostgreSQL', 'MS SQL Server', 'Azure Synapse', 'Azure Databricks', 'ETL Pipelines', 'Talend', 'SSIS / Kettle']
    },
    {
      category: 'AI, Machine Learning & LLMs',
      list: ['Time Series Forecasting', 'AutoGluon / TimeGPT', 'Model Fine-Tuning (Gemma, LLaMA)', 'Autonomous AI Agents', 'CrewAI / LangChain', 'ML Algorithms (KNN, Random Forest, Neural Networks)']
    },
    {
      category: 'Project & Architecture Governance',
      list: ['Jira & Confluence', 'UML Modeling', 'Domain Driven Design (DDD)', 'COBIT', 'ITIL', 'ISO 27000', 'Agile / Scrum / Kanban']
    }
  ]
};

export const projects: Project[] = [
  {
    id: 'magna',
    title: 'Magna Systems & ML Optimization',
    company: 'Magna International',
    role: 'Senior Business Analyst',
    period: '2021 - Danas',
    description: 'Dizajn arhitekture podataka, Workday i OneStream integracije, te implementacija ML algoritama za optimizaciju auto-industrije.',
    longDescription: 'Na poziciji Senior poslovnog analitičara u kompaniji Magna vodim analizu poslovnih potreba za kompleksna softverska rešenja. Dizajniram strategije integracije podataka i data warehousing, vodim integracije platformi Workday i OneStream, i pružam naprednu tehničku podršku za SAP ekstrakciju podataka. Takođe podržavam ML projekte u proizvodnji, implementirajući algoritme (KNN, Random Forest, neuronske mreže) radi optimizacije industrijskih procesa.',
    techStack: ['Workday', 'OneStream', 'SAP Data Extraction', 'Python (Pandas, scikit-learn)', 'Azure Synapse', 'Random Forest', 'Neural Networks', 'ETL Pipelines'],
    metrics: [
      { label: 'Integrisani sistemi', value: 'Workday & OneStream', icon: 'Settings' },
      { label: 'Analiza podataka', value: 'Optimizacija proizvodnje', icon: 'Database' },
      { label: 'Mašinsko učenje', value: 'KNN & Random Forest', icon: 'Cpu' }
    ],
    accentColor: '#6366f1' // indigo-500
  },
  {
    id: 'enterprise_dwh',
    title: 'S-TIM ICT & MD&Profy EA/DA',
    company: 'MD&Profy / S-TIM ICT',
    role: 'IT Consultant & Enterprise Architect',
    period: '2012 - 2022',
    description: 'Upravljanje IT transformacijama, modeliranje sistema za SMATSA-u, dizajn DWH input tokova za 20M+ zapisa i Odoo rešenja.',
    longDescription: 'Kao IT konsultant i arhitekt preduzeća, vodio sam end-to-end IT transformacije. Za SMATSA-u sam projektovao sisteme za planiranje, budžetiranje i upravljanje imovinom, uz reverzni inženjering nasleđenih procesa. Kroz agenciju S-TIM ICT kreirao sam DWH sisteme sa Python Pandas za obradu preko 20 miliona zapisa, implementirao Odoo ERP rešenja za javnu upravu i obavljao strateško savetovanje (UNDP, Beohemija, Carnex, poreska policija).',
    techStack: ['Python (Pandas)', 'Odoo ERP', 'UML Modeling', 'PostgreSQL / Oracle', 'Talend / SSIS', 'COBIT / ITIL', 'ISO 27000', 'PowerBI / QlikView'],
    metrics: [
      { label: 'DWH obrada podataka', value: '20M+ redova', icon: 'Database' },
      { label: 'Strateško savetovanje', value: 'UNDP & Javna uprava', icon: 'GraduationCap' },
      { label: 'Implementirani ERP', value: 'Odoo & WMS', icon: 'Settings' }
    ],
    accentColor: '#22d3ee' // cyan-400
  },
  {
    id: 'semantra',
    title: 'Semantra Multi-model Semantic Search',
    company: 'GitHub Open Source / gslavisam',
    role: 'Open-Source Creator & Maintainer',
    period: '2023 - Danas',
    description: 'Lokalna semantička pretraga PDF-ova i dokumenata visoke privatnosti pomoću embedding modela.',
    longDescription: 'Semantra je napredni alat za semantičku pretragu nad velikim bazama dokumenata (PDF, TXT, HTML) lokalno, osiguravajući privatnost podataka. Koristi embeddinge iz modela kao što su BGE i MiniLM na klijent-pogonu ili OpenAI API na cloud-pogonu kako bi korisnici pretraživali koncepte i smisao, a ne samo ključne reči.',
    techStack: ['Python', 'HuggingFace Transformers', 'FastAPI', 'React', 'Vector Embeddings', 'Cosine Similarity', 'ChromaDB / PGVector'],
    metrics: [
      { label: 'GitHub Zvezdice', value: '1.2k+ Stars', icon: 'Star' },
      { label: 'Brzina upita', value: '< 50ms pretraga', icon: 'Zap' },
      { label: 'Podržani Formati', value: 'PDF, TXT, HTML, DOCX', icon: 'FileText' }
    ],
    accentColor: '#10b981' // emerald-500
  }
];

export const initialTimelineSteps: TimelineStep[] = [
  {
    id: 1,
    title: 'Skeniranje 25+ godina IT iskustva',
    titleEn: 'Scanning 25+ years of IT experience',
    status: 'completed',
    actionType: 'search',
    description: 'Pretraga i verifikacija opsežnog profesionalnog opusa Slaviše Milinkovića.',
    descriptionEn: 'Searching and verifying the extensive professional portfolio of Slavisa Milinkovic.',
    timestamp: '08:12:05',
    outputLog: [
      '🔍 Inicijalizacija pretrage: "Slaviša Milinković"',
      '👉 Obrazovanje: M.Sc. u industrijskom inženjerstvu, Mašinski fakultet Beograd (1993-1999)',
      '👉 Početni istorijat: Jasmin (2002-2004), Centroproizvod (2004-2010), Centro-Štampa (2010-2012)',
      '👉 Konsultantski rad: S-TIM ICT (2012-2022) - UNDP, ministarstva, Carnex, Beohemija',
      '👉 Arhitektura preduzeća: MD&Profy (2015-2022) - SMATSA, SAP AG, ING Bank, AKBank, KKB',
      '👉 Trenutna pozicija: Senior Business Analyst u Magna International (2021-Present)',
      '🟢 Uspešno verifikovan profil Enterprise & Data eksperta!'
    ],
    outputLogEn: [
      '🔍 Initializing search: "Slavisa Milinkovic"',
      '👉 Education: M.Sc. in Industrial Engineering, Faculty of Mechanical Engineering Belgrade (1993-1999)',
      '👉 Early history: Jasmin (2002-2004), Centroproizvod (2004-2010), Centro-Stampa (2010-2012)',
      '👉 Consulting work: S-TIM ICT (2012-2022) - UNDP, ministries, Carnex, Beohemija',
      '👉 Enterprise Architecture: MD&Profy (2015-2022) - SMATSA, SAP AG, ING Bank, AKBank, KKB',
      '👉 Current Position: Senior Business Analyst at Magna International (2021-Present)',
      '🟢 Successfully verified Enterprise & Data expert profile!'
    ]
  },
  {
    id: 2,
    title: 'Analiza integracija i arhitekture podataka',
    titleEn: 'Integration & Data Architecture Analysis',
    status: 'completed',
    actionType: 'click',
    description: 'Duboka analiza SAP, Workday, OneStream i Odoo implementacija.',
    descriptionEn: 'In-depth analysis of SAP, Workday, OneStream, and Odoo implementations.',
    timestamp: '08:12:12',
    outputLog: [
      '🌐 Skeniranje sistema integracija...',
      '📈 Magna: Vođenje Workday i OneStream integracija, SAP ACDOCA i HR ekstrakcija podataka.',
      '💼 MD&Profy: Dizajn data arhitekture za SAP AG, ING Bank, AKBank, KKB i AHB Bank.',
      '🏢 S-TIM ICT: Odoo implementacija kataloga poslova za Ministarstvo državne uprave.',
      '🔗 Arhitektura upravljanja: Primena COBIT, ITIL, ISO 27000 i TOGAF principa.',
      '🟢 Mapirani kompleksni korporativni tokovi podataka.'
    ],
    outputLogEn: [
      '🌐 Scanning system integrations...',
      '📈 Magna: Managing Workday & OneStream integrations, SAP ACDOCA & HR data extraction.',
      '💼 MD&Profy: Designing data architecture for SAP AG, ING Bank, AKBank, KKB, and AHB Bank.',
      '🏢 S-TIM ICT: Odoo job catalog implementation for the Ministry of Public Administration.',
      '🔗 Governance Architecture: Applying COBIT, ITIL, ISO 27000, and TOGAF principles.',
      '🟢 Mapped complex corporate data flows.'
    ]
  },
  {
    id: 3,
    title: 'Evaluacija AI & Machine Learning ekspertize',
    titleEn: 'AI & Machine Learning Expertise Evaluation',
    status: 'completed',
    actionType: 'code',
    description: 'Analiziranje mašinskog učenja i automatizacije u industrijskim sistemima.',
    descriptionEn: 'Analyzing machine learning and automation in industrial systems.',
    timestamp: '08:12:20',
    outputLog: [
      '🤖 Detekcija ML & Data Science modela na Magna i S-TIM ICT projektima...',
      '🛠️ ML modeli u proizvodnji: Primena KNN, Random Forest i neuronskih mreža za optimizaciju.',
      '📈 Predviđanje vremenskih serija: AutoGluon i TimeGPT integracije.',
      '🧠 Fino podešavanje otvorenih modela: Gemma i LLaMA preko PEFT/LoRA i Unsloth.',
      '🐍 Napredna automatizacija: Python (Pandas) za obradu velikih datoteka (20M+ redova po fajlu).',
      '🟢 Generisana karta ekspertize u mašinskom učenju i DWH analitici.'
    ],
    outputLogEn: [
      '🤖 Detecting ML & Data Science models on Magna and S-TIM ICT projects...',
      '🛠️ ML models in production: Applying KNN, Random Forest, and neural networks for optimization.',
      '📈 Time series forecasting: AutoGluon and TimeGPT integrations.',
      '🧠 Fine-tuning open models: Gemma and LLaMA via PEFT/LoRA and Unsloth.',
      '🐍 Advanced automation: Python (Pandas) for processing large datasets (20M+ rows per file).',
      '🟢 Generated expertise map in Machine Learning & DWH analytics.'
    ],
    codeFiles: [
      {
        name: 'ml_pipeline.py',
        language: 'python',
        content: `import pandas as pd\nfrom sklearn.ensemble import RandomForestRegressor\n\ndef optimize_manufacturing_process(data_path):\n    # Učitavanje 20M+ redova podataka iz proizvodnje\n    df = pd.read_csv(data_path)\n    \n    # Izbor ključnih karakteristika (metal forming, welding, temperature)\n    features = ['temp', 'pressure', 'force_kn', 'cycle_time_s']\n    X = df[features]\n    y = df['quality_index']\n    \n    # Random Forest model za predviđanje kvaliteta\n    model = RandomForestRegressor(n_estimators=100, random_state=42)\n    model.fit(X, y)\n    \n    return model.feature_importances_`
      }
    ]
  },
  {
    id: 4,
    title: 'Lansiranje preduzetničkog workspace-a',
    titleEn: 'Launching the Agentic Workspace',
    status: 'running',
    actionType: 'render',
    description: 'Podizanje interaktivnih simulatora za Magna ML, S-TIM ICT DWH i Semantra pretragu.',
    descriptionEn: 'Booting interactive simulators for Magna ML, S-TIM ICT DWH, and Semantra search.',
    timestamp: '08:12:28',
    outputLog: [
      '🎨 Učitavanje moderne tamne teme sa indigo i cijan akcentima...',
      '⚙️ Integracija Magna ML & Enterprise simulatora...',
      '📊 Integracija S-TIM ICT DWH i Odoo analitike...',
      '🔍 Učitavanje Semantra Semantic Search interfejsa i vektorskih indeksa...',
      '🔐 Podizanje bezbednih formi za poruke i feedback...',
      '⏳ Spreman za interakciju i testiranje!'
    ],
    outputLogEn: [
      '🎨 Loading modern dark theme with indigo and cyan accents...',
      '⚙️ Integrating Magna ML & Enterprise simulators...',
      '📊 Integrating S-TIM ICT DWH & Odoo analytics...',
      '🔍 Loading Semantra Semantic Search interface and vector indexes...',
      '🔐 Setting up secure message and feedback forms...',
      '⏳ Ready for interaction and testing!'
    ]
  }
];
