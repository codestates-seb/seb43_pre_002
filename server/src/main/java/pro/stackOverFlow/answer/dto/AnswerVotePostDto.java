package pro.stackOverFlow.answer.dto;

import lombok.Getter;

@Getter
public class AnswerVotePostDto {

    private String voteType;

    private long memberId;


    public String getVoteType() {
        return voteType;
    }

    public void setVoteType(String voteType) {
        this.voteType = voteType;
    }
}
