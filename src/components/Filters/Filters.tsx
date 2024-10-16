import React from 'react';

interface FiltersProps {
  onSort: (field: string, value?: string) => void;
}

const Filters: React.FC<FiltersProps> = ({ onSort }) => {
  return (
    <div>
      <h2>Фильтры</h2>
      <div>
        <label>Город:</label>
        <select onChange={(e) => onSort('city', e.target.value)}>
          <option value="">Все</option>
          <option value="Москва">Москва</option>
          {/* Другие города */}
        </select>
      </div>
      <div>
        <label>Компания:</label>
        <select onChange={(e) => onSort('company', e.target.value)}>
          <option value="">Все</option>
          <option value="Компания А">Компания А</option>
          {/* Другие компании */}
        </select>
      </div>
      <div>
        <button onClick={() => onSort('name')}>Сортировать по ФИО</button>
        <button onClick={() => onSort('city')}>Сортировать по городу</button>
        <button onClick={() => onSort('company')}>Сортировать по компании</button>
      </div>
    </div>
  );
};

export default Filters;
