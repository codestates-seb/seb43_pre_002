package pro.stackOverFlow.question.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pro.stackOverFlow.member.entity.Member;
import pro.stackOverFlow.question.entity.Question;
import pro.stackOverFlow.exception.BusinessLogicException;
import pro.stackOverFlow.exception.ExceptionCode;
import pro.stackOverFlow.question.entity.QuestionVote;
import pro.stackOverFlow.question.repository.QuestionRepository;
import pro.stackOverFlow.question.repository.QuestionVoteRepository;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class QuestionService {

    private final QuestionRepository questionRepository;
    private final QuestionVoteRepository questionVoteRepository;

    public Question createQuestion(Question question) {
        return questionRepository.save(question);
    }

    public Question findQuestion(Long questionId) {
        Question question = findVerifiedQuestion(questionId);
        return questionRepository.save(question);
    }

    public List<Question> findAllQuestions() {
        return questionRepository.findAll();
    }

    public Question updateQuestion(Question question) {
        return questionRepository.save(question);
    }

    public void deleteQuestion(Long questionId) {
        Question question = findVerifiedQuestion(questionId);
        questionRepository.delete(question);
    }

    private Question findVerifiedQuestion(Long questionId) {
        Optional<Question> optionalQuestion = questionRepository.findById(questionId);
        return optionalQuestion.orElseThrow(() -> new BusinessLogicException(ExceptionCode.QUESTION_NOT_FOUND));
    }

    public void addViewCount(Question question) {
        question.setViewCount(question.getViewCount() + 1);
    }

    public void upVote(Member member, Question question) {
        QuestionVote questionVote = findQuestionVote(member, question);

        if (questionVote.getVoteStatus().toString().equals("UP")) {
            throw new BusinessLogicException(ExceptionCode.ALREADY_UP_VOTED);
        } else if (questionVote.getVoteStatus().toString().equals("NONE")) {
            questionVote.setVoteStatus(QuestionVote.VoteStatus.UP);
        } else if (questionVote.getVoteStatus().toString().equals("DOWN")) {
            questionVote.setVoteStatus(QuestionVote.VoteStatus.NONE);
        }
        question.setQuestionVoteCount(question.getQuestionVoteCount() + 1);
    }

    public void downVote(Member member, Question question) {
        QuestionVote questionVote = findQuestionVote(member, question);

        if (questionVote.getVoteStatus().toString().equals("DOWN")) {
            throw new BusinessLogicException(ExceptionCode.ALREADY_DOWN_VOTED);
        } else if (questionVote.getVoteStatus().toString().equals("NONE")) {
            questionVote.setVoteStatus(QuestionVote.VoteStatus.DOWN);
        } else if (questionVote.getVoteStatus().toString().equals("UP")) {
            questionVote.setVoteStatus(QuestionVote.VoteStatus.NONE);
        }
        question.setQuestionVoteCount(question.getQuestionVoteCount() - 1);
    }

    private QuestionVote findQuestionVote(Member member, Question question) {
        Optional<QuestionVote> questionVote = questionVoteRepository.findByMemberAndQuestion(member, question);
        return questionVote.orElseGet(() -> createVote(member, question));
    }

    private QuestionVote createVote(Member member, Question question) {
        QuestionVote questionVote = QuestionVote.builder()
                .voteStatus(QuestionVote.VoteStatus.NONE)
                .member(member)
                .question(question)
                .build();
        return questionVoteRepository.save(questionVote);
    }

}
