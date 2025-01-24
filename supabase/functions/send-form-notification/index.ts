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
    const { record } = await req.json();
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
        <li>Entreprise: ${submission.company_name}</li>
        <li>Parrain: ${submission.sponsor}</li>
      </ul>
    `;

    // Email de confirmation pour le candidat
    const userEmailHtml = `
      <h2>Confirmation de votre candidature</h2>
      <p>Bonjour ${submission.full_name},</p>
      <p>Nous avons bien reçu votre candidature pour rejoindre la Communauté des Makers.</p>
      <p>Notre équipe va étudier votre dossier et reviendra vers vous dans les plus brefs délais.</p>
      <br/>
      <p>À très bientôt !</p>
      <p>L'équipe de la Communauté des Makers</p>
    `;

    console.log("Sending admin notification email...");
    
    // Envoi de l'email à l'administrateur
    const adminRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Communauté des Makers <contact@email.lecoup-demain.com>",
        to: ["dimitri.chauchoy@gmail.com"],
        subject: `Nouvelle candidature de ${submission.full_name}`,
        html: adminEmailHtml,
      }),
    });

    if (!adminRes.ok) {
      const adminError = await adminRes.text();
      console.error("Error sending admin email:", adminError);
      throw new Error(`Failed to send admin email: ${adminError}`);
    }

    const adminData = await adminRes.json();
    console.log("Admin email sent successfully:", adminData);

    console.log("Sending confirmation email to user...");

    // Envoi de l'email au candidat
    const userRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Communauté des Makers <contact@email.lecoup-demain.com>",
        to: [submission.email],
        subject: "Confirmation de votre candidature - Communauté des Makers",
        html: userEmailHtml,
      }),
    });

    if (!userRes.ok) {
      const userError = await userRes.text();
      console.error("Error sending user confirmation email:", userError);
      throw new Error(`Failed to send user confirmation email: ${userError}`);
    }

    const userData = await userRes.json();
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