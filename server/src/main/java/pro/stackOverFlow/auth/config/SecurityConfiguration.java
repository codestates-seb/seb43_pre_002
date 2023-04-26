package pro.stackOverFlow.auth.config;


import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import pro.stackOverFlow.auth.filter.JwtAuthenticationFilter;
import pro.stackOverFlow.auth.filter.JwtVerificationFilter;
import pro.stackOverFlow.auth.handler.MemberAccessDeniedHandler;
import pro.stackOverFlow.auth.handler.MemberAuthenticationEntryPoint;
import pro.stackOverFlow.auth.handler.MemberAuthenticationFailureHandler;
import pro.stackOverFlow.auth.handler.MemberAuthenticationSuccessHandler;
import pro.stackOverFlow.auth.jwt.JwtTokenizer;
import pro.stackOverFlow.auth.utils.CustomAuthorityUtils;
import pro.stackOverFlow.auth.utils.JwtUtils;

import java.util.Arrays;

/**
 * 인터셉터 설정 추가
 */
@Configuration
@EnableWebSecurity(debug = false)
@RequiredArgsConstructor
public class SecurityConfiguration implements WebMvcConfigurer {
//    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;
//    private final MemberService memberService;
//    private final JwtAuthenticationFilter jwtAuthenticationFilter;
//    private final CustomOAuth2UserService customOAuth2UserService;


    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .headers().frameOptions().sameOrigin()
                .and()
                .csrf().disable()
                .cors(httpSecurityCorsConfigurer -> corsConfigurationSource())
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .formLogin().disable()
                .httpBasic().disable()
                .exceptionHandling()
                .authenticationEntryPoint(new MemberAuthenticationEntryPoint())
                .accessDeniedHandler(new MemberAccessDeniedHandler())
                .and()
                .apply(new CustomFilterConfigurer())
                .and()
                .logout()
                .permitAll()
                .and()
                .authorizeHttpRequests(authorize -> authorize
                        .antMatchers(HttpMethod.POST, "/*/members").permitAll()
                        .antMatchers(HttpMethod.POST, "/*/auth/login").permitAll()
                        .antMatchers(HttpMethod.GET, "/*/auth/login").permitAll()
                        .antMatchers(HttpMethod.PATCH, "/*/members/**").hasRole("USER")
//                        .antMatchers(HttpMethod.PATCH, "/*/members/**").permitAll()
                        .antMatchers(HttpMethod.GET, "/*/members").hasRole("ADMIN")
//                        .antMatchers(HttpMethod.GET, "/*/members").permitAll()
                        .antMatchers(HttpMethod.GET, "/*/members/**").hasAnyRole("USER", "ADMIN")
//                        .antMatchers(HttpMethod.GET, "/*/members/**").permitAll()
                        .antMatchers(HttpMethod.DELETE, "/*/members/**").hasRole("USER")
                        .antMatchers(HttpMethod.POST, "/*/questions").hasRole("USER")
                        .antMatchers(HttpMethod.PATCH, "/*/questions/**").hasRole("USER")
                        .antMatchers(HttpMethod.GET, "/*/questions").permitAll()
                        .antMatchers(HttpMethod.GET, "/*/questions/**").permitAll()
                        .antMatchers(HttpMethod.DELETE, "/*/questions/**").hasRole("USER")
                        .antMatchers(HttpMethod.POST, "/*/answers").hasRole("USER")
                        .antMatchers(HttpMethod.PATCH, "/*/answers/**").hasRole("USER")
                        .antMatchers(HttpMethod.GET, "/*/answers/**").permitAll()
                        .antMatchers(HttpMethod.DELETE, "/*/answers/**").hasRole("USER")
                        .anyRequest().permitAll()
                );
//                .oauth2Login().successHandler(new OAuth2SuccessHandler(memberService,jwtAuthenticationFilter));
//                .userInfoEndpoint()
//                .userService(customOAuth2UserService);


        return http.build();
    }

//    @Bean
//    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//        http
//                .headers().frameOptions().sameOrigin()
//                .and()
//                .csrf().disable()
//                .cors(httpSecurityCorsConfigurer -> corsConfigurationSource())
//                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
//                .and()
//                .formLogin().permitAll()
////                .httpBasic().disable()
////                .exceptionHandling()
////                .authenticationEntryPoint(new MemberAuthenticationEntryPoint())  // 추가
////                .accessDeniedHandler(new MemberAccessDeniedHandler())            // 추가
//                .and()
//                .apply(new CustomFilterConfigurer())
//                .and()
//                .authorizeHttpRequests(authorize -> authorize
//                        .antMatchers(HttpMethod.POST, "/*/members").permitAll()
//                        .antMatchers(HttpMethod.POST, "/*/auth/login").permitAll()
//                        .antMatchers(HttpMethod.PATCH, "/*/members/**").hasRole("USER")
//                        .antMatchers(HttpMethod.GET, "/*/members").hasRole("ADMIN")
//                        .antMatchers(HttpMethod.GET, "/*/members/**").hasAnyRole("USER", "ADMIN")
//                        .antMatchers(HttpMethod.DELETE, "/*/members/**").hasRole("USER")
//                        .antMatchers(HttpMethod.POST, "/*/questions").hasRole("USER")
//                        .antMatchers(HttpMethod.PATCH, "/*/questions/**").hasRole("USER")
//                        .antMatchers(HttpMethod.GET, "/*/questions").permitAll()
//                        .antMatchers(HttpMethod.GET, "/*/questions/**").permitAll()
//                        .antMatchers(HttpMethod.DELETE, "/*/questions/**").hasRole("USER")
//                        .antMatchers(HttpMethod.POST, "/*/answers").hasRole("USER")
//                        .antMatchers(HttpMethod.PATCH, "/*/answers/**").hasRole("USER")
//                        .antMatchers(HttpMethod.GET, "/*/answers/**").permitAll()
//                        .antMatchers(HttpMethod.DELETE, "/*/answers/**").hasRole("USER")
//                        .anyRequest().permitAll()
//                )
//                .oauth2Login(withDefaults()
//                );
//        return http.build();
//    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("GET","POST", "PATCH", "DELETE","PUT","HEAD","OPTIONS"));
        configuration.setExposedHeaders(Arrays.asList("Authorization", "Location", "Refresh"));
        configuration.setAllowedHeaders(Arrays.asList("*"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity> {
        @Override
        public void configure(HttpSecurity builder) throws Exception {
            AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);

//            JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager, jwtTokenizer);
            JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager, jwtTokenizer());
            jwtAuthenticationFilter.setFilterProcessesUrl("/auth/login");
            jwtAuthenticationFilter.setAuthenticationSuccessHandler(new MemberAuthenticationSuccessHandler());
            jwtAuthenticationFilter.setAuthenticationFailureHandler(new MemberAuthenticationFailureHandler());

//            JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtTokenizer, authorityUtils);
            JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtUtils(), authorityUtils);

            builder
                    .addFilter(jwtAuthenticationFilter)
                    .addFilterAfter(jwtVerificationFilter, JwtAuthenticationFilter.class);
        }
    }


//    @Override
//    public void addInterceptors(InterceptorRegistry registry) {
//        registry.addInterceptor(new JwtParseInterceptor(jwtUtils()))
//                .addPathPatterns("/*/questions/**");
//    }



    @Bean
    public JwtUtils jwtUtils() {
        return new JwtUtils(jwtTokenizer());
    }

    @Bean
    public JwtTokenizer jwtTokenizer() {
        return new JwtTokenizer();
    }
}
