import { ReactNode } from "react";

export default function ChatLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-50 text-gray-800">
      {children}
    </div>
  );
}
