'use client';
import React from 'react';
import { Box, Text, Button, Image, Flex } from '@chakra-ui/react';

export function ExpenseCell({ expense, deleteTransaction, openEditModal }) {
  const { date, description, type, amount, payment } = expense;

  const filename = (paymentName) => {
    switch (paymentName) {
      case 'Venmo':
        return 'venmo.png';
      case 'AMEX Card':
        return 'amex.png';
      case 'Citi Card':
        return 'citi.png';
      case 'Ally Card':
        return 'ally.png';
      case 'Cash':
        return 'cash.png';
      default:
        return 'default.png';
    }
  };

  const handleDelete = () => {
    deleteTransaction(expense);
  };

  return (
    <Box borderWidth="1px" borderRadius="md" overflow="hidden" mb={4}>
      <Box p={4}>
        <Flex alignItems="center" justifyContent="space-between">
          <Box>
            <Text fontSize="xl" fontWeight="semibold" mb={2}>
              {description}
            </Text>
            <Text fontSize="sm" color="gray.500" mb={2}>
              Date: {date}
            </Text>
            <Text fontSize="sm" color="gray.500" mb={2}>
              Category: {type}
            </Text>
            <Text fontSize="md" color="gray.700">
              Amount: ${amount}
            </Text>
          </Box>
          <Box>
            <Image src={`/${filename(payment)}`} alt={payment} boxSize="50px" />
          </Box>
        </Flex>
        <Flex justifyContent="flex-end" mt={4}>
          <Button
            variant="outline"
            colorScheme="blue"
            onClick={() => openEditModal(expense)}
            mr={2}
          >
            Edit
          </Button>
          <Button variant="outline" colorScheme="red" onClick={handleDelete}>
            Delete
          </Button>
        </Flex>
      </Box>
    </Box>
  );
}
