export const logTypeDef = `
  type Log {
      Doc: String
      Description: String
      User: String
      Date: String
  }`;

export const logQueries = `
      logsById(Doc: String): Log
  `;
