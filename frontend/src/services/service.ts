export const APIBase = process.env.NODE_ENV === 'production' ?
  // localhost in both scenarios, should change it 
  'http://localhost:3001/api' :
  'http://localhost:3001/api';
