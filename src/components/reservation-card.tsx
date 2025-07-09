import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useState } from "react";
import { CheckIcon, Clock10Icon, CopyIcon } from "lucide-react";
import CancelAlert from "./cancel-alert";

export interface ReservationCardProps {
  reservations: ParkingSpot[];
}

function SingleReservationCard({ reservation }: { reservation: ParkingSpot }) {
  const [copied, setCopied] = useState(false);
  const code = reservation.reservation_code || "-";
  const reservedDate = reservation.reserved_at
    ? new Date(reservation.reserved_at).toLocaleString()
    : "N/A";

  const handleCopy = () => {
    if (reservation.reservation_code) {
      navigator.clipboard.writeText(reservation.reservation_code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    }
  };

  return (
    <div className="w-full max-w-2xl bg-white dark:bg-card sm:rounded-xl shadow-lg border p-0 overflow-hidden flex flex-col">
      {/* Card Header */}
      <div className="flex items-center gap-4 px-6 py-4 border-b bg-gray-50 dark:bg-muted">
        <Avatar className="size-12">
          <AvatarFallback className="text-xl font-bold">P</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-lg font-semibold text-gray-900 dark:text-white">
            Reservation
          </span>
          <span className="text-xs text-muted-foreground">
            ID: {reservation.id}
          </span>
        </div>
      </div>
      {/* Card Body */}
      <div className="flex flex-col gap-4 px-6 py-5">
        {/* Reservation Code */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <span className="font-medium text-gray-700 dark:text-gray-200 w-40">
            Reservation Code
          </span>
          <div className="flex items-center flex-1">
            <span className="bg-green-500/20 h-9 min-w-32 rounded-r-none flex items-center justify-center text-green-800 dark:text-green-200 tracking-widest rounded px-4 py-1 font-mono text-base select-all">
              {code}
            </span>
            <Button
              size="icon"
              variant="secondary"
              onClick={handleCopy}
              disabled={!reservation.reservation_code}
              className="rounded-l-none"
              aria-label="Copy reservation code"
            >
              {copied ? (
                <CheckIcon className="size-4 text-green-500" />
              ) : (
                <CopyIcon className="size-4" />
              )}
            </Button>
          </div>
        </div>
        {/* Reserved At */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <span className="font-medium text-gray-700 dark:text-gray-200 w-40">
            Reserved At
          </span>
          <span className="flex items-center gap-2 text-sm text-muted-foreground">
            {reservedDate} <Clock10Icon className="size-4 opacity-70" />
          </span>
        </div>
        {/* Checked In Status */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <span className="font-medium text-gray-700 dark:text-gray-200 w-40">
            Checked In
          </span>
          <span
            className={
              reservation.checked_in
                ? "text-green-600 font-semibold"
                : "text-red-500 font-semibold"
            }
          >
            {reservation.checked_in ? "Yes" : "No"}
          </span>
        </div>
      </div>
      {/* Card Footer */}
      <div className="flex justify-end px-6 py-4 border-t bg-gray-50 dark:bg-muted">
        <CancelAlert reservationCode={reservation.reservation_code}>
          <Button
            disabled={reservation.checked_in}
            variant="destructive"
            size="sm"
          >
            Cancel Reservation
          </Button>
        </CancelAlert>
      </div>
    </div>
  );
}

export default function ReservationCard({
  reservations,
}: ReservationCardProps) {
  if (!reservations.length) {
    return (
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-2xl font-bold">Your Active Reservations</h2>
        <div className="text-muted-foreground">
          You have no active reservations.
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center gap-8 w-full">
      <h2 className="text-2xl font-bold mb-2">Your Active Reservations</h2>
      {reservations.map((reservation) => (
        <SingleReservationCard key={reservation.id} reservation={reservation} />
      ))}
    </div>
  );
}
