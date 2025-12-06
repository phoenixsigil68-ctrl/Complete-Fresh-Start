"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

export function AiMessage({ content }: { content: string }) {
  return (
    <div className="w-full flex justify-center mb-10 mt-5">
      <div className="bg-slate-900 text-slate-100 rounded-2xl px-5 py-4 max-w-3xl leading-relaxed">
        <article className="prose prose-invert max-w-none text-xl">
          <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkMath]}
            rehypePlugins={[rehypeKatex]}
          >
            {content}
          </ReactMarkdown>
        </article>
      </div>
    </div>
  );
}
