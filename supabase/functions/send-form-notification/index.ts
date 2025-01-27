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
  phone: string;
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

    // Email de confirmation pour le candidat - Nouveau template
    const userEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .content { margin-bottom: 30px; }
            .footer { text-align: center; color: #666; font-size: 14px; }
            .highlight { color: #302CD7; }
            .button { 
              display: inline-block;
              padding: 10px 20px;
              background-color: #302CD7;
              color: white;
              text-decoration: none;
              border-radius: 5px;
              margin: 20px 0;
            }
            .steps { 
              background-color: #f5f5f5;
              padding: 20px;
              border-radius: 5px;
              margin: 20px 0;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 class="highlight">Bienvenue dans la communauté Le Coup de Main ! 🎉</h1>
            </div>
            
            <div class="content">
              <p>Bonjour <strong>${submission.full_name}</strong>,</p>
              
              <p>Nous avons bien reçu votre candidature pour rejoindre <strong>Le Coup de Main</strong>, la communauté qui connecte les artisans indépendants et les entreprises du bâtiment. Merci de votre intérêt ! 🙌</p>
              
              <div class="steps">
                <h2 class="highlight">Les prochaines étapes</h2>
                <p><strong>1. Étude de votre candidature</strong></p>
                <p>Notre équipe va étudier votre profil avec attention. Nous veillons à construire une communauté dynamique où chaque membre partage nos valeurs d'entraide et de professionnalisme.</p>
                
                <p><strong>2. Validation et intégration</strong></p>
                <p>Une fois votre candidature validée, vous recevrez un email avec le lien d'invitation pour rejoindre officiellement la communauté WhatsApp.</p>
              </div>
              
              <h2 class="highlight">Pourquoi rejoindre Le Coup de Main ?</h2>
              <ul>
                <li>✅ Échangez avec d'autres professionnels du bâtiment</li>
                <li>✅ Partagez vos besoins ou opportunités de collaboration</li>
                <li>✅ Développez votre réseau professionnel</li>
                <li>✅ Accédez à des ressources exclusives</li>
              </ul>
              
              <p>Nous avons hâte de vous accueillir dans la communauté !</p>
            </div>
            
            <div class="footer">
              <p>Pour toute question, contactez-nous à :<br>
              <a href="mailto:contact@lecoup-demain.com" style="color: #302CD7;">contact@lecoup-demain.com</a></p>
              
              <p><strong>Dimitri</strong><br>
              Fondateur de Le Coup de Main</p>
            </div>
          </div>
        </body>
      </html>
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
        subject: "Bienvenue dans la communauté Le Coup de Main ! 🎉",
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