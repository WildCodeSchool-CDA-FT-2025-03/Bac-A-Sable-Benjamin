import { useState } from 'react';
import { SlidersHorizontal, ArrowDownAZ, ArrowDownUp, Star, GitFork, Calendar } from 'lucide-react';

interface FilterSortProps {
  onFilterChange: (filter: string) => void;
  onSortChange: (sort: string) => void;
  currentFilter: string;
  currentSort: string;
}

export default function FilterSort({ 
  onFilterChange, 
  onSortChange, 
  currentFilter, 
  currentSort 
}: FilterSortProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filters = [
    { id: 'all', label: 'Tous' },
    { id: 'public', label: 'Publics' },
    { id: 'private', label: 'Privés' },
    { id: 'hasStars', label: 'Avec étoiles' },
    { id: 'hasForks', label: 'Avec forks' }
  ];

  const sortOptions = [
    { id: 'name', label: 'Nom', icon: <ArrowDownAZ size={16} /> },
    { id: 'stars', label: 'Étoiles', icon: <Star size={16} /> },
    { id: 'forks', label: 'Forks', icon: <GitFork size={16} /> },
    { id: 'newest', label: 'Plus récent', icon: <Calendar size={16} /> },
    { id: 'oldest', label: 'Plus ancien', icon: <Calendar size={16} /> }
  ];

  return (
    <div className="mb-6 bg-gray-800 rounded-lg p-4 border border-gray-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center space-x-2 text-gray-300 hover:text-white bg-gray-700 px-4 py-2 rounded-md transition-colors"
          >
            <SlidersHorizontal size={16} />
            <span>Filtrer</span>
          </button>
          
          {isFilterOpen && (
            <div className="absolute mt-2 z-10 w-48 bg-gray-800 border border-gray-700 rounded-md shadow-lg overflow-hidden">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => {
                    onFilterChange(filter.id);
                    setIsFilterOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 hover:bg-gray-700 transition-colors ${
                    currentFilter === filter.id ? 'bg-blue-600 text-white' : 'text-gray-300'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          )}
        </div>
        
        <div className="flex flex-wrap gap-2">
          <span className="text-gray-400 flex items-center">
            <ArrowDownUp size={16} className="mr-2" />
            Trier par:
          </span>
          
          {sortOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => onSortChange(option.id)}
              className={`flex items-center space-x-1 px-3 py-1 rounded-md transition-colors ${
                currentSort === option.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {option.icon}
              <span>{option.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}