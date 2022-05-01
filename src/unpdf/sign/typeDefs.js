export const signTypeDef = `
  type Sign {
      id: Int
      title: String
      body: String
  }
  input SignInput {
      title: String!
      body: String!
  }`;

  
export const signQueries = `
      allSign: [Sign]
      signById(id: Int): Sign
  `;


export const signMutations = `
    postSign(sign: SignInput): Sign
`;
