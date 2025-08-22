import { ChevronDown } from "lucide-react";

// Drop into any React/Next.js page or component file
// Tailwind classes assume Tailwind is configured in your project
export default function TicTacToeFAQ() {
  const faqs = [
    {
      question: "How many players can play Tic Tac Toe?",
      answer:
        "Tic Tac Toe is designed for two players — one plays as X, the other as O.",
    },
    {
      question: "Who goes first in Tic Tac Toe?",
      answer:
        "Traditionally, Player X goes first, but you can decide randomly or take turns in different rounds.",
    },
    {
      question: "Can Tic Tac Toe end without a winner?",
      answer:
        "Yes. If all the squares are filled and no player has three in a row, the result is a draw.",
    },
    {
      question: "Is there a strategy to always win?",
      answer:
        "If both players play perfectly, the game will always end in a draw. However, the player who goes first (X) usually has a slight advantage with the right strategy.",
    },
    {
      question: "Can I play Tic Tac Toe alone?",
      answer:
        "Yes. Many versions allow you to play against a computer/AI opponent instead of another person.",
    },
    {
      question: "What skills does Tic Tac Toe improve?",
      answer:
        "It helps develop critical thinking, problem solving, and planning ahead — making it a great brain-exercise game for all ages.",
    },
  ];

  return (
    <section className="mx-auto w-full max-w-2xl ">
      <header className="text-center py-6">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800">Frequently Asked Questions (FAQ)</h1>
        <div className="h-1 w-[150px] bg-indigo-600 rounded-full mx-auto mt-3" />
      </header>

      <div className="space-y-3">
        {faqs.map((item, idx) => (
          <details
            key={idx}
            className="group rounded-2xl border border-slate-200 bg-white/70 backdrop-blur-sm p-4 open:bg-white shadow-sm open:shadow-md transition-all"
          >
            <summary className="flex items-center justify-between cursor-pointer list-none">
              <span className="text-base md:text-lg font-semibold text-slate-800">
                {item.question}
              </span>
              <ChevronDown className="size-5 shrink-0 transition-transform duration-200 group-open:rotate-180" />
            </summary>
            <div className="mt-3 text-slate-600 leading-relaxed">
              {item.answer}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
