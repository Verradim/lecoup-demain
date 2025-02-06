import { UseFormReturn } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FileUpload } from "./FileUpload";
import { File } from "lucide-react";

interface FormValues {
  companyName: string;
  siret: string;
  companyAddress: string;
  legalRepresentativeFirstName: string;
  legalRepresentativeLastName: string;
}

interface SubcontractorFormFieldsProps {
  form: UseFormReturn<FormValues>;
  vigilanceProof: File | null;
  insuranceProof: File | null;
  onVigilanceProofChange: (file: File | null) => void;
  onInsuranceProofChange: (file: File | null) => void;
}

export const SubcontractorFormFields = ({
  form,
  vigilanceProof,
  insuranceProof,
  onVigilanceProofChange,
  onInsuranceProofChange,
}: SubcontractorFormFieldsProps) => {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="companyName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nom de l'entreprise</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Nom de l'entreprise" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="siret"
        render={({ field }) => (
          <FormItem>
            <FormLabel>SIRET</FormLabel>
            <FormControl>
              <Input
                {...field}
                maxLength={14}
                placeholder="12345678901234"
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9]/g, "");
                  if (value.length <= 14) {
                    field.onChange(value);
                  }
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="companyAddress"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Adresse de l'entreprise</FormLabel>
            <FormControl>
              <Input {...field} placeholder="123 rue Example, 75000 Paris" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="legalRepresentativeFirstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prénom du représentant légal</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Prénom" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="legalRepresentativeLastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom du représentant légal</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Nom" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="space-y-4">
        <div>
          <FileUpload
            label="Attestation de vigilance (PDF)"
            file={vigilanceProof}
            onFileChange={onVigilanceProofChange}
            accept=".pdf"
          />
          {vigilanceProof && (
            <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
              <File className="h-4 w-4" />
              <span>{vigilanceProof.name}</span>
            </div>
          )}
        </div>

        <div>
          <FileUpload
            label="Attestation d'assurance décennale (PDF)"
            file={insuranceProof}
            onFileChange={onInsuranceProofChange}
            accept=".pdf"
          />
          {insuranceProof && (
            <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
              <File className="h-4 w-4" />
              <span>{insuranceProof.name}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};