/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  FileText, 
  Sliders, 
  Cpu, 
  Sparkles, 
  Target, 
  ExternalLink,
  ChevronRight,
  BookOpen,
  CheckCircle,
  Hash,
  Share2
} from 'lucide-react';
import { motion } from 'motion/react';

interface SemantraWidgetProps {
  language: 'sr' | 'en';
}

interface DocumentChunk {
  id: string;
  page: number;
  paragraph: number;
  textSr: string;
  textEn: string;
}

interface SearchResult {
  chunk: DocumentChunk;
  score: number;
}

export default function SemantraWidget({ language }: SemantraWidgetProps) {
  const [selectedDocId, setSelectedDocId] = useState<'ea_standard' | 'dwh_architecture' | 'automotive_ml' | 'fine_tuning'>('dwh_architecture');
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [activeHighlightId, setActiveHighlightId] = useState<string | null>(null);
  const [similarityThreshold, setSimilarityThreshold] = useState<number>(0.35);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedModel, setSelectedModel] = useState('bge-large-en-v1.5');
  const [showVectorSpace, setShowVectorSpace] = useState(true);

  const chunkRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const documents = {
    ea_standard: {
      titleSr: 'Standardi Arhitekture Preduzeća i Planiranje (SMATSA EA)',
      titleEn: 'Enterprise Architecture & Planning Standards (SMATSA)',
      author: 'Slaviša Milinković',
      date: '2018',
      chunks: [
        {
          id: 'ea-1',
          page: 1,
          paragraph: 1,
          textSr: 'Sistem kontrole letenja SMATSA zahteva apsolutnu redundansu i usklađenost sa COBIT i ITIL okvirima upravljanja. Implementacija sistema za planiranje i budžetiranje mora integrisati preko 40 kros-funkcionalnih tabela iz nasleđenih Oracle baza podataka.',
          textEn: 'The SMATSA air traffic control system requires absolute redundancy and strict compliance with COBIT and ITIL governance frameworks. Implementing planning and budgeting systems must integrate over 40 cross-functional tables from legacy Oracle databases.'
        },
        {
          id: 'ea-2',
          page: 1,
          paragraph: 2,
          textSr: 'Prilikom reverznog inženjeringa nasleđenih input tokova, uočen je nedostatak referencijalnog integriteta u starim tabelama nabavke. U okviru EA projekta sproveden je detaljan reverzni inženjering sa fokusom na mapiranje i konsolidaciju tokova podataka za planiranje nabavke i finansija.',
          textEn: 'During reverse engineering of legacy input streams, a severe lack of referential integrity was detected in legacy procurement tables. The EA project focused on mapping and consolidating data flows for procurement and financial planning.'
        },
        {
          id: 'ea-3',
          page: 2,
          paragraph: 1,
          textSr: 'Sistem za planiranje i budžetiranje je modeliran na principima kros-funkcionalne integracije, gde su organizacione jedinice, vazdušni sektori i klase troškova povezani sa projektovanim planovima rashoda, omogućavajući napredne simulacije i analize scenarija.',
          textEn: 'The planning and budgeting system is modeled on principles of cross-functional integration, linking organizational units, airspace sectors, and expense classes with projected expenditure plans to enable advanced simulations and scenario analysis.'
        },
        {
          id: 'ea-4',
          page: 2,
          paragraph: 2,
          textSr: 'Uvođenjem Odoo ERP rešenja za javni sektor, moduli kataloga poslova su mapirani u standardizovane UML dijagrame slučajeva upotrebe. Domain-Driven Design (DDD) pristup sprečio je kolizije šema podataka između finansijskog i kadrovskog podsistema.',
          textEn: 'Deploying Odoo ERP solutions for public administration required mapping job catalog modules into standardized UML Use Case diagrams. The Domain-Driven Design (DDD) paradigm successfully avoided schema conflicts between financial and HR subsystems.'
        }
      ]
    },
    dwh_architecture: {
      titleSr: 'Projektovanje DWH arhitekture: Star Schema, Snowflake Schema i Data Vault 2.0',
      titleEn: 'DWH Architecture Design: Star Schema, Snowflake Schema, and Data Vault 2.0',
      author: 'Slaviša Milinković',
      date: '2024',
      chunks: [
        {
          id: 'dwh-1',
          page: 1,
          paragraph: 1,
          textSr: 'U modernim analitičkim sistemima, izgradnja skalabilnog skladišta podataka (DWH) zahteva jasan i modularan dizajn. Implementacija cloud DWH arhitekture nudi neograničenu skalabilnost, dok se na nivou modeliranja podataka primenjuje Star Schema za prezentacioni sloj i Data Vault 2.0 za sloj sirovih integracija.',
          textEn: 'In modern analytical systems, building a scalable data warehouse (DWH) requires a clear and modular design. Deploying a cloud-based DWH architecture offers unlimited scalability, while Star Schema modeling is applied for the presentation layer and Data Vault 2.0 is used for the raw integration layer.'
        },
        {
          id: 'dwh-2',
          page: 1,
          paragraph: 2,
          textSr: 'Primenom Data Vault 2.0 metodologije, podaci se razdvajaju na Hub-ove (poslovne entitete), Linkove (relacije između njih) i Satelite (opisne atribute sa istorijom promena). Ovakav pristup omogućava paralelno učitavanje podataka bez kompleksnih zavisnosti o stranim ključevima.',
          textEn: 'Applying Data Vault 2.0 methodology splits data into Hubs (core business concepts), Links (relationships between them), and Satellites (descriptive attributes with historical tracking). This paradigm enables massive parallel data loading without strict foreign key constraints.'
        },
        {
          id: 'dwh-3',
          page: 2,
          paragraph: 1,
          textSr: 'Za potrebe biznis analitike i izveštavanja (BI), podaci iz Data Vault sloja se transformišu i agregiraju u dimenzionalne modele. Star Schema i Snowflake Schema se koriste za kreiranje tabela činjenica (Fact) i dimenzionih tabela (Dimension), obezbeđujući maksimalne performanse upita.',
          textEn: 'For business intelligence (BI) and reporting, data from the Data Vault layer is transformed and aggregated into dimensional models. Star Schema and Snowflake Schema structures are utilized to construct Fact and Dimension tables, ensuring peak query performance.'
        },
        {
          id: 'dwh-4',
          page: 2,
          paragraph: 2,
          textSr: 'Integracija različitih izvora (ERP, CRM, eksterni API-ji) u DWH skladište olakšava cross-system analitiku. Virtuelni računarski resursi u modernim DWH platformama se dinamički skaliraju, odvajajući ETL procese od korisničkih upita i eliminišući konkurenciju za resurse.',
          textEn: 'Integrating diverse data sources (ERP, CRM, external APIs) into the DWH warehouse facilitates seamless cross-system analytics. Virtual computing resources in modern DWH platforms scale dynamically, segregating ETL processing workloads from user queries and eliminating resource contention.'
        }
      ]
    },
    automotive_ml: {
      titleSr: 'Prediktivno Mašinsko Učenje u Proizvodnji (Magna)',
      titleEn: 'Predictive Machine Learning in Stamping Lines (Magna)',
      author: 'Slaviša Milinković',
      date: '2023',
      chunks: [
        {
          id: 'ml-1',
          page: 1,
          paragraph: 1,
          textSr: 'U Magna International pogonima hladnog oblikovanja čelika, mehanički stres i pregrevanje presa izazivaju neplanirane zastoje. Algoritmi Random Forest i k-Nearest Neighbors (KNN) se treniraju na vremenskim serijama senzora temperature, pritiska i sile tonaže.',
          textEn: 'In Magna International cold-forming facilities, mechanical stress and overheating of industrial stamping presses cause unplanned shutdowns. Random Forest and k-Nearest Neighbors (KNN) algorithms are trained on sensor time-series of temperature, force, and press tonnage.'
        },
        {
          id: 'ml-2',
          page: 1,
          paragraph: 2,
          textSr: 'Model predviđanja koristi klizne prozore od 50 milisekundi za detektovanje mikroskopskih anomalija u sili pritiska. Kada model predvidi anomaliju mehaničkog stresa sa pouzdanošću većom od 88%, sistem automatski aktivira override za promenu tonaže i ubrizgavanje lubrikacije.',
          textEn: 'The predictive model utilizes 50ms sliding windows to capture microscopic pressure variations. When mechanical stress anomalies are predicted with confidence above 88%, the controller triggers an override to alter press tonnage and engage dynamic lubrication.'
        },
        {
          id: 'ml-3',
          page: 2,
          paragraph: 1,
          textSr: 'Implementacija u Azure Synapse i Databricks okruženju omogućava analizu velikih količina istorijskih podataka iz senzora. PySpark se koristi za obradu sirovih strimova sa proizvodnih traka i agregaciju ključnih indikatora efikasnosti (OEE) na nivou cele fabrike.',
          textEn: 'Implementation in Azure Synapse and Databricks workspaces supports analytics on historical sensor data. PySpark handles raw high-frequency telemetry streams from assembly lines to aggregate Overall Equipment Effectiveness (OEE) at the factory level.'
        },
        {
          id: 'ml-4',
          page: 2,
          paragraph: 2,
          textSr: 'Rezultati pokazuju smanjenje stope škarta za 14.5% i produženje životnog veka alata prese za 22%. Integracija sa OneStream i Workday platformama obezbeđuje da se tehnički podaci o zastojima odmah prebace u finansijske izveštaje o operativnim troškovima.',
          textEn: 'Results demonstrate a 14.5% reduction in scrap rates and a 22% extension in stamping die lifetime. Integrating operational telemetry with OneStream and Workday dashboards ensures downtime impacts are compiled into financial forecasts of operational costs.'
        }
      ]
    },
    fine_tuning: {
      titleSr: 'Fino Podešavanje LLM Modela za Poslovnu Analitiku',
      titleEn: 'Fine-Tuning Open Source LLMs for Business Intelligence',
      author: 'Slaviša Milinković',
      date: '2025',
      chunks: [
        {
          id: 'ft-1',
          page: 1,
          paragraph: 1,
          textSr: 'Fino podešavanje velikih jezičkih modela (LLM) kao što su Gemma-2b i LLaMA-3-8b omogućava automatizaciju analize poslovnih zahteva. Korišćenjem PEFT/LoRA metoda smanjuje se broj parametara koji se treniraju za 99%, čuvajući hardverske resurse.',
          textEn: 'Fine-tuning large language models (LLMs) like Gemma-2b and LLaMA-3-8b automates complex business requirements compilation. Applying PEFT/LoRA adapters reduces trainable parameters by 99%, conserving memory while adapting the model to corporate jargon.'
        },
        {
          id: 'ft-2',
          page: 1,
          paragraph: 2,
          textSr: 'Biblioteka Unsloth se koristi za optimizaciju brzine treninga i uštedu VRAM memorije na lokalnim grafičkim karticama. Kroz proces finog podešavanja, modeli uče da interpretiraju UML specifikacije, COBIT matrice kontrole i pišu precizne SQL upite za kompleksne ERP baze.',
          textEn: 'The Unsloth library is employed to optimize GPU training speed and decrease VRAM footprint. Through tailored fine-tuning, the models learn to interpret UML diagrams, COBIT compliance matrices, and output validated SQL queries for complex ERP structures.'
        },
        {
          id: 'ft-3',
          page: 2,
          paragraph: 1,
          textSr: 'Uvođenjem autonomnih AI agenata kroz CrewAI i LangChain okvire, formira se kros-funkcionalni tim virtuelnih analitičara. Agent za ekstrakciju analizira e-mail komunikaciju, dok agent arhitekta automatski projektuje relacione šeme i API integracije.',
          textEn: 'Structuring autonomous AI agents with CrewAI and LangChain frameworks builds a virtual cross-functional squad of analysts. An extractor agent parses email requirements while an architect agent automatically outlines relational databases and API routing.'
        },
        {
          id: 'ft-4',
          page: 2,
          paragraph: 2,
          textSr: 'Vektorske baze podataka (ChromaDB, PGVector) su esencijalne za RAG sisteme koji snabdevaju agente ažurnim dokumentima. Semantička pretraga eliminira potrebu za klasičnim pretraživanjem ključnih reči, prepoznajući kontekstualni smisao rečenica bez obzira na sinonime.',
          textEn: 'Vector databases (ChromaDB, PGVector) serve as the foundation of RAG systems supplying agents with current files. Semantic search bypasses brittle keyword queries, identifying contextual meaning across paragraphs regardless of vocabulary differences.'
        }
      ]
    }
  };

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setIsSearching(true);

    // Function to normalize Serbian letters to standard Latin
    const normalize = (str: string) => {
      return str
        .toLowerCase()
        .replace(/š/g, 's')
        .replace(/đ/g, 'd')
        .replace(/č/g, 'c')
        .replace(/ć/g, 'c')
        .replace(/ž/g, 'z');
    };

    // Simulate vector embedding generation delay
    setTimeout(() => {
      const activeDoc = documents[selectedDocId];
      const normalizedQuery = normalize(searchQuery);
      
      // Split into query words (terms) supporting 2-letter queries (e.g. ea, ml, db, sap)
      const queryTerms = normalizedQuery
        .split(/[\s,\.\-\/\(\)]+/)
        .filter(t => t.length >= 2);

      const searchScores = activeDoc.chunks.map(chunk => {
        const text = language === 'sr' ? chunk.textSr : chunk.textEn;
        const textNorm = normalize(text);
        
        // Dynamic semantic-like heuristics
        let score = 0;
        
        // 1. Direct Term Match
        if (queryTerms.length > 0) {
          queryTerms.forEach(term => {
            if (textNorm.includes(term)) {
              score += 0.45;
              const termOccurrences = textNorm.split(term).length - 1;
              score += termOccurrences * 0.15;
            } else if (term.length >= 4) {
              // Slavic language stemmer fallback (remove typical case endings)
              const stem = term.substring(0, Math.max(3, term.length - 2));
              if (textNorm.includes(stem)) {
                score += 0.30; // Solid partial match
              }
            }
          });
        }

        // 2. Mapped Semantic Synonyms for high-fidelity simulation
        const synonyms: { [key: string]: string[] } = {
          smatsa: ['letenje', 'kontrole', 'vazdušni', 'saobraćaj', 'budget', 'budžet', 'planning', 'budgeting', 'planiranje'],
          dwh: ['skladište', 'analitika', 'dimenzije', 'baze', 'database', 'warehouse', 'star', 'shema', 'transakcionih', 'vault', 'star schema', 'hubs', 'links', 'satellites'],
          schema: ['snowflake schema', 'star schema', 'dimenzionalni', 'database', 'warehouse', 'dwh', 'modeling', 'modeliranje'],
          vault: ['data vault', 'hub', 'link', 'satelit', 'hubs', 'links', 'satellites', 'paralelno', 'parallel', 'loading', 'učitanje'],
          star: ['star schema', 'dimenzionalni', 'facts', 'dimensions', 'činjenica', 'dimenzije', 'normalizuju', 'bi', 'upita', 'query'],
          magna: ['pogon', 'fabrika', 'automobilskoj', 'press', 'presa', 'tonage', 'scraps', 'proizvodnji', 'stamping', 'automotive'],
          ml: ['sensor', 'senzor', 'random', 'forest', 'knn', 'anomalija', 'učenje', 'machine', 'learning', 'databricks', 'synapse'],
          gemma: ['llm', 'llama', 'fino', 'podešavanje', 'tuning', 'unsloth', 'peft', 'lora', 'training', 'gpu'],
          agent: ['crewai', 'langchain', 'autonomnih', 'virtuelnih', 'analitičara', 'squad']
        };

        Object.keys(synonyms).forEach(key => {
          if (normalizedQuery.includes(key)) {
            synonyms[key].forEach(syn => {
              if (textNorm.includes(normalize(syn))) {
                score += 0.25;
              }
            });
          }
        });

        // Normalize score between 0 and 1
        const finalScore = score === 0 
          ? 0.05 + Math.random() * 0.08 // tiny background similarity
          : Math.min(0.98, 0.25 + score / (Math.max(1, queryTerms.length) + 0.5) + (Math.random() * 0.05));

        return {
          chunk,
          score: parseFloat(finalScore.toFixed(3))
        };
      });

      // Filter by similarity threshold
      let filteredResults = searchScores
        .filter(res => res.score >= similarityThreshold)
        .sort((a, b) => b.score - a.score);

      // Fallback: If no results pass the current threshold but there are matches with > 0.15 score,
      // let's show them anyway and automatically lower the visual threshold/state to match them,
      // so the search doesn't appear empty or broken!
      if (filteredResults.length === 0) {
        const potentialMatches = searchScores
          .filter(res => res.score > 0.15)
          .sort((a, b) => b.score - a.score);
        
        if (potentialMatches.length > 0) {
          filteredResults = potentialMatches;
          // Set the threshold state to the lowest score of returned results to keep UI in sync
          const lowestScore = potentialMatches[potentialMatches.length - 1].score;
          setSimilarityThreshold(Math.max(0.1, parseFloat((lowestScore - 0.02).toFixed(2))));
        }
      }

      setResults(filteredResults);
      setIsSearching(false);

      if (filteredResults.length > 0) {
        // Automatically highlight the top matching chunk
        setActiveHighlightId(filteredResults[0].chunk.id);
        scrollToChunk(filteredResults[0].chunk.id);
      } else {
        setActiveHighlightId(null);
      }
    }, 600);
  };

  const scrollToChunk = (id: string) => {
    const el = chunkRefs.current[id];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleResultClick = (id: string) => {
    setActiveHighlightId(id);
    scrollToChunk(id);
  };

  const getSuggestedQueries = () => {
    switch (selectedDocId) {
      case 'ea_standard':
        return language === 'sr' 
          ? ['SMATSA kontrola letenja', 'Sistem planiranja i budžetiranja', 'Odoo ERP implementacija i UML']
          : ['SMATSA air traffic control', 'Planning and budgeting system', 'Odoo ERP deployment & UML'];
      case 'dwh_architecture':
        return language === 'sr'
          ? ['DWH arhitektura i dizajn', 'Data Vault 2.0 Hub i Sateliti', 'Star Schema i dimenzionalno modeliranje']
          : ['DWH architecture & design', 'Data Vault 2.0 Hubs and Satellites', 'Star Schema & dimensional modeling'];
      case 'automotive_ml':
        return language === 'sr'
          ? ['Pregrevanje presa u Magni', 'Sila pritiska i tonaža presa', 'OneStream i Workday integracija']
          : ['Overheating of presses in Magna', 'Press applied force and tonnage', 'OneStream & Workday integration'];
      case 'fine_tuning':
        return language === 'sr'
          ? ['Fino podešavanje Gemma i LLaMA', 'Unsloth ušteda VRAM memorije', 'CrewAI i LangChain agenti']
          : ['Fine-tuning Gemma & LLaMA', 'Unsloth VRAM optimization', 'CrewAI and LangChain agents'];
      default:
        return [];
    }
  };

  // Reset search when document changes
  useEffect(() => {
    setSearchQuery('');
    setResults([]);
    setActiveHighlightId(null);
  }, [selectedDocId]);

  const activeDoc = documents[selectedDocId];

  return (
    <div className="space-y-6 max-w-4xl mx-auto font-sans">
      {/* Introduction Context Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-[#10b981]/5 to-transparent border border-[#10b981]/15 shadow-2xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <Search className="w-6 h-6 animate-pulse" />
            </span>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight font-sans">
                Semantra Multi-Model Semantic Search Engine
              </h2>
              <p className="text-xs text-emerald-400 font-mono font-semibold uppercase tracking-wider flex items-center gap-1.5">
                <span>GITHUB OPEN SOURCE PROJECT BY GSLAVISAM</span>
                <span className="w-1 h-1 rounded-full bg-emerald-400"></span>
                <span>FORK & CONTRIBUTIONS</span>
              </p>
            </div>
          </div>
          <a 
            href="https://github.com/gslavisam/semantra" 
            target="_blank" 
            referrerPolicy="no-referrer"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-xs text-gray-400 hover:text-white transition-colors"
          >
            <span>GitHub Repo</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
        <p className="text-sm text-gray-300 font-sans leading-relaxed">
          {language === 'sr'
            ? 'Semantra je open-source CLI i Web alat za lokalnu semantičku pretragu dokumenata (PDF, TXT, HTML) bez slanja privatnih podataka na spoljne servere. Koristi najmodernije embeding modele. U ovom interaktivnom simulatoru možete iskusiti Semantra web interfejs nad Slavišinim realnim projektnim dokumentima.'
            : 'Semantra is a high-speed open-source CLI & Web-GUI tool for offline semantic document search (PDF, TXT, HTML), ensuring strict data privacy by keeping embeddings localized. This live dashboard simulates Semantra’s actual web application running search queries over Slavisa’s enterprise document database.'}
        </p>
      </div>

      {/* Main Interactive Work Area */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-[#080808]/50 p-5 rounded-2xl border border-white/5 shadow-lg relative overflow-hidden">
        
        {/* Document Viewer (7 columns) */}
        <div className="md:col-span-7 space-y-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold font-mono tracking-wider text-emerald-400 uppercase">
                {language === 'sr' ? 'DOKUMENT ČITAČ' : 'DOCUMENT CORPUS READER'}
              </span>
            </div>
            {/* Document Selector */}
            <select
              value={selectedDocId}
              onChange={(e) => setSelectedDocId(e.target.value as any)}
              id="semantra-doc-select"
              className="px-3 py-1 bg-black border border-white/5 rounded-lg text-xs font-sans text-gray-300 focus:outline-none focus:border-emerald-500 transition-colors"
            >
              <option value="dwh_architecture">📂 DWH & Data Vault 2.0</option>
              <option value="ea_standard">📂 SMATSA Enterprise Arh.</option>
              <option value="automotive_ml">📂 Magna ML Production</option>
              <option value="fine_tuning">📂 LLM Fine-Tuning Spec.</option>
            </select>
          </div>

          {/* Rendered Document Container */}
          <div className="bg-[#030303] border border-white/5 rounded-xl p-4 h-[340px] overflow-y-auto space-y-4 relative scrollbar-thin select-text">
            <div className="sticky top-0 z-10 -mx-4 -mt-4 px-4 py-3 bg-[#030303] border-b border-white/5 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-white font-sans truncate max-w-[280px]">
                  {language === 'sr' ? activeDoc.titleSr : activeDoc.titleEn}
                </h4>
                <p className="text-[9px] text-gray-500 font-mono">
                  SME: {activeDoc.author} • {activeDoc.date}
                </p>
              </div>
              <span className="text-[9px] font-mono font-bold text-gray-400 bg-white/5 border border-white/5 px-2 py-0.5 rounded">
                PDF Document
              </span>
            </div>

            {activeDoc.chunks.map((chunk) => {
              const isHighlighted = activeHighlightId === chunk.id;
              const hasInResults = results.some(r => r.chunk.id === chunk.id);
              const rankInResults = results.findIndex(r => r.chunk.id === chunk.id);

              return (
                <div
                  key={chunk.id}
                  ref={(el) => (chunkRefs.current[chunk.id] = el)}
                  onClick={() => handleResultClick(chunk.id)}
                  className={`p-3 rounded-lg border text-xs font-sans leading-relaxed transition-all duration-300 relative group cursor-pointer ${
                    isHighlighted
                      ? 'bg-emerald-500/10 border-emerald-400/50 shadow-[0_0_15px_rgba(16,185,129,0.15)] ring-1 ring-emerald-400/35'
                      : hasInResults
                      ? 'bg-emerald-500/5 border-emerald-500/20 text-gray-200'
                      : 'bg-black/20 border-white/5 text-gray-400 hover:text-gray-300'
                  }`}
                >
                  {/* Page index indicator */}
                  <span className="absolute -left-2 top-2 w-4 h-4 bg-black border border-white/5 rounded-full text-[8px] font-mono font-bold flex items-center justify-center text-gray-500 group-hover:text-emerald-400 transition-colors">
                    {chunk.page}
                  </span>

                  {/* Similarity Rank Badge */}
                  {hasInResults && (
                    <span className="absolute right-2 top-2 px-1.5 py-0.5 rounded bg-emerald-500/10 text-[8px] font-mono font-extrabold text-emerald-400 border border-emerald-500/20">
                      RANK #{rankInResults + 1}
                    </span>
                  )}

                  <p className="pl-3">
                    {language === 'sr' ? chunk.textSr : chunk.textEn}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Help hint */}
          <div className="flex items-center gap-1.5 text-[10px] text-gray-500 font-mono">
            <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
            <span>{language === 'sr' ? '💡 Kliknite na bilo koji pasus za fokusiranje i pregled koordinata.' : '💡 Click any paragraph to center-focus in the document space.'}</span>
          </div>
        </div>

        {/* Semantic Query & Vector Controller (5 columns) */}
        <div className="md:col-span-5 space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold font-mono tracking-wider text-emerald-400 uppercase">
              {language === 'sr' ? 'SEMANTIČKI UPITNIK' : 'VECTOR SEMANTIC QUERY'}
            </h3>
          </div>

          {/* Search form */}
          <form onSubmit={handleSearch} className="space-y-3">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={language === 'sr' ? 'Pretražuj smisao rečenica...' : 'Ask something conceptual...'}
                className="w-full bg-black border border-white/5 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-sans"
              />
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
            </div>

            {/* Suggested Queries */}
            <div className="space-y-1.5">
              <span className="text-[9px] font-mono text-gray-500 uppercase tracking-wider block">
                {language === 'sr' ? 'Predloženi konceptualni upiti:' : 'Suggested Contextual Queries:'}
              </span>
              <div className="flex flex-col gap-1">
                {getSuggestedQueries().map((q, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setSearchQuery(q);
                      // Trigger search immediately
                      setTimeout(() => {
                        const btn = document.getElementById('semantra-search-submit');
                        if (btn) btn.click();
                      }, 50);
                    }}
                    className="text-[10px] text-left px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-emerald-500/10 hover:text-emerald-400 transition-all text-gray-400 border border-white/5 font-sans cursor-pointer truncate"
                  >
                    🔍 {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Slider and Model configurations */}
            <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-2.5">
              <div className="flex items-center justify-between text-[10px] font-mono text-gray-400">
                <span className="flex items-center gap-1">
                  <Sliders className="w-3 h-3 text-emerald-400" />
                  {language === 'sr' ? 'Sličnost praga' : 'Cosine Threshold'}
                </span>
                <span className="text-emerald-400 font-bold">{similarityThreshold}</span>
              </div>
              <input
                type="range"
                min="0.10"
                max="0.60"
                step="0.05"
                value={similarityThreshold}
                onChange={(e) => setSimilarityThreshold(parseFloat(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer h-1 rounded bg-white/5"
              />

              <div className="flex items-center justify-between text-[10px] font-mono text-gray-400 pt-1.5 border-t border-white/5">
                <span>Embedding Model</span>
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  className="bg-black border border-white/5 text-[9px] text-gray-300 font-mono rounded px-1 py-0.5 focus:outline-none focus:border-emerald-500"
                >
                  <option value="bge-large-en-v1.5">BGE-Large-EN (Local)</option>
                  <option value="all-MiniLM-L6-v2">MiniLM-L6 (Local)</option>
                  <option value="text-embedding-3-small">OpenAI text-3 (Cloud)</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              id="semantra-search-submit"
              disabled={isSearching || !searchQuery.trim()}
              className="w-full py-2 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 text-black font-sans text-xs font-bold flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(16,185,129,0.3)] active:scale-[0.98] transition-all disabled:pointer-events-none cursor-pointer rounded-xl"
            >
              <Cpu className="w-4 h-4 text-black animate-spin-slow" />
              <span>{isSearching ? (language === 'sr' ? 'Kalkulacija Vektora...' : 'Computing Query Embeddings...') : (language === 'sr' ? 'Pokreni semantičku pretragu' : 'Run Semantic Search')}</span>
            </button>
          </form>

          {/* Results Output Screen */}
          <div className="flex-1 min-h-[140px] max-h-[220px] bg-[#030303] border border-white/5 p-3 rounded-xl flex flex-col justify-between overflow-y-auto scrollbar-thin">
            {results.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center text-gray-500 py-3 space-y-1">
                <Target className="w-6 h-6 text-emerald-500/40 animate-pulse" />
                <span className="text-[10px] font-mono">
                  {isSearching 
                    ? (language === 'sr' ? 'Generisanje upita u n-dimenzionalnom prostoru...' : 'Aligning query into hyperdimensional vector space...')
                    : (language === 'sr' ? 'Čekanje semantičkog upita' : 'Waiting for semantic coordinates')}
                </span>
              </div>
            ) : (
              <div className="space-y-1.5 w-full">
                <div className="flex items-center justify-between pb-1.5 border-b border-white/5 text-[9px] font-mono text-gray-500 uppercase tracking-widest">
                  <span>{results.length} {language === 'sr' ? 'kontekstualnih pogodaka' : 'contextual matches'}</span>
                  <span>Cosine Similarity</span>
                </div>
                {results.map((res, index) => {
                  const isHighlighted = activeHighlightId === res.chunk.id;
                  return (
                    <div
                      key={res.chunk.id}
                      onClick={() => handleResultClick(res.chunk.id)}
                      className={`flex items-center justify-between px-2.5 py-1.5 rounded bg-black/40 border text-[10px] cursor-pointer transition-all ${
                        isHighlighted 
                          ? 'border-emerald-500 text-emerald-400 bg-emerald-500/5' 
                          : 'border-white/5 text-gray-400 hover:border-emerald-500/20'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 truncate pr-2">
                        <span className="w-4 h-4 rounded-full bg-white/5 flex items-center justify-center font-mono text-[8px] font-bold text-emerald-400">
                          {index + 1}
                        </span>
                        <span className="font-sans truncate">
                          P.{res.chunk.page}, S.{res.chunk.paragraph} - "{language === 'sr' ? res.chunk.textSr : res.chunk.textEn}"
                        </span>
                      </div>
                      <span className="font-mono font-bold text-emerald-400">
                        {res.score.toFixed(3)}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Vector Space Representation Graphic */}
      {showVectorSpace && (
        <div className="p-4 rounded-xl bg-gradient-to-r from-[#10b981]/5 to-transparent border border-white/5 space-y-3 shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-emerald-400">
                {language === 'sr' ? 'Vizuelni prikaz n-dimenzionalnog vektorskog prostora' : 'N-Dimensional Vector Embedding Projection'}
              </h4>
            </div>
            <span className="text-[9px] font-mono text-gray-500">t-SNE Dimensionality Reduction</span>
          </div>

          <div className="h-28 bg-[#030303] rounded-lg border border-white/5 relative overflow-hidden flex items-center justify-center select-none">
            {/* Grid constellation dots */}
            <div className="absolute inset-0 grid grid-cols-6 grid-rows-3 opacity-20 pointer-events-none">
              {Array.from({ length: 18 }).map((_, i) => (
                <div key={i} className="border border-dashed border-white/10"></div>
              ))}
            </div>

            {/* Core cluster nodes representing our documents */}
            {/* EA Standard cluster */}
            <div className="absolute left-[15%] top-1/3 text-center">
              <span className="w-2 h-2 rounded-full bg-indigo-500 inline-block shadow-[0_0_8px_rgba(99,102,241,0.6)]"></span>
              <span className="text-[8px] font-mono text-gray-500 block">SMATSA EA</span>
            </div>

            {/* Data Vault DWH cluster */}
            <div className="absolute left-[38%] top-[22%] text-center">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block shadow-[0_0_8px_rgba(16,185,129,0.6)]"></span>
              <span className="text-[8px] font-mono text-gray-500 block">Data Vault DWH</span>
            </div>

            {/* Automotive ML cluster */}
            <div className="absolute left-[62%] top-2/3 text-center">
              <span className="w-2 h-2 rounded-full bg-cyan-400 inline-block shadow-[0_0_8px_rgba(34,211,238,0.6)]"></span>
              <span className="text-[8px] font-mono text-gray-500 block">Magna ML</span>
            </div>

            {/* LLM Fine tuning cluster */}
            <div className="absolute left-[85%] top-1/3 text-center">
              <span className="w-2 h-2 rounded-full bg-purple-500 inline-block shadow-[0_0_8px_rgba(168,85,247,0.6)]"></span>
              <span className="text-[8px] font-mono text-gray-500 block">Gemma RAG</span>
            </div>

            {/* Query vector pointer showing similarity match */}
            {results.length > 0 && (
              <motion.div 
                animate={{ 
                  x: selectedDocId === 'ea_standard' 
                    ? -140 
                    : selectedDocId === 'dwh_architecture' 
                    ? -40 
                    : selectedDocId === 'automotive_ml' 
                    ? 45 
                    : 140,
                  y: selectedDocId === 'ea_standard' 
                    ? -15 
                    : selectedDocId === 'dwh_architecture' 
                    ? -25 
                    : selectedDocId === 'automotive_ml' 
                    ? 20 
                    : -15,
                }}
                transition={{ type: 'spring', damping: 15 }}
                className="absolute text-center z-10"
              >
                <div className="w-3 h-3 rounded-full bg-emerald-400 border-2 border-white animate-pulse shadow-[0_0_12px_rgba(16,185,129,0.8)] inline-block"></div>
                <div className="text-[8px] font-mono text-emerald-400 font-extrabold px-1 py-0.5 bg-black/80 border border-emerald-500/20 rounded mt-0.5">
                  QUERY VECTOR (Cosine: {results[0].score})
                </div>
              </motion.div>
            )}

            <span className="absolute bottom-1 right-2 text-[8px] font-mono text-gray-600">Cosine Similarity Vector Mapper Connected</span>
          </div>
        </div>
      )}
    </div>
  );
}
