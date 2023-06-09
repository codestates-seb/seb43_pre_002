package pro.stackOverFlow.question.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import pro.stackOverFlow.answer.entity.Answer;
import pro.stackOverFlow.member.entity.Member;
import pro.stackOverFlow.member.service.MemberService;
import pro.stackOverFlow.question.dto.QuestionDto;
import pro.stackOverFlow.question.dto.QuestionGetAnswerDto;
import pro.stackOverFlow.question.entity.Question;
import pro.stackOverFlow.question.mapper.QuestionMapper;
import pro.stackOverFlow.question.service.QuestionService;

import javax.validation.Valid;
import java.util.List;

@RestController
@Validated
@RequestMapping("/questions")
@RequiredArgsConstructor
public class QuestionController {
    private final QuestionService questionService;
    private final QuestionMapper questionMapper;
    private final MemberService memberService;

    @PostMapping("/{member-id}")
    public ResponseEntity postQuestion(@Valid @RequestBody QuestionDto.Post requestBody,
                                       @PathVariable("member-id") long memberId) {

        Member member = memberService.findMember(memberId);
        Question question = questionMapper.questionPostDtoToQuestion(requestBody, member);

        questionService.createQuestion(question);

        return new ResponseEntity<>(question, HttpStatus.CREATED);
    }

    @PatchMapping("/{question-id}/{member-id}")
    public ResponseEntity patchQuestion(@PathVariable("member-id") Long memberId,
                                        @Valid @RequestBody QuestionDto.Patch requestBody,
                                        @PathVariable("question-id") long questionId) {
        Question findQuestion = questionService.findQuestion(questionId);
        Member member = memberService.findMember(memberId);
        Question question = questionMapper.questionPatchDtoToQuestion(requestBody, findQuestion, member);
        questionService.updateQuestion(question);

        return new ResponseEntity<>(question, HttpStatus.OK);
    }

    @GetMapping("/{question-id}")
    public ResponseEntity getQuestion(@PathVariable("question-id") long questionId) {
        Question question = questionService.findQuestion(questionId);
        questionService.addViewCount(question);
        List<Answer> answers = question.getAnswers();
        List<QuestionGetAnswerDto> questionGetAnswerDto = questionMapper.answersToQuestionGetAnswerDto(answers);
        Member member = question.getMember();

        return new ResponseEntity<>(questionMapper.questionInfoToQuestionGetResponseDto(question, member, questionGetAnswerDto), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<Question>> getAllQuestions() {
        List<Question> allQuestions = questionService.findAllQuestions();

        for (Question question : allQuestions) {
            int answerCount = question.getAnswers().size();
            question.setAnswerCount(answerCount);
        }

        return new ResponseEntity<>(allQuestions, HttpStatus.OK);
    }

    @DeleteMapping("/{question-id}")
    public ResponseEntity deleteQuestion(@PathVariable("question-id") Long questionId) {
        questionService.deleteQuestion(questionId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

//    @DeleteMapping("/{question-id}/{member-id}")
//    public ResponseEntity deleteQuestion(@PathVariable("member-id") Long memberId,
//                                         @PathVariable("question-id") Long questionId) {
//        questionService.deleteQuestion(memberId, questionId);
//
//        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//    }


    @PostMapping("/{question-id}/upvote/{member-id}")
    public ResponseEntity questionUpVote(@PathVariable("member-id") Long memberId,
                                         @PathVariable("question-id") Long questionId) {
        Member member = memberService.findMember(memberId);
        Question question = questionService.findQuestion(questionId);
        questionService.upVote(member, question);

        return new ResponseEntity<>(questionMapper.questionToQuestionVoteResponseDto(question), HttpStatus.OK);
    }

    @PostMapping("/{question-id}/downvote/{member-id}")
    public ResponseEntity questionDownVote(@PathVariable("member-id") Long memberId,
                                           @PathVariable("question-id") Long questionId) {
        Member member = memberService.findMember(memberId);
        Question question = questionService.findQuestion(questionId);
        questionService.downVote(member, question);

        return new ResponseEntity<>(questionMapper.questionToQuestionVoteResponseDto(question), HttpStatus.OK);
    }


}
