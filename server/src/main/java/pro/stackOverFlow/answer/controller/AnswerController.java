package pro.stackOverFlow.answer.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pro.stackOverFlow.answer.dto.AnswerPatchDto;
import pro.stackOverFlow.answer.dto.AnswerPostDto;
import pro.stackOverFlow.answer.dto.AnswerResponseDto;
import pro.stackOverFlow.answer.dto.AnswerVoteDto;
import pro.stackOverFlow.answer.entity.Answer;
import pro.stackOverFlow.answer.mapper.AnswerMapper;
import pro.stackOverFlow.answer.service.AnswerService;
import pro.stackOverFlow.answer.service.AnswerVoteService;
import pro.stackOverFlow.dto.SingleResponseDto;

import javax.validation.Valid;

@RestController
public class AnswerController {

    private AnswerService answerService;
    private AnswerMapper answerMapper;
    private AnswerVoteService answerVoteService;


    public AnswerController(AnswerService answerService, AnswerMapper answerMapper, AnswerVoteService answerVoteService) {
        this.answerService = answerService;
        this.answerMapper = answerMapper;
        this.answerVoteService = answerVoteService;
    }

    @PostMapping("/questions/{question-id}/answers")
    public ResponseEntity postAnswer(@Valid @RequestBody AnswerPostDto answerPostDto) {

        Answer answer = answerMapper.answerPostDtoToAnswer(answerPostDto);
        Answer createdAnswer = answerService.createAnswer(answer);
        AnswerResponseDto responseDto = answerMapper.answerToAnswerResponseDto(createdAnswer);

        return new ResponseEntity<>(new SingleResponseDto<>(createdAnswer), HttpStatus.CREATED);
    }


    @GetMapping("/answers/{answer-id}")
    public ResponseEntity getAnswer(@PathVariable("answer-id") long answerId){

        Answer foundAnswer = answerService.findAnswer(answerId);
        AnswerResponseDto responseDto = answerMapper.answerToAnswerResponseDto(foundAnswer);

        return new ResponseEntity<>(new SingleResponseDto<>(responseDto), HttpStatus.OK);
    }


    @PatchMapping("/answers/{answer-id}")
    public ResponseEntity updateAnswer(@PathVariable("answer-id") long answerId,
                                     @Valid @RequestBody AnswerPatchDto answerPatchDto) {

        Answer updatedAnswer = answerService.updateAnswer(answerId, answerPatchDto);
        AnswerResponseDto responseDto = answerMapper.answerToAnswerResponseDto(updatedAnswer);

        return ResponseEntity.ok(responseDto);

    }


    @DeleteMapping("/answers/{answer-id}")
    public ResponseEntity deleteAnswer(@PathVariable("answer-id") long answerId) {

        answerService.deleteAnswer(answerId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


    @PostMapping("/answers/{answer-id}/upvote")
    public ResponseEntity<Answer> upvote(@PathVariable ("answer-id") long answerId, @RequestBody AnswerVoteDto answerVoteDto) {
        Answer answer = answerService.findById(answerId);
        answerVoteService.upvote(answer, answerVoteDto.getMemberId());
        return ResponseEntity.ok(answer);
    }

    @PostMapping("/answers/{answer-id}/downvote")
    public ResponseEntity<Answer> downvote(@PathVariable ("answer-id") long answerId, @RequestBody AnswerVoteDto answerVoteDto) {
        Answer answer = answerService.findById(answerId);
        answerVoteService.downvote(answer, answerVoteDto.getMemberId());
        return ResponseEntity.ok(answer);
    }

}
