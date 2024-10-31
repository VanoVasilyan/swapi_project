export interface IPaginationProps {
  pagesCount: number;
  currentPage: number;
  setCurrentPage: (_page: number) => void;
};
