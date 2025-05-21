import React, { useState, FormEvent, ChangeEvent } from 'react';
import { FaSearch, FaSpinner } from 'react-icons/fa';
import { Input } from './input';
import { Button } from './button';

interface SearchFormProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
  placeholder?: string;
  label?: string;
  initialQuery?: string;
  inputError?: string;
}

const SearchForm: React.FC<SearchFormProps> = ({
  onSearch,
  isLoading = false,
  placeholder = 'Введите Mode-S или регистрацию...',
  label = 'Поиск самолета',
  initialQuery = '',
  inputError,
}) => {
  const [query, setQuery] = useState(initialQuery);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value.toUpperCase());
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 w-full">
      {}
      {label && (
        <label
          htmlFor="aircraft-search-input"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          {label}
        </label>
      )}
      <div className="flex flex-col sm:flex-row items-start sm:space-x-2">
        <div className="flex-grow w-full mb-2 sm:mb-0"> {}
          <Input
            id="aircraft-search-input"
            name="aircraft-search"
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder={placeholder}
            disabled={isLoading}
            className={`w-full ${inputError ? 'border-destructive ring-destructive/20 dark:ring-destructive/40' : ''} sm:rounded-r-none`}
            aria-invalid={!!inputError}
          />
          {inputError && (
            <p className="mt-1 text-xs text-destructive dark:text-red-400">{inputError}</p>
          )}
        </div>
        <Button
          type="submit"
          variant="default"
          size="default"
          disabled={isLoading || !query.trim()}
          className="w-full sm:w-auto sm:rounded-l-none"
        >
          {isLoading ? (
            <FaSpinner className="animate-spin" />
          ) : (
            <FaSearch />
          )}
          <span className="ml-2">{isLoading ? 'Поиск...' : 'Найти'}</span>
        </Button>
      </div>
    </form>
  );
};

export default SearchForm;