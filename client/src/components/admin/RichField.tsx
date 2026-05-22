import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRef } from "react";

interface RichFieldProps {
  label: string;
  value: string | null;
  onChange: (v: string) => void;
  rows?: number;
  multiline?: boolean;
}

export function RichField({ label, value, onChange, rows = 3, multiline = false }: RichFieldProps) {
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  const wrapText = (startTag: string, endTag: string) => {
    const el = inputRef.current;
    if (!el) return;
    const start = el.selectionStart || 0;
    const end = el.selectionEnd || 0;
    const val = value || "";
    
    const selectedText = val.substring(start, end);
    const newText = val.substring(0, start) + startTag + selectedText + endTag + val.substring(end);
    onChange(newText);
    
    // Restore selection
    setTimeout(() => {
      el.focus();
      el.setSelectionRange(start + startTag.length, start + startTag.length + selectedText.length);
    }, 0);
  };

  return (
    <div className="flex flex-col gap-1.5">
      <Label className="text-xs uppercase tracking-wider text-muted-foreground">{label}</Label>
      <div className="border border-input rounded-md overflow-hidden focus-within:ring-1 focus-within:ring-ring bg-background">
        <div className="bg-muted/50 px-2 py-1 flex items-center gap-3 border-b border-input">
          <Button 
            type="button" 
            variant="ghost" 
            size="sm" 
            className="h-6 text-[10px] uppercase tracking-wider px-2 font-medium" 
            onClick={() => wrapText("[accent]", "[/accent]")}
            title="Highlight selected text with the primary theme color"
          >
            Accent Color
          </Button>
          <div className="flex items-center gap-1.5" title="Pick a custom hex color for selected text">
            <Label htmlFor={`color-picker-${label}`} className="text-[10px] uppercase tracking-wider cursor-pointer text-muted-foreground">Custom:</Label>
            <input 
              id={`color-picker-${label}`}
              type="color" 
              className="w-5 h-5 p-0 border-0 cursor-pointer rounded-sm overflow-hidden"
              onChange={(e) => {
                wrapText(`[color=${e.target.value}]`, "[/color]");
              }} 
            />
          </div>
        </div>
        
        {multiline ? (
          <Textarea 
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            value={value ?? ""} 
            onChange={(e) => onChange(e.target.value)} 
            rows={rows}
            className="border-0 focus-visible:ring-0 rounded-none resize-y min-h-[60px]"
          />
        ) : (
          <Input 
            ref={inputRef as React.RefObject<HTMLInputElement>}
            value={value ?? ""} 
            onChange={(e) => onChange(e.target.value)} 
            className="border-0 focus-visible:ring-0 rounded-none h-9"
          />
        )}
      </div>
    </div>
  );
}
