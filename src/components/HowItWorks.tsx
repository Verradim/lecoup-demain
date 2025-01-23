import { CheckCircle2 } from "lucide-react";

const steps = [
  {
    title: "Sign Up",
    description: "Complete our simple form or schedule a call for non-referred members",
  },
  {
    title: "Get Access",
    description: "Join the private WhatsApp group of verified professionals",
  },
  {
    title: "Start Collaborating",
    description: "Begin sharing, learning, and finding opportunities immediately",
  },
];

export const HowItWorks = () => {
  return (
    <section className="py-20 px-4 bg-secondary text-white">
      <div className="container max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="mb-6 flex justify-center">
                <CheckCircle2 className="h-12 w-12 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
              <p className="text-gray-300">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};