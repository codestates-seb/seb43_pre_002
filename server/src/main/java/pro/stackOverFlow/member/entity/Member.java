package pro.stackOverFlow.member.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import pro.stackOverFlow.answer.entity.Answer;
import pro.stackOverFlow.audit.Auditable;
import pro.stackOverFlow.exception.BusinessLogicException;
import pro.stackOverFlow.exception.ExceptionCode;
import pro.stackOverFlow.question.entity.Question;
import pro.stackOverFlow.question.entity.QuestionVote;

import javax.persistence.*;
import javax.validation.constraints.Email;
import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Entity
@Builder
public class Member extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(length = 100, nullable = false)
    private String password;

    @Column(length = 100, nullable = false)
    private String displayName;

    @Column(length = 50)
    private String title;

    @Column(length = 300)
    private String aboutMe;

    @Column
    private String websiteLink;
    @Column
    private String twitterLink;
    @Column
    private String githubLink;
    @Column
    private String notionLink;
    @Column
    private String blogLink;



    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

    @JsonIgnore
    @Setter
    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Question> questions;

    @JsonIgnore
    @Setter
    @OneToMany(mappedBy = "member",fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Answer> answers;

    public Member(Long memberId) {
        this.memberId = memberId;
    }

    public Member(String email) {
        this.email = email;
    }


//    public void setQnAQuestion(QnaQuestion qnaQuestion) {
//        this.qnaQuestions.add(qnaQuestion);
//        if (qnaQuestion.getMember() != this) {
//            qnaQuestion.setMember(this);
//        }
//    }


    public static void checkNotFoundMember(Member member) {
        if (member == null) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND);
        }
    }

    public static void checkExistEmail(Member targetMember) {
        if(targetMember != null)
            throw new BusinessLogicException(ExceptionCode.MEMBER_EXISTS);
    }


//    public void checkIsMyself(long authenticatedMemberId) {
//        if (this.memberId != authenticatedMemberId) {
//            throw new BusinessLogicException(ExceptionCode.CANNOT_CHANGE_QNA_QUESTION);
//        }
//    }

//    public boolean isMyself(long authenticatedMemberId) {
//        return this.memberId == authenticatedMemberId;
//    }

//    public boolean isAdmin() {
//        return this.getRoles().contains("ADMIN");
//    }

    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE)
    private List<QuestionVote> questionVoteList;
}
