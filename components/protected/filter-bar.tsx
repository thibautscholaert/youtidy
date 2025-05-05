import classNames from 'classnames';
import debounce from 'lodash/debounce';
import { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from 'react';

type FilterBarProps = {
  onSearch: (query: string) => void;
  classname?: string;
  inputClassname?: string;
  placeholder?: string;
};

export type FilterBarRef = {
  reset: () => void;
};

const FilterBar = forwardRef<FilterBarRef, FilterBarProps>(
  ({ onSearch, classname, inputClassname, placeholder }, ref) => {
    const [inputValue, setInputValue] = useState('');

    const debouncedSearch = useCallback(
      debounce((val: string) => {
        onSearch(val);
      }, 300), // adjust delay if needed
      []
    );

    useImperativeHandle(ref, () => ({
      reset() {
        setInputValue('');
      },
    }));

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
      onSearch?.(e.target.value);
    };

    useEffect(() => {
      debouncedSearch(inputValue);
      return debouncedSearch.cancel; // cancel on unmount or before next call
    }, [inputValue, debouncedSearch]);

    return (
      <div
        className={classNames(
          classname,
          'flex flex-wrap gap-2 sm:gap-4 items-center justify-center'
        )}
      >
        <input
          type="text"
          className={classNames(
            inputClassname,
            'w-full py-2 pl-8 pr-4 bg-white/30 text-white placeholder-white/80 rounded-md border border-white/20'
          )}
          placeholder={`${placeholder ?? 'Search'}...`}
          value={inputValue}
          onChange={handleChange}
        />
      </div>
    );
  }
);

export default FilterBar;
