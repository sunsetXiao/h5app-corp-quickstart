package com.dingtalk.h5app.quickstart.repository;

import com.dingtalk.h5app.quickstart.model.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.CrudRepository;

public interface ScheduleRepository extends CrudRepository<Schedule, Integer>, JpaSpecificationExecutor, JpaRepository<Schedule, Integer> {
}
