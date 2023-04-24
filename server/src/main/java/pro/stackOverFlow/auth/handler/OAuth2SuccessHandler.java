package pro.stackOverFlow.auth.handler;//package pro.stackOverFlow.auth.handler;
//
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
//import org.springframework.util.LinkedMultiValueMap;
//import org.springframework.util.MultiValueMap;
//import org.springframework.web.util.UriComponentsBuilder;
//import pro.stackOverFlow.auth.filter.JwtAuthenticationFilter;
//import pro.stackOverFlow.member.entity.Member;
//import pro.stackOverFlow.member.repository.MemberRepository;
//import pro.stackOverFlow.member.service.MemberService;
//
//import javax.servlet.ServletException;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//import java.io.IOException;
//import java.net.URI;
//import java.util.Optional;
//import java.util.UUID;
//
//
//@Slf4j
//@RequiredArgsConstructor
//public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
//    private final MemberService memberService;
//    private final MemberRepository memberRepository;
//    private final JwtAuthenticationFilter jwtAuthenticationFilter;
//
//
//    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
//        log.info("# Success OAuth 2.0 Login");
//        Member principal = memberService.getMember(authentication);
//        String email = principal.getEmail();
//        String name = principal.getDisplayName();
//        log.info("# principal: {}, {}", email, name);
//
//        Member member = Member.builder()
//                .email(email)
//                .displayName(name)
//                .password(UUID.randomUUID().toString())
//                .build();
//
//        member = memberRepository.findByEmail(email);
//
//
//        String accessToken = jwtAuthenticationFilter.delegateAccessToken(member);
//        String refreshToken = jwtAuthenticationFilter.delegateRefreshToken(member);
////        String bearerToken = "Bearer " + accessToken;
//
//        String uri = createURI(accessToken, refreshToken).toString();
//
//        getRedirectStrategy().sendRedirect(request, response, uri);
//
//
//    }
//
//    public static URI createURI(String accessToken, String refreshToken) {
//        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
//        queryParams.add("access_token", accessToken);
//        queryParams.add("refresh_token", refreshToken);
//
//        return UriComponentsBuilder
//                .newInstance()
//                .scheme("http")
//                .host("localhost")
////                .port(80)
//                .path("/")
//                .queryParams(queryParams)
//                .build()
//                .toUri();
//    }
//
//}
//
//
