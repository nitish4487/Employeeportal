package com.example.employeeApp.Employee;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface EmployeeRepository extends MongoRepository<Employeemodel,String>  {

//	Employeemodel findUserByUserName(String userName);
//	Employeemodel 
	
	@Query("{'userName':?0}")
	public Employeemodel getEmployeeByUserName(String userName);
//
//	@Query("{'fullName':?0}")
//	public User findUserByFullName(String fullName);
//
//	@Query("{'designation':{$eq:'manager'}}")
//	public List<User> findAllManagers();

}
