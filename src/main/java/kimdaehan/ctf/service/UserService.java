package kimdaehan.ctf.service;

import kimdaehan.ctf.dto.RankAllDTO;
import kimdaehan.ctf.dto.RankGraphCurrentDTO;
import kimdaehan.ctf.dto.UserPageDTO;
import kimdaehan.ctf.entity.User;
import kimdaehan.ctf.repository.*;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final QuizRepository quizRepository;
    private final SolvedRepository solvedRepository;
    private final AccessLogRepository accessLogRepository;
    private final DownloadLogRepository downloadLogRepository;
    private final FlagLogRepository flagLogRepository;
    private final RankRepository rankRepository;

    @Override
    @NonNull
    public UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException{
        return userRepository.findByUserId(userId).orElseThrow(() -> {
            String message = String.format("Username \"%s\" does not exist!", userId);
            return new UsernameNotFoundException(message);
        });
    }

    public void upsertUser(User user){
        userRepository.save(user);
    }

    public User getUserId(String userId){
        return userRepository.findByUserId(userId).orElse(null);
    }
   public List<User> getAllUser(){
        return userRepository.findAll();
   }

   public void changeUser(User existUser, User changeUser){
       //유저 PW 변경
       existUser.setPassword(changeUser.getPassword());
       //유저 이름 변경
       existUser.setName(changeUser.getName());
       //유저 닉네임 변경
       existUser.setNickName(changeUser.getNickName());
       //유저 소속 변경
       existUser.setAffiliation(changeUser.getAffiliation());
       //유저 권한 변경
       existUser.setType(changeUser.getType());
       userRepository.save(existUser);
   }

   public User getUserByNickName(String nickName){
        return userRepository.findByNickName(nickName).orElse(null);
   }

   @Transactional
   public void deleteUser(User user){
        //유저가 만든 문제 삭제
        quizRepository.deleteByQuizWriter(user);
        //유저의 로그 기록 삭제
        accessLogRepository.deleteByRecordKeyUserId(user);
        flagLogRepository.deleteByRecordKeyUserId(user);
        downloadLogRepository.deleteByRecordKeyUserId(user);
        //유저 삭제
        userRepository.delete(user);
   }

   @Transactional
   public void deleteSolvedByServerSettingTime(LocalDateTime localDateTime){
        solvedRepository.deleteBySolvedTimeBefore(localDateTime);
        rankRepository.deleteByAffiliationKeyDateTimeBefore(localDateTime);
   }

   public List<UserPageDTO> getUserList(){
        return solvedRepository.findScoreUsers();
   }
   public UserPageDTO getUserByUserId(String userId) {return  solvedRepository.findScoreUsersByUserId(userId).orElse(null);}


    public List<UserPageDTO> getUserListByAffiliation(String affiliation){
        return solvedRepository.findScoreUsersByAffiliation(affiliation);
    }
    public List<UserPageDTO> getAllUserList(){
        return solvedRepository.findALLRankAndScoreUsers();
    }
    public UserPageDTO getUserByAffiliationAndUserId(String affiliation, String userId) {return  solvedRepository.findScoreUsersByAffiliationAndUserId(affiliation,userId).orElse(null);}

    public List<UserPageDTO> getRankAndScoreUsersByAffiliation(String affiliation) {return  solvedRepository.findRankAndScoreUsersByAffiliation(affiliation);}

    public List<RankGraphCurrentDTO> getRankAndScoreUsersByAffiliationTop5(String affiliation){return solvedRepository.findRankAndScoreUsersByAffiliationTop5(affiliation);}
    public List<RankGraphCurrentDTO> getAllRankAndScoreUsersByAffiliationTop5(){return solvedRepository.findAllRankAndScoreUsersByAffiliationTop5();}
    public void changeUserCurrentSolvedDateTime(User user){
        user.setCurrentSolvedDateTime(LocalDateTime.now());
        userRepository.save(user);
    }
    public List<RankAllDTO> findScoreUsersByAffiliationAndUserIdWithoutIsBan(String affiliation){
        return solvedRepository.findScoreUsersByAffiliationAndUserIdWithoudIsBan(affiliation);
    }
    public List<RankAllDTO>findScoreUsersWithAllAndUserIdWithoutIsBan(){
        return solvedRepository.findScoreUsersWithAllAndUserIdWithoudIsBan();
    }

    public List<String> getAllQuizNameByUserId(String userId, String category){
        return solvedRepository.findAllQuizNameByUserId(userId, category);
    }
    public void initCurrentTime(){
        userRepository.updateCurrentSolvedDateTime();
    }
}
