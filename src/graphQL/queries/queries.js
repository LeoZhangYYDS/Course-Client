import { gql } from "@apollo/client";
//user query
export const GET_USER = gql`
  query GetUser($getUserId: ID!) {
    getUser(id: $getUserId) {
      createdAt
      email
      id
      token
      username
    }
  }
`;
export const GET_USERS = gql`
  query GetUsers {
    getUsers {
      createdAt
      email
      id
      token
      username
    }
  }
`;
//couser query
export const GET_COURSE = gql`
  query Query($getCourseId: ID!) {
    getCourse(id: $getCourseId) {
      category
      description
      id
      price
      title
      user
    }
  }
`;
export const GET_COURSES = gql`
  query GetCourses {
    getCourses {
      category
      description
      id
      price
      title
      user
    }
  }
`;
export const SEARCH_COURSES = gql`
  query SearchCourses($title: String!) {
    searchCourses(title: $title) {
      category
      description
      id
      price
      title
      user
    }
  }
`;
