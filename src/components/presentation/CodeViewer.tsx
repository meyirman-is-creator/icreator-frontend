"use client";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Check } from "lucide-react";

interface CodeViewerProps {
  code: string;
  language?: string;
  title?: string;
}

export function CodeViewer({
  code,
  language = "tsx",
  title = "React Component",
}: CodeViewerProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <Card className="border-[#e2e8f0] bg-[#ffffff]">
      <CardHeader className="flex flex-row items-center justify-between py-2 px-4 border-b border-[#e2e8f0]">
        <CardTitle className="text-sm font-medium text-[#1e293b]">
          {title}
        </CardTitle>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          onClick={copyToClipboard}
        >
          {copied ? (
            <Check className="h-4 w-4" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
          <span className="sr-only">Copy code</span>
        </Button>
      </CardHeader>
      <CardContent className="p-0 overflow-x-auto">
        <SyntaxHighlighter
          language={language}
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            borderRadius: "0 0 0.5rem 0.5rem",
            fontSize: "0.9rem",
          }}
        >
          {code}
        </SyntaxHighlighter>
      </CardContent>
    </Card>
  );
}
