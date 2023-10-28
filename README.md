# @aminnairi/react-table

Streamline Your Tables: Effortless Data Control and Presentation

## Summary

- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Uninstallation](#uninstallation)
- [API](#api)
   - [useTable](#usetable)
   - [rows](#rows)
   - [sortBy](#sortby)
   - [createSortBy](#createsortby)
   - [filters](#filters)
- [License](#license)
- [Contributing](#contributing)
- [Changelog](#changelog)

[Back to summary](#summary)

## Features

- Simple and Lightweight: Our table handling library is designed to be easy to use and is incredibly lightweight. It won't bloat your project or add unnecessary complexity to your code.
- UI Framework Agnostic: Whether you're using Material UI, TailwindCSS, BootstrapCSS, or any other UI framework, our library can seamlessly integrate into your project. It doesn't impose any specific UI framework requirements.
- Efficient Data Sorting: With the ability to sort your table data by any column, you can easily organize your data in ascending or descending order, providing a better user experience for your application's users.
- Dynamic Filtering: Filter your table data based on multiple criteria, making it straightforward to display only the data that's relevant to your users. Dynamic filtering is made easy, allowing users to search and find what they need quickly.
- TypeScript Support: Our library is written in TypeScript from the ground up. This ensures strong type safety, preventing common mistakes and offering improved code quality and maintainability.
- Customizable and Extensible: The library is designed to be customizable and extensible. You can adapt it to your specific project needs and build on top of it as your application requirements evolve.
- Performance Optimized: We use efficient algorithms and memoization techniques to ensure your table handling remains performant even with large datasets. It's built with performance in mind.
- No Dependencies: Our library doesn't rely on external dependencies, reducing the risk of version conflicts and ensuring a seamless integration into your project.
- Open Source: This library is open source, which means you can contribute to its development, report issues, and benefit from a collaborative community of users.
- Clear and Concise API: The library provides a straightforward API with clear and concise functions, making it easy for developers of all skill levels to use and understand.
- Community Support: Join a community of developers who use this library for their table handling needs. Get help, share your insights, and learn from others in the community.
- Documentation and Examples: We provide extensive documentation and examples to help you get started quickly and make the most of the library's features.
- Continuous Updates: We're committed to maintaining and improving this library. Expect continuous updates and improvements to ensure compatibility with the latest web technologies and best practices.

[Back to summary](#summary)

## Requirements

- Node
- NPM
- React 16.8+

[Back to summary](#summary)

## Installation

```bash
npm install @aminnairi/react-table
```

[Back to summary](#summary)

## Uninstallation

```bash
npm uninstall @aminnairi/react-table
```

[Back to summary](#summary)

## API

### useTable

The `useTable` hook is the core component of our table handling library. It simplifies the process of managing and displaying table data in your application. With this hook, you can efficiently control, sort, and filter your table data with ease. The hook accepts an options object, which includes the `rows` array containing your data and a set of `filters` to specify filtering criteria. It returns an object with three key functions: `sortBy`, `createSortBy`, and the `rows` property.

```tsx
import { useTable } from "@aminnairi/react-table";

type Row = {
   id: string,
   email: string
}

const Component = () => {
   const table = useTable<Row>({
      rows: [
         {
            id: "1",
            email: "first@domain.com"
         },
         {
            id: "2",
            email: "second@domain.com"
         }
      ],
      filters: {
         id: "",
         email: ""
      }
   });

   return null;
}
```

[Back to summary](#summary)

### rows

The `rows` property is the result of your table handling logic. It provides you with the filtered and sorted data that is ready to be rendered in your UI. This array contains the rows that meet the filter criteria and are sorted according to the chosen column key. The `rows` property simplifies the process of rendering your table, ensuring that you present your data to users in a clear and organized manner. By using this property, you can focus on designing your table's UI without worrying about the underlying data manipulation.

```tsx
import { useTable } from "@aminnairi/react-table";

type Row = {
   id: string,
   email: string
}

const Component = () => {
   const { rows } = useTable<Row>({
      rows: [
         {
            id: "1",
            email: "first@domain.com"
         },
         {
            id: "2",
            email: "second@domain.com"
         }
      ],
      filters: {
         id: "",
         email: ""
      }
   });

   return (
      <table>
         <tbody>
            {rows.map(row => (
               <tr key={row.id}>
                  <td>
                     {row.id}
                  </td>
                  <td>
                     {row.email}
                  </td>
               </tr>
            ))}
         </tbody>
      </table>
   );
}
```

[Back to summary](#summary)

### sortBy

The `sortBy` function is a fundamental feature of our table handling library. It allows you to sort your table data based on a specified column or key. When called with the desired key, the `sortBy` function reorders the rows in either ascending or descending order, depending on the current sorting order of that column. Sorting can significantly enhance the usability of your table by enabling users to organize data according to their preferences. It's a simple and effective way to make your table more user-friendly.

```tsx
import { useCallback } from "react";
import { useTable } from "@aminnairi/react-table";

type Row = {
   id: string,
   email: string
}

const Component = () => {
   const { rows, sortBy } = useTable<Row>({
      rows: [
         {
            id: "1",
            email: "first@domain.com"
         },
         {
            id: "2",
            email: "second@domain.com"
         }
      ],
      filters: {
         id: "",
         email: ""
      }
   });

   const sortByIdentifier = useCallback(() => {
      sortBy("identifier");
   }, [sortBy]);

   const sortByEmail = useCallback(() => {
      sortBy("email");
   }, [sortBy]);

   return (
      <table>
         <thead>
            <tr>
               <th onClick={sortByIdentifier}>
                  Identifier
               </th>
               <th onClick={sortByEmail}>
                  Email
               </th>
            </tr>
         </thead>
         <tbody>
            {rows.map(row => (
               <tr key={row.id}>
                  <td>
                     {row.id}
                  </td>
                  <td>
                     {row.email}
                  </td>
               </tr>
            ))}
         </tbody>
      </table>
   );
}
```

[Back to summary](#summary)

### createSortBy

The `createSortBy` function is a utility function that works in tandem with `sortBy`. It returns a callback function that is preconfigured to sort the table by a specific column when triggered. This function is particularly useful for scenarios where you want to create sortable column headers in your table. By using `createSortBy`, you can easily assign sorting functionality to specific header cells in a declarative and maintainable manner.

```tsx
import { useTable } from "@aminnairi/react-table";

type Row = {
   id: string,
   email: string
}

const Component = () => {
   const { rows, createSortBy } = useTable<Row>({
      rows: [
         {
            id: "1",
            email: "first@domain.com"
         },
         {
            id: "2",
            email: "second@domain.com"
         }
      ],
      filters: {
         id: "",
         email: ""
      }
   });

   return (
      <table>
         <thead>
            <tr>
               <th onClick={createSortBy("identifier")}>
                  Identifier
               </th>
               <th onClick={createSortBy("email")}>
                  Email
               </th>
            </tr>
         </thead>
         <tbody>
            {rows.map(row => (
               <tr key={row.id}>
                  <td>
                     {row.id}
                  </td>
                  <td>
                     {row.email}
                  </td>
               </tr>
            ))}
         </tbody>
      </table>
   );
}
```

[Back to summary](#summary)

### filters

The `filters` option is a key feature for adding dynamic data filtering to your table. It allows you to apply multiple filters to the table data based on column values. By providing a record of filter criteria, you can quickly narrow down the displayed rows to only those that meet the specified conditions. This feature is particularly beneficial when working with large datasets, where users need to find specific information without scrolling through an extensive list of items.

```tsx
import { ChangeEventHandler, useState, useCallback } from "react";
import { useTable } from "@aminnairi/react-table";

type Row = {
   id: string,
   email: string
}

const Component = () => {
   const [id, setId] = useState("");
   const [email, setEmail] = useState("");

   const { rows, createSortBy } = useTable<Row>({
      rows: [
         {
            id: "1",
            email: "first@domain.com"
         },
         {
            id: "2",
            email: "second@domain.com"
         }
      ],
      filters: {
         id,
         email
      }
   });

   const updateId: ChangeEventHandler<HTMLInputElement> = useCallback(event => {
      setId(event.target.value);
   }, [setId]);

   const updateEmail: ChangeEventHandler<HTMLInputElement> = useCallback(event => {
      setEmail(event.target.value);
   }, [setEmail]);

   return (
      <table>
         <thead>
            <tr>
               <th onClick={createSortBy("identifier")}>
                  Identifier
               </th>
               <th onClick={createSortBy("email")}>
                  Email
               </th>
            </tr>
            <tr>
               <th>
                  <input value={id} onChange={updateId} />
               </th>
               <th>
                  <input value={email} onChange={updateEmail} />
               </th>
            </tr>
         </thead>
         <tbody>
            {rows.map(row => (
               <tr key={row.id}>
                  <td>
                     {row.id}
                  </td>
                  <td>
                     {row.email}
                  </td>
               </tr>
            ))}
         </tbody>
      </table>
   );
}
```

[Back to summary](#summary)

## License

See [`LICENSE`](./LICENSE).

[Back to summary](#summary)

## Contributing

See [`CONTRIBUTING.md`](./CONTRIBUTING.md).

[Back to summary](#summary)

## Changelog

See [`CHANGELOG.md`](./CHANGELOG.md).

[Back to summary](#summary)