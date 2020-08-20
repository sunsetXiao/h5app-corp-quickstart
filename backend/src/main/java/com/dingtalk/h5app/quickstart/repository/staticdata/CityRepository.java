package com.dingtalk.h5app.quickstart.repository.staticdata;

import com.dingtalk.h5app.quickstart.model.staicdata.City;
import org.springframework.data.repository.CrudRepository;

public interface CityRepository extends CrudRepository<City, Integer> {
    City findByName(String name);
}
