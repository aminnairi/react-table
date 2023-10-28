import { useCallback, useMemo, useState } from "react";

export type UseTableOptions<Row extends Record<string, unknown>> = {
  rows: Array<Row>,
  filters: Record<keyof Row, string>
}

export const useTable = <Row extends Record<string, unknown>>(options: UseTableOptions<Row>) => {
  const [sortKey, setSortKey] = useState<keyof Row | null>(null);

  const rows = useMemo(() => {
    const newRows = [...options.rows];

    newRows.sort((firstRow, secondRow) => {
      if (sortKey === null) {
        return 0;
      }

      if (firstRow[sortKey] < secondRow[sortKey]) {
        return -1;
      }

      if (firstRow[sortKey] > secondRow[sortKey]) {
        return 1;
      }

      return 0;
    });

    return newRows.filter(row => {
      return Object.entries(options.filters).map(([filterKey, filterValue]) => {
        return String(row[filterKey]).includes(filterValue);
      }).every(Boolean);
    });
  }, [options.rows, sortKey, options.filters]);

  const sortBy = useCallback((key: keyof Row) => {
    setSortKey(key);
  }, []);

  const createSortBy = useCallback((key: keyof Row) => () => {
    sortBy(key);
  }, [sortBy]);

  return {
    sortBy,
    createSortBy,
    rows
  };
}