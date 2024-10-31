import { RefObject, useEffect, useMemo, useState } from 'react';

export const usePaginate = (
  totalCount: number,
  elementPerPage: number,
  triggerApi: (params: any) => Promise<any>,
  needToScrollTop: boolean,
  apiParams = {},
  initialPage = 1,
  needToScrollTopElement: RefObject<HTMLElement> | null = null,
  requestInChangePage = false
) => {
  const [page, setStatePage] = useState(initialPage);

  const pageCount = useMemo(() => {
    return Math.ceil(totalCount / elementPerPage);
  }, [totalCount, elementPerPage]);

  useEffect(() => {
    if (!requestInChangePage) {
      triggerApi({ ...apiParams, page, pageSize: elementPerPage });
    }
    if (needToScrollTop && !needToScrollTopElement) {
      window.scroll({
        top: 0,
        behavior: 'smooth',
      });
    }
    if (needToScrollTopElement && needToScrollTopElement.current && !needToScrollTop) {
      const headers = document.querySelectorAll('header');
      const maxHeightHeader: any = Array.from(headers).reduce((acc, item): any =>
        item.offsetHeight > acc.offsetHeight ? item.offsetHeight : acc.offsetHeight
      );
      window.scroll({
        top: needToScrollTopElement.current.offsetTop - maxHeightHeader - 20,
        behavior: 'smooth',
      });
    }
  }, [page]);

  const setPage = (param: number, withOutRequest: boolean = false) => {
    setStatePage(param);
    if (requestInChangePage && !withOutRequest) {
      triggerApi({ ...apiParams, page: param, pageSize: elementPerPage });
    }
  };

  return {
    pageCount,
    page,
    setPage,
  };
};
