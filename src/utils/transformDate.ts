function transformDate(value: any): string {
  return value !== ''
    ? new Date(value)
      .toISOString()
      .split('T')[0]
    : '';
}

export default transformDate;
