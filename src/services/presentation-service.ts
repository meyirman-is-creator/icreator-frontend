import api from "./api";
import {
  CreatePresentationRequest,
  CreatePresentationResponse,
  Presentation,
} from "@/types/presentation";

export const PresentationService = {
  // Создание новой презентации
  async createPresentation(
    data: CreatePresentationRequest
  ): Promise<CreatePresentationResponse> {
    const response = await api.post<CreatePresentationResponse>(
      "/generate_presentation",
      data
    );
    return response.data;
  },

  // Получение презентации по ID
  async getPresentation(id: number): Promise<Presentation> {
    const response = await api.get<Presentation>(`/presentation/${id}`);
    return response.data;
  },
};

export default PresentationService;
