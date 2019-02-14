import { EMPLOYEES_FETCHED } from '../actions/employees';

export default function employees(state = [], action = {}) {
  switch (action.type) {
    case EMPLOYEES_FETCHED:
      return action.employees;
    default:
      return state;
  }
}