package pro.stackOverFlow.question.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pro.stackOverFlow.answer.entity.Answer;
import pro.stackOverFlow.member.entity.Member;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long questionId;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    private int viewCount; // 조회수


    //------------------------------------------------------------------------------------------------------------------


    @OneToOne
    @JoinColumn(name = "accepted_answer_id")
    private Answer acceptedAnswer;

    @ManyToOne//(targetEntity = Member.class, cascade = CascadeType.PERSIST)
    @Setter
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    public Answer getAcceptedAnswer() {
        return acceptedAnswer;
    }

    public void setAcceptedAnswer(Answer acceptedAnswer) {
        this.acceptedAnswer = acceptedAnswer;
    }


    public Member getUser() {
        return this.member;
    }



}
