import React from "react";
import { FormInput } from "./";
import { Form } from "react-router-dom";
function Search() {
  return (
    <div>
      <Form
        method="post"
        className="flex items-center gap-2 max-w-96 mx-auto w-full "
      >
        <FormInput
          type="search"
          placeholder="Search photos and illustrations"
          name="search"
        />
        <button className="btn btn-primary md:hidden btn-sm ">Search</button>
      </Form>
    </div>
  );
}

export default Search;
