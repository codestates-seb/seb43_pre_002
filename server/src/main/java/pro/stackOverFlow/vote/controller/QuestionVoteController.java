package pro.stackOverFlow.vote.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import pro.stackOverFlow.dto.SingleResponseDto;
import pro.stackOverFlow.member.entity.Member;
import pro.stackOverFlow.member.service.MemberService;
import pro.stackOverFlow.question.entity.Question;
import pro.stackOverFlow.question.service.QuestionService;
import pro.stackOverFlow.vote.mapper.VoteMapper;
import pro.stackOverFlow.vote.service.QuestionVoteService;


@RestController
@Validated
@RequestMapping("/questions")
@RequiredArgsConstructor
public class QuestionVoteController {
    private final QuestionService questionService;
    private final MemberService memberService;
    private final QuestionVoteService questionVoteService;
    private final VoteMapper voteMapper;


    @PostMapping("/{question-id}/upvote/{member-id}")
    public ResponseEntity questionUpVote(@PathVariable("member-id") Long memberId,
                                         @PathVariable("question-id") Long questionId) {
        Member member = memberService.findMember(memberId);
        Question question = questionService.findQuestion(questionId);
        questionVoteService.upVote(member, question);

        return new ResponseEntity(
                new SingleResponseDto<>(voteMapper.questionToQuestionVoteResponseDto(question)), HttpStatus.OK);
    }

    @PostMapping("/{question-id}/downvote/{member-id}")
    public ResponseEntity questionDownVote(@PathVariable("member-id") Long memberId,
                                           @PathVariable("question-id") Long questionId) {
        Member member = memberService.findMember(memberId);
        Question question = questionService.findQuestion(questionId);
        questionVoteService.downVote(member, question);

        return new ResponseEntity(
                new SingleResponseDto<>(voteMapper.questionToQuestionVoteResponseDto(question)), HttpStatus.OK);
    }


}
