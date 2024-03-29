package kimdaehan.ctf.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import lombok.*;

import java.io.Serializable;
import java.util.Objects;
import java.util.UUID;

@Embeddable
@NoArgsConstructor
public class SolvedId implements Serializable {
    @Column(name = "solved_quiz_id", columnDefinition = "VARBINARY(64) NOT NULL")
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID solvedQuizId;
    //문제 푼 사람 ID
    @Column(name="solved_user_id", columnDefinition = "VARCHAR(64) NOT NULL")
    private String solvedUserId;

    public SolvedId(UUID solvedQuizId, String solvedUserId) {
        this.solvedQuizId = solvedQuizId;
        this.solvedUserId = solvedUserId;
    }

    public UUID getSolvedQuizId(){
        return solvedQuizId;
    }

    public String getSolvedUserId(){
        return solvedUserId;
    }



    @Override
    public boolean equals(Object o){
        //같은 객체면 true return
        if (this == o){
            return true;
        }
        //o가 없거나, 클래스가 일치 하지 않으면
        if(o == null || getClass() != o.getClass()) return false;
        SolvedId inputSolvedId = (SolvedId) o;
        return solvedQuizId == inputSolvedId.getSolvedQuizId() && Objects.equals(solvedUserId, inputSolvedId.getSolvedUserId());
    }
}
