package com.webcontroller.webcontroller.model;


import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;



@Data
@Entity
public class usermap {
    public  @Id @GeneratedValue  Long Id;
    @Column(name="usermapname")
    public String usermapname;
    @Column(name = "usermapdata")
    public String usermapdata;
    public usermap(){

    }

    public usermap(String usermapname, String usermapdata) {
        this.usermapname = usermapname;
        this.usermapdata = usermapdata;
    }

    public Long getId() {
        return Id;
    }

    public void setId(Long id) {
        Id = id;
    }

    public String getUsermapname() {
        return usermapname;
    }

    public void setUsermapname(String usermapname) {
        this.usermapname = usermapname;
    }

    public String getUsermapdata() {
        return usermapdata;
    }

    public void setUsermapdata(String usermapdata) {
        this.usermapdata = usermapdata;
    }
}
