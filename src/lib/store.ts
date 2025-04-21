import { create } from "zustand";
import {
  LoadingState,
  Presentation,
  CreatePresentationResponse,
} from "@/types/presentation";

interface PresentationStore {
  // Состояние создания презентации
  createState: LoadingState;
  createResponse: CreatePresentationResponse | null;
  createError: string | null;

  // Текущая презентация
  currentPresentation: Presentation | null;
  fetchState: LoadingState;
  fetchError: string | null;

  // Текущий выбранный слайд
  currentSlideIndex: number;

  // Действия
  setCreateState: (state: LoadingState) => void;
  setCreateResponse: (response: CreatePresentationResponse | null) => void;
  setCreateError: (error: string | null) => void;
  setCurrentPresentation: (presentation: Presentation | null) => void;
  setFetchState: (state: LoadingState) => void;
  setFetchError: (error: string | null) => void;
  setCurrentSlideIndex: (index: number) => void;

  // Сброс состояния
  resetCreateState: () => void;
  resetPresentationState: () => void;
}

export const usePresentationStore = create<PresentationStore>((set) => ({
  // Начальные значения
  createState: "idle",
  createResponse: null,
  createError: null,

  currentPresentation: null,
  fetchState: "idle",
  fetchError: null,

  currentSlideIndex: 0,

  // Методы для обновления состояния
  setCreateState: (state) => set({ createState: state }),
  setCreateResponse: (response) => set({ createResponse: response }),
  setCreateError: (error) => set({ createError: error }),

  setCurrentPresentation: (presentation) =>
    set({ currentPresentation: presentation }),
  setFetchState: (state) => set({ fetchState: state }),
  setFetchError: (error) => set({ fetchError: error }),

  setCurrentSlideIndex: (index) => set({ currentSlideIndex: index }),

  // Сброс состояний
  resetCreateState: () =>
    set({
      createState: "idle",
      createResponse: null,
      createError: null,
    }),

  resetPresentationState: () =>
    set({
      currentPresentation: null,
      fetchState: "idle",
      fetchError: null,
      currentSlideIndex: 0,
    }),
}));
