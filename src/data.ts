/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Project, SystemProfile, TimelineStep } from './types';

export const systemProfile: SystemProfile = {
  name: 'Slaviša Milinković',
  email: 'smilinkovic@outlook.com',
  location: 'Beograd, Srbija',
  title: 'Senior Business Analyst, IT Specialist, Data Architect & Enterprise Architect',
  bio: 'Preko 25 godina iskustva u analizi, integraciji i modeliranju Enterprise i Data sistema (ERP, MES, DWH, ML).',
  fullBio: 'Senior poslovni analitičar i IT specijalista sa više od 25 godina iskustva u konfiguraciji, implementaciji i optimizaciji Enterprise aplikativnih rešenja (ERP, MES, DWH). Dokazani ekspert za upravljanje celokupnim životnim ciklusom softvera (SAP, Workday, OneStream, Odoo), od prikupljanja zahteva i API integracija do mentorisanja kros-funkcionalnih timova i vođenja projekata u automobilskoj industriji, bankarstvu i državnoj upravi.',
  skills: [
    {
      category: 'Enterprise Systems & ERP',
      list: ['SAP', 'Workday', 'OneStream', 'Odoo ERP', 'WMS', 'Legacy Systems Decommissioning']
    },
    {
      category: 'Data Engineering & Databases',
      list: ['Data Architecture', 'DWH Architecture', 'Databricks (PySpark)', 'Data Vault 2.0', 'Star Schema & Snowflake Schema', 'Python', 'Advanced SQL', 'Oracle', 'PostgreSQL', 'MS SQL Server', 'Azure Synapse', 'ETL Pipelines', 'Talend', 'SSIS / Kettle']
    },
    {
      category: 'AI, Machine Learning & LLMs',
      list: ['Time Series Forecasting', 'AutoGluon / TimeGPT', 'Model Fine-Tuning (Gemma, LLaMA)', 'Autonomous AI Agents', 'CrewAI / LangChain', 'ML Algorithms (KNN, Random Forest, Neural Networks)']
    },
    {
      category: 'Project & Architecture Governance',
      list: ['Enterprise Architecture', 'Jira & Confluence', 'UML Modeling', 'Domain Driven Design (DDD)', 'COBIT', 'ITIL', 'ISO 27000', 'Agile / Scrum / Kanban']
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
    description: 'Dizajn arhitekture podataka, DWH integracije (Databricks, Azure Synapse), Workday i OneStream platforme, te ML modeli u proizvodnji.',
    longDescription: 'Na poziciji Senior poslovnog analitičara u kompaniji Magna vodim analizu poslovnih potreba za kompleksna softverska rešenja. Dizajniram strategije integracije podataka i data warehousing (implementacija Databricks i Azure Synapse okruženja, modeliranje Star Schema prezentacionih struktura), vodim integracije platformi Workday i OneStream, i pružam naprednu tehničku podršku za SAP ekstrakciju podataka. Takođe podržavam ML projekte u proizvodnji, implementirajući algoritme (KNN, Random Forest, neuronske mreže) na Databricks klasterima radi optimizacije industrijskih procesa.',
    techStack: ['DWH', 'Databricks (PySpark)', 'Star Schema', 'Workday', 'OneStream', 'SAP Data Extraction', 'Python', 'Azure Synapse', 'Random Forest', 'Neural Networks', 'ETL Pipelines'],
    metrics: [
      { label: 'Integrisani sistemi', value: 'Workday & OneStream', icon: 'Settings' },
      { label: 'Analiza podataka', value: 'Databricks DWH', icon: 'Database' },
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
    description: 'Upravljanje IT transformacijama, EA arhitektura i planiranje za SMATSA-u, dizajn DWH rešenja (Star Schema, Data Vault, Snowflake Schema) i Odoo ERP.',
    longDescription: 'Kao IT konsultant i arhitekt preduzeća, vodio sam end-to-end IT transformacije, projektovao sisteme za planiranje i budžetiranje, te dizajnirao moderne analitičke platforme. Za SMATSA-u sam vodio projekat arhitekture preduzeća (EA) i projektovao sisteme za planiranje i budžetiranje uz reverzni inženjering nasleđenih procesa. Projektovao sam DWH sisteme koristeći dimenzionalno modeliranje (Star Schema, Snowflake Schema) i napredne metodologije poput Data Vault 2.0 (Hub-ovi, Linkovi, Sateliti) za robustnu integraciju podataka kod drugih enterprise klijenata. Pružao sam strateško savetovanje (UNDP, Beohemija, Carnex, poreska policija) i vodio implementaciju Odoo ERP platforme.',
    techStack: ['Enterprise Architecture', 'Planning & Budgeting', 'DWH', 'Star Schema', 'Data Vault 2.0', 'Snowflake Schema', 'Databricks (PySpark)', 'Python', 'Odoo ERP', 'UML Modeling', 'PostgreSQL / Oracle', 'Talend / SSIS', 'COBIT / ITIL', 'ISO 27000'],
    metrics: [
      { label: 'DWH modeliranje', value: 'Star Schema & Data Vault', icon: 'Database' },
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
      '📈 Magna: Vođenje Workday i OneStream integracija, te SAP ekstrakcija podataka.',
      '💼 MD&Profy: Dizajn data arhitekture za SAP AG, ING Bank, AKBank, KKB i AHB Bank.',
      '🏢 S-TIM ICT: Odoo implementacija kataloga poslova za Ministarstvo državne uprave.',
      '🔗 Arhitektura upravljanja: Primena COBIT, ITIL, ISO 27000 i TOGAF principa.',
      '🟢 Mapirani kompleksni korporativni tokovi podataka.'
    ],
    outputLogEn: [
      '🌐 Scanning system integrations...',
      '📈 Magna: Managing Workday & OneStream integrations, and SAP data extraction.',
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
      '🐍 Napredna automatizacija: Databricks i PySpark za obradu velikih datoteka (20M+ redova po fajlu).',
      '🟢 Generisana karta ekspertize u mašinskom učenju i DWH analitici.'
    ],
    outputLogEn: [
      '🤖 Detecting ML & Data Science models on Magna and S-TIM ICT projects...',
      '🛠️ ML models in production: Applying KNN, Random Forest, and neural networks for optimization.',
      '📈 Time series forecasting: AutoGluon and TimeGPT integrations.',
      '🧠 Fine-tuning open models: Gemma and LLaMA via PEFT/LoRA and Unsloth.',
      '🐍 Advanced automation: Databricks and PySpark for processing large datasets (20M+ rows per file).',
      '🟢 Generated expertise map in Machine Learning & DWH analytics.'
    ],
    codeFiles: [
      {
        name: 'ml_pipeline_pyspark.py',
        language: 'python',
        content: `from pyspark.sql import SparkSession\nfrom pyspark.ml.regression import RandomForestRegressor\nfrom pyspark.ml.feature import VectorAssembler\n\ndef optimize_manufacturing_process(data_path):\n    # Inicijalizacija Spark/Databricks sesije za obradu 20M+ redova\n    spark = SparkSession.builder.appName("MagnaMLOptimization").getOrCreate()\n    df = spark.read.csv(data_path, header=True, inferSchema=True)\n    \n    # Izbor ključnih karakteristika (temperatura, pritisak, sila, ciklus)\n    feature_cols = ['temp', 'pressure', 'force_kn', 'cycle_time_s']\n    assembler = VectorAssembler(inputCols=feature_cols, outputCol="features")\n    df_assembled = assembler.transform(df)\n    \n    # Random Forest model na Databricks klasteru\n    rf = RandomForestRegressor(featuresCol="features", labelCol="quality_index", numTrees=100)\n    model = rf.fit(df_assembled)\n    \n    return model.featureImportances`
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
