package com.webcontroller.webcontroller;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Primary;
@SpringBootApplication
@Primary
public class WebcontrollerApplication {

	public static void main(String[] args) {

		SpringApplication.run(WebcontrollerApplication.class, args);
	}

}
