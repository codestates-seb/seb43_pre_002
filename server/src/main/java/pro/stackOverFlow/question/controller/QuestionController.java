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
//@CrossOrigin(origins = "*", methods = RequestMethod.GET)
public class QuestionController {
    private final QuestionService questionService;
    private final QuestionMapper questionMapper;
    private final MemberService memberService;

    public QuestionController(QuestionService questionService, QuestionMapper mapper) {
        this.questionService = questionService;
        this.mapper = mapper;
    }


    @PostMapping
    public ResponseEntity postQuestion(Long memberId,
                                       @Valid @RequestBody QuestionDto.Post requestBody) {
/*
        Member member = memberService.findMember(memberId);
        Question question = questionService.createQuestion(questionMapperIm.questionPostDtoToQuestion(requestBody, member));
*/

        Question question = questionService.createQuestion(questionMapper.questionPostDtoToQuestion(requestBody));


//        return ResponseEntity.created(URI.create("/questions")).build();
        return new ResponseEntity<>(
                question, HttpStatus.CREATED);

    }

    @PatchMapping("/{question-id}")
    public ResponseEntity patchQuestion(Long memberId,
                                        @Valid @RequestBody QuestionDto.Patch requestBody,
                                        @PathVariable("question-id") long questionId) {
        requestBody.setQuestionId(questionId);
        Question question = questionService.updateQuestion(mapper.questionPatchDtoToQuestion(requestBody));

        return new ResponseEntity<>(
                questionMapper.questionToQuestionResponse(question), HttpStatus.OK);

    }

    @GetMapping("/{question-id}")
    public ResponseEntity getQuestion(@PathVariable("question-id") long questionId) {
        Question question = questionService.findQuestion(questionId);
        questionService.addViewCount(question);
        List<Answer> answers = question.getAnswers();
        List<QuestionGetAnswerDto> questionGetAnswerDto = questionMapper.answersToQuestionGetAnswerDto(answers);
        Member member = question.getMember();

        return new ResponseEntity(
                questionMapper.questionInfoToQuestionGetResponseDto(question, member, questionGetAnswerDto),

    }

//    @GetMapping
//    public ResponseEntity getQuestions(@Positive @RequestParam int page,
//                                       @Positive @RequestParam int size) {
////        Page<Question> questionPage = questionService.findQuestions(page - 1, size);
////        List<Question> questions = questionPage.getContent();
//
//        Page<Question> pageList = questionService.findAllQuestions(page - 1, 15);
//        List<Question> questions = pageList.getContent();
//
////        return new ResponseEntity<>(
////                new MultiResponseDto<>(questionMapper.questionsToQuestionResponses(questions),
////                        questionPage), HttpStatus.OK);
//
//        return new ResponseEntity<>(
//                new MultiResponseDto<>(questionMapper.questionsToQuestionResponses(questions),
//                        pageList), HttpStatus.OK);
//    }

    @GetMapping
    public ResponseEntity getAllQuestions() {
        List<Question> allQuestions = questionService.findAllQuestions();

        return new ResponseEntity(allQuestions, HttpStatus.OK);
    }

    @DeleteMapping("/{question-id}/{member-id}")
    public ResponseEntity deleteQuestion(@PathVariable("member-id") Long memberId,
                                         @PathVariable("question-id") Long questionId) {
        questionService.deleteQuestion(memberId, questionId);

        return new ResponseEntity<>("question delete!", HttpStatus.NO_CONTENT);
    }


    @PostMapping("/{question-id}/upvote/{member-id}")
    public ResponseEntity questionUpVote(@PathVariable("member-id") Long memberId,
                                         @PathVariable("question-id") Long questionId) {
        Member member = memberService.findMember(memberId);
        Question question = questionService.findQuestion(questionId);
        questionService.upVote(member, question);

        return new ResponseEntity(
                questionMapper.questionToQuestionVoteResponseDto(question), HttpStatus.OK);
    }

    @PostMapping("/{question-id}/downvote/{member-id}")
    public ResponseEntity questionDownVote(@PathVariable("member-id") Long memberId,
                                           @PathVariable("question-id") Long questionId) {
        Member member = memberService.findMember(memberId);
        Question question = questionService.findQuestion(questionId);
        questionService.downVote(member, question);

        return new ResponseEntity(
                questionMapper.questionToQuestionVoteResponseDto(question), HttpStatus.OK);
    }


}
