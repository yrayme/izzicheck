import React, { createContext, useState } from 'react';

const TableContext = createContext();

const TableProvider = ({children}) => {
    const [tableData, setTableData] = useState({
        open: false,
        rows: [],
        title: "",
        type: 0,
        name: "",
        add: false,
    });
    const data = {tableData, setTableData};
    return (
        <TableContext.Provider value={data}>
            {children}       
        </TableContext.Provider>
    )
}

export {TableProvider};

export default TableContext;