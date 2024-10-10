"use client";

import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileText } from "lucide-react";

export default function PolicyChoice({ id }: { id: string }) {
  const router = useRouter();

  return (
    <div className="mt-8">
      <div className="flex flex-col items-center justify-center gap-8 lg:flex-row">
        <Card className="w-full lg:w-1/2">
          <CardHeader className="pb-4">
            <div className="flex h-40 w-full items-center justify-center rounded-lg bg-primary/10">
              <Upload className="h-16 w-16" />
            </div>
          </CardHeader>
          <CardContent>
            <CardTitle className="mb-2 text-xl">
              Upload Existing Policy
            </CardTitle>
            <CardDescription className="mb-4">
              If you already have a policy document, upload it here to track
              compliance and manage your policy.
            </CardDescription>
            <Button
              className="w-full"
              onClick={() =>
                router.push(`/dashboard/policies/draft/${id}/upload`)
              }
            >
              Upload Document
            </Button>
          </CardContent>
        </Card>

        <div className="flex flex-col items-center">
          <div className="hidden h-16 w-px bg-border lg:block"></div>
          <div className="my-4 text-xl font-semibold text-muted-foreground">
            OR
          </div>
          <div className="hidden h-16 w-px bg-border lg:block"></div>
        </div>

        <Card className="w-full lg:w-1/2">
          <CardHeader className="pb-4">
            <div className="flex h-40 w-full items-center justify-center rounded-lg bg-primary/10">
              <FileText className="h-16 w-16" />
            </div>
          </CardHeader>
          <CardContent>
            <CardTitle className="mb-2 text-xl">Create Policy</CardTitle>
            <CardDescription className="mb-4">
              Create a policy using our AI policy generator if you don&apos;t
              have an existing policy document.
            </CardDescription>
            <Button
              className="w-full"
              onClick={() =>
                router.push(`/dashboard/policies/draft/${id}/generate`)
              }
            >
              Create Policy
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
