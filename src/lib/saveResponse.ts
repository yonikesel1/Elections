import { supabase } from "./supabaseClient";

interface Payload {
  security: number;
  socio_economic: number;
  religious: number;
  intended_vote?: string | null;
}

export async function saveResponse(payload: Payload) {
  await supabase.from("responses").insert(payload).throwOnError();
}
