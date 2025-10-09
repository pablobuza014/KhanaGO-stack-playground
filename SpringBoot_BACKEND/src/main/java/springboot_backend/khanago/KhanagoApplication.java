package springboot_backend.khanago;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication  // escanea springboot_backend.khanago y subpaquetes
public class KhanagoApplication {
    public static void main(String[] args) {
        SpringApplication.run(KhanagoApplication.class, args);
    }
}
