
import { useKanbanStore } from '@/lib/kanbanStore';
import { Search, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const SearchBar = () => {
  const { searchQuery, updateSearchQuery } = useKanbanStore();
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClear = () => {
    updateSearchQuery('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Focus input with keyboard shortcut (Cmd/Ctrl + K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div 
      className={`search-bar flex items-center relative px-4 py-2 rounded-full border bg-white transition-all duration-300 max-w-md mx-auto ${
        isFocused ? 'shadow-sm ring-2 ring-primary/20' : ''
      }`}
    >
      <Search className="w-4 h-4 text-gray-400 mr-2" />
      <input
        ref={inputRef}
        type="text"
        value={searchQuery}
        onChange={(e) => updateSearchQuery(e.target.value)}
        placeholder="Search tasks... (⌘K)"
        className="flex-1 bg-transparent outline-none text-sm"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {searchQuery && (
        <button 
          onClick={handleClear}
          className="focus:outline-none"
          aria-label="Clear search"
        >
          <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
