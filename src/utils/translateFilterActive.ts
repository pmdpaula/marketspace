/* eslint-disable indent */
export const translateFilterActive = (value: string) => {
  switch (value) {
    case 'all':
      return 'Todos';
    case 'active':
      return 'Ativos';
    case 'inactive':
      return 'Inativos';
    default:
      return 'Todos';
  }
};
