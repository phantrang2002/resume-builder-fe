import { useContext } from "react";
import { CreateResumeDraftContext } from "./CreateResumeDraftContext";

export function useCreateResumeDraft() {
  const context = useContext(CreateResumeDraftContext);
  if (!context) {
    throw new Error("useCreateResumeDraft must be used within CreateResumeDraftProvider");
  }
  return context;
}
