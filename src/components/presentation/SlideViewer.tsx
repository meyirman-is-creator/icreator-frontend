/* src/components/presentation/SlideViewer.tsx */
"use client";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePresentationStore } from "@/lib/store";
import { SlideRenderer } from "./SlideRenderer";
import { CodeViewer } from "./CodeViewer";
import { SlideNavigation } from "./SlideNavigation";

export function SlideViewer() {
  const [activeTab, setActiveTab] = useState<string>("preview");
  const { currentPresentation, currentSlideIndex } = usePresentationStore();

  if (!currentPresentation) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Презентация не найдена</p>
      </div>
    );
  }

  const currentSlide = currentPresentation.slides[currentSlideIndex];

  if (!currentSlide) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Слайд не найден</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-4 text-foreground">
        {currentPresentation.topic}
      </h2>

      <Tabs
        defaultValue="preview"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2 bg-muted">
          <TabsTrigger
            value="preview"
            className="text-muted-foreground data-[state=active]:text-foreground"
          >
            Предпросмотр
          </TabsTrigger>
          <TabsTrigger
            value="code"
            className="text-muted-foreground data-[state=active]:text-foreground"
          >
            Код компонента
          </TabsTrigger>
        </TabsList>

        <TabsContent value="preview" className="pt-4">
          <SlideRenderer content={currentSlide.content} />
        </TabsContent>

        <TabsContent value="code" className="pt-4">
          <CodeViewer
            code={currentSlide.code}
            title={`Слайд ${currentSlide.slide_id} - Компонент React`}
          />
        </TabsContent>
      </Tabs>

      <SlideNavigation />
    </div>
  );
}
