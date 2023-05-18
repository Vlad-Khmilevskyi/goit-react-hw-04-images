import { useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { Form, FormButton, Label, Input, Header } from './Searchbar.module';
import { FcSearch } from 'react-icons/fc';

function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState('');

  const onChange = event => {
    setQuery(event.currentTarget.value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (!query.trim()) {
      return toast.warning('Please type something');
    }

    onSubmit(query);
    setQuery('');
  };

  return (
    <Header>
      <Form onSubmit={handleSubmit}>
        <FormButton type="submit">
          <Label>Search</Label>
          <FcSearch size={20} />
        </FormButton>
        <Input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={onChange}
        />
      </Form>
    </Header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
