require("dotenv").config();
const { createClient } = require("@supabase/supabase-js");

// Initialize Supabase client with service role key for admin access
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Missing Supabase environment variables");
  console.error(
    "Please make sure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in your .env file",
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

// Define parties data directly in the script
const parties = [
  {
    id: "likud",
    name: "ליכוד",
    logo: "/parties/likud.svg",
    security: 80,
    socioEconomic: 70,
    religious: 60,
  },
  {
    id: "yesh_atid",
    name: "יש עתיד",
    logo: "/parties/yesh_atid.svg",
    security: 60,
    socioEconomic: 40,
    religious: 20,
  },
  {
    id: "shas",
    name: "ש״ס",
    logo: "/parties/shas.svg",
    security: 40,
    socioEconomic: 20,
    religious: 100,
  },
  {
    id: "tzionut_datit",
    name: "הציונות הדתית",
    logo: "/parties/tzionut_datit.svg",
    security: 90,
    socioEconomic: 60,
    religious: 90,
  },
  {
    id: "mamlachti",
    name: "המחנה הממלכתי",
    logo: "/parties/mamlachti.svg",
    security: 50,
    socioEconomic: 50,
    religious: 30,
  },
  {
    id: "yahadut_hatora",
    name: "יהדות התורה",
    logo: "/parties/yahadut_hatora.svg",
    security: 30,
    socioEconomic: 10,
    religious: 100,
  },
  {
    id: "israel_beitenu",
    name: "ישראל ביתנו",
    logo: "/parties/israel_beitenu.svg",
    security: 90,
    socioEconomic: 60,
    religious: 20,
  },
  {
    id: "raam",
    name: "רע״ם",
    logo: "/parties/raam.svg",
    security: 20,
    socioEconomic: 20,
    religious: 80,
  },
  {
    id: "hadash_taal",
    name: "חד״ש-תע״ל",
    logo: "/parties/hadash_taal.svg",
    security: 20,
    socioEconomic: 20,
    religious: 20,
  },
  {
    id: "meretz",
    name: "מרצ",
    logo: "/parties/meretz.svg",
    security: 30,
    socioEconomic: 20,
    religious: 10,
  },
  {
    id: "balad",
    name: "בלעד",
    logo: "/parties/balad.svg",
    security: 10,
    socioEconomic: 20,
    religious: 20,
  },
  {
    id: "labor",
    name: "העבודה",
    logo: "/parties/labor.svg",
    security: 40,
    socioEconomic: 30,
    religious: 20,
  },
];

// Function to find the closest party based on slider values
function matchParty(answers) {
  let best = parties[0];
  let bestDistance = Infinity;

  for (const p of parties) {
    const d =
      (answers.security - p.security) ** 2 +
      (answers.socioEconomic - p.socioEconomic) ** 2 +
      (answers.religious - p.religious) ** 2;

    if (d < bestDistance) {
      bestDistance = d;
      best = p;
    }
  }
  return best;
}

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

  console.log(`Found ${responses.length} total responses to check`);

  // Filter out invalid responses
  const validResponses = responses.filter((response) => {
    const isValid =
      response.security != null && response.socio_economic != null && response.religious != null;
    if (!isValid) {
      console.log(`Skipping response ${response.id} due to null values:`, {
        security: response.security,
        socio_economic: response.socio_economic,
        religious: response.religious,
      });
    }
    return isValid;
  });

  console.log(`Found ${validResponses.length} valid responses to update`);

  if (validResponses.length === 0) {
    console.log("No valid responses to update");
    return;
  }

  // Process in batches of 100 to avoid overwhelming the database
  const batchSize = 100;
  for (let i = 0; i < validResponses.length; i += batchSize) {
    const batch = validResponses.slice(i, i + batchSize);
    const updates = batch
      .map((response) => {
        // Double check values before creating update
        if (
          response.security == null ||
          response.socio_economic == null ||
          response.religious == null
        ) {
          console.error("Found null value in response:", response);
          return null;
        }

        const party = matchParty({
          security: response.security,
          socioEconomic: response.socio_economic,
          religious: response.religious,
        });

        return {
          id: response.id,
          security: response.security,
          socio_economic: response.socio_economic,
          religious: response.religious,
          final_party: party.id,
        };
      })
      .filter((update) => update !== null); // Remove any null updates

    if (updates.length === 0) {
      console.log("No valid updates in this batch, skipping...");
      continue;
    }

    console.log(`Updating batch ${i / batchSize + 1} with ${updates.length} records...`);
    console.log("First update in batch:", updates[0]);

    const { error: updateError } = await supabase
      .from("responses")
      .upsert(updates, { onConflict: "id" });

    if (updateError) {
      console.error("Error updating batch:", updateError);
      console.error("First record in failed batch:", updates[0]);
      continue;
    }
  }

  console.log("Update complete!");
}

// Run the update
updateFinalParty().catch(console.error);
