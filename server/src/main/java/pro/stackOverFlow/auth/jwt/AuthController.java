package pro.stackOverFlow.auth.jwt;//package pro.stackOverFlow.auth.jwt;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//import pro.stackOverFlow.auth.dto.LoginDto;
//import pro.stackOverFlow.auth.userdetails.MemberDetailsService;
//import pro.stackOverFlow.member.service.MemberService;
//
////
//@RestController
//@RequestMapping("/api/auth")
//public class AuthController {
//
//    @Autowired
//    private AuthenticationManager authenticationManager;
//
//    @Autowired
//    private JwtTokenUtil jwtTokenUtil;
//
//    @Autowired
//    private MemberDetailsService service;
//
//    @PostMapping("/login")
//    public ResponseEntity<?> login(@RequestBody LoginDto loginRequest) {
//        Authentication authentication = authenticationManager.authenticate(
//                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
//        );
//        SecurityContextHolder.getContext().setAuthentication(authentication);
//        UserDetails userDetails = service.loadUserByUsername(loginRequest.getEmail());
//        String token = jwtTokenUtil.generateToken(userDetails);
//        return ResponseEntity.ok(new LoginResponse(token));
//    }
//
//    @PostMapping("/logout")
//    public ResponseEntity<?> logout(HttpServletRequest request) {
//        String token = jwtTokenUtil.getTokenFromRequest(request);
//        if (StringUtils.hasText(token) && jwtTokenUtil.validateToken(token)) {
//            jwtTokenUtil.expireToken(token);
//            return ResponseEntity.ok(new ApiResponse(true, "Logout successful"));
//        }
//        return ResponseEntity.badRequest().body(new ApiResponse(false, "Invalid token"));
//    }
//
//    @GetMapping("/user")
//    public ResponseEntity<?> getUser(HttpServletRequest request) {
//        String token = jwtTokenUtil.getTokenFromRequest(request);
//        if (StringUtils.hasText(token) && jwtTokenUtil.validateToken(token)) {
//            String email = jwtTokenUtil.getEmailFromToken(token);
//            User user = userService.findByEmail(email);
//            return ResponseEntity.ok(user);
//        }
//        return ResponseEntity.badRequest().body(new ApiResponse(false, "Invalid token"));
//    }
//}