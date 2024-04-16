import { Form, InputGroup } from "react-bootstrap";
import { Search as SearchIcon} from "react-bootstrap-icons";
import React from "react";

const SearchForm = (props) => {
  return (
    <InputGroup className="px-1 d-flex">
      <InputGroup.Text id="basic-addon1">
        <SearchIcon/>
      </InputGroup.Text>
      <Form.Control
        placeholder="Search"
        aria-label="Username"
        aria-describedby="basic-addon1"
        onChange={props.handleInputChange}
        value={props.searchItem}
      />
    </InputGroup>
  );
};

export default SearchForm;
