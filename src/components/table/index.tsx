import React, { forwardRef, useEffect, Ref, useState, useMemo } from 'react';
import { Pagination, Popover, Tag } from '@geist-ui/core';
import {
  ArrowDown,
  ArrowUp,
  ChevronLeftCircle,
  ChevronRightCircle,
  MoreVertical,
  Search,
} from '@geist-ui/icons';
import {
  Column,
  useFilters,
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
} from 'react-table';
import styled from 'styled-components';

import { CustomInput } from '../input';

export interface Props {
  children: React.ReactNode;
  columns: Column[];
  data: any[];
  isFilters: any;
  sort?: boolean;
  actions?: {
    edit: boolean;
    delete: boolean;
  };
  paginationSettings?: {
    enablePagination: boolean;
    pageSize: number;
  };
  globalSearch?: boolean;
  showRowSelect?: boolean;
}

const IndeterminateCheckbox = forwardRef<
  HTMLInputElement,
  { indeterminate: boolean }
>(({ indeterminate, ...rest }, ref: Ref<HTMLInputElement>) => {
  const defaultRef = React.useRef<HTMLInputElement>(null);
  const resolvedRef = ref || defaultRef;

  useEffect(() => {
    //@ts-ignore
    if (resolvedRef.current) {
      //@ts-ignore
      resolvedRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate, resolvedRef]);

  return (
    <input
      type="checkbox"
      className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      ref={resolvedRef}
      {...rest}
    />
  );
});

IndeterminateCheckbox.displayName = 'IndeterminateCheckbox';

export const Table: React.FC<Props> = ({
  children,
  columns,
  data,
  isFilters,
  sort = false,
  actions = { edit: true, delete: true },
  globalSearch = false,
  showRowSelect = false,
  paginationSettings = { enablePagination: false, pageSize: data.length },
}) => {
  // console.log(isFilters, "isFilters isFilters")
  const [tableData, setTableData] = useState(data);
  const [editingRow, setEditingRow] = useState(null);
  //@ts-ignore
  const {
    //@ts-ignore
    getTableProps,
    getTableBodyProps,
    headerGroups,
    // rows,
    prepareRow,
    //@ts-ignore

    setGlobalFilter,
    //@ts-ignore

    selectedFlatRows,
    //@ts-ignore
    page,
    //@ts-ignore
    nextPage,
    // previousPage,
    //@ts-ignore
    canNextPage,
    //@ts-ignore
    pageCount,
    //@ts-ignore
    canPreviousPage,
    //@ts-ignore
    pageOptions,
    //@ts-ignore
    gotoPage,
    // setPageSize,
    //@ts-ignore
    setFilter,
    //@ts-ignore
    state: { globalFilter, selectedRowIds, pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data: tableData,
      initialState: {
        //@ts-ignore
        pageSize: paginationSettings?.enablePagination
          ? paginationSettings?.pageSize
          : tableData.length,
      },
      plugins: [
        useGlobalFilter,
        useFilters,
        useSortBy,
        usePagination,
        useRowSelect,
      ],
    },
    useGlobalFilter,
    useFilters,
    sort ? useSortBy : undefined,
    // paginationSettings.enablePagination ? usePagination : (hooks) => hooks,
    usePagination,
    useRowSelect,
    (hooks) => {
      if (showRowSelect) {
        hooks.visibleColumns.push((columns: any) => [
          // Make a column for selection
          {
            id: 'selection',
            //@ts-ignore

            Header: ({ getToggleAllRowsSelectedProps }) => (
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            ),
            Cell: ({ row }) => (
              //@ts-ignore

              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            ),
          },
          ...columns,
        ]);
      }
    }
  );
  // Render the table with the updated data
  useEffect(() => {
    setTableData(data);
  }, [data]);
  useEffect(() => {
    isFilters.forEach((filter: any) => {
      setFilter(filter.id, filter.value);
    });
  }, [setFilter, isFilters]);

  const hasSearchResults = page.length > 0;
  const handleEdit = (row: any) => {
    // Update the editingRow state variable
    setEditingRow(row);
  };

  const handleDelete = (row: any) => {
    // Remove the row from the data array
    setTableData((old: any) =>
      old.filter((r: any) => r.id !== row.original.id)
    );

    // If the deleted row was currently being edited, unset the editingRow state variable
    //@ts-ignore

    if (editingRow && editingRow.original.id === row.original.id) {
      setEditingRow(null);
    }
  };
  const handleDeleteRows = () => {
    // Get the selected rows
    const selectedRows = selectedFlatRows.map((row: any) => row.original);

    // Delete the selected rows
    const newData = tableData.filter((row) => !selectedRows.includes(row));

    // Update the data
    setTableData(newData);
  };

  const handleChangePage = (page: any) => {
    gotoPage(page - 1);
  };
  //@ts-ignore

  const memoizedPagination = useMemo(() => {
    if (!paginationSettings?.enablePagination) {
      return null;
    }

    return (
      <div className="my-5">
        <PaginationStyled>
          <Pagination
            count={pageCount}
            page={pageIndex + 1}
            initialPage={pageSize}
            onChange={handleChangePage}
          >
            <Pagination.Next>
              <ChevronRightCircle />
            </Pagination.Next>
            <Pagination.Previous>
              <ChevronLeftCircle />
            </Pagination.Previous>
          </Pagination>
        </PaginationStyled>
      </div>
    );
  }, [
    canNextPage,
    canPreviousPage,
    nextPage,
    pageIndex,
    pageOptions.length,
    paginationSettings.enablePagination,
  ]);

  const content = () => (
    <div
      onClick={handleDeleteRows}
      className="px-10 cursor-pointer hover:opacity-75 text-red-600 Items ()"
    >
      Delete Item {`(${selectedFlatRows.length})`}
    </div>
  );

  const actionContent = (row: any) => (
    <div className="px-6">
      <div className="py-1 hover:opacity-70">
        {actions.edit &&
          //@ts-ignore
          (editingRow && editingRow.id === row.id ? (
            <button onClick={() => setEditingRow(null)} className="mr-5">
              {/* <Save className="!text-customgreen-300 hover:opacity-75" /> */}
              Save
            </button>
          ) : (
            <button onClick={() => handleEdit(row)} className="mr-5">
              {/* <Edit className="!text-gray-500 hover:opacity-75" /> */}
              Edit
            </button>
          ))}
      </div>

      <div className="py-1 hover:opacity-70">
        {actions.delete && (
          <button onClick={() => handleDelete(row)}>
            {/* <Delete className="!text-red-600 hover:opacity-75" /> */}
            Delete
          </button>
        )}
      </div>
    </div>
  );

  return (
    <>
      {children}

      {globalSearch && (
        <div className="flex justify-start mb-2 my-6">
          <div className="relative w-64">
            <CustomInput
              placeholder="Search"
              icon={<Search className="!text-primary" />}
              setValue={setGlobalFilter}
              value={globalFilter}
            />
          </div>
        </div>
      )}

      <TableStyled>
        <table {...getTableProps()} className=" w-full">
          <thead className="bg-secondary ">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(
                      //@ts-ignore

                      sort && column.getSortByToggleProps()
                    )}
                    className="px-6 py-3 text-center  font-medium text-typo  capitalize "
                  >
                    <span className="flex justify-center">
                      {column.render('Header')}
                      {/* @ts-ignore */}
                      {sort && column.isSorted ? (
                        //  @ts-ignore
                        column.isSortedDesc ? (
                          <ArrowDown />
                        ) : (
                          <ArrowUp />
                        )
                      ) : (
                        ''
                      )}
                    </span>
                  </th>
                ))}
                {actions.edit || actions.delete ? (
                  <th className="px-6 py-3 text-center font-medium text-typo capitalize">
                    <div className="flex items-center justify-center">
                      <span className="mr-2">Action</span>
                      <Tag type="secondary" className="!bg-transparent">
                        {selectedFlatRows.length}
                      </Tag>
                      {showRowSelect && (
                        <>
                          {/* @ts-ignore */}

                          <Popover content={content} placement="right">
                            <MoreVertical className="!text-gray-500 !h-5 !w-5 cursor-pointer" />
                          </Popover>
                        </>
                      )}
                    </div>
                  </th>
                ) : null}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} className="bg-white">
            {!hasSearchResults && (
              <tr>
                <td className="px-1 py-4 text-center" colSpan={100}>
                  No results found
                </td>
              </tr>
            )}
            {hasSearchResults &&
              page.map((row: any) => {
                prepareRow(row);
                return (
                  <tr
                    {...row.getRowProps()}
                    className="hover:shadow-lg  transition-all rounded-lg"
                  >
                    {row.cells.map((cell: any) => {
                      return (
                        <td
                          {...cell.getCellProps()}
                          className="px-1 py-4 text-center "
                        >
                          {cell.column.id !== 'selection' &&
                          editingRow &&
                          // @ts-ignore

                          editingRow.id === row.id ? (
                            <input
                              type="text"
                              className="w-full rounded-lg"
                              value={cell.value}
                              onChange={(e) => {
                                const newValue = e.target.value;
                                setTableData((old: any) => {
                                  const newData = [...old];
                                  newData[row.index][cell.column.id] = newValue;
                                  return newData;
                                });
                              }}
                            />
                          ) : (
                            <span className="px-1 py-4">
                              {cell.render('Cell')}
                            </span>
                          )}
                        </td>
                      );
                    })}
                    {actions.edit || actions.delete ? (
                      <td className="px-1 py-4  flex justify-center items-center">
                        <Popover
                          //  @ts-ignore
                          content={() => actionContent(row)}
                          placement="right"
                        >
                          <MoreVertical className="!text-gray-500 !h-5 !w-5 cursor-pointer" />
                        </Popover>
                      </td>
                    ) : null}
                  </tr>
                );
              })}
          </tbody>
        </table>
      </TableStyled>

      <div>{memoizedPagination}</div>
    </>
  );
};

const PaginationStyled = styled.section`
  button {
    color: #f05822 !important;
  }
  button.active {
    background: #f05822;
    color: #fff !important;
  }
  button:hover {
    background: #ffe6dd !important;
  }
  button.active:hover {
    background: #f05822;
  }
  button.disabled {
    color: #888 !important;
  }
`;

const TableStyled = styled.section`
  th:first-child {
    border-radius: 10px 0px 0px 10px !important;
  }
  th:last-child {
    border-radius: 0px 10px 10px 0px !important;
  }
`;
