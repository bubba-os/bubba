import { AssignedUser } from "@/components/assigned-user";
import { UploadDialog } from "@/components/upload-dialog";
import type { RiskMitigationTask, TaskAttachment, User } from "@bubba/db";
import { Card, CardContent, CardHeader, CardTitle } from "@bubba/ui/card";
import { EmptyCard } from "@bubba/ui/empty-card";
import { format } from "date-fns";
import Link from "next/link";

export function TaskAttachments({
  task,
  users,
}: {
  task: RiskMitigationTask & { TaskAttachment: TaskAttachment[] };
  users: User[];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex items-center justify-between gap-2">
            Attachments
            <UploadDialog taskId={task.id} riskId={task.riskId} />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {task.TaskAttachment.length > 0 ? (
          <div className="flex flex-col gap-2">
            {task.TaskAttachment.map((attachment) => (
              <div
                key={attachment.id}
                className="flex flex-col gap-2 border p-4"
              >
                <div className="flex items-center gap-2">
                  <Link href={attachment.fileUrl} target="_blank">
                    {attachment.name}
                  </Link>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2">
                    <AssignedUser
                      fullName={
                        users.find((user) => user.id === attachment.ownerId)
                          ?.name
                      }
                      avatarUrl={
                        users.find((user) => user.id === attachment.ownerId)
                          ?.image
                      }
                    />
                    <span className="text-sm text-muted-foreground">
                      ({format(attachment.uploadedAt, "MMM d, yyyy")})
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyCard
            title="No attachments"
            description="Upload an attachment or link to an external resource"
            className="w-full"
          />
        )}
      </CardContent>
    </Card>
  );
}
