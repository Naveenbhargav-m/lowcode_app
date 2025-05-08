// import { DataType, EditingMode, SortingMode } from 'ka-table/enums';
// import 'ka-table/style.scss';

// import { Table } from 'ka-table';

const dataArray = Array(10).fill(undefined).map(
    (_, index) => ({
        column1: `column:1 row:${index}`,
        column2: `column:2 row:${index}`,
        column3: `column:3 row:${index}`,
        column4: `column:4 row:${index}`,
        id: index,
    }),
);


let tableStyle = {};
const DataTable = () => {
    const rowStyle = ({ rowData }) => {
        // Example: Alternate row colors based on the row's index (id)
        return {
            backgroundColor: rowData.id % 2 === 0 ? '#f9f9f9' : '#ffffff',
        };
    };

    return (
        // <Table
        //     columns={[
        //         { key: 'column1', title: 'Column 1', dataType: DataType.String },
        //         { key: 'column2', title: 'Column 2', dataType: DataType.String },
        //         { key: 'column3', title: 'Column 3', dataType: DataType.String },
        //         { key: 'column4', title: 'Column 4', dataType: DataType.String },
        //     ]}
        //     data={dataArray}
        //     editingMode={EditingMode.Cell}
        //     rowKeyField={'id'}
        //     sortingMode={SortingMode.Single}
        // />
        <div>Needed to be implemented</div>
    );
};

export default DataTable;