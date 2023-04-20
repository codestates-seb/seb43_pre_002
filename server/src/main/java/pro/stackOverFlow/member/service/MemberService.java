package pro.stackOverFlow.member.service;


import lombok.Getter;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
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

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 *  - 메서드 구현
 *  - DI 적용
 *  - Spring Data JPA 적용
 */
@Transactional
@Service
@Getter
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

    public Member createMember(Member member) {
        checkExistEmail(member);

        String encryptedPassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encryptedPassword);

        List<String> roles = authorityUtils.createRoles(member.getEmail());
        member.setRoles(roles);

        return memberRepository.save(member);
    }

    public Member updateMember(Member member) {

        checkNotFoundMember(member);

        Member findMember = findMember(member.getMemberId());

        if(!getLoginMember().getMemberId().equals(member.getMemberId())) // 로그인 유저 != 작성자 이면
            throw new BusinessLogicException(ExceptionCode.UNAUTHORIZED_MEMBER);

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

//    @Transactional(readOnly = true)
//    public Page<Member> findMembers(int page, int size) {
//        return memberRepository.findAll(PageRequest.of(page, size, Sort.by("memberId").descending()));
//    }



    public void deleteMember(long memberId) {
        Member findMember = findMember(memberId);

        if(!getLoginMember().getMemberId().equals(findMember.getMemberId())) // 로그인 유저 != 작성자 이면
            throw new BusinessLogicException(ExceptionCode.UNAUTHORIZED_MEMBER);

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

    public static void checkExistEmail(Member targetMember) {
        if(targetMember != null)
            throw new BusinessLogicException(ExceptionCode.MEMBER_EXISTS);
    }

    public Member getLoginMember() {
        return  memberRepository.findByEmail(GetAuthUserUtils.getAuthUser().getName())
                .orElseThrow(()
                        -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
    }


}
