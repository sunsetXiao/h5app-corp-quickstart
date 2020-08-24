package com.dingtalk.h5app.quickstart.repository;

import com.dingtalk.h5app.quickstart.model.Contact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.CrudRepository;

public interface ContactRepository extends CrudRepository<Contact, Integer>, JpaSpecificationExecutor, JpaRepository<Contact, Integer> {

}
