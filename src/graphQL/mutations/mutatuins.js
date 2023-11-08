import { gql } from "@apollo/client";
// user mutation
export const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      createdAt
      email
      id
      token
      username
    }
  }
`;

export const LOGIN_USER = gql`
  mutation LoginUser($input: LoginInput!) {
    loginUser(input: $input) {
      createdAt
      email
      id
      token
      username
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($updateUserId: ID!, $input: UpdateUserInput!) {
    updateUser(id: $updateUserId, input: $input) {
      createdAt
      email
      id
      token
      username
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($deleteUserId: ID!) {
    deleteUser(id: $deleteUserId) {
      createdAt
      email
      id
      token
      username
    }
  }
`;
//course mutation
export const CREATE_COURSE = gql`
  mutation CreateCourse($input: CreateCourseInput!) {
    createCourse(input: $input) {
      category
      description
      id
      price
      title
      user
    }
  }
`;
export const UPDATE_COURSE = gql`
  mutation UpdateCourse($updateCourseId: ID!, $input: UpdateCourseInput!) {
    updateCourse(id: $updateCourseId, input: $input) {
      category
      description
      id
      price
      title
      user
    }
  }
`;
export const DELETE_COURSE = gql`
  mutation DeleteCourse($deleteCourseId: ID!) {
    deleteCourse(id: $deleteCourseId) {
      category
      description
      id
      price
      title
      user
    }
  }
`;
