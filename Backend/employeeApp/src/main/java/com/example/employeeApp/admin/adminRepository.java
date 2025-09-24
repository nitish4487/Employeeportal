package com.example.employeeApp.admin;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface adminRepository extends MongoRepository<admin, String> {

	@Query("{'adminName':?0}")
	public admin findAdminByAdminName(String adminName);
}
