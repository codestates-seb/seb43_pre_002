package pro.stackOverFlow.auth.filter;


import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import pro.stackOverFlow.auth.dto.LoginDto;
import pro.stackOverFlow.auth.jwt.JwtTokenizer;
import pro.stackOverFlow.member.entity.Member;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;


public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
    private final AuthenticationManager authenticationManager;
    private final JwtTokenizer jwtTokenizer;
//    private final CryptoJSDecryptor cryptoJSDecryptor;

    @Value("${decrypt.key}")
    String KEY;

    public JwtAuthenticationFilter(AuthenticationManager authenticationManager, JwtTokenizer jwtTokenizer) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenizer = jwtTokenizer;
//        this.cryptoJSDecryptor = cryptoJSDecryptor;
    }

    @SneakyThrows
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) {
        ObjectMapper objectMapper = new ObjectMapper();
        LoginDto loginDto = objectMapper.readValue(request.getInputStream(), LoginDto.class);

        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword());

        return authenticationManager.authenticate(authenticationToken);

// Todo : 비밀번호 복호화
//        String key = "aaaa1111";
//
//
//        String decryptedText = null;
//
//        ScriptEngineManager factory = new ScriptEngineManager();
//        ScriptEngine engine = factory.getEngineByName("JavaScript");
//        engine.eval("var ciphertext = '" + loginDto.getPassword() + "';");
//        engine.eval("var key = '" + key + "';");
//        engine.eval("var plaintext = CryptoJS.AES.decrypt(ciphertext, key).toString(CryptoJS.enc.Utf8);");
//        decryptedText = engine.get("plaintext").toString();
//
//        loginDto.setPassword(decryptedText);


        //Todo : 비밀번호 복호화 !!
//        @Value("${decrypt.key}")
//         String KEY = "mysecetkey12345";

//        String secretKey = System.getenv("");

//         시크릿 키를 바이트 배열로 변환
//        byte[] keyBytes = KEY.getBytes(StandardCharsets.UTF_8);
//
//        // SecretKeySpec 인스턴스 생성
//        SecretKeySpec secretKeySpec = new SecretKeySpec(keyBytes, "AES");
//
//        // Cipher 인스턴스 초기화
//        Cipher cipher = Cipher.getInstance("AES/ECB/NoPadding");
//        cipher.init(Cipher.DECRYPT_MODE, secretKeySpec);
//
//        // 복호화할 암호문
//        String encryptedText = loginDto.getPassword();
//
//        // Base64 디코딩 후 암호문 복호화
//        byte[] encryptedBytes = Base64.getDecoder().decode(encryptedText);
//        byte[] decryptedBytes = cipher.doFinal(encryptedBytes);
//
//        // 복호화된 평문 출력
//        String decryptedText = new String(decryptedBytes, StandardCharsets.UTF_8);
//        loginDto.setPassword(decryptedText);


    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request,
                                            HttpServletResponse response,
                                            FilterChain chain,
                                            Authentication authResult) throws ServletException, IOException {
        Member member = (Member) authResult.getPrincipal();

        String accessToken = delegateAccessToken(member);
        String refreshToken = delegateRefreshToken(member);

        Long memberId = member.getMemberId();
        String displayName = member.getDisplayName();

        // Todo : response에 memberId 추가! (login)
        response.getWriter().write("{\"memberId\": " + memberId + "}");

        response.setHeader("Authorization", "Bearer " + accessToken);
        response.setHeader("Refresh", refreshToken);
        response.setHeader("access-token-expiration-minutes", String.valueOf(jwtTokenizer.getAccessTokenExpirationMinutes()));

        this.getSuccessHandler().onAuthenticationSuccess(request, response, authResult);  // 추가
    }

    public String delegateAccessToken(Member member) {
        Map<String, Object> claims = new HashMap<>();

        claims.put("memberId", member.getMemberId());  // 식별자도 포함할 수 있다.
        claims.put("DisplayName",member.getDisplayName());
        claims.put("email", member.getEmail());
        claims.put("roles", member.getRoles());

        String subject = member.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());

        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String accessToken = jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);

        return accessToken;
    }

    public String delegateRefreshToken(Member member) {
        String subject = member.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String refreshToken = jwtTokenizer.generateRefreshToken(subject, expiration, base64EncodedSecretKey);

        return refreshToken;
    }
}
