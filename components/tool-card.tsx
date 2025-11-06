"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Check, Sparkles } from "lucide-react";

type Tool = {
  id: string;
  name: string;
  description: string;
  focus: string;
  capabilities: string[];
  accent: string;
};

type ToolCardProps = {
  tool: Tool;
  active: boolean;
  onToggle: (toolId: string) => void;
};

export function ToolCard({ tool, active, onToggle }: ToolCardProps) {
  return (
    <motion.button
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onToggle(tool.id)}
      className={cn(
        "group relative flex h-full w-full flex-col gap-4 rounded-3xl border border-slate-700/60 bg-slate-900/70 p-5 text-left transition-colors duration-300",
        active
          ? "border-sky-400/80 bg-slate-900/95 shadow-focus"
          : "hover:border-sky-500/40"
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div
            className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-sky-100"
            style={{ background: tool.accent }}
          >
            <Sparkles className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
              {tool.focus}
            </p>
            <h3 className="text-lg font-semibold text-sky-100">{tool.name}</h3>
          </div>
        </div>
        <div
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-full border text-sm font-semibold transition-all",
            active
              ? "border-sky-300/80 bg-sky-400/70 text-slate-900 shadow-lg"
              : "border-slate-700/70 text-slate-400 group-hover:border-sky-500/40"
          )}
        >
          {active ? <Check className="h-5 w-5" /> : tool.capabilities.length}
        </div>
      </div>

      <p className="text-sm text-slate-300/80">{tool.description}</p>

      <div className="mt-auto flex flex-wrap gap-2">
        {tool.capabilities.map((capability) => (
          <span
            key={capability}
            className="rounded-full border border-sky-400/20 bg-slate-900/80 px-3 py-1 text-xs font-medium text-slate-300/90"
          >
            {capability}
          </span>
        ))}
      </div>
    </motion.button>
  );
}
