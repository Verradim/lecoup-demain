import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface FormSubmission {
  id: string;
  full_name: string;
  email: string;
  company_name: string;
  sponsor: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Starting form notification process...");
    console.log("RESEND_API_KEY exists:", !!RESEND_API_KEY);

    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    const { record } = await req.json();
    console.log("Received form submission:", record);

    const submission: FormSubmission = record;
    console.log("Processing submission for:", submission.full_name);

    // Email de notification pour l'administrateur
    const adminEmailHtml = `
      <h2>Nouvelle candidature reçue</h2>
      <p>Une nouvelle candidature a été soumise par ${submission.full_name}.</p>
      <h3>Détails de la candidature:</h3>
      <ul>
        <li>Nom: ${submission.full_name}</li>
        <li>Email: ${submission.email}</li>
        <li>Téléphone: ${submission.phone}</li>
        <li>Entreprise: ${submission.company_name}</li>
        <li>Parrain: ${submission.sponsor}</li>
      </ul>
    `;

    // Email de confirmation pour le candidat
    const userEmailHtml = `
      <h2 style="color: #302CD7;">Confirmation de votre candidature - <strong>Le Coup de Main</strong></h2>
        <p>Bonjour <strong>${submission.full_name}</strong>,</p>
        <p>Merci d’avoir candidaté pour rejoindre <strong>Le Coup de Main</strong>, la communauté dédiée aux artisans indépendants et aux entreprises du bâtiment. 🙌</p>

        <h3 style="color: #302CD7;">Quelles sont les prochaines étapes ?</h3>
        <ul>
          <li><strong>👉 Étape 1 :</strong> Nous étudions actuellement votre candidature.<br>
            Notre équipe veille à construire une communauté dynamique et solidaire, en s’assurant que chaque membre partage nos valeurs d’entraide et de professionnalisme.</li>
          <li><strong>👉 Étape 2 :</strong> Une fois votre candidature validée, vous recevrez un e-mail avec <strong>le lien d’invitation</strong> pour rejoindre officiellement la communauté.<br>
            Vous pourrez alors échanger avec d’autres professionnels, trouver de l’aide, partager vos réalisations et profiter d’un réseau unique pour développer votre activité.</li>
        </ul>

        <h3 style="color: #302CD7;">Pourquoi rejoindre "Le Coup de Main" ?</h3>
        <ul>
          <li>✅ Trouvez des conseils et solutions auprès d’autres artisans.</li>
          <li>✅ Partagez vos besoins ou opportunités de collaboration.</li>
          <li>✅ Développez votre réseau et votre visibilité en toute simplicité.</li>
        </ul>

        <p>Nous avons hâte de vous accueillir et de voir ce que vous apporterez à la communauté.</p>
        <p><strong>Pour toute question, vous pouvez nous écrire à :</strong> <a href="mailto:contact@lecoup-demain.com" style="color: #0056b3; text-decoration: none;">contact@lecoup-demain.com</a></p>

        <p style="margin-top: 20px;">À très bientôt !</p>
        <p><strong>Dimitri</strong><br>Fondateur de "Le Coup de Main"</p>
    `;

    console.log("Preparing to send admin notification email...");
    
    // Envoi de l'email à l'administrateur
    const adminRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Le Coup de Main <contact@email.lecoup-demain.com>",
        to: ["dimitri.chauchoy@gmail.com"],
        subject: `Nouvelle candidature de ${submission.full_name}`,
        html: adminEmailHtml,
      }),
    });

    console.log("Admin email API response status:", adminRes.status);
    const adminResponseText = await adminRes.text();
    console.log("Admin email API response:", adminResponseText);

    if (!adminRes.ok) {
      console.error("Error sending admin email:", adminResponseText);
      throw new Error(`Failed to send admin email: ${adminResponseText}`);
    }

    const adminData = JSON.parse(adminResponseText);
    console.log("Admin email sent successfully:", adminData);

    console.log("Preparing to send confirmation email to user...");

    // Envoi de l'email au candidat
    const userRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Le Coup de Main <contact@email.lecoup-demain.com>",
        to: [submission.email],
        subject: "Confirmation de votre candidature - Le Coup de Main",
        html: userEmailHtml,
      }),
    });

    console.log("User email API response status:", userRes.status);
    const userResponseText = await userRes.text();
    console.log("User email API response:", userResponseText);

    if (!userRes.ok) {
      console.error("Error sending user confirmation email:", userResponseText);
      throw new Error(`Failed to send user confirmation email: ${userResponseText}`);
    }

    const userData = JSON.parse(userResponseText);
    console.log("User confirmation email sent successfully:", userData);

    return new Response(JSON.stringify({ 
      success: true,
      adminEmail: adminData,
      userEmail: userData
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error("Error in send-form-notification function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
};

serve(handler);