import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  // AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/AuthProvider";
import { ForwardIcon, Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { apiReserve } from "@/api";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import { toast } from "sonner";

export default function ReserveParkingCard() {
  const [open, setOpen] = useState(false);

  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Mutations
  const reserve = useMutation({
    mutationFn: apiReserve,
    onSuccess: (data) => {
      setOpen(false);
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["reservations"] });
    },

    // eslint-disable-next-line
    onError: (error: any) => {
      console.log(error);
      setOpen(false);
      if (error.response?.data?.message)
        return toast.error(error.response?.data?.message);
      toast.error("Something went wrong!");
    },
  });

  return (
    <div className="flex flex-col gap-4 sm:gap-6 min-w-full sm:min-w-3xl">
      <p className="text-2xl pl-4 sm:text-4xl text-muted-foreground">
        Hi, {user?.given_name || user?.name}
      </p>
      <div className="bg-white dark:bg-card sm:rounded-xl shadow-lg flex flex-col lg:flex-row max-w-3xl w-full border overflow-hidden">
        <div className="flex items-center justify-center bg-muted/50 w-full lg:w-1/2 min-h-[300px] sm:min-h-[400px] p-4 sm:p-6">
          <div className="relative flex items-center justify-center w-full h-full">
            <div className="absolute left-1/4 top-0 w-1 h-full rounded-full bg-card/30" />
            <div className="absolute left-3/4 top-0 w-1 h-full rounded-full bg-card/30" />
            <div className="absolute left-0 top-1/4 h-1 w-full rounded-full bg-card/30" />
            <div className="absolute left-0 top-3/4 h-1 w-full rounded-full bg-card/30" />
            <span className="relative leading-28 -translate-y-2 text-6xl sm:text-8xl lg:text-[12rem] font-extrabold text-muted-foreground/10 select-none">
              P
            </span>
          </div>
        </div>
        {/* Right: Content */}
        <div className="flex flex-col items-center justify-center gap-4 sm:gap-6 p-6 sm:p-10 w-full lg:w-1/2">
          <h1 className="text-xl sm:text-2xl font-bold text-center">
            Reserve Your Parking Spot
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground text-center">
            Secure your spot in advance and park with ease. Enjoy hassle-free
            parking at just <span className="text-primary">$2.50</span> per
            hour.
          </p>
          <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
              <Button size="lg" className="w-full mt-2">
                Reserve <ForwardIcon />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Parking Reservation</AlertDialogTitle>
                <AlertDialogDescription>
                  Reserve your parking spot now and guarantee availability.
                  <span>
                    You will be charged based on your parking duration.
                  </span>
                </AlertDialogDescription>
              </AlertDialogHeader>

              <div className="grid grid-rows-2 gap-2">
                <div className="font-semibold space-x-4">
                  Price: <Badge>$2.50/hr</Badge>
                </div>
                <div>
                  Minimum Time: <Badge variant="secondary">1 hour</Badge>
                </div>
              </div>

              <AlertDialogFooter>
                <AlertDialogCancel disabled={reserve.isPending}>
                  Cancel
                </AlertDialogCancel>
                <Button
                  disabled={reserve.isPending}
                  onClick={() => reserve.mutate()}
                  className="md:w-40"
                >
                  {reserve.isPending ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    "Confirm Reservation"
                  )}
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
}

ReserveParkingCard.Skeleton = function ReserveParkingCardLoading() {
  return (
    <div className="flex flex-col gap-4 sm:gap-6 min-w-full sm:min-w-3xl">
      <Skeleton className="h-8 ml-4 sm:h-10 w-48 sm:w-64" />
      <div className="bg-white dark:bg-card sm:rounded-xl shadow-lg flex flex-col lg:flex-row max-w-3xl w-full border overflow-hidden">
        {/* Left: Parking visual skeleton */}
        <div className="flex items-center justify-center bg-muted/50 w-full lg:w-1/2 min-h-[300px] sm:min-h-[400px] p-4 sm:p-6">
          <Skeleton className="w-full h-full rounded-xl" />
        </div>
        {/* Right: Content skeleton */}
        <div className="flex flex-col items-center justify-center gap-4 sm:gap-6 p-6 sm:p-10 w-full lg:w-1/2">
          <Skeleton className="h-7 sm:h-8 w-40 sm:w-48" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full mt-2" />
        </div>
      </div>
    </div>
  );
};
