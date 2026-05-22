import React from "react";

/**
 * A lightweight text formatter that parses custom tags to colorize text.
 * 
 * Supported tags:
 * [color=#ff0000]red text[/color]
 * [color=red]red text[/color]
 * [accent]theme color text[/accent]
 * 
 * Newlines are automatically converted to <br />.
 */
export function FormattedText({ text, className }: { text: string; className?: string }) {
  if (!text) return null;

  // Split by color tags, keeping the tags in the resulting array
  // [\s\S] matches everything including newlines
  const parts = text.split(/(\[color=[^\]]+\][\s\S]*?\[\/color\]|\[accent\][\s\S]*?\[\/accent\])/g);

  return (
    <span className={className}>
      {parts.map((part, i) => {
        // Check for [color=X]...[/color]
        const colorMatch = part.match(/^\[color=([^\]]+)\]([\s\S]*)\[\/color\]$/);
        if (colorMatch) {
          return (
            <span key={i} style={{ color: colorMatch[1] }}>
              {renderNewlines(colorMatch[2])}
            </span>
          );
        }

        // Check for [accent]...[/accent]
        const accentMatch = part.match(/^\[accent\]([\s\S]*)\[\/accent\]$/);
        if (accentMatch) {
          return (
            <span key={i} className="text-primary">
              {renderNewlines(accentMatch[1])}
            </span>
          );
        }

        // Standard text
        return <React.Fragment key={i}>{renderNewlines(part)}</React.Fragment>;
      })}
    </span>
  );
}

// Helper to convert \n to <br />
function renderNewlines(str: string) {
  if (!str) return null;
  const lines = str.split("\n");
  return lines.map((line, j) => (
    <React.Fragment key={j}>
      {line}
      {j < lines.length - 1 && <br />}
    </React.Fragment>
  ));
}
