import { Employee } from '../utils/api';
export const EMPLOYEES_FETCHED = 'EMPLOYEES_FETCHED';
export const EMPLOYEE_CREATED = 'EMPLOYEE_CREATED';
export const EMPLOYEE_DELETED = 'EMPLOYEE_DELETED';
export const EMPLOYEE_UPDATED = 'EMPLOYEE_UPDATED';

export function employeesFetched(employees) {
  return {
    type: EMPLOYEES_FETCHED,
    employees
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
    employee
  }
}

export function createEmployee(employee){
  return dispatch => {
    return Employee.create(employee)
      .then(res => {
        dispatch(employeeCreated(res.data));
      });
  };
}

export function employeeDeleted(employeeId) {
  return {
    type: EMPLOYEE_DELETED,
    employeeId
  }
}

export function deleteEmployee(id) {
  return dispatch => {
    return Employee.delete(id)
      .then(() => {
        dispatch(employeeDeleted(id))
      });
  };
}

export function employeeUpdated(employee) {
  return {
    type: EMPLOYEE_UPDATED,
    employee
  }
}

export function updateEmployee(employee) {
  return dispatch => {
    return Employee.update(employee)
      .then(res => {
        dispatch(employeeUpdated(res.data))
      })
  }
}