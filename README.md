# sascha-blog

My personal blog website made with Next.js (React), Tailwind CSS, GraphQL and a headless content management system.

## Technical Features

- Static Site Generation (SSG) for Pre-Rendering with Next.js based on React.js
- Tailwind CSS Utility-First Framework for CSS
- GraphQL as Query Language
- GraphCMS as GraphQL headless CMS

## Setup

### Environment Variables

- `NEXT_PUBLIC_GRAPHCMS_ENDPOINT` for the GraphQL data fetching to GraphCMS. The connection URL can be retrieved within the web interface of GraphCMS under settings -> environments -> master environment URL. Also make sure to enable API access within settings -> API Access -> Content API Permissions -> "Yes Initialize with defaults"

## Learnings

### Setup

The project was created using Next.js bootstrap cli command `npx create-next-app -e with-tailwindcss ./`. to bootstrap a pre configured but blank project into the current directory.

### Styling

- The navigation bar uses the tailwindcss command `contents` which will create a phantom container whose children act like direct children of the parent
- The Layout.jsx component is created in such a way that every component can used this through props and the header will always be added above the given component. Thus the redundancy of inserted the header before every view is gone.

### GraphQL & Data fetching

- For data fetching in the browser with GraphQL to the GraphCMS headless CMS the package graphql-request is used within the `service` folder.
- Instead of writing out the nested graphql queries yourself it is much easier to use the GraphCMS API Playground feature and just select all the data you want to retrieve and get the finished query structured out already. You can click the play button there to see real time data of your response to double check.
- For executing the data fetching instead of writing a useEffect the next.js way is to outsource the function into a getStaticProps() async function outside of the page function but within the page file like this:

```javascript
export async function getStaticProps() {
  const posts = (await getPosts()) || [];

  return {
    props: { posts },
  };
}
```
