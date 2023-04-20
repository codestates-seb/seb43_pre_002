package pro.stackOverFlow.member.controller;


import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import pro.stackOverFlow.member.dto.MemberDto;
import pro.stackOverFlow.member.entity.Member;
import pro.stackOverFlow.member.mapper.MemberMapper;
import pro.stackOverFlow.member.service.MemberService;
//import pro.stackOverFlow.response.SingleResponseDto;
import pro.stackOverFlow.response.SingleResponseDto;
import pro.stackOverFlow.utils.UriCreator;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;



/**
 * - DI 적용
 * - Mapstruct Mapper 적용
 * - @ExceptionHandler 적용
 */
@RestController
@RequestMapping("/members")
@Validated
@Slf4j
public class MemberController {
    private final static String MEMBER_DEFAULT_URL = "/members";
    private final MemberService memberService;
    private final MemberMapper memberMapper;
//    private final QnaQuestionService qnaQuestionService;
//    private final QnaQuestionMapper qnaQuestionMapper;

    public MemberController(MemberService memberService,
                            MemberMapper memberMapper
//                            QnaQuestionService qnaQuestionService,
//                            QnaQuestionMapper qnaQuestionMapper
    ) {
        this.memberService = memberService;
        this.memberMapper = memberMapper;
//        this.qnaQuestionService = qnaQuestionService;
//        this.qnaQuestionMapper = qnaQuestionMapper;
    }

    @PostMapping
    public ResponseEntity postMember(@Valid @RequestBody MemberDto.Post requestBody) {
        Member member = memberMapper.memberPostDtoToMember(requestBody);


        Member createdMember = memberService.createMember(member);
//        URI location = UriCreator.createUri(MEMBER_DEFAULT_URL, createdMember.getMemberId());
//
//        return ResponseEntity.created(location).build();
        return new ResponseEntity<>(
                new SingleResponseDto<>(memberMapper.memberToMemberResponseDto(createdMember)), HttpStatus.CREATED);
    }

    @PatchMapping("/{member-id}")
    public ResponseEntity patchMember(
            @PathVariable("member-id") @Positive long memberId,
            @Valid @RequestBody MemberDto.Patch requestBody) {

        Member member =
                memberService.updateMember(memberMapper.memberPatchDtoToMember(requestBody.addMemberId(memberId)));

        return new ResponseEntity<>(
                new SingleResponseDto<>(memberMapper.memberToMemberResponseDto(member)),
                HttpStatus.OK);
    }

//
    @GetMapping("/{member-id}")
    public ResponseEntity getMember(
            @PathVariable("member-id") @Positive long memberId) {
        Member member = memberService.findMember(memberId);
        return new ResponseEntity<>(
                new SingleResponseDto<>(
                memberMapper.memberToMemberResponseDto(member))
                , HttpStatus.OK);
    }

//    @GetMapping
//    public ResponseEntity getMembers(@Positive @RequestParam int page,
//                                     @Positive @RequestParam int size) {
//        Page<Member> pageMembers = memberService.findMembers(page - 1, size);
//        List<Member> members = pageMembers.getContent();
//        return new ResponseEntity<>(
//                new MultiResponseDto<>(memberMapper.membersToMemberResponseDtos(members),
//                        pageMembers),
//                HttpStatus.OK);
//    }

    @GetMapping
    public ResponseEntity getMembers() {
        List<Member> members = memberService.findMembers();
        return new ResponseEntity<>(
                new SingleResponseDto<>( memberMapper.membersToMemberResponseDtos(members)),
                HttpStatus.OK);
    }

    @DeleteMapping("/{member-id}")
    public ResponseEntity deleteMember(
            @PathVariable("member-id") @Positive long memberId) {
        memberService.deleteMember(memberId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
