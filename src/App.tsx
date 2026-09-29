/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  ShieldCheck,
  ChevronDown,
  ArrowRight,
  BookmarkCheck,
  Check,
  Heart,
  Sun,
  FileText,
  Sparkles,
  Languages
} from 'lucide-react';

import heroMockupImg from './assets/images/devocionais_hero_mockup_1790387197941.jpg';

// Lien officiel du checkout Digistore24
const CHECKOUT_URL = 'https://www.checkout-ds24.com/product/738936';

type Lang = 'fr' | 'pt';

interface DevotionalDay {
  day: number;
  themeFr: string;
  themePt: string;
  descFr: string;
  descPt: string;
}

const ALL_30_DAYS: DevotionalDay[] = [
  {
    day: 1,
    themeFr: 'La Gratitude',
    themePt: 'Gratidão',
    descFr: 'Une réflexion sur la reconnaissance et l’action de grâce pour les petites choses présentes dans le quotidien.',
    descPt: 'Uma reflexão sobre reconhecer e agradecer pelas pequenas coisas presentes no cotidiano.'
  },
  {
    day: 2,
    themeFr: 'La Foi',
    themePt: 'Fé',
    descFr: 'Une lecture sur la manière de cultiver la foi dans les moments d’incertitude.',
    descPt: 'Uma leitura sobre cultivar a fé em momentos de incerteza.'
  },
  {
    day: 3,
    themeFr: 'L’Espérance',
    themePt: 'Esperança',
    descFr: 'Une réflexion sur le maintien de l’espérance face aux difficultés de la vie.',
    descPt: 'Uma reflexão sobre manter a esperança diante das dificuldades.'
  },
  {
    day: 4,
    themeFr: 'La Patience',
    themePt: 'Paciência',
    descFr: 'Une lecture pour comprendre le temps et les processus d’attente dans la vie.',
    descPt: 'Uma leitura sobre compreender o tempo e os processos da vida.'
  },
  {
    day: 5,
    themeFr: 'Le Pardon',
    themePt: 'Perdão',
    descFr: 'Une réflexion sur le pardon, la réconciliation et la paix du cœur.',
    descPt: 'Uma reflexão sobre perdão, reconciliação e paz.'
  },
  {
    day: 6,
    themeFr: 'Le Courage',
    themePt: 'Coragem',
    descFr: 'Un message sur la façon d’affronter les défis du quotidien en gardant confiance.',
    descPt: 'Uma mensagem sobre enfrentar desafios mantendo a confiança.'
  },
  {
    day: 7,
    themeFr: 'Le Repos',
    themePt: 'Descanso',
    descFr: 'Une réflexion sur l’importance de ralentir et de réserver de vrais moments de silence.',
    descPt: 'Uma reflexão sobre desacelerar e reservar momentos de silêncio.'
  },
  {
    day: 8,
    themeFr: 'La Sagesse',
    themePt: 'Sabedoria',
    descFr: 'Une lecture sur le discernement et les choix conscients.',
    descPt: 'Uma leitura sobre discernimento e escolhas.'
  },
  {
    day: 9,
    themeFr: 'La Famille',
    themePt: 'Família',
    descFr: 'Une réflexion sur le soin, la convivialité fraternelle et la gratitude pour la famille.',
    descPt: 'Uma reflexão sobre cuidado, convivência e gratidão pela família.'
  },
  {
    day: 10,
    themeFr: 'La Confiance en Dieu',
    themePt: 'Confiança em Deus',
    descFr: 'Une lecture sur la foi agissante durant les périodes de doute et d’hésitation.',
    descPt: 'Uma leitura sobre fé durante períodos de dúvida.'
  },
  {
    day: 11,
    themeFr: 'La Compassion',
    themePt: 'Compaixão',
    descFr: 'Une réflexion sur l’empathie, l’écoute bienveillante et la compréhension d’autrui.',
    descPt: 'Uma reflexão sobre empatia e compreensão.'
  },
  {
    day: 12,
    themeFr: 'La Générosité',
    themePt: 'Generosidade',
    descFr: 'Une lecture sur le partage du temps, de l’attention et de la bonté désintéressée.',
    descPt: 'Uma leitura sobre compartilhar tempo, atenção e bondade.'
  },
  {
    day: 13,
    themeFr: 'La Persévérance',
    themePt: 'Perseverança',
    descFr: 'Une réflexion sur la persévérance pour continuer d’avancer malgré les obstacles.',
    descPt: 'Uma reflexão sobre continuar mesmo diante dos desafios.'
  },
  {
    day: 14,
    themeFr: 'L’Humilité',
    themePt: 'Humildade',
    descFr: 'Une lecture sur la simplicité de cœur et la reconnaissance lucide de ses propres limites.',
    descPt: 'Uma leitura sobre simplicidade e reconhecimento dos próprios limites.'
  },
  {
    day: 15,
    themeFr: 'La Paix',
    themePt: 'Paz',
    descFr: 'Une réflexion sur la recherche active de la tranquillité et de la paix dans le quotidien.',
    descPt: 'Uma reflexão sobre buscar tranquilidade no cotidiano.'
  },
  {
    day: 16,
    themeFr: 'Le But de Vie',
    themePt: 'Propósito',
    descFr: 'Une lecture sur les choix d’orientation, la direction spirituelle et le sens de la marche.',
    descPt: 'Uma leitura sobre escolhas, direção e significado.'
  },
  {
    day: 17,
    themeFr: 'L’Amour du Prochain',
    themePt: 'Amor ao próximo',
    descFr: 'Une réflexion sur l’attention bienveillante, le respect mutuel et la vie commune.',
    descPt: 'Uma reflexão sobre cuidado, respeito e convivência.'
  },
  {
    day: 18,
    themeFr: 'Les Nouveaux Départs',
    themePt: 'Recomeços',
    descFr: 'Une lecture inspirante sur les nouvelles étapes et les opportunités de recommencer.',
    descPt: 'Uma leitura sobre novas etapas e novas oportunidades.'
  },
  {
    day: 19,
    themeFr: 'La Sérénité',
    themePt: 'Serenidade',
    descFr: 'Une réflexion sur la façon de gérer les situations délicates dans le calme intérieur.',
    descPt: 'Uma reflexão sobre lidar com situações difíceis com calma.'
  },
  {
    day: 20,
    themeFr: 'Le Discernement',
    themePt: 'Discernimento',
    descFr: 'Une lecture sur la prise de décisions éclairées et l’écoute de sa conscience.',
    descPt: 'Uma leitura sobre decisões e consciência.'
  },
  {
    day: 21,
    themeFr: 'Le Contentement',
    themePt: 'Contentamento',
    descFr: 'Une réflexion sur la valorisation sincère de ce qui est déjà présent dans sa vie.',
    descPt: 'Uma reflexão sobre valorizar aquilo que já está presente.'
  },
  {
    day: 22,
    themeFr: 'La Bonté',
    themePt: 'Bondade',
    descFr: 'Une lecture sur l’impact des petites attitudes positives et des paroles douces.',
    descPt: 'Uma leitura sobre pequenas atitudes positivas.'
  },
  {
    day: 23,
    themeFr: 'La Confiance',
    themePt: 'Confiança',
    descFr: 'Une réflexion pour faire face aux incertitudes tout en préservant son espérance.',
    descPt: 'Uma reflexão sobre enfrentar incertezas mantendo a esperança.'
  },
  {
    day: 24,
    themeFr: 'L’Espérance dans les moments difficiles',
    themePt: 'Esperança nos momentos difíceis',
    descFr: 'Une lecture pour garder espoir même au cœur des périodes éprouvantes.',
    descPt: 'Uma leitura sobre manter esperança durante períodos desafiadores.'
  },
  {
    day: 25,
    themeFr: 'La Gratitude pour la Famille',
    themePt: 'Gratidão pela família',
    descFr: 'Une réflexion pour reconnaître l’importance et la valeur des relations familiales.',
    descPt: 'Uma reflexão sobre reconhecer a importância das relações familiares.'
  },
  {
    day: 26,
    themeFr: 'La Foi face aux Défis',
    themePt: 'Fé diante dos desafios',
    descFr: 'Une lecture pour conserver une foi solide lors des circonstances exigeantes.',
    descPt: 'Uma leitura sobre conservar a fé durante situações difíceis.'
  },
  {
    day: 27,
    themeFr: 'La Puissance de la Prière',
    themePt: 'O poder da oração',
    descFr: 'Une réflexion sur la nécessité de consacrer du temps à la prière personnelle sincère.',
    descPt: 'Uma reflexão sobre reservar tempo para a oração pessoal.'
  },
  {
    day: 28,
    themeFr: 'Apprendre à Attendre',
    themePt: 'Aprender a esperar',
    descFr: 'Une lecture sur la patience et le respect harmonieux des différentes saisons de la vie.',
    descPt: 'Uma leitura sobre paciência e respeito aos diferentes momentos da vida.'
  },
  {
    day: 29,
    themeFr: 'Le Renouvellement',
    themePt: 'Renovação',
    descFr: 'Une réflexion sur les nouveaux cycles, la guérison intérieure et les recommencements.',
    descPt: 'Uma reflexão sobre novos ciclos e recomeços.'
  },
  {
    day: 30,
    themeFr: 'La Gratitude pour la Marche Parcourue',
    themePt: 'Gratidão pela caminhada',
    descFr: 'Une lecture récapitulative sur les précieux enseignements reçus tout au long des 30 jours.',
    descPt: 'Uma leitura final sobre os aprendizados dos 30 dias.'
  }
];

