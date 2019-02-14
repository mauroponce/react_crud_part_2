import { EMPLOYEES_FETCHED, EMPLOYEE_CREATED } from '../actions/employees';

export default function employees(state = [], action = {}) {
  switch (action.type) {
    case EMPLOYEES_FETCHED:
      return action.employees;
    case EMPLOYEE_CREATED:
      return [action.employee, ...state];
    default:
      return state;
  }
}