export const documentTypeDef = `
  type Document {
    _id: String
    name: String
    type: String
    user: String!
    storage: String!
    updated_at: String
    created_at: String
  }

  input NewDocument {
      name: String!
      type: String!
      user: String!
      file: String!
  }`;

  
export const documentQueries = `
      documents_user(user: String): [Document]
  `;


export const documentMutations = `
    postNewDocument(document: NewDocument): Document
`;
