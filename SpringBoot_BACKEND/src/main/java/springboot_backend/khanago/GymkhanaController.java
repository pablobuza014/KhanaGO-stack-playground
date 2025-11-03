// src/main/java/springboot_backend/khanago/GymkhanaController.java

package springboot_backend.khanago.api;

import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.*;

@RestController
@RequestMapping("/gymkhanas")
public class GymkhanaController {

    private final Map<Integer, Map<String, Object>> data = new LinkedHashMap<>();
    private int seq = 1;

    public GymkhanaController() {
        Map<String, Object> g = new LinkedHashMap<>();
        g.put("id", seq);
        g.put("name", "Prueba_Spring_1");
        g.put("description", "desde spring");
        g.put("location", "local");
        g.put("created_at", Instant.now().toString());
        g.put("updated_at", Instant.now().toString());
        data.put(seq, g);
        seq++;
    }

    // READ
    @GetMapping("/")
    public Collection<Map<String, Object>> list() {
        return data.values();
    }

    // CREATE
    @PostMapping("/")
    public Map<String, Object> create(@RequestBody Map<String, Object> body) {
        int id = seq++;
        body.put("id", id);
        body.put("created_at", Instant.now().toString());
        body.put("updated_at", Instant.now().toString());
        data.put(id, body);
        return body;
    }

    // UPDATE
    @PutMapping("/{id}/")
    public Map<String, Object> update(@PathVariable int id,
                                      @RequestBody Map<String, Object> body) {
        Map<String, Object> current = data.getOrDefault(id, new LinkedHashMap<>());
        Object created = current.getOrDefault("created_at", Instant.now().toString());
        body.put("id", id);
        body.put("created_at", created);
        body.put("updated_at", Instant.now().toString());
        data.put(id, body);
        return body;
    }

    // DELETE
    @DeleteMapping("/{id}/")
    public void delete(@PathVariable int id) {
        data.remove(id);
    }
}
