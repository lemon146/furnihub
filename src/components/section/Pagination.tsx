"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { FC } from "react";

interface PaginationDemoProps {
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const PaginationDemo: FC<PaginationDemoProps> = ({
  totalPages,
  currentPage,
  setCurrentPage,
}) => {
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Pagination>
      <PaginationContent className="gap-2">
        {/* Previous */}
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1) handlePageChange(currentPage - 1);
            }}
            className="border border-gray-400 text-gray-700 px-4 py-2 rounded disabled:opacity-40 hover:bg-[#B88E2F] hover:text-white transition"
          />
        </PaginationItem>

        {/* Page numbers */}
        {Array.from({ length: totalPages }, (_, i) => (
          <PaginationItem key={i + 1}>
            <PaginationLink
              href="#"
              isActive={currentPage === i + 1}
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(i + 1);
              }}
              className={`border px-4 py-2 rounded ${
                currentPage === i + 1
                  ? "bg-[#B88E2F] text-white border-[#B88E2F]"
                  : "border-gray-400 text-gray-700 hover:bg-[#B88E2F] hover:text-white transition"
              }`}
            >
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* Next */}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < totalPages) handlePageChange(currentPage + 1);
            }}
            className="border border-gray-400 text-gray-700 px-4 py-2 rounded disabled:opacity-40 hover:bg-[#B88E2F] hover:text-white transition"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationDemo;
