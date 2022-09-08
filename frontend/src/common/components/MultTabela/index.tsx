import React, { useEffect, useState } from "react";



import { DataGrid, GridRowsProp, GridColDef, GridColumns, GridRenderCellParams, GridToolbar  } from '@mui/x-data-grid';
///GridColDef pode incluir uma função ou combinação para uma deternminada coluna





export default function Tabela({ banco, columns }) {



  return (
    <div
      style={{ height: 350, width: '84.2%', color: '#222' }}>
      <DataGrid 
        rows={banco} 
        columns={columns}
        disableColumnFilter
        // disableColumnSelector
        disableDensitySelector
        //
      
      
        components={{ Toolbar: GridToolbar }}
        componentsProps={{
          toolbar: {
            showQuickFilter: true,
            // quickFilterProps: { debounceMs: 500 },
          },
        }}
        />
    </div>

  )
}
