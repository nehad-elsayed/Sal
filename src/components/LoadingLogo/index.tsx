import { Loader2 } from "lucide-react";
export default function LoadingLogo() {
  return (
    <div className="flex h-dvh w-full items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
        <Loader2 className="animate-spin" />
    </div>
  );
}
