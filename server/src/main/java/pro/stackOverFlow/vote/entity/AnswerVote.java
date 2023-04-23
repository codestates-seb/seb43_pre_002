package pro.stackOverFlow.vote.entity;

import lombok.*;
import pro.stackOverFlow.member.entity.Member;

import javax.persistence.*;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class AnswerVote {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long answerVoteId;

    @Column(nullable = false)
    private int answerVoteCount;

    @Enumerated(value = EnumType.STRING)
    private VoteStatus voteStatus;

//    @ManyToOne
//    private Answer answer;

    @ManyToOne
    private Member member;
}
