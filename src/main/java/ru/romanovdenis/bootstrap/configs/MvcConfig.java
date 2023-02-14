package ru.romanovdenis.bootstrap.configs;

import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@Controller
public class MvcConfig implements WebMvcConfigurer {

    @GetMapping("/admin")
    public String showUsers(){
        return "index";
    }
    @GetMapping("/user")
    public String showUser (){
        return "user";
    }
}
