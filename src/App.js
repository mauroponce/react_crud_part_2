import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  fetchEmployees,
  createEmployee,
  deleteEmployee
} from './actions/employees';
import { Employee } from './utils/api';
import './App.css';
import EmployeeRow from './components/EmployeeRow';
import EmployeeFormModal from './components/EmployeeFormModal';
import DeleteEmployeeFormModal from './components/DeleteEmployeeFormModal'

class App extends Component {
  constructor() {
    super();
    this.state = {
      addModalIsOpen: false,
      editEmployee: null,
      deleteEmployeeID: false,
    };
  }

  componentDidMount() {
    this.props.fetchEmployees();
  }

  deleteEmployee(e) {
    e.preventDefault();
    const employeeId = parseInt(e.target.elements['id'].value);
    this.props.deleteEmployee(employeeId)
      .then(() => {
        this.setState({ deleteEmployeeID: false })
      });
  }

  createEmployee(employee) {
    this.props.createEmployee(employee)
      .then(() => {
        this.setState({ addModalIsOpen: false })
      });
  }

  updateEmployee(employee) {
    Employee.update(employee)
      .then(res => {
        const updatedEmployee = res.data;
        const employees = this.state.employees.map(employee => {
          if (employee.id === updatedEmployee.id) return updatedEmployee
          return employee;
        })
        this.setState({ employees, editEmployee: null })
      });
  }

  render() {
    // const { employees } = this.state; //BEFORE
    const { employees } = this.props; // NOW

    return (
      <React.Fragment>
        <div className="container">
          <div className="table-wrapper">
            <div className="table-title">
              <div className="row">
                <div className="col-sm-6">
                  <h2>Manage <b>Employees</b></h2>
                </div>
                <div className="col-sm-6">
                  <button onClick={() => {this.setState({ addModalIsOpen: true }) }}
                    className="btn btn-success">
                    <i className="material-icons">&#xE147;</i>
                    <span>Add New Employee</span>
                  </button>
                </div>
              </div>
            </div>
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.map(employee =>
                  <EmployeeRow employee={employee} key={employee.id}
                    onDeleteClick={() => this.setState({ deleteEmployeeID: employee.id })}
                    onEditClick={() => {
                      const editEmployee = this.state.employees
                        .find(obj => obj.id === employee.id);
                      this.setState({ editEmployee });
                    }}
                  />
                )}
              </tbody>
            </table>
          </div>
        </div>
        <EmployeeFormModal
          isOpen={this.state.addModalIsOpen}
          title={'Add Employee'}
          onClose={() => this.setState({ addModalIsOpen: false })}
          onSubmit={this.createEmployee.bind(this)}
          key={this.state.addModalIsOpen ? 1 : 0} // re-render to clear state
        />

        <DeleteEmployeeFormModal
          isOpen={Number.isInteger(this.state.deleteEmployeeID)}
          title={'Delete Employee'}
          onClose={() => this.setState({ deleteEmployeeID: false })}
          onSubmit={this.deleteEmployee.bind(this)}
          employeeID={this.state.deleteEmployeeID}
        />

        <EmployeeFormModal
          isOpen={this.state.editEmployee !== null}
          title={'Edit Employee'}
          onClose={() => this.setState({ editEmployee: null })}
          onSubmit={this.updateEmployee.bind(this)}
          employee={this.state.editEmployee}
          key={this.state.editEmployee ? this.state.editEmployee.id : null}
        />
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    employees: state.employees
  }
}

export default connect(
  mapStateToProps,
  {
    fetchEmployees,
    createEmployee,
    deleteEmployee
  }
)(App);
