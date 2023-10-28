import { RefObject, createRef, useEffect } from "react";
import { useTable } from "./hooks/index";
import { useStatefulRequest } from "saint-bernard";
import { z } from "zod";
import { noTransformation, noValidation, useForm } from "@aminnairi/react-form";

const userSchema = z.object({
  id: z.number(),
  email: z.string(),
  username: z.string(),
  name: z.string(),
  phone: z.string()
});

const usersSchema = z.array(userSchema);

type Users = z.infer<typeof usersSchema>;
type User = z.infer<typeof userSchema>;

type Fields = {
  id: string
  email: string
  username: string
  name: string
  phone: string
}

type References = {
  id: RefObject<HTMLInputElement>
  email: RefObject<HTMLInputElement>
  username: RefObject<HTMLInputElement>
  name: RefObject<HTMLInputElement>
  phone: RefObject<HTMLInputElement>
}

export default function App() {
  const { fields, input, references } = useForm<Fields, References>({
    fields: {
      id: "",
      email: "",
      username: "",
      name: "",
      phone: ""
    },
    transformations: {
      id: noTransformation,
      email: noTransformation,
      username: noTransformation,
      name: noTransformation,
      phone: noTransformation
    },
    validations: {
      id: noValidation,
      email: noValidation,
      username: noValidation,
      name: noValidation,
      phone: noValidation
    },
    references: {
      id: createRef(),
      email: createRef(),
      username: createRef(),
      name: createRef(),
      phone: createRef()
    }
  });

  const { state: users, request: getUsersRequest } = useStatefulRequest<Users>({
    initialState: []
  });

  const { rows, createSortBy } = useTable<User>({
    rows: users,
    filters: {
      id: fields.id,
      email: fields.email,
      username: fields.username,
      name: fields.name,
      phone: fields.phone
    }
  });

  useEffect(() => {
    getUsersRequest({
      url: "https://jsonplaceholder.typicode.com/users",
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      onResponse: async response => {
        const json = await response.json();

        return usersSchema.parse(json);
      }
    });
  }, [getUsersRequest]);

  return (
    <table>
      <thead>
        <tr>
          <th onClick={createSortBy("id")}>
            Identifier
          </th>
          <th onClick={createSortBy("email")}>
            Email
          </th>
          <th onClick={createSortBy("username")}>
            Username
          </th>
          <th onClick={createSortBy("name")}>
            Name
          </th>
          <th onClick={createSortBy("phone")}>
            Phone
          </th>
        </tr>
        <tr>
          <th>
            <input
              type="search"
              value={fields.id}
              onChange={input("id")}
              ref={references.id} />
          </th>
          <th>
            <input
              type="search"
              value={fields.email}
              onChange={input("email")}
              ref={references.email} />
          </th>
          <th>
            <input
              type="search"
              value={fields.username}
              onChange={input("username")}
              ref={references.username} />
          </th>
          <th>
            <input
              type="search"
              value={fields.name}
              onChange={input("name")}
              ref={references.name} />
          </th>
          <th>
            <input
              type="search"
              value={fields.phone}
              onChange={input("phone")}
              ref={references.phone} />
          </th>
        </tr>
      </thead>
      <tbody>
        {rows.map(row => (
          <tr key={row.id}>
            <td>{row.id}</td>
            <td>{row.email}</td>
            <td>{row.username}</td>
            <td>{row.name}</td>
            <td>{row.phone}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}