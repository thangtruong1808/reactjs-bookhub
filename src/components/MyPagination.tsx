import Pagination from "react-bootstrap/Pagination";
import _ from "lodash";

interface Props {
  itemsCount: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (id: number) => void;
  onPreviousPage: (id: number) => void;
  onNextPage: (id: number) => void;
}

const MyPagination = ({
  itemsCount,
  pageSize,
  onPageChange,
  currentPage,
  onPreviousPage,
  onNextPage,
}: Props) => {
  const pagesCount = Math.ceil(itemsCount / pageSize);
  const pages = _.range(1, pagesCount + 1);

  return (
    <nav>
      <ul className="pagination justify-content-center">
        <li className={currentPage === 1 ? "page-item disabled" : "page-item"}>
          <a className="page-link" onClick={() => onPreviousPage(currentPage)}>
            Previous
          </a>
        </li>

        {pages.map((page: number) => (
          <li
            className={page === currentPage ? "page-item active" : "page-item"}
            key={page}
          >
            <a className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </a>
          </li>
        ))}
        <li
          className={
            currentPage === pagesCount ? "page-item disabled" : "page-item"
          }
        >
          <a className="page-link" onClick={() => onNextPage(currentPage)}>
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default MyPagination;
