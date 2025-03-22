import React from "react";
import { FormInput } from "./";
import { Form } from "react-router-dom";
function Search() {
  return (
    <div>
      <Form
        method="post"
        className="mx-auto flex w-full max-w-96 items-center gap-2"
      >
        <FormInput
          type="search"
          placeholder="Search photos and illustrations"
          name="search"
        />
        <button className="btn btn-primary btn-sm md:hidden">Search</button>
      </Form>
    </div>
  );
}

export default Search;
