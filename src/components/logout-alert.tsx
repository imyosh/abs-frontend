import { type ReactNode, useState } from "react";

import { useAuth } from "@/providers/AuthProvider";

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

import { Button } from "@/components/ui/button";

import { Loader2 } from "lucide-react";

export default function LogoutAlert({
  children,
  open,
  onOpenChange,
}: {
  children?: ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [loading, setLoading] = useState(false);

  const { logout } = useAuth();

  async function onLogout() {
    if (loading) return;
    setLoading(true);
    await logout();
    setTimeout(() => {
      setLoading(false);
    }, 300);
    onOpenChange(false);
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      {children && <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Logout</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to logout?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
          <Button
            variant="destructive"
            disabled={loading}
            onClick={() => onLogout()}
            className="md:w-[4.75rem]"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Logout"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
