import React, { useState } from 'react'
import { DataTableStyled } from './DataTableStyles'
import { Column } from 'primereact/column'

const DataTable = ({ columns, paginator, rows, rowsPerPageOptions, value, loading, renderers, dataKey, selectable = true, onRowClick }) => {
    const [rowClick, setRowClick] = useState(true);
    const [selectedProducts, setSelectedProducts] = useState(null);
    
    return (
        <DataTableStyled
            paginator={paginator}
            rows={rows}
            rowsPerPageOptions={rowsPerPageOptions}
            value={value}
            dataKey={dataKey}
            loading={loading}
            emptyMessage="No se encontraron datos."
            selectionMode={selectable ? null : undefined}
            selection={selectable ? selectedProducts : undefined}
            onSelectionChange={selectable ? (e) => setSelectedProducts(e.value) : undefined}
            onRowClick={onRowClick}
        >
            {selectable && (
                <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} />
            )}
            {columns.map((col) => (
                <Column 
                    key={col.field}
                    field={col.field}
                    header={col.header}
                    {...(renderers[col.field] && { body: renderers[col.field] })}
                />
            ))}
        </DataTableStyled>  
    )
}

export default DataTable