import { Skeleton } from "../components/ui/skeleton";
import { CircuitBoardIcon } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex flex-col h-full">
      {/* Header skeleton */}
      <div className="flex justify-between items-center p-3 px-4 sm:px-6">
        <div className="flex items-center gap-2">
          <CircuitBoardIcon className="size-8 sm:size-10 fill-primary text-background" />
          <h1 className="text-xl sm:text-2xl font-bold">Parking Spot</h1>
        </div>

        <div className="flex items-center gap-4 sm:gap-10">
          <div className="hidden sm:flex items-center gap-6">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-20" />
          </div>
          <Skeleton className="size-8 sm:size-10 rounded-full" />
        </div>
      </div>
    </div>
  );
}
