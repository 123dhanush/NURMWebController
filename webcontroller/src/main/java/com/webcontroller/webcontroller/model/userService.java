package com.webcontroller.webcontroller.model;
import java.util.Arrays;
import java.util.List;
import java.util.ArrayList;
import org.springframework.stereotype.Service;
@Service
public class userService {

    private List <user> users= new  ArrayList<>(Arrays.asList(
            new user("user1","group1","rwx"),
            new user("user2","group1","rw"),
            new user("user3","group2","rwxc")

    ));
    public List<user> getAllusers()
    {
        return users;
    }
    public  user getUser(String username)
    {
       return users.stream().filter(u->u.getUsername().equals(username)).findFirst().get();

    }
    public void addUser(user User)
    {
        users.add(User);
    }
}
