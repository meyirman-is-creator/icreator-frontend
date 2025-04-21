/* src/components/presentation/SlideRenderer.tsx */
"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import ReactMarkdown from "react-markdown";

interface SlideRendererProps {
  content: string;
}

export function SlideRenderer({ content }: SlideRendererProps) {
  return (
    <Card className="w-full bg-card text-card-foreground border-border">
      <CardContent className="p-6">
        <div className="prose max-w-none">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </CardContent>
    </Card>
  );
}
