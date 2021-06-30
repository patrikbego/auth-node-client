import React from 'react';

export default function DateLabel({ dateString }) {
  const date = dateString ? new Date(dateString).toDateString() : new Date(Date.now()).toDateString();
  return <time dateTime={dateString}>{date.toLocaleString()}</time>;
}
