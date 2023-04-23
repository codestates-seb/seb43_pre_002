
package pro.stackOverFlow.exception;

import lombok.Getter;

public enum ExceptionCode {

    QUESTION_NOT_FOUND(404, "Question not found"),
    QUESTION_EXISTS(409, "Question exists"),

    MEMBER_NOT_FOUND(404, "Member not found"),
    MEMBER_EXISTS(409, "Member exists"),

    ANSWER_NOT_FOUND(404, "Answer not found"),

    ALREADY_UP_VOTED(409, "already upVoted"),
    ALREADY_DOWN_VOTED(409, "already downVoted"),

    UNAUTHORIZED_MEMBER(404, "you are not authorized member");

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}