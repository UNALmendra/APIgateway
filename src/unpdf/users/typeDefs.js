export const usersTypeDef = `
  type User {
    id: Int
    name: String
    email: String
    password: String
  }

  input LoginInput {
    email: String
    password: String
  }
  
  input RegisterInput {
    name: String
    email: String
    password: String
  }
  `;

  
export const usersQueries = `
    allUsers(in: String): [User]
  `;


export const usersMutations = `
  postLogin(logininfo: LoginInput): String
`;
