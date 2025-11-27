'use client';

export function HistorySection({
  createdAt,
  updatedAt,
}: {
  createdAt: Date;
  updatedAt?: Date | null;
}) {
  return (
    <div className="mt-4 border-t pt-4">
      <h3 className="text-sm font-medium mb-2">History</h3>
      <div className="text-sm text-muted-foreground space-y-2">
        <div className="flex justify-between">
          <span>Created</span>
          <span>{`${new Date(createdAt).toLocaleTimeString()} ${new Date(
            createdAt,
          ).toLocaleDateString()}`}</span>
        </div>
        {updatedAt && (
          <div className="flex justify-between">
            <span>Updated</span>
            <span>{`${new Date(updatedAt).toLocaleTimeString()} ${new Date(
              updatedAt,
            ).toLocaleDateString()}`}</span>
          </div>
        )}
      </div>
    </div>
  );
}
