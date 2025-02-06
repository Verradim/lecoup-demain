import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";

interface FileUploadProps {
  label: string;
  file: File | null;
  onFileChange: (file: File | null) => void;
}

export const FileUpload = ({ label, file, onFileChange }: FileUploadProps) => {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="mt-1">
        <label
          className="flex justify-center w-full h-32 px-4 transition border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none"
        >
          <span className="flex items-center space-x-2">
            <Upload className="w-6 h-6 text-gray-600" />
            <span className="text-sm text-gray-600">
              {file ? file.name : "Cliquez pour uploader un fichier"}
            </span>
          </span>
          <input
            type="file"
            className="hidden"
            onChange={(e) => onFileChange(e.target.files?.[0] || null)}
            accept=".pdf,.jpg,.jpeg,.png"
          />
        </label>
      </div>
    </div>
  );
};