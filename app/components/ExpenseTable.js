// components/ExpenseTable.js
'use client';
import React from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react';

export function ExpenseTable({ amounts }) {
  const categories = ["Food", "Groceries", "Travel", "Big Ticket", "Personal", "TotalNoBT"];

  return (
    <TableContainer as={Box} mt="10">
      <Table variant="striped" colorScheme="gray">
        <Tbody>
          {categories.map((category, index) => (
            <Tr key={index}>
              <Td>{category}</Td>
              <Td isNumeric>{amounts[category]}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
