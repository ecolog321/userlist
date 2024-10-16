
export const fetchUsers = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!response.ok) {
        throw new Error('Неполадки с сервером, попробуйте позже');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Ошибка загрузки:', error);
      throw error;
    }
  };
  