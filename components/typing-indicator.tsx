"use client";

export function TypingIndicator() {
  return (
    <div className="flex space-x-2 p-4 bg-secondary rounded-lg w-fit ml-auto">
      <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:-0.3s]"></div>
      <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:-0.15s]"></div>
      <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce"></div>
    </div>
  );
}
