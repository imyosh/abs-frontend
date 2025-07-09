import { apiGetUserReservations } from "@/api";
import ReserveParkingCard from "@/components/reserve-parking-card";
import ReservationCard from "@/components/reservation-card";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const reservations = useQuery({
    queryKey: ["reservations"],
    queryFn: apiGetUserReservations,
  });

  console.log(reservations.data);

  if (reservations.isLoading)
    return (
      <div className="flex items-center justify-center min-h-[80vh] bg-background">
        <ReserveParkingCard.Skeleton />
      </div>
    );

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-background gap-6">
      {reservations.data?.length === 0 ? (
        <ReserveParkingCard />
      ) : (
        <ReservationCard reservations={reservations.data || []} />
      )}
    </div>
  );
}
