package com.example.employeeApp.leave;



import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface leaverepository extends MongoRepository<leave, String> {

	@Query("{'applicantId':?0}")
	public List<leave> findLeavesByApplicantId(String applicantId);

	@Query("{'managerId':?0}")
	public List<leave> findLeavesByManagerId(String managerId);
	
}

