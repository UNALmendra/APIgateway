export const imgTypeDef = `
  type Image {
      file: String
  }`;

  
export const imgQueries = `
  `;


export const imgMutations = `
    postImg(surl: String!): Image,
    postPdf(surl: String!): Image,
    postPdfRange(surl: String!): Image,
`;
