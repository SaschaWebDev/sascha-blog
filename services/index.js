import { request, gql } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getPosts = () => {
  const query = gql`
    query MyQuery {
      postsConnection {
        edges {
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `;

  return request(graphqlAPI, query)
    .then((result) => result.postsConnection.edges)
    .catch((error) => console.log("Error during getPosts request: ", error));
};

export const getRecentPosts = () => {
  const query = gql`
    query GetPostDetails() {
      posts(
        orderBy: createdAt_ASC
        last: 3
        ) {
          title
          featuredImage {
            url
          }
          createdAt
          slug
        }
    }
  `;

  return request(graphqlAPI, query)
    .then((result) => result.posts)
    .catch((error) =>
      console.log("Error during getRecentPosts request: ", error)
    );
};

// This query will fetch posts that does not contain the same slug thus exclude the current post but contain some of the same categories.

export const getSimilarPosts = () => {
  const query = gql`
    query GetPostDetails($slug: String!, $categories: [String!]) {
      posts(
        where: {
          slug_not: $slug
          AND: { categories_some: { slug_in: $categories } }
        }
        last: 3
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;

  return request(graphqlAPI, query)
    .then((result) => result.posts)
    .catch((error) =>
      console.log("Error during getSimilarPosts request: ", error)
    );
};

export const getCategories = () => {
  const query = gql`
    query getCategories {
      categories {
        name
        slug
      }
    }
  `;

  return request(graphqlAPI, query)
    .then((result) => result.categories)
    .catch((error) =>
      console.log("Error during getCategories request: ", error)
    );
};
