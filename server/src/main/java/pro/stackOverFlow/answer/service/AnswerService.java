package pro.stackOverFlow.answer.service;

import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.graphql.data.GraphQlQueryByExampleAutoConfiguration;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pro.stackOverFlow.answer.dto.AnswerPatchDto;
import pro.stackOverFlow.answer.dto.AnswerResponseDto;
import pro.stackOverFlow.exception.BusinessLogicException;
import pro.stackOverFlow.exception.ExceptionCode;
import pro.stackOverFlow.answer.entity.Answer;
import pro.stackOverFlow.answer.repository.AnswerRepository;
import pro.stackOverFlow.exception.ResourceNotFoundException;
import pro.stackOverFlow.member.entity.Member;
import pro.stackOverFlow.member.service.MemberService;
import pro.stackOverFlow.question.entity.Question;
import pro.stackOverFlow.question.repository.QuestionRepository;
import pro.stackOverFlow.question.service.QuestionService;

import java.nio.file.AccessDeniedException;
import java.time.LocalDateTime;
import java.util.Optional;



@Transactional
@Service
public class AnswerService {
    @Autowired
    private AnswerRepository answerRepository;
    @Autowired
    private MemberService memberService;
    @Autowired
    private QuestionRepository questionRepository;
    @Autowired
    private QuestionService questionService;

    public Answer createAnswer(Answer answer, Question question, Member member) {
//        Question question = questionService.findQuestion(questionId);
//                .orElseThrow(() -> new ResourceNotFoundException("Question not found with id " + questionId));
        answer.setQuestion(question);
        answer.setMember(member);

        return answerRepository.save(answer);
    }

    public Answer updateAnswer(long answerId, AnswerPatchDto answerPatchDto) {
        Answer existingAnswer = findVerifiedAnswer(answerId);
        Optional.ofNullable(answerPatchDto.getContent())
                .ifPresent(content -> {
                    existingAnswer.setContent(content);
                    existingAnswer.setModifiedAt(LocalDateTime.now());
                });
        return answerRepository.save(existingAnswer);
    }



    public Answer findAnswer(long answerId){
        Optional<Answer> optionalAnswer = answerRepository.findById(answerId);
        Answer findAnswer = optionalAnswer.orElseThrow(()-> new BusinessLogicException(ExceptionCode.ANSWER_NOT_FOUND));
        return findAnswer;
    }

    public Answer findVerifiedAnswer(Long answerId) {
        Optional<Answer> optionalAnswer = answerRepository.findById(answerId);
        Answer findAnswer = optionalAnswer.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.ANSWER_NOT_FOUND));

        return findAnswer;
    }

    public void deleteAnswer(long answerId) {
        Answer answer = findVerifiedAnswer(answerId);
        Question question = answer.getQuestion();
        question.setAcceptedAnswer(null);
        questionRepository.save(question);
        answerRepository.delete(answer);
    }

//----------------------------------------------------------------------------------------------------------------------

    public void setUpVote(long answerId, long userId) {
        memberService.findMember(userId);

        Answer answer = findAnswer(answerId);
        VoteStatus voteStatus = getUserVoteStatus(answer, userId);
        long voteCount = answer.getVoteCount();

        if (voteStatus == VoteStatus.NONE) {
            answer.upVotedUserId.add(userId);
            voteCount++;
        } else if (voteStatus == VoteStatus.ALREADY_UP_VOTED) {
            throw new BusinessLogicException(ExceptionCode.ALREADY_UP_VOTED);
        } else if (voteStatus == VoteStatus.ALREADY_DOWN_VOTED) {
            answer.downVotedUserId.remove(userId);
            answer.upVotedUserId.add(userId);
            voteCount += 2;
        }
        answer.setVoteCount(voteCount);
    }

    public void setDownVote(long answerId, long userId) {
        memberService.findMember(userId);

        Answer answer = findAnswer(answerId);
        VoteStatus voteStatus = getUserVoteStatus(answer, userId);
        long voteCount = answer.getVoteCount();

        if (voteStatus == VoteStatus.NONE) {
            answer.downVotedUserId.add(userId);
            voteCount--;
        } else if (voteStatus == VoteStatus.ALREADY_UP_VOTED) {
            answer.upVotedUserId.remove(userId);
            answer.downVotedUserId.add(userId);
            voteCount -= 2;
        } else if (voteStatus == VoteStatus.ALREADY_DOWN_VOTED) {
            throw new BusinessLogicException(ExceptionCode.ALREADY_DOWN_VOTED);
        }
        answer.setVoteCount(voteCount);
    }

    public VoteStatus getUserVoteStatus(Answer answer, long userId) {
        if (answer.getUpVotedUserId().contains(userId)) {
            return VoteStatus.ALREADY_UP_VOTED;
        } else if (answer.getDownVotedUserId().contains(userId)) {
            return VoteStatus.ALREADY_DOWN_VOTED;
        } else {
            return VoteStatus.NONE;
        }
    }

    public long getVoteCount(long answerId) {
        long voteCount = findAnswer(answerId).getVoteCount();
        return voteCount;
    }

    public enum VoteStatus{
        ALREADY_UP_VOTED(1, "already upVoted"),
        NONE(2, "none"),
        ALREADY_DOWN_VOTED(3, "already downVoted");

        @Getter
        private int status;

        @Getter
        private String message;

        VoteStatus(int status, String message) {
            this.status = status;
            this.message = message;
        }
    }



    //------------------------------------------------------------------------------------------------------------------



    public Answer markAnswerAsAccepted(Long answerId, Member user) {
        // 답변 조회
        Answer answer = answerRepository.findById(answerId)
                .orElseThrow(() -> new ResourceNotFoundException("Answer not found with id " + answerId));

        // 질문 조회
        Question question = answer.getQuestion();

//        // 현재 로그인한 사용자가 질문 작성자가 아닐 경우 예외 발생
//        if (!question.getUser().equals(user)) {
//            throw new BusinessLogicException(ExceptionCode.UNAUTHORIZED_MEMBER);
//        }

        // 이미 채택된 답변이 있는지 확인
        if (question.getAcceptedAnswer() != null) {
            throw new RuntimeException("The question already has an accepted answer");
        }

        // 답변 채택 처리
        answer.setAccepted(true);
        answerRepository.save(answer);

        // 질문의 acceptedAnswer 필드 업데이트
        question.setAcceptedAnswer(answer);
        questionRepository.save(question);

        return answer;
    }

    public Answer cancelAcceptedAnswer(Long answerId, Member user) {
        // 답변 조회
        Answer answer = answerRepository.findById(answerId)
                .orElseThrow(() -> new ResourceNotFoundException("Answer not found with id " + answerId));

        // 질문 조회
        Question question = answer.getQuestion();

        // 현재 로그인한 사용자가 질문 작성자가 아닐 경우 예외 발생
        if (!question.getUser().equals(user)) {
            throw new BusinessLogicException(ExceptionCode.UNAUTHORIZED_MEMBER);
        }

        // 채택된 답변인지 확인
        if (!answer.isAccepted()) {
            throw new RuntimeException("The answer is not accepted");
        }

        // 답변 채택 취소 처리
        answer.setAccepted(false);
        answerRepository.save(answer);

        // 질문의 acceptedAnswer 필드 업데이트
        question.setAcceptedAnswer(null);
        questionRepository.save(question);

        return answer;
    }


}

