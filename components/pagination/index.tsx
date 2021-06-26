import { IoInfinite } from 'react-icons/io5'

type PaginationProps = {
  currentPage: number | string;
  totalItems?: number | string | null;
  totalPages?: number | string | null;
};

const Pagination = ({
  currentPage,
  totalItems,
  totalPages,
}: PaginationProps) => {
  return (
    <div className="sticky w-full z-10 top-9 md:top-1 left-0 mb-5">
      <div className="bg-pink-400 max-w-max p-2 rounded-r-lg text-white">
        <h2>Page: {currentPage}</h2>
        <h2 className="flex items-center">Total Items: {totalItems ?? <IoInfinite className="ml-2 text-xl" />}</h2>
        {totalPages && <h2>Total Pages: {totalPages}</h2>}
      </div>
    </div>
  );
};

export default Pagination;
