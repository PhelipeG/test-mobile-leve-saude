import { createFeedback, deleteFeedback, getUserFeedbacks } from "@/services/feedbackService";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Alert } from "react-native";
import { useAuth } from "./useAuth";

interface Feedback {
  id: string;
  comment: string;
  userName?: string;
  rating: number;
  createdAt: string;
}

export function useFeedbacks() {
  const { user } = useAuth();
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchFeedbacks = useCallback(async () => {
    if (!user?.uid) {
      setFeedbacks([]);
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const data = await getUserFeedbacks(user.uid);
      setFeedbacks(data);
    } catch (error: any) {
      console.error("Erro ao carregar feedbacks:", error);
      Alert.alert("Erro", "Não foi possível carregar os feedbacks");
      setFeedbacks([]);
    } finally {
      setLoading(false);
    }
  }, [user?.uid]);

  useFocusEffect(
    useCallback(() => {
      fetchFeedbacks();
    }, [fetchFeedbacks])
  );

  const addFeedback = async (comment: string, rating: number) => {
    if (!user?.uid) {
      Alert.alert("Erro", "Usuário não autenticado");
      return;
    }
    try {
      await createFeedback({ comment, rating });
    } catch (error: any) {
      console.error("Erro ao criar feedback:", error);
      Alert.alert("Erro", "Não foi possível enviar o feedback");
    }
  };

  const removeFeedback = async (feedbackId: string) => {
    try {
      await deleteFeedback(feedbackId);
      setFeedbacks((prev) => prev.filter(fb => fb.id !== feedbackId));
      await fetchFeedbacks();
    } catch (error: any) {
      console.error("Erro ao deletar feedback:", error);
      Alert.alert("Erro", "Não foi possível deletar o feedback");
    }
  };

  return {
    feedbacks,
    loading,
    addFeedback,
    removeFeedback,
  };
}
