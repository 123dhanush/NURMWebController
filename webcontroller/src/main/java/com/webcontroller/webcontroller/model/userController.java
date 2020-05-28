package com.webcontroller.webcontroller.model;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.net.URISyntaxException;
import java.util.Collection;
import java.util.List;

@RestController

@RequestMapping("/api")
@CrossOrigin(origins ="http://localhost:3000")
public class userController {
    @Autowired
    public userRepository userrepository;

    public userController(userRepository userrepository) {
        this.userrepository = userrepository;
    }

   @GetMapping("/users")
    Collection<user> users(){
        return (Collection<user>)userrepository.findAll();
   }

   @PostMapping("/users")
        ResponseEntity<user> createUser(@Valid @RequestBody user User) throws URISyntaxException{
        user result=userrepository.save(User);
        return ResponseEntity.ok().body(result);
   }



}
