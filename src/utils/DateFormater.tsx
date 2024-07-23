import React from 'react';

interface DateFormatterProps {
  date: Date | string;
}

const DateFormatter: React.FC<DateFormatterProps> = ({ date }) => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  return (
    <span>{formatDate(dateObj)}</span>
  );
};

export default DateFormatter;
