import React from 'react';
import { Button } from '@/components/ui/button';

type PaginationProps = {
  canPreviousPage: boolean;
  canNextPage: boolean;
  previousPage: () => void;
  nextPage: () => void;
  pageIndex: number;
  pageCount: number;
};

const Pagination = ({
  previousPage,
  canPreviousPage,
  nextPage,
  canNextPage,
  pageIndex,
  pageCount,
}: PaginationProps) => {
  const pageText = `Strana ${pageIndex + 1} z ${pageCount}`;
  return (
    <div className="flex items-center justify-end gap-2">
      <div className="f">{pageText}</div>
      <Button
        variant="outline"
        size="sm"
        onClick={() => previousPage()}
        disabled={!canPreviousPage}
      >
        Previous
      </Button>
      <Button variant="outline" size="sm" onClick={() => nextPage()} disabled={!canNextPage}>
        Next
      </Button>
    </div>
  );
};

export default Pagination;
