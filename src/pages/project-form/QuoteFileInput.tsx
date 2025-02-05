
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";

interface QuoteFileInputProps {
  quoteFile: File | null;
  currentFileName?: string | null;
  onFileChange: (file: File | null) => void;
}

export const QuoteFileInput = ({ 
  quoteFile, 
  currentFileName, 
  onFileChange 
}: QuoteFileInputProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="quote">Devis original (PDF)</Label>
      <div className="mt-1">
        <label
          htmlFor="quote"
          className="flex justify-center w-full h-32 px-4 transition border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none"
        >
          <span className="flex items-center space-x-2">
            <Upload className="w-6 h-6 text-gray-600" />
            <span className="text-sm text-gray-600">
              {quoteFile ? quoteFile.name : currentFileName || "Cliquez pour uploader le devis"}
            </span>
          </span>
          <input
            id="quote"
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={(e) => onFileChange(e.target.files?.[0] || null)}
          />
        </label>
      </div>
    </div>
  );
};
