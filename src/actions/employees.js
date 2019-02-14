import { Employee } from '../utils/api';
export const EMPLOYEES_FETCHED = 'EMPLOYEES_FETCHED';
export const EMPLOYEE_CREATED = 'EMPLOYEE_CREATED';

export function employeesFetched(employees) {
  return {
    type: EMPLOYEES_FETCHED,
    employees: employees
  }
}

export function fetchEmployees() {
  return (dispatch) => {
    return Employee.all()
      .then(res => {
        const employees = res.data;
        dispatch(employeesFetched(employees));
      })
  }
}

export function employeeCreated(employee) {
  return {
    type: EMPLOYEE_CREATED,
    employee: employee
  }
}

export function createEmployee(employee){
  return dispatch => {
    return Employee.create(employee)
      .then(res => {
        employee["id"] = res.data.id;
        dispatch(employeeCreated(employee));
      });
  };
}