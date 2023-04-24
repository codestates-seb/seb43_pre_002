package pro.stackOverFlow.member.service;


import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
//import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
//import pro.stackOverFlow.auth.utils.CustomAuthorityUtils;
import pro.stackOverFlow.exception.BusinessLogicException;
import pro.stackOverFlow.exception.ExceptionCode;
import pro.stackOverFlow.member.dto.MemberDto;
import pro.stackOverFlow.member.entity.Member;
import pro.stackOverFlow.member.mapper.MemberMapper;
import pro.stackOverFlow.member.repository.MemberRepository;
import pro.stackOverFlow.question.entity.Question;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 *  - 메서드 구현
 *  - DI 적용
 *  - Spring Data JPA 적용
 */
//@Transactional
@Service
public class MemberService {
    private final MemberRepository memberRepository;
    private final MemberMapper memberMapper;
//    private final PasswordEncoder passwordEncoder;
//    private final CustomAuthorityUtils authorityUtils;

    public MemberService(MemberRepository memberRepository,
                         MemberMapper memberMapper
//                         PasswordEncoder passwordEncoder,
//                         CustomAuthorityUtils authorityUtils
    ) {
        this.memberRepository = memberRepository;
        this.memberMapper = memberMapper;

//        this.passwordEncoder = passwordEncoder;
//        this.authorityUtils = authorityUtils;
    }

    public Member createMember(Member member) {
        Member findMember = memberRepository.findByEmail(member.getEmail()).get();
        Member.checkExistEmail(findMember);

//        String encryptedPassword = passwordEncoder.encode(member.getPassword());
//        member.setPassword(encryptedPassword);
//
//        List<String> roles = authorityUtils.createRoles(member.getEmail());
//        member.setRoles(roles);

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

//    @Transactional(readOnly = true)
//    public Page<Member> findMembers(int page, int size) {
//        return memberRepository.findAll(PageRequest.of(page, size, Sort.by("memberId").descending()));
//    }



    public void deleteMember(long memberId) {
        Member findMember = findMember(memberId);

        memberRepository.delete(findMember);
    }
}
