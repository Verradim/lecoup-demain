
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

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
  phone: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Starting form notification process...");
    console.log("RESEND_API_KEY exists:", !!Deno.env.get("RESEND_API_KEY"));

    if (!Deno.env.get("RESEND_API_KEY")) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    const { record } = await req.json();
    console.log("Received form submission:", record);

    const submission: FormSubmission = record;
    console.log("Processing submission for:", submission.full_name);

    // Email de notification pour l'administrateur
    const adminEmailHtml = `
      <h2>Nouveau message reçu</h2>
      <p>Un nouveau message a été envoyé par ${submission.full_name}.</p>
      <h3>Détails du message:</h3>
      <ul>
        <li>Nom: ${submission.full_name}</li>
        <li>Email: ${submission.email}</li>
        <li>Téléphone: ${submission.phone}</li>
        <li>Entreprise: ${submission.company_name}</li>
        <li>Message: ${submission.message}</li>
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
              <h1 class="highlight">Le Coup de Main - Message bien reçu !</h1>
            </div>
            
            <div class="content">
              <p>Bonjour <strong>${submission.full_name}</strong>,</p>
              
              <p>Nous avons bien reçu votre message et nous vous en remercions 🙌</p>
              
              <div class="steps">
                <h2 class="highlight">Rappel de votre message</h2>
                <p>${submission.message}</p>
              </div>
              
              <p>On se dépêche de vous répondre ! Notre équipe vous répondra par e-mail ou par téléphone</p>
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
    const adminRes = await resend.emails.send({
      from: "Le Coup de Main <contact@email.lecoup-demain.com>",
      to: ["dimitri.chauchoy@gmail.com"],
      subject: `Nouvelle candidature de ${submission.full_name}`,
      html: adminEmailHtml,
    });

    console.log("Admin email API response:", adminRes);

    // Envoi de l'email au candidat
    const userRes = await resend.emails.send({
      from: "Le Coup de Main <contact@email.lecoup-demain.com>",
      to: [submission.email],
      subject: "Nous avons bien reçu votre message ! 🎉",
      html: userEmailHtml,
    });

    console.log("User confirmation email API response:", userRes);

    return new Response(JSON.stringify({ 
      success: true,
      adminEmail: adminRes,
      userEmail: userRes
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
