type User = {
  id: string;
  name: string;
  email: string;
  picture: string;
  exp: number;
  family_name: string;
  given_name: string;
  verified_email: boolean;
};

type ParkingSpot = {
  id: number;
  is_reserved: boolean;
  reservation_code: string;
  user_id: string;
  reserved_at: number;
  checkin_at: number | null;
  checked_in: boolean;
};
