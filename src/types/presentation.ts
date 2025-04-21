// Типы для запросов к API
export interface CreatePresentationRequest {
  topic: string;
  slides_count: number;
}

// Типы для ответов от API
export interface CreatePresentationResponse {
  status: string;
  presentation_id: number;
  message: string;
}

export interface Slide {
  slide_id: number;
  content: string;
  code: string;
}

export interface Presentation {
  presentation_id: number;
  topic: string;
  slides: Slide[];
}

// Тип для состояния загрузки
export type LoadingState = "idle" | "loading" | "success" | "error";
