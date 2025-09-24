import axios from "axios";
// const cors = require('cors');

const EMPLOYEE_BASE = 'http://localhost:8080/Employees';

const leave_url = 'http://localhost:8080/leaves';
const admin_url = 'http://localhost:8080/Manager';


// EmployeeService.use(cors({
//     origin: '*'
//   }));

class EmployeeService{
// 1.employee
    getAllEmployees(){
        return axios.get(EMPLOYEE_BASE)
    }


    getEmployeeByUserName(userName){
        return axios.get(EMPLOYEE_BASE + '/' + userName)
    }


    // createEmployee(employee){
    //     return axios.post(EMPLOYEE_BASE, employee)
    // }
    async createEmployee(employee) {
        try {
            const response = await axios.post(EMPLOYEE_BASE, employee, {
                headers: {
                    'Origin': 'https://your-react-app.com',
                    // You may need to add other headers if required by the server
                }
            });
            return response.data; // Assuming the server responds with the created employee data
        } catch (error) {
            console.error('Error creating employee:', error);
            throw error; // Rethrow the error to handle it in the calling code
        }
    }

// 2.leave

    getUserByUserName(userName){
        return axios.get(admin_url + '/' + userName)
    }

  

    getAllManagers(){
        return axios.get(admin_url )
    }

    createLeave(leaveObj){
        return axios.post(leave_url, leaveObj)
    }

    getLeavesByApplicantId(applicantId){
        return axios.get(leave_url + '/' + applicantId)
    }

    deleteLeave(leaveId){
        return axios.delete(leave_url + '/' + leaveId)
    }

    getLeavesByManagerId(managerId){
        return axios.get(leave_url + '/manage-leaves/' + managerId)
    }

    getLeaveByLeaveId(id){
        return axios.get(leave_url + '/leaveId/' + id)
    }

    updateLeave(id, leave){
        return axios.put(leave_url + '/' + id, leave)
    }

// 3.admin
    getAdminByAdminName(adminName){
        return axios.get(admin_url + '/' + adminName)
    }

    createAdmin(admin){
        return axios.post(admin_url, admin)
    }

}





    

export default new EmployeeService();
