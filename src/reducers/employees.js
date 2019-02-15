import {
  EMPLOYEES_FETCHED,
  EMPLOYEE_CREATED,
  EMPLOYEE_DELETED,
  EMPLOYEE_UPDATED
} from '../actions/employees';

export default function employees(state = [], action = {}) {
  switch (action.type) {
    case EMPLOYEES_FETCHED:
      return action.employees;
    case EMPLOYEE_CREATED:
      return [action.employee, ...state];
    case EMPLOYEE_DELETED:
      return state.filter(employee => employee.id !== action.employeeId);
    case EMPLOYEE_UPDATED:
      return state.map(employee => {
        if (employee.id === action.employee.id) return action.employee
        return employee
      });
    default:
      return state;
  }
}