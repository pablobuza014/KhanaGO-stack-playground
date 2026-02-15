// src/main/java/springboot_backend/khanago/GymkhanaController.java

package springboot_backend.khanago.api;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

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

    // READ (list)
    @GetMapping("/")
    public Collection<Map<String, Object>> list() {
        return data.values();
    }

    // READ (detail)
    @GetMapping("/{id}/")
    public Map<String, Object> get(@PathVariable int id) {
        if (!data.containsKey(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Gymkhana not found");
        }
        return data.get(id);
    }

    // CREATE
    @PostMapping("/")
    @ResponseStatus(HttpStatus.CREATED)
    public Map<String, Object> create(@RequestBody Map<String, Object> body) {
        String name = (String) body.get("name");
        if (name == null || name.trim().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Name is required");
        }
        if (name.length() > 120) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Name must be 120 characters or less");
        }
        boolean exists = data.values().stream()
                .anyMatch(g -> name.equals(g.get("name")));
        if (exists) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Gymkhana name already exists");
        }

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
        if (!data.containsKey(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Gymkhana not found");
        }
        String name = (String) body.get("name");
        if (name != null && name.length() > 120) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Name must be 120 characters or less");
        }
        if (name != null) {
            boolean exists = data.entrySet().stream()
                    .anyMatch(e -> e.getKey() != id && name.equals(e.getValue().get("name")));
            if (exists) {
                throw new ResponseStatusException(HttpStatus.CONFLICT, "Gymkhana name already exists");
            }
        }

        Map<String, Object> current = data.get(id);
        Object created = current.get("created_at");
        body.put("id", id);
        body.put("created_at", created);
        body.put("updated_at", Instant.now().toString());
        data.put(id, body);
        return body;
    }

    // DELETE
    @DeleteMapping("/{id}/")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable int id) {
        if (!data.containsKey(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Gymkhana not found");
        }
        data.remove(id);
    }
}
