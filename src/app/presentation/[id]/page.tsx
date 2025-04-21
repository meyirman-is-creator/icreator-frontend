/* src/app/presentation/[id]/page.tsx */
"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { SlideViewer } from "@/components/presentation/SlideViewer";
import { Button } from "@/components/ui/button";
import { usePresentationStore } from "@/lib/store";
import PresentationService from "@/services/presentation-service";
import { Home, Loader2 } from "lucide-react";

export default function PresentationPage() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);

  const {
    currentPresentation,
    fetchState,
    fetchError,
    setCurrentPresentation,
    setFetchState,
    setFetchError,
    resetPresentationState,
  } = usePresentationStore();

  useEffect(() => {
    const loadPresentation = async () => {
      if (isNaN(id)) {
        router.push("/");
        return;
      }

      try {
        resetPresentationState();
        setFetchState("loading");

        const presentation = await PresentationService.getPresentation(id);
        setCurrentPresentation(presentation);
        setFetchState("success");
      } catch (error) {
        console.error("Ошибка при загрузке презентации:", error);
        setFetchError(
          error instanceof Error ? error.message : "Презентация не найдена"
        );
        setFetchState("error");
      }
    };

    loadPresentation();

    return () => {
      resetPresentationState();
    };
  }, [
    id,
    router,
    resetPresentationState,
    setCurrentPresentation,
    setFetchError,
    setFetchState,
  ]);

  return (
    <main className="flex min-h-screen flex-col py-8 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-5xl w-full mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <Button asChild variant="ghost">
            <Link href="/">
              <Home className="h-4 w-4 mr-2" />
              На главную
            </Link>
          </Button>
        </div>

        {fetchState === "loading" && (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            <p className="mt-4 text-muted-foreground">
              Загрузка презентации...
            </p>
          </div>
        )}

        {fetchState === "error" && (
          <div className="flex flex-col items-center justify-center py-12">
            <p className="text-destructive">
              {fetchError || "Произошла ошибка при загрузке презентации"}
            </p>
            <Button asChild className="mt-4">
              <Link href="/">Вернуться на главную</Link>
            </Button>
          </div>
        )}

        {fetchState === "success" && currentPresentation && <SlideViewer />}
      </div>
    </main>
  );
}
