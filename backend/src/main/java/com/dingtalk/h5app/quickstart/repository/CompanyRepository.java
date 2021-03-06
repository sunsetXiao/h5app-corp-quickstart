package com.dingtalk.h5app.quickstart.repository;

import com.dingtalk.h5app.quickstart.model.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.CrudRepository;

public interface CompanyRepository extends CrudRepository<Company, Integer>, JpaSpecificationExecutor, JpaRepository<Company, Integer> {

}
