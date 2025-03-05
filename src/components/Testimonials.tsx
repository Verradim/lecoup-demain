
import { InlineWidget } from "react-calendly";

export const Testimonials = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Prendre rendez-vous
        </h2>
        <div className="max-w-4xl mx-auto">
          <InlineWidget url="https://calendly.com/your-calendly-link-here" />
        </div>
      </div>
    </section>
  );
};
