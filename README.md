# sascha-blog

My personal blog website made with Next.js (React), Tailwind CSS, GraphQL and a headless content management system.

## Technical Features

- Static Site Generation (SSG) for Pre-Rendering with Next.js based on React.js
- Tailwind CSS Utility-First Framework for CSS
- GraphQL as Query Language
- GraphCMS as GraphQL headless CMS

## Learnings

### Setup

The project was created using Next.js bootstrap cli command `npx create-next-app -e with-tailwindcss ./`. to bootstrap a pre configured but blank project into the current directory.

## Styling

- The navigation bar uses the tailwindcss command `contents` which will create a phantom container whose children act like direct children of the parent
- The Layout.jsx component is created in such a way that every component can used this through props and the header will always be added above the given component. Thus the redundancy of inserted the header before every view is gone.
