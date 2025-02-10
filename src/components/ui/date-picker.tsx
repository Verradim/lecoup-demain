
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface DatePickerProps {
  date?: Date;
  onSelect: (date: Date | undefined) => void;
  label?: string;
  isOptional?: boolean;
  readOnly?: boolean;
}

export const DatePicker = ({ date, onSelect, label, isOptional, readOnly }: DatePickerProps) => {
  return (
    <div className="space-y-2">
      {label && (
        <div className="text-sm font-medium">
          {label}
          {isOptional && <span className="text-muted-foreground ml-1">(optionnel)</span>}
        </div>
      )}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-[200px] justify-start text-left font-normal",
              !date && "text-muted-foreground",
              readOnly && "opacity-50 cursor-not-allowed"
            )}
            disabled={readOnly}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? (
              format(date, "PPP", { locale: fr })
            ) : (
              <span>Choisir une date</span>
            )}
          </Button>
        </PopoverTrigger>
        {!readOnly && (
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={onSelect}
              initialFocus
            />
          </PopoverContent>
        )}
      </Popover>
    </div>
  );
};
