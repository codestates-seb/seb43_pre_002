package pro.stackOverFlow.question.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import pro.stackOverFlow.answer.entity.Answer;
import pro.stackOverFlow.dto.MultiResponseDto;
import pro.stackOverFlow.dto.SingleResponseDto;
import pro.stackOverFlow.member.entity.Member;
import pro.stackOverFlow.member.service.MemberService;
import pro.stackOverFlow.question.dto.QuestionDto;
import pro.stackOverFlow.question.dto.QuestionGetAnswerDto;
import pro.stackOverFlow.question.entity.Question;
import pro.stackOverFlow.question.mapper.QuestionMapper;
import pro.stackOverFlow.question.mapper.QuestionMapperIm;
import pro.stackOverFlow.question.service.QuestionService;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@Validated
@RequestMapping("/questions")
@RequiredArgsConstructor
//@CrossOrigin(origins = "*", methods = RequestMethod.GET)
public class QuestionController {
    private final QuestionService questionService;
    private final QuestionMapper questionMapper;
    private final QuestionMapperIm questionMapperIm;
    private final MemberService memberService;

    //Todo: member-id 임시적으로 추가!! 보안 적용 후 없앨 예정
    //Todo : addMember 메서드 추가!

    @PostMapping("/{member-id}")
    public ResponseEntity postQuestion(@Valid @RequestBody QuestionDto.Post requestBody,
                                       @PathVariable("member-id") long memberId) {
//        Member member = memberService.findMember(memberId);
//        Question question = questionService.createQuestion(questionMapperIm.questionPostDtoToQuestion(requestBody, member));

        Question question = questionMapper.questionPostDtoToQuestion(requestBody);
        Member member = memberService.findMember(memberId);
        question.addMember(member);

        Question createdQuestion = questionService.createQuestion(question);

        return new ResponseEntity<>(
                createdQuestion, HttpStatus.CREATED);
    }

    @PatchMapping("/{question-id}")
    public ResponseEntity patchQuestion(@Valid @RequestBody QuestionDto.Patch requestBody,
                                        @PathVariable("question-id") long questionId) {
        requestBody.setQuestionId(questionId);
        Question question = questionService.updateQuestion(questionMapper.questionPatchDtoToQuestion(requestBody));

        return new ResponseEntity<>(
                questionMapper.questionToQuestionResponse(question), HttpStatus.OK);
    }

    @GetMapping("/{question-id}")
    public ResponseEntity getQuestion(@PathVariable("question-id") long questionId) {
        Question question = questionService.findQuestion(questionId);
        questionService.addViewCount(question);
        List<Answer> answers = question.getAnswers();
        List<QuestionGetAnswerDto> questionGetAnswerDto = questionMapperIm.answersToQuestionGetAnswerDto(answers);
        Member member = question.getMember();

        return new ResponseEntity(
                questionMapperIm.questionInfoToQuestionGetResponseDto(question, member, questionGetAnswerDto),
                HttpStatus.OK);
    }

    //Todo: 수정 요망 (get All
    @GetMapping
    public ResponseEntity getQuestions(@Positive @RequestParam int page,
                                       @Positive @RequestParam int size) {
        Page<Question> questionPage = questionService.findQuestions(page - 1, size);
        List<Question> questions = questionPage.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(questionMapper.questionsToQuestionResponses(questions),
                        questionPage), HttpStatus.OK);
    }

    @DeleteMapping("/{question-id}/{member-id}")
    public ResponseEntity deleteQuestion(@PathVariable("member-id") Long memberId,
                                         @PathVariable("question-id") Long questionId) {
        questionService.deleteQuestion(memberId, questionId);

        return new ResponseEntity<>(new SingleResponseDto<>("question delete!"), HttpStatus.NO_CONTENT);
    }


    @PostMapping("/{question-id}/upvote/{member-id}")
    public ResponseEntity questionUpVote(@PathVariable("member-id") Long memberId,
                                         @PathVariable("question-id") Long questionId) {
        Member member = memberService.findMember(memberId);
        Question question = questionService.findQuestion(questionId);
        questionService.upVote(member, question);

        return new ResponseEntity(
                new SingleResponseDto<>(questionMapperIm.questionToQuestionVoteResponseDto(question)), HttpStatus.OK);
    }

    @PostMapping("/{question-id}/downvote/{member-id}")
    public ResponseEntity questionDownVote(@PathVariable("member-id") Long memberId,
                                           @PathVariable("question-id") Long questionId) {
        Member member = memberService.findMember(memberId);
        Question question = questionService.findQuestion(questionId);
        questionService.downVote(member, question);

        return new ResponseEntity(
                new SingleResponseDto<>(questionMapperIm.questionToQuestionVoteResponseDto(question)), HttpStatus.OK);
    }


}
