import { supabase } from "../src/lib/supabaseClient";
import { matchParty } from "../src/lib/matchParty";

async function updateFinalParty() {
  console.log("Fetching existing responses...");
  const { data: responses, error } = await supabase
    .from("responses")
    .select("id, security, socio_economic, religious")
    .is("final_party", null);

  if (error) {
    console.error("Error fetching responses:", error);
    return;
  }

  if (!responses || responses.length === 0) {
    console.log("No responses to update");
    return;
  }

  console.log(`Found ${responses.length} responses to update`);

  // Process in batches of 100 to avoid overwhelming the database
  const batchSize = 100;
  for (let i = 0; i < responses.length; i += batchSize) {
    const batch = responses.slice(i, i + batchSize);
    const updates = batch.map((response) => {
      const party = matchParty({
        security: response.security,
        socioEconomic: response.socio_economic,
        religious: response.religious,
      });

      return {
        id: response.id,
        final_party: party.id,
      };
    });

    console.log(`Updating batch ${i / batchSize + 1}...`);
    const { error: updateError } = await supabase
      .from("responses")
      .upsert(updates, { onConflict: "id" });

    if (updateError) {
      console.error("Error updating batch:", updateError);
      continue;
    }
  }

  console.log("Update complete!");
}

// Run the update
updateFinalParty().catch(console.error);
