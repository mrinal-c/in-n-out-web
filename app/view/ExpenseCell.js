'use client'
import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import Image from 'next/image'

export function ExpenseCell ({ expense, deleteTransaction })  {
  const { date, description, type, price, payment, _id } = expense;

  const filename = (paymentName) => {
    switch (paymentName) {
      case 'Venmo':
        return 'venmo.png';
      case 'AMEX Card':
        return 'amex.png';
      case 'Citi Card':
        return 'citi.png';
      case 'Debit Card':
        return 'ally.png';
      case 'Cash':
        return 'cash.png';
    }
  }

  const handleDelete = () => {
    deleteTransaction(expense);
  }

  return (
    <Card variant="outlined" style={{ marginBottom: '16px' }}>
      <CardContent>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <Typography variant="h6" gutterBottom>
              {description}
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Date: {date}
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Category: {type}
            </Typography>
            <Typography variant="body1" color="textPrimary">
              Amount: ${price}
            </Typography>
          </div>
          <div>
            <Image src={`/${filename(payment)}`} alt={payment} width={50} height={50} />
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
          <Button variant="outlined" color="secondary" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
