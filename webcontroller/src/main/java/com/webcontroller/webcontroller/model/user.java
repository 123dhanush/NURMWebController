package com.webcontroller.webcontroller.model;


import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;



@Data
@Entity
public class user {
    public  @Id @GeneratedValue  Long Id;
    public String username;
    public String groupname;
    public String rights;
    public user(){

    }
    public user(String username, String groupname, String rights) {
        this.username = username;
        this.groupname = groupname;
        this.rights = rights;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getGroupname() {
        return groupname;
    }

    public void setGroupname(String groupname) {
        this.groupname = groupname;
    }

    public String getRights() {
        return rights;
    }

    public void setRights(String rights) {
        this.rights = rights;
    }
}

