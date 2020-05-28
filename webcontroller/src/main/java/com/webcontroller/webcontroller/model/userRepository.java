package com.webcontroller.webcontroller.model;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface userRepository extends CrudRepository <user,Long>{



}
