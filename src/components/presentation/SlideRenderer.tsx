"use client"
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import ReactMarkdown from "react-markdown";

interface SlideRendererProps {
  content: string;
}

export function SlideRenderer({ content }: SlideRendererProps) {
  return (
    <Card className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
      <CardContent className="p-6">
        <div className="prose dark:prose-invert max-w-none">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </CardContent>
    </Card>
  );
}
