package pro.stackOverFlow.member.entity;

import lombok.*;
import pro.stackOverFlow.audit.Auditable;
import pro.stackOverFlow.exception.BusinessLogicException;
import pro.stackOverFlow.exception.ExceptionCode;
import pro.stackOverFlow.question.dto.QuestionDto;
import pro.stackOverFlow.question.entity.Question;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Setter
@Getter
@Entity
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

    @Setter
    @OneToMany(mappedBy = "member")
    private List<Question> Questions;

    public Member(Long memberId) {
        this.memberId = memberId;
    }


//    public void setQuestion(Question Question) {
//        this.Questions.add(Question);
//        if (Question.getMember() != this) {
//            Question.setMember(this);
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

}
