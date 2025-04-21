"use client"
import { Button } from "@/components/ui/button";
import { usePresentationStore } from "@/lib/store";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function SlideNavigation() {
  const { currentSlideIndex, setCurrentSlideIndex, currentPresentation } =
    usePresentationStore();

  const totalSlides = currentPresentation?.slides.length || 0;

  const goToPreviousSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };

  const goToNextSlide = () => {
    if (
      currentPresentation &&
      currentSlideIndex < currentPresentation.slides.length - 1
    ) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  return (
    <div className="flex justify-between items-center w-full py-4">
      <Button
        variant="outline"
        size="icon"
        onClick={goToPreviousSlide}
        disabled={currentSlideIndex === 0}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <div className="text-sm">
        Слайд {currentSlideIndex + 1} из {totalSlides}
      </div>

      <Button
        variant="outline"
        size="icon"
        onClick={goToNextSlide}
        disabled={!currentPresentation || currentSlideIndex === totalSlides - 1}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
