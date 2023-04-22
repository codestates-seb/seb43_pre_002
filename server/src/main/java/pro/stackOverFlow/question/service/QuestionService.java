package pro.stackOverFlow.question.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pro.stackOverFlow.question.entity.Question;
import pro.stackOverFlow.exception.BusinessLogicException;
import pro.stackOverFlow.exception.ExceptionCode;
import pro.stackOverFlow.question.repository.QuestionRepository;

import java.util.Optional;

@Service
@Transactional
public class QuestionService {

    private final QuestionRepository questionRepository;

    public QuestionService(QuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
    }

    // create
    public Question createQuestion(Question question) {
        return questionRepository.save(question);
    }

    // read
    public Question findQuestion(Long questionId) {
        Question question = findVerifiedQuestion(questionId);
        return questionRepository.save(question);
    }

    // 전체 조회
    public Page<Question> findQuestions(int page, int size) {
        return questionRepository.findAll(PageRequest.of(page, size,
                Sort.by("questionId").descending()));
    }

    // update
    public Question updateQuestion(Question question) {
        return questionRepository.save(question);
    }

    // delete
    public void deleteQuestion(Long memberId, Long questionId) {
        Question question = findVerifiedQuestion(questionId);
        Long findMemberId = question.getMember().getMemberId();
        if (!memberId.equals(findMemberId)) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_EXISTS);
        }
        questionRepository.delete(question);
    }

    // question 있는지 검증
    private Question findVerifiedQuestion(Long questionId) {
        Optional<Question> optionalQuestion = questionRepository.findById(questionId);
        return optionalQuestion.orElseThrow(() -> new BusinessLogicException(ExceptionCode.QUESTION_NOT_FOUND));
    }

    // 조회수 카운트
    public void addViewCount(Question question) {
        question.setViewCount(question.getViewCount() + 1);
    }

}
