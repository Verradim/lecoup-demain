import { Users, Briefcase, MessageSquare, Target, HandshakeIcon, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";

const benefits = [
  {
    title: "For Independent Artisans",
    items: [
      { icon: MessageSquare, text: "Access real-time advice and support for urgent questions" },
      { icon: Target, text: "Share your knowledge and grow your reputation" },
      { icon: Briefcase, text: "Discover new projects and clients to expand your business" },
    ],
  },
  {
    title: "For Small Companies",
    items: [
      { icon: Users, text: "Find qualified workers quickly for your projects" },
      { icon: HandshakeIcon, text: "Build partnerships with trusted professionals" },
      { icon: TrendingUp, text: "Save time and focus on growing your company" },
    ],
  },
];

export const Benefits = () => {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="container max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-secondary mb-16">
          Benefits of Joining
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {benefits.map((category) => (
            <div key={category.title} className="space-y-6">
              <h3 className="text-2xl font-semibold text-primary mb-8">{category.title}</h3>
              {category.items.map((item, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-accent rounded-lg">
                      <item.icon className="h-6 w-6 text-primary" />
                    </div>
                    <p className="text-gray-600">{item.text}</p>
                  </div>
                </Card>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};