package pro.stackOverFlow.question.entity;

import lombok.*;
import pro.stackOverFlow.member.entity.Member;
import pro.stackOverFlow.question.entity.Question;

import javax.persistence.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class QuestionVote {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long questionVoteId;

    @Enumerated(value = EnumType.STRING)
    private VoteStatus voteStatus;

    @ManyToOne
    @JoinColumn(name = "question_id")
    private Question question;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    public enum VoteStatus {
        UP,
        DOWN,
        NONE
    }

}


