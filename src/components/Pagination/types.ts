export type IPaginationProps =  {
  pagesCount: number;
  currentPage: number;
  setCurrentPage: (_page: number) => void;
  clearAllFilters: (doRefetch?: boolean) => void;
};
