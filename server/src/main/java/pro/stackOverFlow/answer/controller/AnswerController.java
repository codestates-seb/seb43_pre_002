package pro.stackOverFlow.answer.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pro.stackOverFlow.answer.dto.AnswerPatchDto;
import pro.stackOverFlow.answer.dto.AnswerPostDto;
import pro.stackOverFlow.answer.dto.AnswerResponseDto;
import pro.stackOverFlow.answer.entity.Answer;
import pro.stackOverFlow.answer.mapper.AnswerMapper;
import pro.stackOverFlow.answer.service.AnswerService;
import pro.stackOverFlow.dto.SingleResponseDto;

import javax.validation.Valid;

@RestController
public class AnswerController {

    private AnswerService answerService;
    private AnswerMapper answerMapper;


    public AnswerController(AnswerService answerService, AnswerMapper answerMapper) {
        this.answerService = answerService;
        this.answerMapper = answerMapper;
    }


    @PostMapping("/qna-questions/{question-id}/qna-answers")
    public ResponseEntity postAnswer(@Valid @RequestBody AnswerPostDto answerPostDto) {

        Answer answer = answerMapper.answerPostDtoToAnswer(requestBody);
        Member member = memberService.findMember(memberId);
        answer.addMember(member);
        Answer createdAnswer = answerService.createAnswer(answer);
        AnswerResponseDto responseDto = answerMapper.answerToAnswerResponseDto(createdAnswer);

        return new ResponseEntity<>(new SingleResponseDto<>(createdAnswer), HttpStatus.CREATED);
    }


    @GetMapping("/qna-answers/{answer-id}")
    public ResponseEntity getAnswer(@PathVariable("answer-id") long answerId){

        Answer foundAnswer = answerService.findAnswer(answerId);
        AnswerResponseDto responseDto = answerMapper.answerToAnswerResponseDto(foundAnswer);

        return new ResponseEntity<>(new SingleResponseDto<>(responseDto), HttpStatus.OK);
    }


    @PatchMapping("/qna-answers/{answer-id}")
    public ResponseEntity updateAnswer(@PathVariable("answer-id") long answerId,
                                     @Valid @RequestBody AnswerPatchDto answerPatchDto) {

        Answer updatedAnswer = answerService.updateAnswer(answerId, answerPatchDto);
        AnswerResponseDto responseDto = answerMapper.answerToAnswerResponseDto(updatedAnswer);

        return ResponseEntity.ok(responseDto);

    }


    @DeleteMapping("/qna-answers/{answer-id}")
    public ResponseEntity deleteAnswer(@PathVariable("answer-id") long answerId) {

        answerService.deleteAnswer(answerId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

// ---------------------------------------------------------------------------------------------------------------------

    @PostMapping("/answers/{answer-id}/vote")
    public ResponseEntity vote(@PathVariable("answer-id") @Positive long answerId,
                               @RequestBody AnswerVotePostDto voteDto) {

        if (voteDto.getVoteType().equals("up")) {
            try {
                answerService.setUpVote(answerId, voteDto.getMemberId());
            } catch(BusinessLogicException e) {
                return new ResponseEntity(new VoteResponseDto(false, answerService.getVoteCount(answerId), e.getMessage()), HttpStatus.OK);
            }
        } else if (voteDto.getVoteType().equals("down")) {
            try {
                answerService.setDownVote(answerId, voteDto.getMemberId());
            } catch(BusinessLogicException e) {
                return new ResponseEntity(new VoteResponseDto(false, answerService.getVoteCount(answerId), e.getMessage()), HttpStatus.OK);
            }
        } else {
            return new ResponseEntity(new VoteResponseDto(false, answerService.getVoteCount(answerId), "Invalid vote type."), HttpStatus.OK);
        }

        return new ResponseEntity(new VoteResponseDto(true, answerService.getVoteCount(answerId), ""), HttpStatus.OK);
    }


//----------------------------------------------------------------------------------------------------------------------

    @PostMapping("/answers/{answer-id}/accept/{member-id}")
    public ResponseEntity markAnswerAsAccepted(@PathVariable("answer-id") Long answerId,
                                               @PathVariable("member-id") Long memberId) {
        try {
            Member authenticatedMember = memberService.findMember(memberId);
            Answer acceptedAnswer = answerService.markAnswerAsAccepted(answerId, authenticatedMember);
            return new ResponseEntity(new TrueFalseResponseDto(true, ""), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity(new TrueFalseResponseDto(false, e.getMessage()), HttpStatus.OK);
        }
    }






//    @PostMapping("/answers/{answer-id}/accept")
//    public ResponseEntity markAnswerAsAccepted(@PathVariable("answer-id") Long answerId,
//                                               Authentication authentication) {
//        try {
//            Member authenticatedMember = (Member) authentication.getPrincipal();
//            Answer acceptedAnswer = answerService.markAnswerAsAccepted(answerId, authenticatedMember);
//            return new ResponseEntity(new TrueFalseResponseDto(true, ""), HttpStatus.OK);
//        } catch (Exception e) {
//            return new ResponseEntity(new TrueFalseResponseDto(false, e.getMessage()), HttpStatus.OK);
//        }
//    }
//    @PostMapping("/answers/{answer-id}/cancel-accept")
//    public ResponseEntity<Answer> cancelAcceptedAnswer(@PathVariable("answer-id") Long answerId,
//                                                       Authentication authentication) {
//        try {
//            Member authenticatedMember = (Member) authentication.getPrincipal();
//            Answer unacceptedAnswer = answerService.cancelAcceptedAnswer(answerId, authenticatedMember);
//            return new ResponseEntity(new TrueFalseResponseDto(true, ""), HttpStatus.OK);
//        } catch (Exception e) {
//            return new ResponseEntity(new TrueFalseResponseDto(false, e.getMessage()), HttpStatus.OK);
//        }
//    }



}
