package com.dingtalk.h5app.quickstart.repository;

import com.dingtalk.h5app.quickstart.model.Progress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.CrudRepository;

public interface ProgressRepository extends CrudRepository<Progress, Integer>, JpaSpecificationExecutor, JpaRepository<Progress, Integer> {
}
