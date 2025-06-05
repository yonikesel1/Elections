import { supabase } from "./supabaseClient";

interface Payload {
  security: number;
  socio_economic: number;
  religious: number;
}

export async function saveResponse(payload: Payload) {
  try {
    const { error } = await supabase.from("responses").insert(payload);

    if (error) {
      console.error("Failed to save response:", error);
      // Don't throw - we don't want to break the UI
    }
  } catch (e) {
    console.error("Unexpected error saving response:", e);
    // Don't throw - we don't want to break the UI
  }
}
