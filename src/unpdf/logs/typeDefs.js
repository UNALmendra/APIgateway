export const logTypeDef = `
  type Log {
      Doc: String
      Description: String
      User: String
      Date: String
  }
  input LogInput{
    doc: String!
    user: String!
    description: String!
  }`;

export const logQueries = `
      logsById(Doc: String): Log
  `;

export const logMutations = `
      postLog(log: LogInput): Log 
`;
