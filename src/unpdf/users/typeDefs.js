export const usersTypeDef = `
  type User {
    id: Int
    name: String
    password: String
  }

  type LogInRet{
    success: Boolean
    message: String
    token: String
  }
  `;

  
export const usersQueries = `
  `;


export const usersMutations = `
    postLogIn(username: String, password: String): LogInRet
    postSignUp(username: String, password: String): String
`;
