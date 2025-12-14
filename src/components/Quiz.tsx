import { useState } from 'react';
import { CheckCircle, XCircle, ArrowRight, RotateCcw, Brain } from 'lucide-react';

interface QuizQuestion {
  question: string;
  options: { text: string; score: number }[];
}

export default function Quiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const questions: QuizQuestion[] = [
    {
      question: '🏢 Quel est le secteur d\'activité de votre PME ?',
      options: [
        { text: 'Technologie / Digital / IT', score: 5 },
        { text: 'Industrie manufacturière', score: 4 },
        { text: 'Services B2B', score: 4 },
        { text: 'Agroalimentaire / Export', score: 5 },
        { text: 'Commerce / Retail', score: 2 },
        { text: 'BTP / Immobilier', score: 2 },
      ],
    },
    {
      question: '💰 Quel est votre chiffre d\'affaires annuel actuel ?',
      options: [
        { text: 'Moins de 500 000 TND', score: 0 },
        { text: '500 000 - 1 mille TND', score: 2 },
        { text: '1 - 3 milles TND', score: 4 },
        { text: '3 - 10 milles TND', score: 5 },
        { text: 'Plus de 10 milles TND', score: 5 },
      ],
    },
    {
      question: '📈 Quel est votre taux de croissance annuel moyen des 3 dernières années ?',
      options: [
        { text: 'Négatif ou stagnant (0-5%)', score: 0 },
        { text: 'Faible croissance (5-10%)', score: 1 },
        { text: 'Croissance modérée (10-20%)', score: 3 },
        { text: 'Forte croissance (20-40%)', score: 5 },
        { text: 'Croissance explosive (>40%)', score: 5 },
      ],
    },
    {
      question: '💳 Quel est votre niveau d\'endettement actuel ?',
      options: [
        { text: 'Aucune dette (0%)', score: 5 },
        { text: 'Faible endettement (<30% des fonds propres)', score: 5 },
        { text: 'Endettement modéré (30-70%)', score: 4 },
        { text: 'Endettement élevé (70-150%)', score: 2 },
        { text: 'Surendettement (>150%)', score: 0 },
      ],
    },
    {
      question: '📊 Quelle est votre rentabilité (EBITDA / CA) ?',
      options: [
        { text: 'Négatif (perte)', score: 0 },
        { text: 'Point mort (0-5%)', score: 2 },
        { text: 'Rentabilité faible (5-10%)', score: 3 },
        { text: 'Rentabilité correcte (10-20%)', score: 5 },
        { text: 'Rentabilité excellente (>20%)', score: 5 },
      ],
    },
    {
      question: '🎯 Quel est l\'objectif principal du financement recherché ?',
      options: [
        { text: 'Expansion commerciale (nouveau marché, région)', score: 5 },
        { text: 'Investissement en équipements / production', score: 5 },
        { text: 'Développement à l\'international', score: 5 },
        { text: 'Recherche & Développement / Innovation', score: 5 },
        { text: 'Refinancement de dette existante', score: 1 },
        { text: 'Besoin de trésorerie courante', score: 0 },
      ],
    },
    {
      question: '💵 Quel montant de capital recherchez-vous ?',
      options: [
        { text: 'Moins de 500 000 TND', score: 1 },
        { text: '500 000 - 1 mille TND', score: 3 },
        { text: '1 - 3 milles TND', score: 5 },
        { text: '3 - 5 milles TND', score: 5 },
        { text: 'Plus de 5 milles TND', score: 4 },
      ],
    },
    {
      question: '🤝 Êtes-vous prêt à partager le contrôle de votre entreprise ?',
      options: [
        { text: 'Oui, je recherche un partenaire stratégique', score: 5 },
        { text: 'Oui, mais uniquement en minoritaire (<30%)', score: 4 },
        { text: 'Peut-être, selon les conditions', score: 2 },
        { text: 'Non, je veux garder le contrôle total', score: 0 },
      ],
    },
    {
      question: '📉 Quel pourcentage du capital êtes-vous prêt à céder ?',
      options: [
        { text: 'Aucun (0%)', score: 0 },
        { text: 'Très minoritaire (10-20%)', score: 2 },
        { text: 'Minoritaire significatif (20-35%)', score: 5 },
        { text: 'Minoritaire important (35-49%)', score: 4 },
        { text: 'Majoritaire (>50%)', score: 1 },
      ],
    },
    {
      question: '👔 Votre équipe de direction est-elle structurée et expérimentée ?',
      options: [
        { text: 'Oui, équipe complète et expérimentée', score: 5 },
        { text: 'Équipe présente mais manque d\'expérience', score: 3 },
        { text: 'Quelques cadres clés seulement', score: 2 },
        { text: 'Gestion centralisée par le fondateur', score: 1 },
      ],
    },
    {
      question: '📋 Avez-vous une gouvernance formelle (CA, reporting) ?',
      options: [
        { text: 'Oui, Conseil d\'Administration actif + reporting', score: 5 },
        { text: 'CA informel, reporting basique', score: 3 },
        { text: 'Pas de CA, mais processus internes', score: 2 },
        { text: 'Aucune structure formelle', score: 0 },
      ],
    },
    {
      question: '⏳ Sur quelle durée envisagez-vous le partenariat ?',
      options: [
        { text: 'Court terme (1-3 ans)', score: 1 },
        { text: 'Moyen terme (3-5 ans)', score: 3 },
        { text: 'Long terme (5-7 ans)', score: 5 },
        { text: 'Très long terme (>7 ans)', score: 4 },
      ],
    },
    {
      question: '🚪 Quelle stratégie de sortie privilégiez-vous pour l\'investisseur ?',
      options: [
        { text: 'Cession industrielle (vente à un acteur stratégique)', score: 5 },
        { text: 'Introduction en Bourse (IPO)', score: 5 },
        { text: 'Rachat par le management (MBO)', score: 4 },
        { text: 'Je n\'ai pas encore réfléchi à la sortie', score: 2 },
      ],
    },
    {
      question: '🌍 Votre entreprise exporte-t-elle ou prévoit-elle d\'exporter ?',
      options: [
        { text: 'Oui, exportation significative (>30% du CA)', score: 5 },
        { text: 'Exportation modérée (10-30%)', score: 4 },
        { text: 'Exportation débutante (<10%)', score: 3 },
        { text: 'Non, marché local uniquement', score: 2 },
      ],
    },
    {
      question: '🏆 Quelle est votre position concurrentielle ?',
      options: [
        { text: 'Leader du marché', score: 5 },
        { text: 'Challenger (2-3ème position)', score: 4 },
        { text: 'Acteur établi avec avantages compétitifs', score: 4 },
        { text: 'Nouvel entrant / Niche', score: 3 },
        { text: 'Marché très concurrentiel', score: 2 },
      ],
    },
  ];

  const handleAnswerSelect = (score: number, index: number) => {
    setSelectedAnswer(index);
    setTimeout(() => {
      setTotalScore(totalScore + score);
      setSelectedAnswer(null);

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setShowResult(true);
      }
    }, 600);
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setTotalScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
  };

  const getResult = () => {
    const maxScore = questions.length * 5;
    const percentage = (totalScore / maxScore) * 100;

    if (percentage >= 75) {
      return {
        title: '🎯 Profil Excellent pour le Capital Développement',
        icon: <CheckCircle className="text-emerald-600" size={64} />,
        color: 'emerald',
        description:
          'Félicitations ! Votre PME présente un profil exceptionnel pour le Capital Développement. Vous réunissez tous les critères recherchés par les fonds d\'investissement tunisiens : forte croissance, endettement maîtrisé, gouvernance structurée, et vision stratégique long terme.',
        recommendations: [
          '✅ Préparez immédiatement votre dossier de levée de fonds (business plan, projections 5 ans, KPIs)',
          '📊 Réalisez une due diligence préalable (financière, juridique, fiscale) pour anticiper',
          '🏦 Contactez les fonds tunisiens : Tuninvest, CDC Gestion, AfricInvest, Maxula Capital',
          '💼 Préparez un pitch deck professionnel de 20-25 slides',
          '👔 Identifiez les apports stratégiques recherchés (réseau, expertise sectorielle, international)',
          '📈 Valorisez votre entreprise avec l\'aide d\'un conseil financier spécialisé',
        ],
        nextSteps: [
          '1️⃣ Semaine 1-2 : Préparer le business plan et les documents financiers',
          '2️⃣ Semaine 3-4 : Identifier et contacter 3-5 fonds pertinents',
          '3️⃣ Mois 2-3 : Premiers rendez-vous et pitch investisseurs',
          '4️⃣ Mois 4-6 : Due diligence approfondie par les fonds',
          '5️⃣ Mois 6-9 : Négociation term sheet et closing',
        ],
      };
    } else if (percentage >= 60) {
      return {
        title: '⚠️ Profil Prometteur avec Ajustements Nécessaires',
        icon: <CheckCircle className="text-yellow-600" size={64} />,
        color: 'yellow',
        description:
          'Votre PME a un potentiel intéressant pour le Capital Développement, mais certains aspects nécessitent des améliorations. Avec quelques ajustements stratégiques et opérationnels, vous pourriez devenir un candidat attractif pour les investisseurs.',
        recommendations: [
          '📈 Accélérez votre croissance : visez +20% annuel minimum sur les 2 prochaines années',
          '💰 Optimisez votre structure financière : réduisez l\'endettement bancaire si >50% des fonds propres',
          '👔 Renforcez votre équipe de direction : recrutez des profils clés (DAF, Directeur Commercial)',
          '🏛️ Structurez votre gouvernance : créez un CA formel avec reporting mensuel',
          '🎯 Clarifiez votre stratégie de croissance : nouveaux marchés, produits, géographies',
          '📊 Professionnalisez vos outils de gestion : ERP, CRM, contrôle de gestion',
        ],
        nextSteps: [
          '1️⃣ Phase préparatoire (6-12 mois) : Améliorer les métriques clés',
          '2️⃣ Mettre en place les quick wins : +CA, +marge, -dette',
          '3️⃣ Structurer le management et les processus internes',
          '4️⃣ Revisiter le Capital Développement dans 12-18 mois',
          '5️⃣ Alternative court terme : Crédit bancaire ou programmes publics (API, ANETI)',
        ],
      };
    } else if (percentage >= 40) {
      return {
        title: '🔄 Profil Actuellement Non Éligible',
        icon: <XCircle className="text-orange-600" size={64} />,
        color: 'orange',
        description:
          'Votre PME n\'est pas encore prête pour le Capital Développement. Les fonds recherchent des entreprises en forte croissance avec une gouvernance structurée. Concentrez-vous d\'abord sur la consolidation de votre business avant d\'envisager l\'equity.',
        recommendations: [
          '🎯 Retravaillez votre modèle économique pour atteindre la rentabilité',
          '📊 Mettez en place un contrôle de gestion rigoureux (tableaux de bord, KPIs)',
          '💼 Investissez dans votre équipe : formation, recrutements stratégiques',
          '🏦 Privilégiez les financements traditionnels : crédit bancaire, leasing',
          '💰 Explorez les subventions publiques : ANETI, API, SOTUGAR, FOPRODI',
          '📈 Visez d\'abord la croissance organique avant la croissance externe',
        ],
        nextSteps: [
          '1️⃣ Court terme : Stabiliser l\'activité et améliorer la trésorerie',
          '2️⃣ Moyen terme : Croissance rentable et réduction de la dette',
          '3️⃣ Long terme : Structuration et professionnalisation',
          '4️⃣ Alternatives de financement : BTS, ATB, Amen Bank (crédit PME)',
          '5️⃣ Programmes d\'accompagnement : Innorpi, Pépinières, Incubateurs',
        ],
      };
    } else {
      return {
        title: '❌ Capital Développement Non Adapté',
        icon: <XCircle className="text-red-600" size={64} />,
        color: 'red',
        description:
          'Le Capital Développement n\'est clairement pas adapté à votre situation actuelle. Votre entreprise nécessite d\'abord une phase de restructuration et de consolidation avant d\'envisager toute levée de fonds en equity.',
        recommendations: [
          '🚨 Priorité absolue : Assainissement financier et réduction de la dette',
          '📉 Restructurez votre modèle économique pour atteindre l\'équilibre',
          '💼 Recentrez-vous sur votre cœur de métier et rentabilité',
          '🏦 Négociez un rééchelonnement de vos dettes bancaires',
          '👥 Faites-vous accompagner par un expert-comptable ou consultant',
          '⏳ Le Capital Développement sera envisageable dans 2-3 ans minimum',
        ],
        nextSteps: [
          '1️⃣ Urgence : Plan de redressement et gestion de trésorerie',
          '2️⃣ Restructuration : Renégociation dettes + réduction coûts',
          '3️⃣ Consolidation : Retour à la profitabilité sur 12-24 mois',
          '4️⃣ Croissance contrôlée : Une fois l\'entreprise stabilisée',
          '5️⃣ Contacts utiles : Expert-comptable, UTICA, Chambres de commerce',
        ],
      };
    }
  };

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  if (showResult) {
    const result = getResult();
    const colorClasses = {
      emerald: {
        bg: 'from-emerald-50 to-emerald-100',
        border: 'border-emerald-500',
        button: 'from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800',
      },
      yellow: {
        bg: 'from-yellow-50 to-yellow-100',
        border: 'border-yellow-500',
        button: 'from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800',
      },
      orange: {
        bg: 'from-orange-50 to-orange-100',
        border: 'border-orange-500',
        button: 'from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800',
      },
      red: {
        bg: 'from-red-50 to-red-100',
        border: 'border-red-500',
        button: 'from-red-600 to-red-700 hover:from-red-700 hover:to-red-800',
      },
    };

    const colors = colorClasses[result.color as keyof typeof colorClasses];

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-4 sm:py-8 px-3 sm:px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-4 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-2">📊 Résultats de l'Évaluation</h1>
            <p className="text-sm sm:text-base text-slate-600">Votre analyse d'éligibilité au Capital Développement</p>
          </div>

          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-8 animate-fadeIn">
            <div className="text-center mb-4 sm:mb-6">
              {result.icon}
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 mt-4">{result.title}</h2>
              <p className="text-sm sm:text-base text-slate-600 mt-2">
                Score: {totalScore} / {questions.length * 5}
              </p>
            </div>

            <div className={`bg-gradient-to-br ${colors.bg} border-2 ${colors.border} rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6`}>
              <p className="text-sm sm:text-base md:text-lg text-slate-800 leading-relaxed">{result.description}</p>
            </div>

            <div className="mb-4 sm:mb-6">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 sm:mb-4 flex items-center">
                <Brain className="mr-2 text-blue-600" size={20} />
                💡 Recommandations Stratégiques
              </h3>
              <ul className="space-y-2 sm:space-y-3">
                {result.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start">
                    <ArrowRight className="text-emerald-600 mr-2 flex-shrink-0 mt-1" size={18} />
                    <span className="text-xs sm:text-sm md:text-base text-slate-700">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {result.nextSteps && (
              <div className="mb-4 sm:mb-8 bg-slate-50 p-4 sm:p-6 rounded-xl sm:rounded-2xl border-2 border-slate-200">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 sm:mb-4 flex items-center">
                  <ArrowRight className="mr-2 text-emerald-600" size={20} />
                  🚀 Prochaines Étapes
                </h3>
                <ul className="space-y-1.5 sm:space-y-2">
                  {result.nextSteps.map((step, index) => (
                    <li key={index} className="text-xs sm:text-sm md:text-base text-slate-700 font-medium">
                      {step}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                onClick={restartQuiz}
                className="flex-1 bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl transition-all duration-300 shadow-lg flex items-center justify-center space-x-2 text-sm sm:text-base"
              >
                <RotateCcw size={18} className="sm:w-5 sm:h-5" />
                <span>🔄 Refaire le Quiz</span>
              </button>

              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className={`flex-1 bg-gradient-to-r ${colors.button} text-white px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl transition-all duration-300 shadow-lg flex items-center justify-center space-x-2 text-sm sm:text-base`}
              >
                <Brain size={18} className="sm:w-5 sm:h-5" />
                <span>🤖 Essayer le Chatbot IA</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-4 sm:py-8 px-3 sm:px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-4 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-2">
            🎯 Quiz d'Éligibilité au Capital Développement
          </h1>
          <p className="text-sm sm:text-base text-slate-600">Évaluez si votre PME est prête pour le Capital Développement</p>
        </div>

        <div className="mb-4 sm:mb-6">
          <div className="flex justify-between text-xs sm:text-sm text-slate-600 mb-2">
            <span>📊 Progression</span>
            <span>
              Question {currentQuestionIndex + 1} sur {questions.length}
            </span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-emerald-600 to-emerald-700 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-8 animate-fadeIn">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 mb-4 sm:mb-6">
            {questions[currentQuestionIndex].question}
          </h2>

          <div className="space-y-3 sm:space-y-4">
            {questions[currentQuestionIndex].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(option.score, index)}
                disabled={selectedAnswer !== null}
                className={`w-full text-left px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl border-2 transition-all duration-300 text-sm sm:text-base ${
                  selectedAnswer === index
                    ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white border-emerald-700 scale-105 shadow-xl'
                    : 'bg-white border-slate-300 hover:border-emerald-500 hover:shadow-lg hover:scale-102'
                } disabled:cursor-not-allowed`}
              >
                <div className="flex items-center justify-between">
                  <span className={`font-medium ${
                    selectedAnswer === index ? 'text-white' : 'text-slate-800'
                  }`}>
                    {option.text}
                  </span>
                  {selectedAnswer === index && (
                    <CheckCircle className="text-white animate-scaleIn" size={20} />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 sm:mt-6 text-center text-slate-500 text-xs sm:text-sm">
          <p>💡 Répondez honnêtement pour obtenir l'évaluation la plus précise</p>
        </div>
      </div>
    </div>
  );
}
