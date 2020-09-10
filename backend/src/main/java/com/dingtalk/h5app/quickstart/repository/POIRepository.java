package com.dingtalk.h5app.quickstart.repository;

import com.dingtalk.h5app.quickstart.model.POI;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.CrudRepository;

public interface POIRepository extends CrudRepository<POI, Integer>, JpaSpecificationExecutor, JpaRepository<POI, Integer> {
}
