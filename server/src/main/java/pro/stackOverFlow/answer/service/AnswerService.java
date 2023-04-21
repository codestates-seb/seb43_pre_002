package pro.stackOverFlow.answer.service;

import org.springframework.stereotype.Service;
import pro.stackOverFlow.answer.dto.AnswerPatchDto;
import pro.stackOverFlow.answer.dto.AnswerResponseDto;
import pro.stackOverFlow.exception.BusinessLogicException;
import pro.stackOverFlow.exception.ExceptionCode;
import pro.stackOverFlow.answer.entity.Answer;
import pro.stackOverFlow.answer.repository.AnswerRepository;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class AnswerService {
    private AnswerRepository answerRepository;


    public AnswerService(AnswerRepository answerRepository) {
        this.answerRepository = answerRepository;
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

}