export default function App() {
  const [lang, setLang] = useState<Lang>('fr'); // Default native French as explicitly instructed
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [showMobileCta, setShowMobileCta] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowMobileCta(true);
      } else {
        setShowMobileCta(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isFr = lang === 'fr';

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-slate-800 antialiased selection:bg-amber-100 selection:text-amber-900 font-sans">
      
      {/* BARRE SUPÉRIEURE DE TRANSPARENCE & SÉLECTEUR DE LANGUE */}
      <aside aria-label="Avis de transparence" className="bg-amber-900 text-amber-100 py-2 px-4 text-xs md:text-sm font-medium border-b border-amber-800/50">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 animate-pulse"></span>
            <span>
              {isFr ? (
                <><strong>Livre Numérique Chrétien :</strong> Produit 100 % numérique. Livraison immédiate en ligne. Aucun envoi postal physique.</>
              ) : (
                <><strong>Livro Digital Cristão :</strong> Produto 100% digital. Entrega imediata online. Nenhum item físico será enviado pelos correios.</>
              )}
            </span>
          </div>

          {/* SÉLECTEUR RAPIDE DE LANGUE (FRANÇAIS NATIF / PORTUGUÊS) */}
          <div className="flex items-center gap-1.5 shrink-0 bg-amber-950/60 py-1 px-2 rounded-lg border border-amber-800/60 text-xs">
            <Languages className="w-3.5 h-3.5 text-amber-300" />
            <button
              onClick={() => setLang('fr')}
              className={`px-1.5 py-0.5 rounded font-semibold transition-colors cursor-pointer ${
                isFr ? 'bg-amber-800 text-white' : 'text-amber-200 hover:text-white'
              }`}
            >
              Français
            </button>
            <span className="text-amber-400/50">|</span>
            <button
              onClick={() => setLang('pt')}
              className={`px-1.5 py-0.5 rounded font-semibold transition-colors cursor-pointer ${
                !isFr ? 'bg-amber-800 text-white' : 'text-amber-200 hover:text-white'
              }`}
            >
              Português
            </button>
          </div>
        </div>
      </aside>

      {/* 1. PREMIÈRE DOBRA (HERO) */}
      <section className="py-10 md:py-16 px-4 sm:px-6 max-w-5xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-10">
          
          {/* MENTION AU-DESSUS DE LA HEADLINE */}
          <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-800 bg-amber-100/90 px-3.5 py-1.5 rounded-full inline-block mb-4 border border-amber-200/80">
            {isFr ? 'Livre Numérique Chrétien' : 'Livro Digital Cristão'}
          </span>

          {/* HEADLINE PRINCIPALE */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-slate-900 tracking-tight leading-tight mb-3">
            {isFr ? 'Offre de Miracles' : 'Oferta de Milagres'}
          </h1>

          {/* SOUS-TITRE OBLIGATOIRE EN GRAND RELIEF */}
          <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-semibold text-amber-950 mb-5 leading-snug">
            {isFr ? (
              '30 Dévotions Chrétiennes pour 30 Jours de Prière et de Réflexion'
            ) : (
              '30 Devocionais Cristãos para 30 Dias de Oração e Reflexão'
            )}
          </h2>

          {/* SUBHEADLINE EXPLICATIVE */}
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            {isFr ? (
              'Recevez un livre numérique contenant 30 dévotions chrétiennes — une pour chaque jour — avec passage biblique, réflexion et prière.'
            ) : (
              'Receba um livro digital contendo 30 devocionais cristãos — um para cada dia — com passagem bíblica, reflexão e oração.'
            )}
          </p>
        </div>

        {/* GRILLE : MOCKUP VISUEL + ENCADRÉ D'ACHAT ULTRA-CLAIR */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-white p-6 sm:p-8 md:p-10 rounded-2xl border border-amber-900/10 shadow-sm">
          
          {/* COLONNE VISUELLE */}
          <div className="md:col-span-6 flex flex-col items-center">
            <div className="relative w-full rounded-xl overflow-hidden border border-slate-200 shadow-md bg-stone-100">
              <img
                src={heroMockupImg}
                alt="Livre numérique Oferta de Milagres"
                className="w-full h-auto object-cover"
                loading="eager"
              />
              <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur py-2 px-3 rounded-lg border border-slate-200/80 text-xs text-slate-700 flex items-center justify-between shadow-xs">
                <span className="font-semibold text-amber-900 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-amber-800" />
                  {isFr ? 'Format Numérique' : 'Formato Digital'}
                </span>
                <span className="text-slate-500 font-medium">Mobile • Tablette • PC</span>
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-2.5 text-center">
              {isFr
                ? 'Livre numérique pour lecture immédiate sur tout écran. Aucun envoi postal physique.'
                : 'Material em formato digital para leitura em qualquer dispositivo. Não inclui envio físico.'}
            </p>
          </div>

          {/* COLONNE : CE QUE VOUS ACHETEZ */}
          <div className="md:col-span-6 space-y-5">
            
            <div className="bg-amber-50/70 border border-amber-200/90 rounded-xl p-5 sm:p-6 shadow-2xs">
              <h3 className="text-xs uppercase font-bold tracking-wider text-amber-800 mb-1">
                {isFr ? 'Transparence Totale' : 'Transparência Total'}
              </h3>
              <h4 className="text-xl font-serif font-bold text-amber-950 mb-3 flex items-center gap-2">
                <BookmarkCheck className="w-5 h-5 text-amber-800 shrink-0" />
                {isFr ? 'CE QUE VOUS ACHETEZ' : 'O QUE VOCÊ ESTÁ COMPRANDO'}
              </h4>
              
              <p className="text-sm font-semibold text-slate-900 mb-3">
                {isFr
                  ? '1 livre numérique avec 30 dévotions chrétiennes.'
                  : '1 livro digital com 30 devocionais cristãos.'}
              </p>

              <div className="mb-4">
                <p className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-2">
                  {isFr ? 'Chaque dévotion contient :' : 'Cada devocional contém :'}
                </p>
                <ul className="space-y-1.5 text-sm text-slate-700">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 font-bold shrink-0" />
                    <span>{isFr ? 'Un thème du jour' : 'Um tema do dia'}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 font-bold shrink-0" />
                    <span>{isFr ? 'Une passage ou verset biblique' : 'Uma passagem ou versículo bíblico'}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 font-bold shrink-0" />
                    <span>{isFr ? 'Une réflexion chrétienne' : 'Uma reflexão cristã'}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 font-bold shrink-0" />
                    <span>{isFr ? 'Une prière liée au thème' : 'Uma oração relacionada ao tema'}</span>
                  </li>
                </ul>
              </div>

              {/* TABLEAU RÉCAPITULATIF OBLIGATOIRE */}
              <div className="grid grid-cols-2 gap-2 text-xs text-slate-700 pt-3 border-t border-amber-200/80">
                <div><strong>{isFr ? 'Quantité :' : 'Quantidade :'}</strong> 30 {isFr ? 'dévotions' : 'devocionais'}</div>
                <div><strong>{isFr ? 'Format :' : 'Formato :'}</strong> {isFr ? 'Livre numérique' : 'Livro digital'}</div>
                <div><strong>{isFr ? 'Usage suggéré :' : 'Uso sugerido :'}</strong> {isFr ? '1 dévotion par jour' : '1 devocional por dia'}</div>
                <div><strong>{isFr ? 'Durée suggérée :' : 'Duração sugerida :'}</strong> {isFr ? '30 jours' : '30 dias'}</div>
                <div><strong>{isFr ? 'Livraison :' : 'Entrega :'}</strong> {isFr ? 'Numérique' : 'Digital'}</div>
                <div><strong>{isFr ? 'Produit physique :' : 'Produto físico :'}</strong> {isFr ? 'Non' : 'Não'}</div>
                <div><strong>{isFr ? 'Abonnement :' : 'Assinatura :'}</strong> {isFr ? 'Non' : 'Não'}</div>
                <div><strong>{isFr ? 'Prélèvement récurrent :' : 'Cobrança recorrente :'}</strong> {isFr ? 'Non' : 'Não'}</div>
              </div>
            </div>

            {/* PRIX ET BOUTON D'ACTION */}
            <div className="space-y-3">
              <div className="flex items-baseline justify-center sm:justify-start gap-2">
                <span className="text-4xl sm:text-5xl font-serif font-bold text-amber-950">€50</span>
                <span className="text-sm font-semibold text-slate-600 uppercase tracking-wide">
                  {isFr ? 'Paiement unique' : 'Pagamento único'}
                </span>
              </div>

              <a
                href={CHECKOUT_URL}
                className="w-full inline-flex items-center justify-center px-6 py-4 text-base sm:text-lg font-bold text-white bg-amber-800 hover:bg-amber-900 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 text-center tracking-wide group"
              >
                <span>{isFr ? 'JE VEUX ACCÉDER À L’OFFRE DE MIRACLES' : 'QUERO ACESSAR O OFERTA DE MILAGRES'}</span>
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>

              <p className="text-xs text-center text-slate-500 font-medium">
                {isFr
                  ? 'Produit 100 % numérique • 14 jours de garantie • Sans abonnement'
                  : 'Produto 100% digital • 14 dias de garantia • Sem assinatura'}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 2. SECTION — O QUE É O OFERTA DE MILAGRES? */}
      <section className="py-14 bg-white border-y border-amber-950/10 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-xs font-semibold tracking-wider uppercase text-amber-800">
              {isFr ? 'Clarté Absolue' : 'Clareza Absoluta'}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-slate-900 mt-1">
              {isFr ? 'Qu’est-ce que l’Offre de Miracles ?' : 'O que é o Oferta de Milagres?'}
            </h2>
          </div>

          <div className="bg-amber-50/50 rounded-2xl p-6 sm:p-8 border border-amber-200/70 text-slate-700 leading-relaxed space-y-4 text-base sm:text-lg">
            <p className="font-semibold text-slate-900 text-lg sm:text-xl">
              {isFr
                ? 'Offre de Miracles est un livre numérique chrétien composé de 30 dévotions organisées en 30 jours.'
                : 'Oferta de Milagres é um livro digital cristão composto por 30 devocionais organizados em 30 dias.'}
            </p>
            <p>
              {isFr
                ? 'Chaque jour présente un thème différent accompagné par un passage biblique, une réflexion et une prière.'
                : 'Cada dia apresenta um tema diferente acompanhado por uma passagem bíblica, uma reflexão e uma oração.'}
            </p>
            
            <div className="bg-white p-5 rounded-xl border border-amber-200/90 my-4 text-amber-950 font-medium text-center sm:text-left shadow-2xs">
              <p className="text-base sm:text-lg leading-snug">
                {isFr ? (
                  <>La proposition est simple : <strong>ouvrir le livre, accéder à la dévotion correspondant au jour et réserver quelques minutes pour la lecture, la prière et la réflexion.</strong></>
                ) : (
                  <>A proposta é simples : <strong>abrir o material, acessar o devocional correspondente ao dia e reservar alguns minutos para leitura, oração e reflexão.</strong></>
                )}
              </p>
            </div>

            <p className="text-slate-600">
              {isFr
                ? 'Le contenu peut être consulté numériquement sur des appareils compatibles, tels qu’un téléphone portable, une tablette ou un ordinateur.'
                : 'O conteúdo pode ser acessado digitalmente por dispositivos compatíveis, como celular, tablet ou computador.'}
            </p>

            <p className="text-sm font-bold text-amber-900 pt-2 border-t border-amber-200/60">
              {isFr ? 'Aucun produit physique ne sera envoyé.' : 'Nenhum produto físico será enviado.'}
            </p>
          </div>
        </div>
      </section>

      {/* 3. SECTION — O QUE EXISTE EM CADA DEVOCIONAL? */}
      <section className="py-14 px-4 sm:px-6 max-w-5xl mx-auto">
        <div className="text-center mb-10 max-w-2xl mx-auto">
          <span className="text-xs font-semibold tracking-wider uppercase text-amber-800">
            {isFr ? 'Structure Harmonieuse' : 'Estrutura Padrão'}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-slate-900 mt-1 mb-3">
            {isFr ? 'Chaque jour possède une dévotion complète' : 'Cada dia possui um devocional completo'}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            {isFr
              ? 'Une structure équilibrée pensée pour des moments de calme sans précipitation.'
              : 'Uma divisão harmoniosa e clara pensada para momentos de introspecção sem pressa.'}
          </p>
        </div>

        {/* LES 4 CARTES OBLIGATOIRES */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mb-4">
              <Sun className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-slate-900 text-lg mb-2">
              {isFr ? 'Thème du jour' : 'Tema do dia'}
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {isFr
                ? 'Chaque dévotion aborde un thème lié à la foi et à la vie quotidienne.'
                : 'Cada devocional aborda um tema relacionado à fé e à vida cotidiana.'}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mb-4">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-slate-900 text-lg mb-2">
              {isFr ? 'Passage biblique' : 'Passagem bíblica'}
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {isFr
                ? 'Un passage ou verset biblique lié au sujet de ce jour.'
                : 'Uma passagem ou versículo bíblico relacionado ao assunto daquele dia.'}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mb-4">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-slate-900 text-lg mb-2">
              {isFr ? 'Réflexion' : 'Reflexão'}
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {isFr
                ? 'Un texte dévotionnel pour accompagner la lecture et stimuler la réflexion personnelle.'
                : 'Um texto devocional para acompanhar a leitura e estimular a reflexão pessoal.'}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mb-4">
              <Heart className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-slate-900 text-lg mb-2">
              {isFr ? 'Prière' : 'Oração'}
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {isFr
                ? 'Une prière courte liée au thème du jour.'
                : 'Uma oração curta relacionada ao tema do dia.'}
            </p>
          </div>

        </div>

        <div className="bg-amber-100/70 border border-amber-300/80 rounded-xl p-4 text-center max-w-xl mx-auto shadow-2xs">
          <span className="text-sm font-bold text-amber-950 flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-800 shrink-0" />
            {isFr
              ? 'Ce sont 30 dévotions complètes suivant cette structure.'
              : 'São 30 devocionais completos seguindo essa estrutura.'}
          </span>
        </div>
      </section>

      {/* 4. SEÇÃO — OS 30 DIAS (AFFICHAGE COMPLET DES 30 THÈMES) */}
      <section className="py-14 bg-white border-t border-amber-950/10 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 max-w-2xl mx-auto">
            <span className="text-xs font-semibold tracking-wider uppercase text-amber-800">
              {isFr ? 'Contenu Intégral' : 'Conteúdo Integral'}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-slate-900 mt-1 mb-3">
              {isFr ? 'Découvrez les 30 thèmes de l’Offre de Miracles' : 'Conheça os 30 temas do Oferta de Milagres'}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              {isFr
                ? 'Découvrez chacun des 30 contenus prévus dans le livre numérique :'
                : 'Veja exatamente cada um dos 30 conteúdos presentes no livro digital :'}
            </p>
          </div>

          {/* LISTE DES 30 JOURS EXACTS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {ALL_30_DAYS.map((item) => (
              <div
                key={item.day}
                className="bg-[#FAF8F5] p-5 rounded-xl border border-amber-900/10 hover:border-amber-700/30 transition-all shadow-2xs"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100/90 px-2 py-0.5 rounded">
                    {isFr ? `Jour ${item.day}` : `Dia ${item.day}`}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    {isFr ? 'Dévotion' : 'Devocional'}
                  </span>
                </div>
                <h3 className="font-serif font-bold text-slate-900 text-lg mb-1">
                  {isFr ? item.themeFr : item.themePt}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {isFr ? item.descFr : item.descPt}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-amber-900 text-amber-100 rounded-2xl p-6 text-center shadow-md max-w-xl mx-auto">
            <p className="text-base sm:text-lg font-serif font-bold tracking-wide">
              {isFr
                ? '30 jours • 30 thèmes • 30 réflexions • 30 prières'
                : '30 dias • 30 temas • 30 reflexões • 30 orações'}
            </p>
          </div>
        </div>
      </section>

      {/* 5. SEÇÃO — AMOSTRA REAL */}
      <section className="py-14 bg-stone-100/80 border-y border-amber-950/10 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-xs font-semibold tracking-wider uppercase text-amber-800">
              {isFr ? 'Exemple Réel' : 'Exemplo Real'}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-slate-900 mt-1 mb-2">
              {isFr ? 'Découvrez à quoi ressemble une dévotion de l’Offre de Miracles' : 'Veja como é um devocional do Oferta de Milagres'}
            </h2>
            <p className="text-slate-600 text-sm">
              {isFr
                ? 'Démonstration visuelle fidèle de la mise en page d’une lecture quotidienne :'
                : 'Demonstração visual fiel da formatação de uma leitura diária :'}
            </p>
          </div>

          {/* PAGE DU DEVOCIONAL DU JOUR 1 */}
          <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-300 shadow-lg relative overflow-hidden">
            
            <div className="border-b border-slate-200 pb-5 mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <span className="text-xs font-bold text-amber-800 tracking-wider uppercase">
                  {isFr ? 'Extrait du livre' : 'Amostra do Livro'}
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                  {isFr ? 'JOUR 1 — LA GRATITUDE' : 'DIA 1 — GRATIDÃO'}
                </h3>
              </div>
              <span className="text-xs bg-stone-100 text-stone-600 px-3 py-1 rounded-full border border-stone-200 self-start sm:self-auto font-medium">
                {isFr ? 'Lecture estimée : 3 min' : 'Leitura estimada: 3 min'}
              </span>
            </div>

            <div className="space-y-6 text-slate-700 text-base leading-relaxed">
              
              {/* PASSAGE BIBLIQUE */}
              <div className="bg-amber-50/80 p-4 sm:p-5 rounded-xl border-l-4 border-amber-800 text-slate-800">
                <h4 className="text-xs uppercase font-bold tracking-wider text-amber-900 mb-1.5">
                  {isFr ? 'Passage biblique' : 'Passagem bíblica'}
                </h4>
                <p className="font-serif italic text-base sm:text-lg mb-1">
                  {isFr
                    ? '« Rendez grâces en toutes choses, car c’est à votre égard la volonté de Dieu en Jésus-Christ. »'
                    : '« Em tudo dai graças, porque esta é a vontade de Deus em Cristo Jesus para convosco. »'}
                </p>
                <span className="text-xs font-semibold text-amber-900">
                  — {isFr ? '1 Thessaloniciens 5:18' : '1 Tessalonicenses 5:18'}
                </span>
              </div>

              {/* RÉFLEXION */}
              <div>
                <h4 className="text-xs uppercase font-bold tracking-wider text-amber-900 mb-2">
                  {isFr ? 'Réflexion' : 'Reflexão'}
                </h4>
                <div className="space-y-3">
                  {isFr ? (
                    <>
                      <p>Dans la précipitation du quotidien, nous concentrons souvent notre attention sur ce que nous souhaitons encore obtenir et nous oublions d’observer ce qui est déjà présent.</p>
                      <p>Prendre quelques minutes pour reconnaître les personnes, les moments et les petites expériences positives peut rendre notre routine de réflexion beaucoup plus significative.</p>
                      <p>Aujourd’hui, pensez à trois choses pour lesquelles vous éprouvez de la gratitude.</p>
                      <p>Il n’est pas nécessaire qu’il s’agisse de grands événements.</p>
                      <p>Ce qui semble simple a également une immense valeur.</p>
                    </>
                  ) : (
                    <>
                      <p>Na correria do cotidiano, muitas vezes concentramos nossa atenção naquilo que ainda queremos alcançar e esquecemos de observar aquilo que já está presente.</p>
                      <p>Reservar alguns minutos para reconhecer pessoas, momentos e pequenas experiências positivas pode tornar nossa rotina de reflexão mais significativa.</p>
                      <p>Hoje, pense em três coisas pelas quais você sente gratidão.</p>
                      <p>Não precisam ser grandes acontecimentos.</p>
                      <p>Aquilo que parece simples também pode ter valor.</p>
                    </>
                  )}
                </div>
              </div>

              {/* PRIÈRE */}
              <div>
                <h4 className="text-xs uppercase font-bold tracking-wider text-amber-900 mb-2">
                  {isFr ? 'Prière' : 'Oração'}
                </h4>
                <p className="italic text-slate-600 bg-stone-50 p-4 rounded-xl border border-stone-200 text-sm sm:text-base leading-relaxed">
                  {isFr
                    ? '“Seigneur, je Te remercie pour ce jour et pour tout ce qui fait partie de ma marche. Aide-moi à discerner avec plus de gratitude les personnes, les opportunités et les petits moments présents dans ma vie. Amen.”'
                    : '“Senhor, agradeço por este dia e por tudo aquilo que faz parte da minha caminhada. Ajuda-me a perceber com mais gratidão as pessoas, oportunidades e pequenos momentos presentes na minha vida. Amém.”'}
                </p>
              </div>

            </div>

          </div>

          <p className="text-center text-xs sm:text-sm font-semibold text-slate-600 mt-5">
            {isFr
              ? 'Toutes les 30 dévotions suivent une structure similaire, avec des thèmes variés.'
              : 'Todos os 30 devocionais seguem uma estrutura semelhante, com temas diferentes.'}
          </p>

        </div>
      </section>

      {/* 6. SEÇÃO — COMO UTILIZAR */}
      <section className="py-14 bg-white border-y border-amber-950/10 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10 max-w-2xl mx-auto">
            <span className="text-xs font-semibold tracking-wider uppercase text-amber-800">
              {isFr ? 'Pratique Simple' : 'Passo a Passo'}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-slate-900 mt-1 mb-3">
              {isFr ? 'Comment utiliser l’Offre de Miracles' : 'Como utilizar o Oferta de Milagres'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-[#FAF8F5] p-6 rounded-2xl border border-amber-900/10 text-center shadow-2xs">
              <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-800 font-bold mx-auto mb-3 flex items-center justify-center text-sm">
                1
              </div>
              <h3 className="font-serif font-bold text-slate-900 text-base mb-2">
                {isFr ? 'Ouvrez la dévotion du jour' : 'Abra o devocional do dia'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {isFr
                  ? 'Choisissez le contenu correspondant à votre séquence de lecture.'
                  : 'Escolha o conteúdo correspondente à sua sequência de leitura.'}
              </p>
            </div>

            <div className="bg-[#FAF8F5] p-6 rounded-2xl border border-amber-900/10 text-center shadow-2xs">
              <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-800 font-bold mx-auto mb-3 flex items-center justify-center text-sm">
                2
              </div>
              <h3 className="font-serif font-bold text-slate-900 text-base mb-2">
                {isFr ? 'Lisez le passage et la réflexion' : 'Leia a passagem e a reflexão'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {isFr
                  ? 'Réservez quelques minutes pour vous imprégner du contenu.'
                  : 'Reserve alguns minutos para acompanhar o conteúdo.'}
              </p>
            </div>

            <div className="bg-[#FAF8F5] p-6 rounded-2xl border border-amber-900/10 text-center shadow-2xs">
              <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-800 font-bold mx-auto mb-3 flex items-center justify-center text-sm">
                3
              </div>
              <h3 className="font-serif font-bold text-slate-900 text-base mb-2">
                {isFr ? 'Concluez par la prière' : 'Finalize com a oração'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {isFr
                  ? 'Utilisez la prière présentée à la fin de cette dévotion.'
                  : 'Utilize a oração apresentada ao final daquele devocional.'}
              </p>
            </div>
          </div>

          <p className="text-center text-xs sm:text-sm text-slate-600">
            {isFr
              ? 'Vous pouvez suivre une dévotion par jour pendant 30 jours ou effectuer vos lectures à votre propre rythme.'
              : 'Você pode seguir um devocional por dia durante 30 dias ou realizar as leituras no seu próprio ritmo.'}
          </p>
        </div>
      </section>

      {/* 7. SEÇÃO — PARA QUEM É */}
      <section className="py-14 px-4 sm:px-6 max-w-4xl mx-auto">
        <div className="text-center mb-8 max-w-2xl mx-auto">
          <span className="text-xs font-semibold tracking-wider uppercase text-amber-800">
            {isFr ? 'Pour Vous' : 'Perfil do Leitor'}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-slate-900 mt-1 mb-2">
            {isFr ? 'À qui s’adresse l’Offre de Miracles ?' : 'Para quem é o Oferta de Milagres?'}
          </h2>
        </div>

        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs max-w-2xl mx-auto">
          <ul className="space-y-3.5 text-sm sm:text-base text-slate-700">
            <li className="flex items-center gap-3">
              <Check className="w-5 h-5 text-emerald-600 shrink-0 font-bold" />
              <span>{isFr ? 'Pour ceux qui souhaitent instaurer une routine dévotionnelle' : 'Para quem deseja começar uma rotina devocional'}</span>
            </li>
            <li className="flex items-center gap-3">
              <Check className="w-5 h-5 text-emerald-600 shrink-0 font-bold" />
              <span>{isFr ? 'Pour ceux qui veulent réserver quelques minutes pour la prière' : 'Para quem quer reservar alguns minutos para oração'}</span>
            </li>
            <li className="flex items-center gap-3">
              <Check className="w-5 h-5 text-emerald-600 shrink-0 font-bold" />
              <span>{isFr ? 'Pour ceux qui apprécient les lectures chrétiennes' : 'Para quem gosta de leituras cristãs'}</span>
            </li>
            <li className="flex items-center gap-3">
              <Check className="w-5 h-5 text-emerald-600 shrink-0 font-bold" />
              <span>{isFr ? 'Pour ceux qui recherchent des réflexions courtes pour le quotidien' : 'Para quem procura reflexões curtas para o cotidiano'}</span>
            </li>
            <li className="flex items-center gap-3">
              <Check className="w-5 h-5 text-emerald-600 shrink-0 font-bold" />
              <span>{isFr ? 'Pour ceux qui souhaitent suivre un contenu structuré pendant 30 jours' : 'Para quem deseja acompanhar um conteúdo organizado durante 30 dias'}</span>
            </li>
            <li className="flex items-center gap-3">
              <Check className="w-5 h-5 text-emerald-600 shrink-0 font-bold" />
              <span>{isFr ? 'Pour ceux qui préfèrent lire à leur propre rythme' : 'Para quem prefere fazer suas leituras no próprio ritmo'}</span>
            </li>
          </ul>
        </div>
      </section>

      {/* 8. SEÇÃO — ENTREGA */}
      <section className="py-14 bg-white border-y border-amber-950/10 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10 max-w-2xl mx-auto">
            <span className="text-xs font-semibold tracking-wider uppercase text-amber-800">
              {isFr ? 'Livraison Numérique' : 'Entrega Digital'}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-slate-900 mt-1 mb-3">
              {isFr ? 'Comment recevez-vous le produit ?' : 'Como você recebe o produto?'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-[#FAF8F5] p-6 rounded-2xl border border-amber-900/10 text-center shadow-2xs">
              <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-800 font-bold mx-auto mb-3 flex items-center justify-center text-sm">
                1
              </div>
              <h3 className="font-serif font-bold text-slate-900 text-base mb-2">
                {isFr ? 'Finalisez votre achat' : 'Finalize sua compra'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {isFr ? 'Effectuez le paiement via le formulaire de commande sécurisé.' : 'Realize o pagamento pelo formulário de pedido.'}
              </p>
            </div>

            <div className="bg-[#FAF8F5] p-6 rounded-2xl border border-amber-900/10 text-center shadow-2xs">
              <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-800 font-bold mx-auto mb-3 flex items-center justify-center text-sm">
                2
              </div>
              <h3 className="font-serif font-bold text-slate-900 text-base mb-2">
                {isFr ? 'Attendez la confirmation' : 'Aguarde a confirmação'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {isFr ? 'Après validation du paiement, vous recevrez vos consignes d’accès par e-mail.' : 'Depois da confirmação do pagamento, você receberá as instruções de acesso.'}
              </p>
            </div>

            <div className="bg-[#FAF8F5] p-6 rounded-2xl border border-amber-900/10 text-center shadow-2xs">
              <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-800 font-bold mx-auto mb-3 flex items-center justify-center text-sm">
                3
              </div>
              <h3 className="font-serif font-bold text-slate-900 text-base mb-2">
                {isFr ? 'Accédez à votre livre numérique' : 'Acesse seu livro digital'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {isFr ? 'Ouvrez l’Offre de Miracles et commencez dès la première dévotion.' : 'Abra o Oferta de Milagres e comece pelo primeiro devocional.'}
              </p>
            </div>
          </div>

          {/* BOX RÉCAPITULATIF */}
          <div className="bg-[#FAF8F5] p-6 rounded-2xl border border-amber-900/10 max-w-xl mx-auto shadow-xs text-xs sm:text-sm text-slate-700 space-y-2">
            <div className="flex justify-between border-b border-amber-900/10 pb-1.5">
              <strong>{isFr ? 'Produit :' : 'Produto :'}</strong> <span>{isFr ? 'Offre de Miracles' : 'Oferta de Milagres'}</span>
            </div>
            <div className="flex justify-between border-b border-amber-900/10 pb-1.5">
              <strong>{isFr ? 'Description :' : 'Descrição :'}</strong> <span>{isFr ? '30 Dévotions Chrétiennes pour 30 Jours de Prière et de Réflexion' : '30 Devocionais Cristãos para 30 Dias de Oração e Reflexão'}</span>
            </div>
            <div className="flex justify-between border-b border-amber-900/10 pb-1.5">
              <strong>{isFr ? 'Quantité :' : 'Quantidade :'}</strong> <span>30 {isFr ? 'dévotions' : 'devocionais'}</span>
            </div>
            <div className="flex justify-between border-b border-amber-900/10 pb-1.5">
              <strong>{isFr ? 'Format :' : 'Formato :'}</strong> <span>{isFr ? 'Livre numérique' : 'Livro digital'}</span>
            </div>
            <div className="flex justify-between border-b border-amber-900/10 pb-1.5">
              <strong>{isFr ? 'Livraison :' : 'Entrega :'}</strong> <span>{isFr ? 'Numérique' : 'Digital'}</span>
            </div>
            <div className="flex justify-between border-b border-amber-900/10 pb-1.5">
              <strong>{isFr ? 'Produit physique :' : 'Produto físico :'}</strong> <span>{isFr ? 'Non' : 'Não'}</span>
            </div>
            <div className="flex justify-between border-b border-amber-900/10 pb-1.5">
              <strong>{isFr ? 'Abonnement :' : 'Assinatura :'}</strong> <span>{isFr ? 'Non' : 'Não'}</span>
            </div>
            <div className="flex justify-between border-b border-amber-900/10 pb-1.5">
              <strong>{isFr ? 'Prélèvement récurrent :' : 'Cobrança recorrente :'}</strong> <span>{isFr ? 'Non' : 'Não'}</span>
            </div>
            <div className="flex justify-between pt-1 font-bold text-slate-900">
              <strong>{isFr ? 'Prix :' : 'Preço :'}</strong> <span className="text-amber-900">€50</span>
            </div>
          </div>

        </div>
      </section>

      {/* 9. BLOCO DE PREÇO */}
      <section id="checkout" className="py-16 px-4 sm:px-6">
        <div className="max-w-xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border-2 border-amber-800/30 shadow-xl text-center">
          
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 mb-2">
            {isFr ? 'Offre de Miracles' : 'Oferta de Milagres'}
          </h2>

          <h3 className="text-base sm:text-lg font-serif font-semibold text-amber-950 mb-6">
            {isFr ? '30 Dévotions Chrétiennes pour 30 Jours de Prière et de Réflexion' : '30 Devocionais Cristãos para 30 Dias de Oração e Reflexão'}
          </h3>

          <div className="mb-6">
            <div className="text-5xl font-serif font-bold text-amber-950 mb-1">
              €50
            </div>
            <p className="text-xs uppercase tracking-wider text-slate-500 font-semibold">
              {isFr ? 'Paiement unique' : 'Pagamento único'}
            </p>
          </div>

          <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-amber-900/10 text-left mb-6 space-y-2 text-sm text-slate-700">
            <p className="font-bold text-slate-900 mb-2">{isFr ? 'Vous recevez :' : 'Você recebe :'}</p>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600 shrink-0 font-bold" />
              <span>{isFr ? '1 livre numérique' : '1 livro digital'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600 shrink-0 font-bold" />
              <span>{isFr ? '30 dévotions chrétiennes' : '30 devocionais cristãos'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600 shrink-0 font-bold" />
              <span>{isFr ? '30 réflexions' : '30 reflexões'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600 shrink-0 font-bold" />
              <span>{isFr ? '30 prières' : '30 orações'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600 shrink-0 font-bold" />
              <span>{isFr ? 'Passages bibliques liés aux thèmes' : 'Passagens bíblicas relacionadas aos temas'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600 shrink-0 font-bold" />
              <span>{isFr ? 'Contenu organisé en 30 jours' : 'Conteúdo organizado em 30 dias'}</span>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-slate-500 font-medium mb-6">
            <span>• {isFr ? 'Sans mensualité' : 'Sem mensalidade'}</span>
            <span>• {isFr ? 'Sans prélèvement récurrent' : 'Sem cobrança recorrente'}</span>
            <span>• {isFr ? 'Produit numérique' : 'Produto digital'}</span>
            <span>• {isFr ? '14 jours de garantie' : '14 dias de garantia'}</span>
          </div>

          <a
            href={CHECKOUT_URL}
            className="w-full inline-flex items-center justify-center px-6 py-4 text-lg font-bold text-white bg-amber-800 hover:bg-amber-900 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 group"
          >
            <span>{isFr ? 'JE VEUX ACCÉDER À L’OFFRE DE MIRACLES' : 'QUERO ACESSAR O OFERTA DE MILAGRES'}</span>
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </a>

        </div>
      </section>

      {/* 10. GARANTIA DE 14 DIAS */}
      <section className="py-14 bg-white border-t border-amber-950/10 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-14 h-14 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mx-auto mb-4 shadow-2xs">
            <ShieldCheck className="w-8 h-8" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 mb-3">
            {isFr ? 'Garantie de 14 jours' : 'Garantia de 14 dias'}
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-4">
            {isFr ? (
              <>Vous pourrez découvrir le contenu de l’<strong>Offre de Miracles</strong> en toute sérénité.</>
            ) : (
              <>Você poderá conhecer o conteúdo do <strong>Oferta de Milagres</strong> com tranquilidade.</>
            )}
          </p>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
            {isFr ? (
              <>Si vous souhaitez demander un remboursement, vous pourrez le faire dans le délai de <strong>14 jours</strong>, conformément aux conditions décrites dans la <a href="/politica-de-devolucao.html" className="text-amber-800 underline font-semibold">Politique de Retour</a> et sur le bon de commande.</>
            ) : (
              <>Caso deseje solicitar uma devolução, você poderá fazê-lo dentro do prazo de <strong>14 dias</strong>, conforme as condições descritas na <a href="/politica-de-devolucao.html" className="text-amber-800 underline font-semibold">Política de Devolução</a> e no formulário de pedido.</>
            )}
          </p>

          <div className="inline-block bg-[#FAF8F5] border border-amber-900/20 py-2 px-4 rounded-full text-xs font-bold text-amber-900 tracking-wider uppercase">
            {isFr ? '14 JOURS DE GARANTIE' : '14 DIAS DE GARANTIA'}
          </div>
        </div>
      </section>

      {/* 11. FAQ (11 QUESTIONS STRICTES DU BRIEF) */}
      <section className="py-14 bg-[#FAF8F5] border-t border-amber-950/10 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold tracking-wider uppercase text-amber-800">
              {isFr ? 'Questions Fréquentes' : 'Tire suas dúvidas'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 mt-1 mb-2">
              {isFr ? 'Foire Aux Questions' : 'Perguntas Frequentes'}
            </h2>
            <p className="text-slate-600 text-sm">
              {isFr
                ? 'Toutes les réponses de manière transparente et sans détour.'
                : 'Tudo explicado de forma objetiva e transparente.'}
            </p>
          </div>

          <div className="space-y-3">
            {[
              {
                qFr: 'Qu’est-ce que j’achète exactement ?',
                qPt: 'O que exatamente estou comprando?',
                aFr: 'Vous achetez l’Offre de Miracles, un livre numérique contenant 30 dévotions chrétiennes.',
                aPt: 'Você está comprando o Oferta de Milagres, um livro digital contendo 30 devocionais cristãos.'
              },
              {
                qFr: 'Combien de dévotions sont incluses ?',
                qPt: 'Quantos devocionais estão incluídos?',
                aFr: 'Exactement 30 dévotions.',
                aPt: 'Exatamente 30 devocionais.'
              },
              {
                qFr: 'Existe-t-il une dévotion pour chaque jour ?',
                qPt: 'Existe um devocional para cada dia?',
                aFr: 'Oui. Le contenu est organisé sur 30 jours, avec une dévotion différente pour chaque jour.',
                aPt: 'Sim. O conteúdo está organizado em 30 dias, com um devocional diferente para cada dia.'
              },
              {
                qFr: 'Que contient chaque dévotion ?',
                qPt: 'O que existe dentro de cada devocional?',
                aFr: 'Chaque dévotion possède un thème, un passage biblique, une réflexion et une prière.',
                aPt: 'Cada devocional possui um tema, uma passagem bíblica, uma reflexão e uma oração.'
              },
              {
                qFr: 'S’agit-il d’un produit physique ?',
                qPt: 'É um produto físico?',
                aFr: 'Non. L’Offre de Miracles est un produit exclusivement numérique.',
                aPt: 'Não. Oferta de Milagres é um produto digital.'
              },
              {
                qFr: 'Vais-je recevoir quelque chose par la poste ?',
                qPt: 'Vou receber algo pelo correio?',
                aFr: 'Non. Aucun colis ni exemplaire papier ne sera envoyé par la poste.',
                aPt: 'Não.'
              },
              {
                qFr: 'S’agit-il d’un abonnement ?',
                qPt: 'É uma assinatura?',
                aFr: 'Non.',
                aPt: 'Não.'
              },
              {
                qFr: 'Existe-t-il un prélèvement récurrent ?',
                qPt: 'Existe cobrança recorrente?',
                aFr: 'Non. Le paiement est unique, d’un montant de 50 €.',
                aPt: 'Não. O pagamento é único, no valor de €50.'
              },
              {
                qFr: 'Comment puis-je recevoir mon accès ?',
                qPt: 'Como recebo meu acesso?',
                aFr: 'Après confirmation du paiement, vous recevrez les instructions par e-mail pour accéder au contenu numérique.',
                aPt: 'Após a confirmação do pagamento, você receberá as instruções para acessar o conteúdo digital.'
              },
              {
                qFr: 'Existe-t-il une garantie ?',
                qPt: 'Existe garantia?',
                aFr: 'Oui. L’achat bénéficie d’une garantie de 14 jours, conformément à la Politique de Retour et aux conditions présentées sur le bon de commande.',
                aPt: 'Sim. A compra possui garantia de 14 dias, conforme a Política de Devolução e as condições apresentadas no pedido.'
              },
              {
                qFr: 'Le produit garantit-il des miracles ?',
                qPt: 'O produto garante milagres?',
                aFr: 'Non. « Offre de Miracles » est le titre commercial de ce recueil dévotionnel chrétien. Le contenu possède une finalité spirituelle et d’édification personnelle et ne promet aucun résultat surnaturel, matériel ou médical garanti.',
                aPt: 'Não. “Oferta de Milagres” é o nome comercial do produto. O conteúdo possui finalidade cristã, devocional e inspiracional e não garante qualquer resultado específico.'
              }
            ].map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={index} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-4 sm:p-5 text-left font-serif font-bold text-slate-900 flex justify-between items-center text-sm sm:text-base focus:outline-hidden cursor-pointer"
                  >
                    <span>{isFr ? faq.qFr : faq.qPt}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-amber-800 shrink-0 transform transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100 pt-3">
                      {isFr ? faq.aFr : faq.aPt}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 12. AVISO LEGAL */}
      <section className="py-8 bg-amber-50/60 border-t border-amber-900/10 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center text-xs text-slate-600 leading-relaxed">
          <p>
            {isFr ? (
              <><strong>Avis :</strong> L’Offre de Miracles est un livre numérique chrétien de méditation, de prière et de réflexion personnelle. Le titre du produit ne constitue en aucun cas une promesse ou garantie d’obtention de miracles matériels, de guérison médicale, ou de gains financiers.</>
            ) : (
              <><strong>Aviso :</strong> Oferta de Milagres é um livro digital de conteúdo cristão, devocional e inspiracional. O nome comercial do produto não representa promessa ou garantia de obtenção de milagres ou de resultados espirituais, financeiros, médicos ou de qualquer outra natureza.</>
            )}
          </p>
        </div>
      </section>

      {/* 13. RODAPÉ COMPLETO COM LINKS PARA OS ARQUIVOS LEGAIS */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-4 sm:px-6 text-xs border-t border-slate-800">
        <div className="max-w-5xl mx-auto space-y-6 text-center">
          
          <h4 className="font-serif text-white font-bold text-base">
            {isFr ? 'Offre de Miracles' : 'Oferta de Milagres'}
          </h4>

          {/* LIENS VERS LES 6 FICHIERS LÉGAUX */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-slate-300">
            <a href="/politica-de-privacidade.html" className="hover:text-amber-400 transition-colors">
              {isFr ? 'Politique de Confidentialité' : 'Política de Privacidade'}
            </a>
            <a href="/termos-de-uso.html" className="hover:text-amber-400 transition-colors">
              {isFr ? 'Conditions d’Utilisation' : 'Termos de Uso'}
            </a>
            <a href="/politica-de-devolucao.html" className="hover:text-amber-400 transition-colors">
              {isFr ? 'Politique de Remboursement' : 'Política de Devolução'}
            </a>
            <a href="/politica-de-cookies.html" className="hover:text-amber-400 transition-colors">
              {isFr ? 'Politique de Cookies' : 'Política de Cookies'}
            </a>
            <a href="/contato.html" className="hover:text-amber-400 transition-colors">
              {isFr ? 'Contact' : 'Contato'}
            </a>
            <a href="/imprint.html" className="hover:text-amber-400 transition-colors">
              {isFr ? 'Mentions Légales (Imprint)' : 'Imprint / Aviso Legal'}
            </a>
          </div>

          <div className="text-slate-500 pt-4 border-t border-slate-800/80">
            © 2026 {isFr ? 'Offre de Miracles' : 'Oferta de Milagres'}. {isFr ? 'Tous droits réservés.' : 'Todos os direitos reservados.'} {isFr ? 'Opéré par 62.188.147 Loan Fuzari. Traité en toute sécurité par Digistore24.' : 'Operado por 62.188.147 Loan Fuzari. Processado com segurança pela Digistore24.'}
          </div>
        </div>
      </footer>

      {/* BARRE FIXE MOBILE (STICKY CTA) */}
      {showMobileCta && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 p-3 bg-white/95 backdrop-blur border-t border-slate-200 z-40 shadow-lg flex items-center justify-between gap-3">
          <div className="flex flex-col pl-1">
            <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
              {isFr ? 'Tarif unique' : 'Valor único'}
            </span>
            <span className="text-lg font-serif font-bold text-amber-950 leading-none">€50</span>
          </div>
          <a
            href={CHECKOUT_URL}
            className="flex-1 inline-flex items-center justify-center py-3 px-4 text-xs font-bold text-white bg-amber-800 hover:bg-amber-900 rounded-xl shadow-md transition-colors"
          >
            {isFr ? 'Accéder à l’Offre de Miracles' : 'Acessar o Oferta de Milagres'}
          </a>
        </div>
      )}

    </div>
  );
}
