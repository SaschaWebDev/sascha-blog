import { request, gql } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getPosts = () => {
  const query = gql`
    query getPosts {
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

export const getSimilarPosts = (categories, slug) => {
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

  return request(graphqlAPI, query, { categories, slug })
    .then((result) => result.posts)
    .catch((error) =>
      console.log("Error during getSimilarPosts request: ", error)
    );
};

export const getCategories = async () => {
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

export const getPostDetails = (slug) => {
  const query = gql`
    query GetPostDetails($slug: String!) {
      post(where: { slug: $slug }) {
        title
        excerpt
        featuredImage {
          url
        }
        author {
          name
          bio
          photo {
            url
          }
        }
        createdAt
        slug
        content {
          raw
        }
        categories {
          name
          slug
        }
      }
    }
  `;

  return request(graphqlAPI, query, { slug })
    .then((result) => result.post)
    .catch((error) =>
      console.log("Error during getPostDetails request: ", error)
    );
};

// Since Next.js offers the functionality to outsource backend requests into serverless functions hosted at Vercel there is no need for a dedicated backend. Still we can make a HTTP request to send the comments through the serverless backend found within the api folder and receive them in the headless GraphCMS. Approval and disapproval of comments will happen within the GraphCMS dashboard.
export const submitComment = async (commentObject) => {
  const result = await fetch("/api/comments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(commentObject),
  });

  return result.json();
};

export const getComments = async (slug) => {
  const query = gql`
    query GetComments($slug: String!) {
      comments(where: { post: { slug: $slug } }) {
        name
        createdAt
        comment
      }
    }
  `;

  return request(graphqlAPI, query, { slug })
    .then((result) => result.comments)
    .catch((error) => console.log("Error during getComments request: ", error));
};
