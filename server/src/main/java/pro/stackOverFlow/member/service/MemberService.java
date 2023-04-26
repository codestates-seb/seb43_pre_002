package pro.stackOverFlow.member.service;


import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;


import lombok.Getter;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pro.stackOverFlow.auth.utils.CustomAuthorityUtils;
import pro.stackOverFlow.auth.utils.GetAuthUserUtils;
import pro.stackOverFlow.exception.BusinessLogicException;
import pro.stackOverFlow.exception.ExceptionCode;
import pro.stackOverFlow.member.entity.Member;
import pro.stackOverFlow.member.repository.MemberRepository;

import javax.crypto.spec.SecretKeySpec;
import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;
import javax.crypto.*;
import java.nio.charset.StandardCharsets;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.List;
import java.util.Optional;
import java.util.UUID;


@Transactional
@Service
public class MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils authorityUtils;

    public MemberService(MemberRepository memberRepository,
                         PasswordEncoder passwordEncoder,
                         CustomAuthorityUtils authorityUtils
    ) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
        this.authorityUtils = authorityUtils;
    }
    @SneakyThrows
    public Member createMember(Member member) {

        String encryptedPassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encryptedPassword);

        List<String> roles = authorityUtils.createRoles(member.getEmail());
        member.setRoles(roles);

        return memberRepository.save(member);
    }

    public Member updateMember(Member member) {
        Member findMember = findMember(member.getMemberId());

        Optional.ofNullable(member.getDisplayName())
                .ifPresent(name -> findMember.setDisplayName(name));
        Optional.ofNullable(member.getAboutMe())
                .ifPresent(aboutMe -> findMember.setAboutMe(aboutMe));
        Optional.ofNullable(member.getTitle())
                .ifPresent(title -> findMember.setTitle(title));
        Optional.ofNullable(member.getWebsiteLink())
                .ifPresent(link -> findMember.setWebsiteLink(link));
        Optional.ofNullable(member.getTwitterLink())
                .ifPresent(link -> findMember.setTwitterLink(link));
        Optional.ofNullable(member.getGithubLink())
                .ifPresent(link -> findMember.setGithubLink(link));
        Optional.ofNullable(member.getNotionLink())
                .ifPresent(link -> findMember.setNotionLink(link));
        Optional.ofNullable(member.getBlogLink())
                .ifPresent(link -> findMember.setBlogLink(link));


        return memberRepository.save(findMember);

    }

    @Transactional(readOnly = true)
    public Member findMember(long memberId) {
        Member findMember = memberRepository.findById(memberId).orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        return findMember;
    }

    public List<Member> findMembers() {
        return memberRepository.findAll();
    }



    public void deleteMember(long memberId) {
        Member findMember = findMember(memberId);

        memberRepository.delete(findMember);
    }

    public Member getMember(Authentication authentication) {
        OAuth2User principal = (OAuth2User) authentication.getPrincipal();
        String email = (String) principal.getAttributes().get("email");
        String name = (String) principal.getAttributes().get("name");

        Member member = Member.builder()
                .email(email)
                .displayName(name)
                .password(UUID.randomUUID().toString())
                .build();
        return member;
    }

    public static void checkNotFoundMember(Member member) {
        if (member == null) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND);
        }
    }

    public Member getLoginMember() {
        return  memberRepository.findByEmail(GetAuthUserUtils.getAuthUser().getName())
                .orElseThrow(()
                        -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
    }

    public Optional<Member> findMemberByEmail(String email) {
        return memberRepository.findByEmail(email);
    }

}
