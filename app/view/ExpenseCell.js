'use client'
import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

export function ExpenseCell ({ expense })  {
  const { date, description, type, price } = expense;

  return (
    <Card variant="outlined" style={{ marginBottom: '16px' }}>
      <CardContent>
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
      </CardContent>
    </Card>
  );
};
