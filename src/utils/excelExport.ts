import { fetchAllOrders } from './database';

export async function exportToExcel(headers: Record<string, string>, filename: string) {
  try {
    const data = await fetchAllOrders();
    if (!data || data.length === 0) return;

    // Add BOM for UTF-8 encoding
    const BOM = '\uFEFF';

    // Transform data to match headers
    const csvData = data.map(order => ({
      [headers['production.orderNumber']]: order.order_number,
      [headers['production.location']]: order.location,
      [headers['production.employeeId']]: order.employee_id,
      [headers['production.timestamp']]: new Date(order.timestamp).toLocaleString()
    }));

    // Create CSV content with proper escaping
    const headerRow = Object.values(headers);
    const csvContent = BOM + [
      headerRow.join(','),
      ...csvData.map(row => 
        Object.values(row).map(value => {
          const stringValue = String(value);
          // Escape special characters and wrap in quotes if needed
          if (stringValue.includes(',') || stringValue.includes('\n') || stringValue.includes('"') || /[\u0080-\uffff]/.test(stringValue)) {
            return `"${stringValue.replace(/"/g, '""')}"`;
          }
          return stringValue;
        }).join(',')
      )
    ].join('\n');

    // Create blob with UTF-8 encoding
    const blob = new Blob([csvContent], { 
      type: 'text/csv;charset=utf-8'
    });

    // Download file
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error exporting to Excel:', error);
    throw error;
  }
}