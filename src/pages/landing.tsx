import { useState } from "react";
import LandingShap from "../components/landing-shap";
import { Button } from "../components/ui/button";

import { Loader2 } from "lucide-react";
import GoogleIcon from "@/assets/google.svg?react";

export default function Landing() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="grid h-full grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0">
      <div className="flex justify-center items-center flex-col px-4 lg:px-0">
        <div className="space-y-4 text-center lg:text-left">
          <div>
            <h1 className="font-bold text-4xl sm:text-5xl lg:text-6xl">
              BOOK MY
            </h1>
            <h1 className="font-semibold text-4xl sm:text-5xl lg:text-6xl">
              PARKING SPOT
            </h1>
          </div>
          <p className="text-lg sm:text-xl text-muted-foreground">
            Easily book your parking spot online!
          </p>
          <Button
            asChild
            variant="outline"
            className="w-full sm:w-auto"
            onClick={() => {
              setLoading(true);
            }}
          >
            <a href={"/auth/google"}>
              {loading ? <Loader2 className="animate-spin" /> : <GoogleIcon />}
              Login With Google
            </a>
          </Button>
        </div>
      </div>
      <div className="flex justify-center items-center px-4 lg:px-0">
        <LandingShap />
      </div>
    </div>
  );
}
