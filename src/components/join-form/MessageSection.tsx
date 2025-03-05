
import { useEffect } from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const MessageSection = ({ form }: { form: any }) => {
  const messageSubjects = [
    { value: "feature", label: "🏗 Suggérer une fonctionnalité" },
    { value: "other", label: "💬 Autre" }
  ];

  // Listen for feature suggestion events
  useEffect(() => {
    const handleSuggestFeature = () => {
      form.setValue("subject", "feature");
    };

    document.addEventListener("suggestFeature", handleSuggestFeature);
    return () => {
      document.removeEventListener("suggestFeature", handleSuggestFeature);
    };
  }, [form]);

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Votre message</h3>
      
      <FormField
        control={form.control}
        name="subject"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Objet</FormLabel>
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
              value={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Choisir un objet" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {messageSubjects.map((subject) => (
                  <SelectItem key={subject.value} value={subject.value}>
                    {subject.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="message"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Message</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Votre message ici..."
                className="h-32"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
