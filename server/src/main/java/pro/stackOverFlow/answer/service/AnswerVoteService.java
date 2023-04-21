package pro.stackOverFlow.answer.service;

import org.springframework.stereotype.Service;
import pro.stackOverFlow.answer.entity.Answer;
import pro.stackOverFlow.answer.entity.AnswerVote;
import pro.stackOverFlow.answer.repository.AnswerRepository;
import pro.stackOverFlow.answer.repository.AnswerVoteRepository;
import pro.stackOverFlow.exception.BusinessLogicException;
import pro.stackOverFlow.exception.ExceptionCode;
import pro.stackOverFlow.member.entity.Member;
import pro.stackOverFlow.member.repository.MemberRepository;

@Service
public class AnswerVoteService {

    private AnswerRepository answerRepository;
    private AnswerVoteRepository answerVoteRepository;
    private MemberRepository memberRepository;


    public AnswerVoteService(AnswerRepository answerRepository, AnswerVoteRepository answerVoteRepository, MemberRepository memberRepository) {
        this.answerRepository = answerRepository;
        this.answerVoteRepository = answerVoteRepository;
        this.memberRepository = memberRepository;
    }

    public void save(AnswerVote answerVote) {
        answerVoteRepository.save(answerVote);

        Answer answer = answerVote.getAnswer();
        if (answerVote.isUpvote()) {
            answer.setVoteCount(answer.getVoteCount() + 1);
        } else {
            answer.setVoteCount(answer.getVoteCount() - 1);
        }
        answerRepository.save(answer);
    }

    public void upvote(Answer answer, Long memberId) {
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        AnswerVote answerVote = new AnswerVote(answer, member, true);
        answerVoteRepository.save(answerVote);
        answer.increaseVoteCount();
        answerRepository.save(answer);
    }

    public void downvote(Answer answer, Long memberId) {
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        AnswerVote answerVote = new AnswerVote(answer, member, false);
        answerVoteRepository.save(answerVote);
        answer.decreaseVoteCount();
        answerRepository.save(answer);
    }
//    upvote()와 downvote() 메소드
//    1.member 객체를 데이터베이스에서 가져옴.
//    2.answer 객체와 member 객체를 사용하여 answerVote 객체를 생성함.
//    3.answerVote 객체를 데이터베이스에 저장함.
//    4.answer 객체의 voteCount를 증가 또는 감소시킴.
//    5.answer 객체를 데이터베이스에 저장함.

}
