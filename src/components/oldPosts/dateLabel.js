import React from 'react';

export default function DateLabel({ dateString }) {
  const date = dateString ? new Date(dateString).toDateString() : Date.now();
  return <time dateTime={dateString}>{date.toLocaleString()}</time>;
}
