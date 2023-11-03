  import * as React from "react";

  export interface IPaginationProps {
    children: JSX.Element;
    data: {}[];
    pageSize: number;
  }

  export interface IPaginationState {
    currentPage: number;
  }

  export default class Pagination extends React.Component<
    IPaginationProps,
    IPaginationState
  > {
    private static defaultProps: Partial<IPaginationProps> = {
      pageSize: 10
    };

    constructor(props: IPaginationProps) {
      super(props);
      this.state = {
        currentPage: 1
      };
    }

    public render(): React.ReactElement<IPaginationProps> {
      const { children, data, pageSize } = this.props;
      const { currentPage } = this.state;
      const dataSlice: {}[] = this._createPaginatedData();
      const totalPages: number = Math.ceil(data.length / pageSize);

      return (
        <>
          {totalPages > 1 && (
            <ul className="pagination" style={{display: "flex", justifyContent: "flex-end"}}>
              <li className="page-item">
                <span
                  className="page-link prev btn"
                  onClick={() => this._setPage(currentPage - 1)}
                >
                  Previous
                </span>
              </li>
              {this._renderPageNumbers(totalPages)}
              <li className="page-item">
                <span
                  className="page-link next btn"
                  onClick={() => this._setPage(currentPage + 1)}
                >
                  Next
                </span>
              </li>
            </ul>
          )}
          {dataSlice.map((item, index) => (
            <children.type key={index} {...children.props} {...item} />
          ))}
        </>
      );
    }

    protected _createPaginatedData = (): {}[] => {
      const { data, pageSize } = this.props;
      const { currentPage } = this.state;
      const upperLimit: number = currentPage * pageSize;
      return data.slice(upperLimit - pageSize, upperLimit);
    };

    protected _setPage = (page: number): void => {
      const { data, pageSize } = this.props;
      const totalPages: number = Math.ceil(data.length / pageSize);

      if (page < 1 || page > totalPages) {
        return;
      }
      this.setState({ currentPage: page });
    };

    private _renderPageNumbers(totalPages: number): React.ReactNode[] {
      const { currentPage } = this.state;
      const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

      return pageNumbers.map((page) => (
        <li
          key={page}
          className={`page-item ${currentPage === page ? "active" : ""}`}
        >
          <span
            className="page-link cursor-pointer"
            onClick={() => this._setPage(page)}
          >
            {page}
          </span>
        </li>
      ));
    }
  }
