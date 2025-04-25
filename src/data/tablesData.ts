import { Table } from '../types';

export const tables: Table[] = [
  {
    id: 'T1',
    number: 1,
    section: 'Main',
    seats: 4
  },
  {
    id: 'T2',
    number: 2,
    section: 'Main',
    seats: 2
  },
  {
    id: 'T3',
    number: 3,
    section: 'Main',
    seats: 6
  },
  {
    id: 'T4',
    number: 4,
    section: 'Outdoor',
    seats: 4
  },
  {
    id: 'T5',
    number: 5,
    section: 'Bar',
    seats: 2
  }
];

export const getTableById = (id: string): Table | undefined => {
  return tables.find(table => table.id === id);
};