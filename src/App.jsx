import { useState } from "react";
import { BarChart3, Scale, Sun, Fish, IceCream, Crown, ShieldCheck, Eye, EyeOff, Users } from "lucide-react";

/* ---------- utilidades ---------- */
const brl = (v) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
const mean = (a) => a.reduce((s, x) => s + x, 0) / a.length;
const median = (a) => {
  const s = [...a].sort((x, y) => x - y);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
};

const fontStyles = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@500;700;800&family=Source+Serif+4:opsz,wght@8..60,400;8..60,600&display=swap');
.font-display{font-family:'Bricolage Grotesque',system-ui,sans-serif}
.font-body{font-family:'Source Serif 4',Georgia,serif}
@media (prefers-reduced-motion: reduce){*{transition:none!important}}
`;

/* ---------- componentes base ---------- */
function Section({ icon: Icon, title, lead, children }) {
  return (
    <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-10">
      <div className="mb-6 flex items-start gap-4">
        <span className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#14213D] text-white">
          <Icon size={22} aria-hidden />
        </span>
        <div>
          <h2 className="font-display text-2xl font-bold text-[#14213D] sm:text-3xl">{title}</h2>
          <p className="font-body mt-1 max-w-prose text-slate-600">{lead}</p>
        </div>
      </div>
      {children}
    </section>
  );
}

function Lesson({ children }) {
  return (
    <div className="font-body mt-8 rounded-2xl border-l-4 border-[#0F766E] bg-teal-50 p-5 text-[17px] leading-relaxed text-slate-800">
      <p className="font-display mb-1 flex items-center gap-2 font-bold text-[#0F766E]">
        <ShieldCheck size={18} aria-hidden /> Como se defender
      </p>
      {children}
    </div>
  );
}

/* ---------- Seção 1: eixo Y ---------- */
function AxisTrick() {
  const [honest, setHonest] = useState(false);
  const min = honest ? 0 : 94;
  const max = honest ? 100 : 97;
  const data = [
    { name: "Marca A", value: 95, color: "#64748B" },
    { name: "Marca B", value: 96, color: "#D64545" },
  ];
  const ticks = honest ? [0, 25, 50, 75, 100] : [94, 95, 96, 97];
  const h = (v) => ((v - min) / (max - min)) * 100;

  return (
    <Section
      icon={BarChart3}
      title="O truque do eixo Y"
      lead="Um anúncio diz: “A Marca B é muito melhor!”. Olhe o gráfico e depois mude o eixo."
    >
      <div className="flex flex-col gap-6 md:flex-row md:items-end">
        <div className="flex flex-1 gap-3">
          {/* eixo */}
          <div className="relative h-72 w-12 shrink-0 text-right text-sm text-slate-500">
            {ticks.map((t) => (
              <span
                key={t}
                className="absolute right-0 -translate-y-1/2 transition-all duration-500"
                style={{ bottom: `${h(t)}%` }}
              >
                {t}%
              </span>
            ))}
          </div>
          {/* barras */}
          <div className="relative flex h-72 flex-1 items-end justify-around gap-6 border-b-2 border-l-2 border-slate-300 px-6">
            {ticks.map((t) => (
              <div
                key={t}
                className="absolute left-0 right-0 border-t border-dashed border-slate-200 transition-all duration-500"
                style={{ bottom: `${h(t)}%` }}
              />
            ))}
            {data.map((d) => (
              <div key={d.name} className="relative z-10 flex h-full w-full max-w-[120px] flex-col justify-end">
                <span className="font-display mb-1 text-center text-lg font-bold text-slate-700">{d.value}%</span>
                <div
                  className="rounded-t-lg transition-all duration-700 ease-out"
                  style={{ height: `${h(d.value)}%`, background: d.color }}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="md:w-64">
          <button
            onClick={() => setHonest((v) => !v)}
            className="font-display w-full rounded-xl bg-[#14213D] px-5 py-3 font-bold text-white transition hover:bg-[#1f3160] focus:outline-none focus-visible:ring-4 focus-visible:ring-teal-400"
          >
            {honest ? "Mostrar versão manipulada" : "Mostrar versão honesta"}
          </button>
          <p
            className={`font-display mt-3 rounded-lg px-3 py-2 text-sm font-bold ${
              honest ? "bg-teal-100 text-teal-800" : "bg-red-100 text-red-700"
            }`}
          >
            {honest
              ? "Eixo de 0% a 100%: a diferença real é de 1 ponto percentual."
              : "Eixo de 94% a 97%: a Marca B parece ter o dobro da altura!"}
          </p>
        </div>
      </div>

      <Lesson>
        <p>
          Quando o eixo vertical começa em 94% em vez de 0%, a parte “cortada” some e só sobra a diferença
          mínima, esticada para ocupar a tela. O olho compara <em>alturas</em>, não números, e conclui que uma
          barra é o dobro da outra. Nos dois gráficos os valores são os mesmos (95% e 96%). Sempre olhe onde o
          eixo começa antes de acreditar no tamanho das barras.
        </p>
      </Lesson>
    </Section>
  );
}

/* ---------- Seção 2: média vs mediana ---------- */
function MeanMedian() {
  const base = [2000, 2500, 3000, 3500, 4000];
  const [withCeo, setWithCeo] = useState(false);
  const salaries = withCeo ? [...base, 500000] : base;
  const avg = mean(salaries);
  const med = median(salaries);

  return (
    <Section
      icon={Scale}
      title="A ilusão da média vs. mediana"
      lead="Uma empresa diz: “Nosso salário médio é altíssimo!”. Será que é verdade para você?"
    >
      <ul className="mb-6 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-6">
        {salaries.map((s, i) => (
          <li
            key={i}
            className={`font-display flex items-center justify-center gap-1 rounded-xl px-3 py-3 text-center font-bold ${
              s > 100000 ? "bg-amber-300 text-[#14213D]" : "bg-slate-100 text-slate-700"
            }`}
          >
            {s > 100000 ? <Crown size={16} aria-hidden /> : <Users size={16} aria-hidden />}
            {brl(s)}
          </li>
        ))}
      </ul>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className={`rounded-2xl p-6 transition-colors duration-500 ${withCeo ? "bg-red-50 ring-2 ring-red-300" : "bg-slate-50 ring-1 ring-slate-200"}`}>
          <p className="font-display text-sm font-bold text-slate-500">Média</p>
          <p className={`font-display text-4xl font-extrabold transition-colors sm:text-5xl ${withCeo ? "text-red-600" : "text-[#14213D]"}`}>
            {brl(avg)}
          </p>
          <p className="font-body mt-2 text-sm text-slate-600">Soma de tudo dividida pelo número de pessoas.</p>
        </div>
        <div className="rounded-2xl bg-teal-50 p-6 ring-2 ring-teal-300">
          <p className="font-display text-sm font-bold text-slate-500">Mediana</p>
          <p className="font-display text-4xl font-extrabold text-[#0F766E] sm:text-5xl">{brl(med)}</p>
          <p className="font-body mt-2 text-sm text-slate-600">O valor do meio quando todos são colocados em ordem.</p>
        </div>
      </div>

      <button
        onClick={() => setWithCeo((v) => !v)}
        className="font-display mt-6 rounded-xl bg-[#14213D] px-5 py-3 font-bold text-white transition hover:bg-[#1f3160] focus:outline-none focus-visible:ring-4 focus-visible:ring-teal-400"
      >
        {withCeo ? "Remover CEO" : "Adicionar CEO (R$ 500.000)"}
      </button>

      <Lesson>
        <p>
          A média é sensível a <strong>outliers</strong>, valores muito fora do padrão. Um único salário de
          R$ 500.000 puxa a média para perto de R$ 86 mil, um valor que nenhum funcionário comum recebe. A
          mediana só olha para a posição central, então quase não se mexe e mostra o que a maioria realmente
          ganha. Ao ler dados de salário, renda ou preço de imóveis, procure pela mediana.
        </p>
      </Lesson>
    </Section>
  );
}

/* ---------- Seção 3: correlação ---------- */
function Correlation() {
  const [reveal, setReveal] = useState(false);
  const months = ["Jan", "Mar", "Mai", "Jul", "Set", "Nov"];
  const icecream = [90, 60, 25, 15, 40, 80];
  const sharks = [85, 55, 20, 12, 38, 78];
  const x = (i) => 30 + i * 52;
  const y = (v) => 130 - v * 1.1;
  const line = (arr) => arr.map((v, i) => `${x(i)},${y(v)}`).join(" ");

  return (
    <Section
      icon={Fish}
      title="Correlação não é causalidade"
      lead="Quando as vendas de sorvete sobem, os ataques de tubarão também. O sorvete atrai tubarões?"
    >
      <div className="rounded-2xl border-2 border-dashed border-amber-400 bg-amber-50 p-5 sm:p-6">
        <p className="font-display mb-4 flex items-center gap-2 font-bold text-amber-800">
          <IceCream size={20} aria-hidden /> Alerta de curiosidade: sorvete × tubarões
        </p>

        <svg viewBox="0 0 340 170" className="w-full max-w-xl" role="img" aria-label="Vendas de sorvete e ataques de tubarão variando juntos ao longo do ano">
          <line x1="20" y1="130" x2="330" y2="130" stroke="#CBD5E1" strokeWidth="2" />
          <polyline points={line(icecream)} fill="none" stroke="#D64545" strokeWidth="3" strokeLinejoin="round" />
          <polyline points={line(sharks)} fill="none" stroke="#14213D" strokeWidth="3" strokeLinejoin="round" strokeDasharray="6 4" />
          {months.map((m, i) => (
            <text key={m} x={x(i)} y="150" textAnchor="middle" fontSize="11" fill="#64748B">{m}</text>
          ))}
        </svg>
        <div className="font-body mb-4 flex flex-wrap gap-4 text-sm text-slate-700">
          <span className="flex items-center gap-2"><span className="h-1 w-6 rounded bg-[#D64545]" /> Vendas de sorvete</span>
          <span className="flex items-center gap-2"><span className="h-1 w-6 rounded border-t-2 border-dashed border-[#14213D]" /> Ataques de tubarão</span>
        </div>

        <button
          onClick={() => setReveal((v) => !v)}
          className="font-display inline-flex items-center gap-2 rounded-xl bg-[#14213D] px-5 py-3 font-bold text-white transition hover:bg-[#1f3160] focus:outline-none focus-visible:ring-4 focus-visible:ring-teal-400"
        >
          {reveal ? <EyeOff size={18} aria-hidden /> : <Eye size={18} aria-hidden />}
          {reveal ? "Esconder variável oculta" : "Revelar variável oculta"}
        </button>

        {reveal && (
          <div className="font-display mt-4 flex flex-wrap items-center justify-center gap-3 rounded-xl bg-white p-4 text-center font-bold text-[#14213D] ring-1 ring-amber-300">
            <span className="flex items-center gap-1 text-red-600"><IceCream size={20} aria-hidden /> Sorvete</span>
            <span className="text-slate-400">←</span>
            <span className="flex items-center gap-1 rounded-lg bg-amber-300 px-3 py-2"><Sun size={20} aria-hidden /> Verão e calor</span>
            <span className="text-slate-400">→</span>
            <span className="flex items-center gap-1"><Fish size={20} aria-hidden /> Tubarões</span>
          </div>
        )}
      </div>

      <Lesson>
        <p>
          Duas coisas que variam juntas têm <strong>correlação</strong>, mas isso não prova que uma causa a
          outra. Aqui existe uma terceira variável oculta, o verão: com calor, mais gente compra sorvete e mais
          gente entra no mar, o que aumenta o contato com tubarões. Diante de “X aumenta quando Y aumenta”,
          pergunte: existe algo por trás dos dois?
        </p>
      </Lesson>
    </Section>
  );
}

/* ---------- App ---------- */
export default function App() {
  return (
    <div className="min-h-screen bg-[#EEF1F5] text-slate-900">
      <style>{fontStyles}</style>

      <header className="bg-[#14213D] px-6 py-16 text-white sm:py-24">
        <div className="mx-auto max-w-4xl">
          <p className="font-display mb-4 inline-flex items-center gap-2 rounded-full bg-amber-300 px-4 py-1 text-sm font-bold text-[#14213D]">
            <ShieldCheck size={16} aria-hidden /> Projeto de Estatística com foco social
          </p>
          <h1 className="font-display text-4xl font-extrabold leading-tight sm:text-6xl">
            Guia de Autodefesa Estatística
          </h1>
          <p className="font-body mt-5 max-w-2xl text-xl leading-relaxed text-slate-200">
            Gráficos, médias e “estudos” podem ser usados para enganar. Aprenda três truques comuns na internet
            e como não cair neles.
          </p>
        </div>
      </header>

      <main className="mx-auto -mt-8 flex max-w-4xl flex-col gap-8 px-4 pb-16 sm:px-6">
        <AxisTrick />
        <MeanMedian />
        <Correlation />
      </main>

      <footer className="font-body px-6 pb-10 text-center text-sm text-slate-500">
        Material educativo para a disciplina de Estatística.
      </footer>
    </div>
  );
}

/*
===========================================================
Como fazer o deploy na Vercel:

1. Crie o projeto localmente com Vite:
   npm create vite@latest meu-projeto -- --template react
2. Instale as dependências:
   npm install
   npm install tailwindcss postcss autoprefixer lucide-react
   e configure o Tailwind (npx tailwindcss init -p)
3. Cole o código gerado no arquivo src/App.jsx.
4. Suba o código para um repositório no GitHub:
   git init
   git add .
   git commit -m "feat: projeto inicial"
   git branch -M main
   git remote add origin SUA_URL_DO_GITHUB
   git push -u origin main
5. Acesse vercel.com, faça login com o GitHub.
6. Clique em Add New > Project, importe o repositório que você
   acabou de criar e clique em Deploy.
===========================================================
*/
