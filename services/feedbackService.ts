import { auth, db } from "@/config/firebase";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, Timestamp, where } from "firebase/firestore";

interface CreateFeedbackParams {
  comment: string;
  rating: number;
}

interface Feedback {
  id: string;
  comment: string;
  rating: number;
  createdAt: string;
  userName?: string;
}

export async function getUserFeedbacks(uid: string): Promise<Feedback[]> {
  const feedbacksRef = collection(db, "feedbacks");
  const q = query(
    feedbacksRef,
    where("userId", "==", uid),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  const feedbacks = snapshot.docs.map((doc) => {
    const data = doc.data() as any;
    return {
      id: doc.id,
      comment: data.comment,
      rating: data.rating || 0,
      createdAt: data.createdAt.toDate().toISOString(),
    };
  });

  return feedbacks;
}

export async function createFeedback({ comment, rating }: CreateFeedbackParams): Promise<Feedback> {
  const user = auth.currentUser;

  if (!user) throw new Error("Usuário não autenticado");

  const feedbackRef = await addDoc(collection(db, "feedbacks"), {
    userId: user.uid,
    userName: user.email,
    comment,
    rating,
    createdAt: Timestamp.now(),
  });

  const docSnap = await getDoc(feedbackRef);
  const data = docSnap.data() as any;

  return {
    id: feedbackRef.id,
    comment: data.comment,
    rating: data.rating || 0,
    createdAt: data.createdAt.toDate().toISOString(),
    userName: data.userName,
  };
}

export async function deleteFeedback(feedbackId: string): Promise<void> {
  await deleteDoc(doc(db, "feedbacks", feedbackId));
}
