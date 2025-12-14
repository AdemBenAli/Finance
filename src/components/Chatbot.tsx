import { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, TrendingUp, DollarSign, Target } from 'lucide-react';

interface Message {
  type: 'ai' | 'user';
  content: string;
  isCard?: boolean;
}

interface UserAnswers {
  sector?: string;
  revenue?: string;
  growthRate?: string;
  debtLevel?: string;
  capitalNeeded?: string;
  purpose?: string;
  acceptInvestor?: string;
  maxDilution?: string;
  exitHorizon?: string;
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      type: 'ai',
      content: '🏦 Bienvenue au Comité d\'Investissement Virtuel. Je suis votre analyste IA spécialisé en Capital Développement pour les PME tunisiennes. Je vais évaluer votre éligibilité comme un véritable fonds d\'investissement.',
    },
  ]);
  const [input, setInput] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswers>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const questions = [
    { key: 'sector', question: '🏢 Quel est votre secteur d\'activité ? (ex: Technologie, Industrie, Services, Agroalimentaire)' },
    { key: 'revenue', question: '💰 Quel est votre chiffre d\'affaires annuel en TND ? (ex: 2000000 pour 2 MDT)' },
    { key: 'growthRate', question: '📈 Quel est votre taux de croissance annuel moyen sur les 3 dernières années ? (%, ex: 25)' },
    { key: 'debtLevel', question: '📊 Quel est votre niveau d\'endettement actuel ? (Faible / Modéré / Élevé)' },
    { key: 'capitalNeeded', question: '💵 Quel montant de capital recherchez-vous ? (en millions TND, ex: 2.5)' },
    { key: 'purpose', question: '🎯 À quoi servira principalement ce capital ? (Expansion / Équipement / International / R&D / Recrutement)' },
    { key: 'acceptInvestor', question: '🤝 Acceptez-vous l\'entrée d\'un investisseur stratégique dans votre capital ? (Oui / Non)' },
    { key: 'maxDilution', question: '📉 Quel pourcentage maximum du capital êtes-vous prêt à céder ? (%, ex: 25 - généralement entre 20% et 40%)' },
    { key: 'exitHorizon', question: '⏳ Sur quelle durée envisagez-vous le partenariat avec l\'investisseur ? (en années, ex: 5-7)' },
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (currentQuestion === 0 && messages.length === 1) {
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          { type: 'ai', content: questions[0].question },
        ]);
      }, 1000);
    }
  }, []);

  const askNextQuestion = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          { type: 'ai', content: questions[nextQuestion].question },
        ]);
      }, 800);
    } else {
      generateDecision();
    }
  };

  const generateDecision = () => {
    setIsProcessing(true);

    setTimeout(() => {
      const decision = analyzeAnswers(userAnswers);
      setMessages(prev => [
        ...prev,
        { type: 'ai', content: decision, isCard: true },
      ]);
      setIsProcessing(false);
    }, 1500);
  };

  const analyzeAnswers = (answers: UserAnswers): string => {
    const debtLevel = answers.debtLevel?.toLowerCase().trim() || '';
    const acceptInvestor = answers.acceptInvestor?.toLowerCase().trim() || '';
    const growthRate = parseFloat(answers.growthRate || '0');
    const maxDilution = parseFloat(answers.maxDilution || '0');
    const revenue = parseFloat(answers.revenue || '0');
    const capitalNeeded = parseFloat(answers.capitalNeeded || '0');

    // Analyse sophistiquée - Comité d'investissement virtuel
    const isGrowthPhase = growthRate >= 15; // Croissance forte > 15%
    const hasHealthyDebt = 
      debtLevel.includes('faible') || debtLevel.includes('low') || 
      debtLevel.includes('modér') || debtLevel.includes('moder') || 
      debtLevel.includes('medium') || debtLevel.includes('moyen');
    const acceptsEquity = 
      acceptInvestor.includes('oui') || acceptInvestor.includes('yes') || 
      acceptInvestor.includes('ok') || acceptInvestor.includes('accept');
    const acceptsDilution = maxDilution >= 20 && maxDilution <= 49; // Fourchette réaliste (minoritaire)
    const hasMinimumSize = revenue >= 1000000; // Au moins 1 MDT CA (PME mature)
    const reasonableCapital = capitalNeeded >= 1 && capitalNeeded <= 10; // Entre 1 et 10 MDT
    const exitHorizonOk = parseFloat(answers.exitHorizon || '5') >= 4 && parseFloat(answers.exitHorizon || '5') <= 10;

    // Critères d'éligibilité stricts du Capital Développement
    const eligible = isGrowthPhase && hasHealthyDebt && acceptsEquity && acceptsDilution && hasMinimumSize && reasonableCapital && exitHorizonOk;

    // Évaluation du risque (algorithme sophistiqué)
    let riskLevel = 'Modéré';
    let riskScore = 0;
    
    if (debtLevel.includes('élevé') || debtLevel.includes('high')) riskScore += 30;
    if (growthRate < 10) riskScore += 25;
    if (maxDilution < 20 || maxDilution > 40) riskScore += 15;
    if (revenue < 1000000) riskScore += 20;
    if (capitalNeeded > 3) riskScore += 10;

    if (riskScore <= 20) {
      riskLevel = 'Faible ✅';
    } else if (riskScore <= 50) {
      riskLevel = 'Modéré ⚠️';
    } else {
      riskLevel = 'Élevé 🔴';
    }

    // Recommandation personnalisée
    let recommendation = '';
    let financingMode = '';
    
    if (eligible) {
      financingMode = '✅ Capital Développement';
      recommendation = `Votre PME présente un profil attractif pour le Capital Développement. Forte croissance (${growthRate}%), endettement maîtrisé, et ouverture au partenariat stratégique.`;
    } else if (!acceptsEquity) {
      financingMode = '🏦 Crédit Bancaire Classique';
      recommendation = 'Vous n\'êtes pas ouvert à la dilution du capital. Un crédit bancaire traditionnel serait plus adapté, mais attention aux risques de surendettement.';
    } else if (!isGrowthPhase) {
      financingMode = '📊 Consolidation / Crédit Mezzanine';
      recommendation = 'Votre croissance est trop faible pour le Capital Développement. Concentrez-vous sur l\'amélioration de vos performances avant de solliciter un fonds.';
    } else if (!hasHealthyDebt) {
      financingMode = '⚠️ Restructuration de Dette';
      recommendation = 'Votre niveau d\'endettement est préoccupant. Privilégiez une restructuration financière avant d\'envisager une levée de fonds.';
    } else {
      financingMode = '🔄 Capital Développement (avec conditions)';
      recommendation = 'Votre profil est intéressant mais nécessite des ajustements. Acceptez une dilution plus importante (25-35%) pour attirer les investisseurs.';
    }

    // Structure d'investissement détaillée
    const investmentStructure = eligible
      ? `💼 **Proposition d'Investissement :**
      
• **Montant :** ${capitalNeeded} millions TND
• **Participation :** ${Math.min(maxDilution, 35)}% du capital (minoritaire significatif)
• **Valorisation pré-money :** ${((capitalNeeded / (maxDilution / 100)) - capitalNeeded).toFixed(2)} millions TND
• **Valorisation post-money :** ${(capitalNeeded / (maxDilution / 100)).toFixed(2)} millions TND
• **Type d'intervention :** Capital Développement (Private Equity minoritaire)
• **Forme juridique :** Augmentation de capital + Pacte d'actionnaires
      
📋 **Accompagnement Stratégique Inclus :**
- 🏛️ Siège au Conseil d'Administration (administrateur indépendant)
- 📊 Mise en place de comités spécialisés (Audit, Stratégie, Rémunération)
- 🌍 Accès à un réseau d'affaires national & international (partenaires, clients, fournisseurs)
- 👔 Support dans le recrutement de cadres clés (DG, DAF, Directeurs)
- 💼 Expertise en gouvernance et structuration d'entreprise
- 📈 Conseil stratégique sur le développement commercial
- 🚪 Préparation optimale à l'exit (introduction en bourse ou cession industrielle)
- 💰 Appui à la levée de financements complémentaires (dette, mezzanine)`
      : `⚠️ **Profil Non Éligible au Capital Développement**
      
📉 **Critères bloquants identifiés :**
${!isGrowthPhase ? '❌ Croissance insuffisante (< 15% par an) - Nécessite une dynamique de croissance forte\n' : ''}${!hasHealthyDebt ? '❌ Endettement trop élevé - Risque financier important, restructuration nécessaire\n' : ''}${!acceptsEquity ? '❌ Refus de dilution du capital - Le Capital Développement implique obligatoirement une entrée au capital\n' : ''}${!acceptsDilution ? '❌ Pourcentage de dilution non adapté - Fourchette standard : 20-40% (participation minoritaire significative)\n' : ''}${!hasMinimumSize ? '❌ Taille critique non atteinte - CA minimum de 1 MDT requis (PME mature)\n' : ''}${!reasonableCapital ? '❌ Montant de capital inadapté - Fourchette standard : 1-10 MDT\n' : ''}${!exitHorizonOk ? '❌ Horizon temporel inadapté - Durée standard : 5-7 ans (min 4 ans, max 10 ans)\n' : ''}
💡 **Recommandations pour devenir éligible :**
1. 📈 Améliorer la rentabilité et accélérer la croissance organique (objectif : +15% annuel)
2. 💳 Assainir la structure financière (réduire le ratio dette/EBITDA)
3. 🏛️ Structurer la gouvernance (conseil d'administration, reporting mensuel, KPIs)
4. 📊 Professionnaliser le management (comité de direction, processus, contrôle de gestion)
5. 🔄 Revenir dans 12-18 mois avec des métriques améliorées et un business plan solide`;


    // Stratégie de sortie ultra-professionnelle
    const exitStrategy = eligible
      ? `🎯 **Plan de Sortie (Exit Strategy) - Horizon ${answers.exitHorizon || '5-7'} ans**

**Scénario 1 - Cession Industrielle (65% de probabilité) :**
Vente à un acteur stratégique tunisien ou international du secteur ${answers.sector || 'votre secteur'}. L'acquéreur recherchera des synergies commerciales, technologiques ou géographiques. 
💰 Objectif de valorisation : x3 à x5 l'investissement initial (TRI cible : 20-25%)
⏱️ Timeline : Après 5-7 ans d'accompagnement et de création de valeur

**Scénario 2 - Introduction en Bourse (25% de probabilité) :**
IPO sur la Bourse de Tunis après atteinte d'un CA de ${(revenue * 3 / 1000000).toFixed(1)} MDT minimum et démonstration d'une rentabilité stable sur 3 exercices. Sortie progressive du fonds sur 2-3 ans post-IPO.
📈 Conditions : Croissance soutenue, profitabilité démontrée, free-float minimum 20%
🏛️ Procédure : Visa CMF + Roadshow investisseurs + Cotation marché principal

**Scénario 3 - Rachat par le Management (10% de probabilité) :**
Management Buy-Out (MBO) - Rachat des actions du fonds par les fondateurs/dirigeants via financement bancaire LBO ou nouveau tour de financement.
💼 Conditions : Capacité de financement démontrée, accord sur la valorisation

**📊 Mécanismes de sortie complémentaires :**
• Clause de liquidité préférentielle (priorité au remboursement du fonds)
• Droit de sortie conjointe (tag-along) si vente majoritaire
• Droit d'entraînement (drag-along) pour forcer une sortie
• Options de rachat progressif sur 2-3 ans

💰 **Retour attendu :** TRI (Taux de Rendement Interne) cible de 20-25% par an
📈 **Multiple de sortie :** x3 à x5 le capital investi (scénario médian : x4)`
      : `🔄 **Feuille de Route pour Devenir Éligible au Capital Développement**

**Phase 1 - Préparation (6-12 mois) :**
   📋 Structurer un business plan robuste avec projections financières à 5 ans
   📊 Mettre en place un reporting mensuel (P&L, Cash Flow, KPIs opérationnels)
   👔 Renforcer l'équipe de direction (DG, DAF, Responsables opérationnels)
   🏛️ Créer un conseil d'administration (même informel) avec administrateurs externes
   📈 Accélérer la croissance commerciale (objectif : +15-20% annuel)
   💰 Assainir la structure financière (réduire la dette, améliorer le BFR)

**Phase 2 - Structuration (3-6 mois) :**
   📄 Préparer un pitch deck professionnel (20-25 slides)
   💼 Réaliser une due diligence préalable (financière, juridique, fiscale)
   🎯 Identifier les fonds tunisiens pertinents pour votre secteur
   👥 Préparer le management aux présentations investisseurs
   📊 Clarifier la stratégie de croissance et le business model

**Phase 3 - Approche Investisseurs (3-6 mois) :**
   🏦 **Fonds tunisiens à contacter :**
   • CDC Gestion (Caisse des Dépôts et Consignations)
   • Tuninvest Finance Group
   • Africainvest
   • Maxula Capital
   • SICAR (Société d'Investissement en Capital Risque)
   
   📧 Approche : Email introduction + Teaser 1 page + Rendez-vous pitch
   ⏱️ Process : Pitch → Due Diligence → Term Sheet → Closing (6-9 mois total)

**Alternatives de Financement Court Terme :**
   🏦 Ligne de crédit bancaire (BTS, ATB, Amen Bank, BH Bank, UIB)
   💳 Crédit-bail (leasing) pour les équipements productifs
   💰 Subventions et programmes publics :
      • ANETI - Appui à l'innovation
      • API - Programme FAMEX (export)
      • Fonds de Garantie SOTUGAR
   🌍 Financements internationaux : AFD, BEI, IFC, BERD`;


    // Secteurs prioritaires (valorisation sectorielle)
    const sectorAnalysis = {
      'technologie': '🚀 Secteur prioritaire - Forte valorisation',
      'tech': '🚀 Secteur prioritaire - Forte valorisation',
      'digital': '🚀 Secteur prioritaire - Forte valorisation',
      'numérique': '🚀 Secteur prioritaire - Forte valorisation',
      'it': '🚀 Secteur prioritaire - Forte valorisation',
      'industrie': '🏭 Secteur mature - Valorisation standard',
      'industriel': '🏭 Secteur mature - Valorisation standard',
      'services': '💼 Secteur tertiaire - Dépend du modèle',
      'service': '💼 Secteur tertiaire - Dépend du modèle',
      'agroalimentaire': '🌾 Secteur stratégique - Demande locale forte',
      'agro': '🌾 Secteur stratégique - Demande locale forte',
      'agriculture': '🌾 Secteur stratégique - Demande locale forte',
      'export': '🌍 Très attractif - Devises & croissance',
      'exportation': '🌍 Très attractif - Devises & croissance',
    };

    const sectorComment = Object.keys(sectorAnalysis).find(key => 
      answers.sector?.toLowerCase().includes(key)
    ) || 'autre';

    return JSON.stringify({
      eligibility: eligible ? 'Éligible ✅' : 'Non Éligible ❌',
      riskLevel,
      recommendation,
      financingMode,
      investmentStructure,
      exitStrategy,
      sector: answers.sector,
      sectorPriority: sectorAnalysis[sectorComment] || '📊 Secteur à analyser',
      duration: answers.exitHorizon || '5-7 ans',
      capitalNeeded: `${capitalNeeded} millions TND`,
      dilution: `${maxDilution}%`,
      growthRate: `${growthRate}%`,
    });
  };

  const handleSend = () => {
    if (!input.trim() || isProcessing) return;

    setMessages(prev => [...prev, { type: 'user', content: input }]);

    const questionKey = questions[currentQuestion]?.key as keyof UserAnswers;
    const updatedAnswers = { ...userAnswers, [questionKey]: input };
    setUserAnswers(updatedAnswers);

    setInput('');
    
    // Vérification spéciale : Si refus d'investisseur au capital → Arrêt immédiat
    if (questionKey === 'acceptInvestor') {
      const answer = input.toLowerCase().trim();
      const refusesEquity = answer.includes('non') || answer.includes('no') || answer.includes('jamais') || answer.includes('refuse');
      
      if (refusesEquity) {
        setTimeout(() => {
          setMessages(prev => [
            ...prev,
            { 
              type: 'ai', 
              content: '⚠️ **Analyse Immédiate : Profil Non Compatible**\n\n' +
                'Vous avez indiqué que vous ne souhaitez **pas accepter d\'investisseur au capital**. ' +
                'Le Capital Développement repose obligatoirement sur une **prise de participation minoritaire** ' +
                '(généralement 20-40% du capital).\n\n' +
                '🏦 **Recommandation Alternative : Crédit Bancaire Classique**\n\n' +
                'Votre refus de diluer le capital indique une préférence pour **garder le contrôle total**. ' +
                'Dans ce cas, les solutions de financement plus adaptées sont :\n\n' +
                '💰 **Crédit bancaire traditionnel** (BTS, ATB, Amen Bank, BH Bank, UIB)\n' +
                '- Avantage : Vous gardez 100% du capital\n' +
                '- Inconvénient : Remboursements fixes + intérêts + garanties\n\n' +
                '📋 **Crédit-bail (Leasing)** pour équipements\n' +
                '- Idéal pour financer machines, véhicules, IT\n' +
                '- Pas d\'impact sur les ratios d\'endettement\n\n' +
                '🎯 **Subventions publiques** (ANETI, API, FOPRODI, SOTUGAR)\n' +
                '- Aides non remboursables ou à taux bonifiés\n' +
                '- Aucune dilution du capital\n\n' +
                '💡 **Conseil :** Le Capital Développement ne sera envisageable que si vous acceptez un **partenariat stratégique** ' +
                'avec un fonds qui entre au capital. Si ce n\'est pas votre vision, privilégiez les financements classiques.\n\n' +
                '🔄 Vous pouvez **recommencer l\'analyse** si vous changez d\'avis sur ce point stratégique.'
            },
          ]);
          setIsProcessing(false);
          setCurrentQuestion(questions.length); // Force la fin du questionnaire
        }, 800);
        return;
      }
    }
    
    const nextQuestionIndex = currentQuestion + 1;
    setCurrentQuestion(nextQuestionIndex);

    setTimeout(() => {
      if (nextQuestionIndex >= questions.length) {
        generateDecision();
      } else {
        askNextQuestion();
      }
    }, 800);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const renderMessage = (message: Message, index: number) => {
    if (message.isCard) {
      try {
        const data = JSON.parse(message.content);
        return (
          <div
            key={index}
            className="mb-4 animate-fadeIn"
          >
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center">
                  <Bot size={20} className="text-white" />
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-4xl border-2 border-blue-500">
                <h3 className="text-3xl font-bold text-slate-900 mb-6 flex items-center">
                  <Target className="mr-3 text-blue-600" size={28} />
                  📋 Décision du Comité d'Investissement
                </h3>

                {/* Indicateurs Clés */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className={`p-4 rounded-xl shadow-md ${
                    data.eligibility.includes('Éligible ✅') 
                      ? 'bg-gradient-to-br from-emerald-50 to-emerald-100 border-2 border-emerald-400' 
                      : 'bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-400'
                  }`}>
                    <p className="text-sm text-slate-700 font-semibold mb-1">Éligibilité</p>
                    <p className="text-2xl font-bold">{data.eligibility}</p>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-300 p-4 rounded-xl shadow-md">
                    <p className="text-sm text-slate-700 font-semibold mb-1">Niveau de Risque</p>
                    <p className="text-2xl font-bold text-blue-800">{data.riskLevel}</p>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-300 p-4 rounded-xl shadow-md">
                    <p className="text-sm text-slate-700 font-semibold mb-1">Durée</p>
                    <p className="text-2xl font-bold text-purple-800">{data.duration}</p>
                  </div>
                </div>

                {/* Mode de Financement */}
                <div className="bg-gradient-to-r from-slate-50 to-slate-100 p-5 rounded-xl mb-5 border-l-4 border-blue-600 shadow-md">
                  <p className="text-sm text-slate-600 font-semibold flex items-center mb-2">
                    <TrendingUp className="mr-2 text-blue-600" size={18} />
                    Mode de Financement Recommandé
                  </p>
                  <p className="text-2xl font-bold text-slate-900 mb-2">{data.financingMode}</p>
                  <p className="text-slate-700 leading-relaxed">{data.recommendation}</p>
                </div>

                {/* Métriques PME */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
                  <div className="bg-white border-2 border-slate-200 p-3 rounded-lg shadow-sm">
                    <p className="text-xs text-slate-500 font-semibold">Secteur</p>
                    <p className="text-sm font-bold text-slate-800">{data.sector}</p>
                    <p className="text-xs text-emerald-600 mt-1">{data.sectorPriority}</p>
                  </div>
                  <div className="bg-white border-2 border-slate-200 p-3 rounded-lg shadow-sm">
                    <p className="text-xs text-slate-500 font-semibold">Croissance</p>
                    <p className="text-lg font-bold text-blue-600">{data.growthRate}</p>
                  </div>
                  <div className="bg-white border-2 border-slate-200 p-3 rounded-lg shadow-sm">
                    <p className="text-xs text-slate-500 font-semibold">Capital</p>
                    <p className="text-sm font-bold text-purple-600">{data.capitalNeeded}</p>
                  </div>
                  <div className="bg-white border-2 border-slate-200 p-3 rounded-lg shadow-sm">
                    <p className="text-xs text-slate-500 font-semibold">Dilution</p>
                    <p className="text-lg font-bold text-orange-600">{data.dilution}</p>
                  </div>
                </div>

                {/* Structure d'Investissement */}
                <div className="mb-5">
                  <p className="text-sm text-slate-600 font-semibold flex items-center mb-3">
                    <DollarSign className="mr-2 text-emerald-600" size={18} />
                    Structure d'Investissement
                  </p>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <pre className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap font-sans">
                      {data.investmentStructure}
                    </pre>
                  </div>
                </div>

                {/* Stratégie de Sortie */}
                <div className="bg-gradient-to-br from-emerald-50 to-blue-50 p-5 rounded-xl border-2 border-emerald-300 shadow-md">
                  <p className="text-sm text-slate-700 font-bold mb-3 flex items-center">
                    <Target className="mr-2 text-emerald-600" size={18} />
                    Stratégie de Sortie (Exit Strategy)
                  </p>
                  <pre className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap font-sans">
                    {data.exitStrategy}
                  </pre>
                </div>

                {/* Disclaimer */}
                <div className="mt-5 pt-4 border-t border-slate-200">
                  <p className="text-xs text-slate-500 text-center">
                    ⚠️ Cette analyse est une simulation pédagogique. Pour un dossier réel, consultez un fonds de Capital Développement tunisien (CDC, Tuninvest, AfricInvest).
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      } catch (e) {
        return null;
      }
    }

    return (
      <div
        key={index}
        className={`mb-4 flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
      >
        {message.type === 'ai' && (
          <div className="flex-shrink-0 mr-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center">
              <Bot size={20} className="text-white" />
            </div>
          </div>
        )}

        <div
          className={`max-w-md px-6 py-3 rounded-2xl shadow-lg ${
            message.type === 'user'
              ? 'bg-gradient-to-br from-emerald-600 to-emerald-700 text-white'
              : 'bg-white text-slate-800 border border-slate-200'
          }`}
        >
          <p className="leading-relaxed">{message.content}</p>
        </div>

        {message.type === 'user' && (
          <div className="flex-shrink-0 ml-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-full flex items-center justify-center">
              <User size={20} className="text-white" />
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            🏦 Comité d'Investissement Virtuel IA
          </h1>
          <p className="text-slate-600 text-lg">
            Simulateur de Capital Développement pour PME tunisiennes
          </p>
          <p className="text-sm text-slate-500 mt-2">
            💼 Analyse professionnelle • 📊 Décision en temps réel • 🎯 Exit Strategy
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-6 mb-6 min-h-[500px] max-h-[600px] overflow-y-auto">
          {messages.map((message, index) => renderMessage(message, index))}

          {isProcessing && (
            <div className="flex items-start mb-4 animate-fadeIn">
              <div className="flex-shrink-0 mr-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center">
                  <Bot size={20} className="text-white" />
                </div>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl px-6 py-3 shadow-lg">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="flex space-x-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Tapez votre réponse ici..."
            disabled={isProcessing || currentQuestion >= questions.length}
            className="flex-1 px-6 py-4 rounded-2xl border-2 border-slate-300 focus:border-blue-500 focus:outline-none shadow-lg disabled:bg-slate-100 disabled:cursor-not-allowed"
          />
          <button
            onClick={handleSend}
            disabled={isProcessing || currentQuestion >= questions.length || !input.trim()}
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-2xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 font-semibold"
          >
            <Send size={20} />
            <span>Envoyer</span>
          </button>
        </div>
      </div>
    </div>
  );
}
