package com.webcontroller.webcontroller.model;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class Demoloader implements CommandLineRunner {
    private final userRepository repository;
    @Autowired

    public Demoloader(userRepository repository) {
        this.repository = repository;
    }
    @Override
    public void run(String... strings) throws Exception {
        this.repository.save(new user("user5","group1","rwx"));
    }
}
