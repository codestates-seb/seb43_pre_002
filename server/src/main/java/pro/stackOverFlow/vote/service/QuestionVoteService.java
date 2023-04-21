package pro.stackOverFlow.vote.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pro.stackOverFlow.exception.BusinessLogicException;
import pro.stackOverFlow.exception.ExceptionCode;
import pro.stackOverFlow.member.entity.Member;
import pro.stackOverFlow.question.entity.Question;
import pro.stackOverFlow.vote.entity.QuestionVote;
import pro.stackOverFlow.vote.entity.VoteStatus;
import pro.stackOverFlow.vote.repository.QuestionVoteRepository;

import java.util.Optional;

@Service
@Transactional
public class QuestionVoteService {
    private final QuestionVoteRepository questionVoteRepository;

    public QuestionVoteService(QuestionVoteRepository questionVoteRepository) {
        this.questionVoteRepository = questionVoteRepository;
    }

    public void upVote(Member member, Question question) {
        QuestionVote questionVote = findQuestionVote(member, question);

        if (questionVote.getVoteStatus().toString().equals("UP")) {
            throw new BusinessLogicException(ExceptionCode.VOTE_NOT_ALLOW);
        } else if (questionVote.getVoteStatus().toString().equals("NONE")) {
            questionVote.setVoteStatus(VoteStatus.UP);
        } else if (questionVote.getVoteStatus().toString().equals("DOWN")) {
            questionVote.setVoteStatus(VoteStatus.NONE);
        }
        question.setQuestionVoteCount(question.getQuestionVoteCount() + 1);
    }

    public void downVote(Member member, Question question) {
        QuestionVote questionVote = findQuestionVote(member, question);

        if (questionVote.getVoteStatus().toString().equals("DOWN")) {
            throw new BusinessLogicException(ExceptionCode.VOTE_NOT_ALLOW);
        } else if (questionVote.getVoteStatus().toString().equals("NONE")) {
            questionVote.setVoteStatus(VoteStatus.DOWN);
        } else if (questionVote.getVoteStatus().toString().equals("UP")) {
            questionVote.setVoteStatus(VoteStatus.NONE);
        }
        question.setQuestionVoteCount(question.getQuestionVoteCount() - 1);
    }

    private QuestionVote findQuestionVote(Member member, Question question) {
        Optional<QuestionVote> questionVote = questionVoteRepository.findByMemberAndQuestion(member, question);
        return questionVote.orElseGet(() -> createVote(member, question));
    }

    private QuestionVote createVote(Member member, Question question) {
        QuestionVote questionVote = QuestionVote.builder()
                .voteStatus(VoteStatus.NONE)
                .member(member)
                .question(question)
                .build();
        return questionVoteRepository.save(questionVote);
    }


}