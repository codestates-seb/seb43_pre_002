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
import javax.validation.constraints.Positive;

@RestController
public class AnswerController {

    private AnswerService answerService;
    private AnswerMapper answerMapper;


    public AnswerController(AnswerService answerService, AnswerMapper answerMapper) {
        this.answerService = answerService;
        this.answerMapper = answerMapper;
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



    @PostMapping("/upVote/{question-id}/{answer-id}")
    public ResponseEntity setUpVote(@PathVariable("question-id") @Positive long questionId,
                                    @PathVariable("answer-id") @Positive long answerId,
                                    @Positive @RequestParam long userId) {
        answerService.setUpVote(answerId, userId);

        return new ResponseEntity(new SingleResponseDto<>(answerService.getVoteCount(answerId)), HttpStatus.OK);
    }

    @PostMapping("/downVote/{question-id}/{answer-id}")
    public ResponseEntity setDownVote(@PathVariable("question-id") @Positive long questionId,
                                      @PathVariable("answer-id") @Positive long answerId,
                                      @Positive @RequestParam long userId) {

        answerService.setDownVote(answerId, userId);

        return new ResponseEntity(new SingleResponseDto<>(answerService.getVoteCount(answerId)), HttpStatus.OK);
    }


}
