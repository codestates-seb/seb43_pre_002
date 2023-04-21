package pro.stackOverFlow.answer.service;

import lombok.Getter;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pro.stackOverFlow.answer.dto.AnswerPatchDto;
import pro.stackOverFlow.answer.dto.AnswerResponseDto;
import pro.stackOverFlow.exception.BusinessLogicException;
import pro.stackOverFlow.exception.ExceptionCode;
import pro.stackOverFlow.answer.entity.Answer;
import pro.stackOverFlow.answer.repository.AnswerRepository;
import pro.stackOverFlow.member.service.MemberService;

import java.time.LocalDateTime;
import java.util.Optional;



@Transactional
@Service
public class AnswerService {
    private AnswerRepository answerRepository;
    private MemberService memberService;


    public AnswerService(AnswerRepository answerRepository, MemberService memberService) {
        this.answerRepository = answerRepository;
        this.memberService = memberService;
    }

    public Answer createAnswer(Answer answer){
        return answerRepository.save(answer);
    }

//    public Answer updateAnswer(Answer answer){
//        Answer findAnswer = findAnswer(answer.getAnswerId());
//        Optional.ofNullable(answer.getContent())
//                .ifPresent(content -> findAnswer.setContent(content));
//        Answer updateAnswer = answerRepository.save(findAnswer);
//        return updateAnswer;
//    }

    public Answer updateAnswer(long answerId, AnswerPatchDto answerPatchDto) {
        Answer existingAnswer = findVerifiedAnswer(answerId);
        Optional.ofNullable(answerPatchDto.getContent())
                .ifPresent(content -> {
                    existingAnswer.setContent(content);
                    existingAnswer.setModifiedAt(LocalDateTime.now());
                });
        return answerRepository.save(existingAnswer);
    }



    public Answer findAnswer(long questionId){
        Optional<Answer> optionalQuestion = answerRepository.findById(questionId);
        Answer findAnswer = optionalQuestion.orElseThrow(()-> new BusinessLogicException(ExceptionCode.QUESTION_NOT_FOUND));

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
        answerRepository.delete(answer);
    }

//    public Answer findById(Long answerId) {
//        return answerRepository.findById(answerId)
//                .orElseThrow(() -> new RuntimeException("Answer not found with id " + answerId));
//    }

    public Answer findById(Long answerId) {
        Optional<Answer> answerOptional = answerRepository.findById(answerId);
        if (answerOptional.isEmpty()) {
            throw new BusinessLogicException(ExceptionCode.ANSWER_NOT_FOUND);
        }
        return answerOptional.get();
    }



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
            voteCount++;
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
            voteCount--;
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


}

