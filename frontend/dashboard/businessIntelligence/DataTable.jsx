import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

export default function DataTable({ data }) {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Resumo de Produtos
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Produto</TableCell>
              <TableCell align="right">Quantidade</TableCell>
              <TableCell align="right">Receita</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.slice(0, 5).map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.product}</TableCell>
                <TableCell align="right">{row.quantity}</TableCell>
                <TableCell align="right">R$ {row.revenue?.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}