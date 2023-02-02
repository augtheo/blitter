package com.augtheo.blitter;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class BlitterAPIApplication {

	public static void main(String[] args) {
		SpringApplication.run(BlitterAPIApplication.class, args);
	}

}
