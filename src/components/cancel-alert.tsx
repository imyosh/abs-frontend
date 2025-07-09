import { type ReactNode, useState } from "react";

import {
  AlertDialog,
  // AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiCancelReserve } from "@/api";

import { Button } from "@/components/ui/button";

import { Loader2 } from "lucide-react";

export default function CancelAlert({
  children,
  reservationCode,
}: {
  children?: ReactNode;
  reservationCode: string;
}) {
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  // Mutations
  const cancelReserve = useMutation({
    mutationFn: apiCancelReserve,
    onSuccess: (data) => {
      setOpen(false);
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["reservations"] });
    },
  });

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      {children && <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Cancel</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to cancel this reservation?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={cancelReserve.isPending}>
            Close
          </AlertDialogCancel>
          <Button
            variant="destructive"
            disabled={cancelReserve.isPending}
            onClick={() => cancelReserve.mutate(reservationCode)}
            className="md:w-[9rem]"
          >
            {cancelReserve.isPending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "Cancel Reservation"
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
