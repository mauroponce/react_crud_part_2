import { Employee } from '../utils/api';
export const EMPLOYEES_FETCHED = 'EMPLOYEES_FETCHED';

export function employeesFetched(employees) {
  return {
    type: EMPLOYEES_FETCHED,
    employees: employees
  }
}
export function fetchEmployees() {
  return (dispatch) => {
    Employee.all()
      .then(res => {
        const employees = res.data;
        return dispatch(employeesFetched(employees));
      })
  }
}