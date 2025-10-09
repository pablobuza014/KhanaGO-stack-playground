package com.khanago;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.khanago")
public class KhanaGoApplication {
    public static void main(String[] args) {
        SpringApplication.run(KhanaGoApplication.class, args);
    }
}
