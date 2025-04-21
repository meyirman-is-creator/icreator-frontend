"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import ReactMarkdown from "react-markdown";

interface SlideRendererProps {
  content: string;
}

export function SlideRenderer({ content }: SlideRendererProps) {
  return (
    <Card className="w-full bg-[#ffffff] text-[#1e293b] border-[#e2e8f0]">
      <CardContent className="p-6">
        <div className="prose max-w-none">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </CardContent>
    </Card>
  );
}
