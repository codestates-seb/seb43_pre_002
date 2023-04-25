package pro.stackOverFlow.question.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import pro.stackOverFlow.answer.entity.Answer;
import pro.stackOverFlow.member.entity.Member;
import pro.stackOverFlow.audit.Auditable;

import javax.persistence.*;
import java.util.List;

@EqualsAndHashCode(callSuper = false)
@Data
@Builder
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Question extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long questionId;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    private long viewCount; // 조회수

    @Column(nullable = false)
    private long questionVoteCount;


//    @ManyToOne
//    @Getter
//    @Setter
//    @JoinColumn(name = "member_id")
//    private Member member;

    @OneToMany(mappedBy = "question", cascade = CascadeType.REMOVE)
    private List<Answer> answers;

    @OneToMany(mappedBy = "question", cascade = CascadeType.REMOVE)
    private List<QuestionVote> questionVotes;




    @OneToOne
    @JoinColumn(name = "accepted_answer_id")
    private Answer acceptedAnswer;

    @JsonIgnore
    @ManyToOne
    @Setter
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    public Answer getAcceptedAnswer() {
        return acceptedAnswer;
    }

    public void setAcceptedAnswer(Answer acceptedAnswer) {
        this.acceptedAnswer = acceptedAnswer;
    }


//    public Member getUser() {
//        return this.member;
//    }

    public void addMember(Member member) {
        this.member = member;
        if (!member.getQuestions().contains(this)) {
            member.getQuestions().add(this);
        }
    }




}
