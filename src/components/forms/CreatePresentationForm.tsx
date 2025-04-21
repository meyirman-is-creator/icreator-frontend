/* src/components/forms/CreatePresentationForm.tsx */
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { usePresentationStore } from "@/lib/store";
import PresentationService from "@/services/presentation-service";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  topic: z
    .string()
    .min(3, {
      message: "Тема должна содержать минимум 3 символа",
    })
    .max(100, {
      message: "Тема не должна превышать 100 символов",
    }),
  slides_count: z
    .number()
    .min(3, {
      message: "Минимальное количество слайдов: 3",
    })
    .max(20, {
      message: "Максимальное количество слайдов: 20",
    }),
});

type FormValues = z.infer<typeof formSchema>;

export function CreatePresentationForm() {
  const router = useRouter();
  const [slideCount, setSlideCount] = useState(7);

  const {
    createState,
    setCreateState,
    setCreateResponse,
    setCreateError,
    resetCreateState,
  } = usePresentationStore();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: "",
      slides_count: 7,
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      resetCreateState();
      setCreateState("loading");

      const response = await PresentationService.createPresentation({
        topic: values.topic,
        slides_count: values.slides_count,
      });

      setCreateResponse(response);
      setCreateState("success");

      setTimeout(() => {
        router.push(`/presentation/${response.presentation_id}`);
      }, 500);
    } catch (error) {
      console.error("Ошибка при создании презентации:", error);
      setCreateError(
        error instanceof Error
          ? error.message
          : "Произошла ошибка при создании презентации"
      );
      setCreateState("error");
    }
  };

  const handleSliderChange = (value: number[]) => {
    const count = value[0];
    setSlideCount(count);
    form.setValue("slides_count", count);
  };

  return (
    <Card className="w-full max-w-md border-border bg-card">
      <CardHeader>
        <CardTitle className="text-card-foreground">
          Создать новую презентацию
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Введите тему и выберите количество слайдов для генерации
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="topic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-card-foreground">
                    Тема презентации
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Например: Искусственный интеллект в современном мире"
                      className="bg-background border-input text-foreground"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-destructive" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="slides_count"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-card-foreground">
                    Количество слайдов: {slideCount}
                  </FormLabel>
                  <FormControl>
                    <Slider
                      defaultValue={[7]}
                      min={3}
                      max={20}
                      step={1}
                      onValueChange={handleSliderChange}
                      value={[field.value]}
                      className="mt-2"
                    />
                  </FormControl>
                  <FormMessage className="text-destructive" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              disabled={createState === "loading"}
            >
              {createState === "loading" ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Генерация...
                </>
              ) : (
                "Создать презентацию"
              )}
            </Button>

            {createState === "error" && (
              <p className="text-sm text-destructive mt-2">
                {usePresentationStore.getState().createError}
              </p>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
