/* src/app/page.tsx */
"use client"
import { CreatePresentationForm } from '@/components/forms/CreatePresentationForm';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-4xl w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            iCreator
          </h1>
          <p className="text-secondary-foreground text-xl">
            Генератор презентаций на основе искусственного интеллекта
          </p>
        </div>

        <div className="flex justify-center">
          <CreatePresentationForm />
        </div>

        <div className="text-center pt-8">
          <p className="text-sm text-muted-foreground">
            Используйте iCreator для быстрого создания профессиональных презентаций 
            на любую тему с помощью искусственного интеллекта
          </p>
        </div>
      </div>
    </main>
  );
}