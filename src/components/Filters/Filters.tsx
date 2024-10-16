

interface FiltersProps {
  onSort: (field: string) => void;
}

const Filters: React.FC<FiltersProps> = ({ onSort }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Фильтры</h2>
      <div>
        <button 
          className="bg-blue-600 text-white px-4 py-2 rounded mb-2 hover:bg-blue-800"
          onClick={() => onSort('city')}
        >
          Сортировать по городу
        </button>
      </div>
      <div>
        <button 
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800"
          onClick={() => onSort('company')}
        >
          Сортировать по компании
        </button>
      </div>
    </div>
  );
}

export default Filters;


