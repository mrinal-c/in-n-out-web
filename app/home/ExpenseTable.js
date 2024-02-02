// components/ExpenseTable.js
'use client';
import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

export function ExpenseTable({ amounts }) {
  const categories = ["Food", "Groceries", "Travel", "Big Ticket", "Personal", "TotalNoBT"]

  return (
    <TableContainer component={Paper} className='mt-10'>
      <Table>
        <TableBody>
          {categories.map((category, index) => (
            <TableRow key={index}>
              <TableCell>{category}</TableCell>
              <TableCell align="right">{amounts[category]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
