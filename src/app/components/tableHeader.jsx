import React from "react";
import PropTypes from "prop-types";

const TableHeader = ({ onSort, selectedSort, columns }) => {
    console.log(selectedSort);
    const handleSort = (item) => {
        if (selectedSort.iter === item) {
            onSort({
                ...selectedSort,
                order: selectedSort.order === "asc" ? "desc" : "asc"
            });
        } else {
            onSort({ iter: item, order: "asc" });
        }
    };
    return (
        <thead>
            <tr>
                {Object.keys(columns).map((column) => (
                    <th
                        key={column}
                        onClick={
                            columns[column].iter
                                ? () => handleSort(columns[column].iter)
                                : undefined
                        }
                        {...{ role: columns[column].iter && "button" }}
                        scope="col"
                        style={{ width: "300px" }}
                    >
                        {columns[column].name}
                        {selectedSort.iter &&
                            selectedSort.iter === columns[column].iter &&
                            (selectedSort.order === "asc" ? (
                                <i className="bi bi-caret-up-fill"></i>
                            ) : (
                                <i className="bi bi-caret-down-fill"></i>
                            ))}
                    </th>
                ))}
            </tr>
        </thead>
    );
};

TableHeader.propTypes = {
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    columns: PropTypes.object.isRequired
};

export default TableHeader;
