export const downloadCSV = <T extends Record<string, any>>(data: T[], filename: string) => {
  if (data.length === 0) {
    alert("Não há dados para exportar.");
    return;
  }

  // Obter cabeçalhos
  const headers = Object.keys(data[0]);

  // Converter para linhas do CSV
  const csvRows = [];
  csvRows.push(headers.join(','));

  for (const row of data) {
    const values = headers.map(header => {
      let val = row[header];
      if (val === null || val === undefined) {
        val = '';
      }
      
      // Escapando aspas duplas caso hajam no string
      const stringVal = String(val).replace(/"/g, '""');
      
      // Colocar dentro de aspas duplas se houver vírgula
      if (stringVal.includes(',') || stringVal.includes('\n') || stringVal.includes('"')) {
        return `"${stringVal}"`;
      }
      
      return stringVal;
    });
    csvRows.push(values.join(','));
  }

  const csvString = csvRows.join('\n');
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  
  // Trigger do Download (Hack para Browser)
  const link = document.createElement("a");
  if (link.download !== undefined) { 
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `${filename}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
