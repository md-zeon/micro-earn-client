import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import EmptyState from "@/components/shared/EmptyState";

const DEFAULT_PAGE_SIZE = 8;

const PAGINATION_WINDOW = 1;

const pageWindow = (page, pageCount) => {
  const start = Math.max(1, page - PAGINATION_WINDOW);
  const end = Math.min(pageCount, page + PAGINATION_WINDOW);
  const pages = [];
  for (let i = start; i <= end; i++) pages.push(i);
  return { start, end, pages };
};

const getValue = (row, key) => {
  const value = key
    .split(".")
    .reduce((acc, part) => acc?.[part], row);
  return typeof value === "string" || typeof value === "number" ? value : "";
};

/**
 * Reusable, accessible data table with search, optional status filter and
 * pagination. All admin tables should render through this component so the
 * interactions stay consistent across the dashboard.
 */
const DataTable = ({
  data = [],
  columns = [],
  searchKeys = [],
  searchPlaceholder = "Search...",
  statusFilter,
  caption,
  emptyIcon,
  emptyTitle = "No results",
  emptyDescription = "No matching records were found.",
  pageSize = DEFAULT_PAGE_SIZE,
  isLoading = false,
  className,
  onRowClick,
}) => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState(statusFilter?.defaultValue ?? "all");
  const [page, setPage] = useState(1);

  const handleSearch = (value) => {
    setSearch(value);
    setPage(1);
  };

  const handleStatus = (value) => {
    setStatus(value);
    setPage(1);
  };

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    let rows = data;

    if (statusFilter && status !== "all") {
      rows = rows.filter(
        (row) => String(getValue(row, statusFilter.key)).toLowerCase() === status,
      );
    }

    if (query && searchKeys.length > 0) {
      rows = rows.filter((row) =>
        searchKeys.some((key) =>
          String(getValue(row, key)).toLowerCase().includes(query),
        ),
      );
    }

    return rows;
  }, [data, search, searchKeys, status, statusFilter]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const startIndex = (currentPage - 1) * pageSize;
  const visibleRows = filtered.slice(startIndex, startIndex + pageSize);
  const { pages } = pageWindow(currentPage, pageCount);

  const hasToolbar = searchKeys.length > 0 || statusFilter;
  const showPrev = currentPage > 1;
  const showNext = currentPage < pageCount;

  return (
    <div className={cn("space-y-3", className)}>
      {hasToolbar && (
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          {searchKeys.length > 0 ? (
            <div className="relative w-full sm:max-w-xs">
              <Search
                className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <Input
                type="search"
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder={searchPlaceholder}
                aria-label={searchPlaceholder}
                className="h-8 pl-9"
              />
            </div>
          ) : (
            <span />
          )}

          {statusFilter && (
            <Select value={status} onValueChange={handleStatus}>
              <SelectTrigger
                className="h-8 w-full sm:w-44"
                aria-label={statusFilter.label}
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{statusFilter.allLabel ?? "All"}</SelectItem>
                {statusFilter.options?.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
      )}

      <div className="overflow-x-auto rounded-xl border border-border">
        <Table>
          {caption && <caption className="sr-only">{caption}</caption>}
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead
                  key={column.key}
                  scope="col"
                  className={cn(column.headerClassName)}
                >
                  {column.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: Math.min(pageSize, 5) }).map((_, i) => (
                <TableRow key={`skeleton-${i}`}>
                  {columns.map((column) => (
                    <TableCell
                      key={column.key}
                      className={cn(
                        column.headerClassName,
                        column.hideOnMobile && "hidden sm:table-cell",
                      )}
                    >
                      <Skeleton className="h-4 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : visibleRows.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="p-0"
                >
                  <EmptyState
                    icon={emptyIcon}
                    title={emptyTitle}
                    description={emptyDescription}
                    className="border-0"
                  />
                </TableCell>
              </TableRow>
            ) : (
              visibleRows.map((row, index) => (
                <TableRow
                  key={row._id ?? index}
                  onClick={onRowClick ? () => onRowClick(row) : undefined}
                  onKeyDown={
                    onRowClick
                      ? (e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            onRowClick(row);
                          }
                        }
                      : undefined
                  }
                  tabIndex={onRowClick ? 0 : undefined}
                  role={onRowClick ? "button" : undefined}
                  className={cn(onRowClick && "cursor-pointer")}
                >
                  {columns.map((column) => (
                    <TableCell
                      key={column.key}
                      className={cn(
                        "align-middle",
                        column.cellClassName,
                        column.hideOnMobile && "hidden sm:table-cell",
                      )}
                    >
                      {column.cell ? column.cell(row, index) : getValue(row, column.key)}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {!isLoading && filtered.length > 0 && (
        <div className="flex flex-col-reverse items-center justify-between gap-2 sm:flex-row">
          <p className="text-xs text-muted-foreground" aria-live="polite">
            Showing{" "}
            <span className="font-medium text-foreground">
              {startIndex + 1}–{Math.min(startIndex + pageSize, filtered.length)}
            </span>{" "}
            of{" "}
            <span className="font-medium text-foreground">{filtered.length}</span>{" "}
            {filtered.length === 1 ? "result" : "results"}
          </p>

          {pageCount > 1 && (
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    aria-disabled={!showPrev}
                    tabIndex={showPrev ? 0 : -1}
                    className={cn(!showPrev && "pointer-events-none opacity-50")}
                  />
                </PaginationItem>
                {currentPage - PAGINATION_WINDOW > 1 && (
                  <PaginationItem>
                    <span className="px-1 text-muted-foreground">…</span>
                  </PaginationItem>
                )}
                {pages.map((p) => (
                  <PaginationItem key={p}>
                    <Button
                      variant={p === currentPage ? "outline" : "ghost"}
                      size="icon"
                      onClick={() => setPage(p)}
                      aria-current={p === currentPage ? "page" : undefined}
                      aria-label={`Page ${p}`}
                      className={cn(
                        p === currentPage &&
                          "border-primary/30 bg-primary/10 text-primary hover:bg-primary/15 hover:text-primary",
                      )}
                    >
                      {p}
                    </Button>
                  </PaginationItem>
                ))}
                {currentPage + PAGINATION_WINDOW < pageCount && (
                  <PaginationItem>
                    <span className="px-1 text-muted-foreground">…</span>
                  </PaginationItem>
                )}
                <PaginationItem>
                  <PaginationNext
                    onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
                    aria-disabled={!showNext}
                    tabIndex={showNext ? 0 : -1}
                    className={cn(!showNext && "pointer-events-none opacity-50")}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      )}
    </div>
  );
};

export default DataTable;
