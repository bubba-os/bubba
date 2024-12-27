"use client";

import { seedDataAction } from "@/actions/seed-action";
import { Button } from "@bubba/ui/button";
import { useToast } from "@bubba/ui/use-toast";
import { useAction } from "next-safe-action/hooks";

interface SeedDataFormProps {
  organizationId: string;
}

export function SeedDataForm({ organizationId }: SeedDataFormProps) {
  const { toast } = useToast();

  const { execute, status } = useAction(seedDataAction, {
    onSuccess: (data) => {
      if (data?.data?.success) {
        toast({
          title: "Success",
          description: data.data.message || "Data seeded successfully",
        });
      } else {
        toast({
          title: "Error",
          description: data?.data?.message || "Failed to seed data",
          variant: "destructive",
        });
      }
    },
    onError: (error) => {
      toast({
        title: "Error",
        description:
          error?.error?.serverError || "An unexpected error occurred",
        variant: "destructive",
      });
    },
  });

  const handleSeed = () => {
    execute({ organizationId });
  };

  return (
    <div className="flex flex-col space-y-4">
      <h2 className="text-lg font-semibold">Seed Test Data</h2>
      <p className="text-sm text-muted-foreground">
        Populate your organization with test data for development purposes.
      </p>
      <div>
        <Button
          onClick={handleSeed}
          disabled={status === "executing"}
          variant="secondary"
        >
          {status === "executing" ? "Seeding..." : "Seed Test Data"}
        </Button>
      </div>
    </div>
  );
}
