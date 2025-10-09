package springboot_backend.khanago.api;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")     // <-- prefijo
public class SaludoController {

    @GetMapping("/holaMundo")
    public String hola() {
        return "¡Hola mundo desde tu API Spring Boot!";
    }
}
