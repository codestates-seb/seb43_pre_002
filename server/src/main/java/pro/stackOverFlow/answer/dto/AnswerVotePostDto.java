package pro.stackOverFlow.answer.dto;

import lombok.Getter;

@Getter
public class AnswerVotePostDto {

    private String voteType;

    private long memberId;



    public void setVoteType(String voteType) {
        this.voteType = voteType;
    }
}
