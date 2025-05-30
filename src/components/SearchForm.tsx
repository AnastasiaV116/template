import React from 'react';

interface SearchFormProps {
  onSubmit: (event: React.FormEvent) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSubmit }) => {
  return (
    <form className="search-form" onSubmit={onSubmit}>
      <input type="text" name="query" placeholder="Введите запрос для поиска" />
      <button type="submit">Искать</button>
    </form>
  );
};

export default SearchForm;