package pro.stackOverFlow.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry
                .addMapping("/**")
                .allowedOrigins("*")
                .allowedMethods("*");
    }
}

//    @Configuration
//    public class WebConfig implements WebMvcConfigurer {
//        public static final String ALLOWED_METHOD_NAMES = "GET,HEAD,POST,PUT,DELETE,TRACE,OPTIONS,PATCH";
//
//        @Override
//        public void addCorsMappings(final CorsRegistry registry) {
//            registry.addMapping("/api/**")
//                    .allowedMethods(ALLOWED_METHOD_NAMES.split(","))
//                    .exposedHeaders(HttpHeaders.LOCATION);
//        }
//    }

//@Configuration
//public class WebConfig implements WebMvcConfigurer {
//
//    @Bean
//    public WebMvcConfigurer corsConfigurer() {
//        return new WebMvcConfigurer() {
//            @Override
//            public void addCorsMappings(CorsRegistry registry) {
//                registry.addMapping("/**")
//                        .allowedOriginPatterns("*")
//                        .allowedHeaders("*")
//                        .allowedMethods("GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS" , "PATCH")
//                        .exposedHeaders("Authorization", "RefreshToken");
//                //.allowCredentials(true); // .allowedOriginPatterns("*") 이렇게 와일드 카드로 설정하면 이거 쓰면 에러남 ( 실행 조차  X )
//            }
//        };
//    }
//}
