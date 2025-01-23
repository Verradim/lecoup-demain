import { Card } from "@/components/ui/card";

const testimonials = [
  {
    quote: "This community has been invaluable for finding reliable partners and growing my business.",
    author: "John D.",
    role: "Independent Contractor",
  },
  {
    quote: "The real-time support and advice from fellow professionals has saved me countless hours.",
    author: "Sarah M.",
    role: "Construction Company Owner",
  },
];

export const Testimonials = () => {
  return (
    <section className="py-20 px-4 bg-accent">
      <div className="container max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-secondary mb-16">
          What Members Say
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-8 bg-white">
              <blockquote className="text-lg text-gray-600 mb-6">
                "{testimonial.quote}"
              </blockquote>
              <footer>
                <p className="font-semibold text-secondary">{testimonial.author}</p>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </footer>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};