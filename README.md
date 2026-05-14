# 🚩 CTF 사이트 제작

> **Security First 2023** 연말 해킹 대회를 위한 CTF(Capture The Flag) 플랫폼

<br>

## 📌 프로젝트 소개

보안 동아리 **Security First**의 2023 연말 해킹 대회를 위해 직접 제작한 CTF 웹 플랫폼입니다.  
문제 출제부터 실시간 점수 집계, 관리자 운영까지 대회 전반을 지원하는 기능을 구현했습니다.

<br>

## 🛠 기술 스택

<img src="https://img.shields.io/badge/spring-6DB33F?style=for-the-badge&logo=spring&logoColor=white"> <img src="https://img.shields.io/badge/bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white"> <img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white">

| 분류 | 기술 |
|------|------|
| Backend | Spring Boot 3.1.3, Spring Security, Spring Data JPA, Hibernate |
| Frontend | Thymeleaf, Bootstrap, JavaScript, SCSS |
| Database | MySQL |
| Build | Gradle |
| Language | Java 17 |

<br>

## ⚙️ 주요 기능

### 🔐 관리자 페이지
- CTF 문제 생성 / 수정 / 삭제
- 대회 시작 시간 및 종료 시간 설정
- 실시간 서버 로그 확인

### ⏱ 시간 제한
- 관리자가 설정한 시간 범위 외에는 문제 접근 및 답안 제출 불가
- 대회 시간 외 접근 시도에 대한 예외 처리

### 📊 실시간 점수판
- 상위 5명의 참가자 점수를 실시간 그래프로 시각화
- 카테고리별 점수 구분 표시

### 📝 문제 페이지
- 문제별 풀이 인원 실시간 확인
- **동적 점수 시스템**: 풀이 인원이 증가할수록 해당 문제의 점수가 감소 (난이도 반영)

<br>

## 📂 프로젝트 구조

```
src
├── main
│   ├── java
│   │   └── kimdaehan
│   │       ├── controller   # 요청 처리
│   │       ├── service      # 비즈니스 로직
│   │       ├── domain       # 엔티티
│   │       └── repository   # DB 접근
│   └── resources
│       ├── templates        # Thymeleaf 템플릿
│       └── static           # 정적 리소스 (JS, CSS)
```

<br>

## 🖥 실제 운영 화면

<img width="1280" alt="메인 페이지" src="https://github.com/user-attachments/assets/922854c6-613e-4679-ba5d-56ca7023e41d" />
<img width="1280" alt="관리자 페이지" src="https://github.com/user-attachments/assets/a3e7c900-4f59-40f3-b481-dc3882646d31" />
<img width="1280" alt="대회 규칙" src="https://github.com/user-attachments/assets/abfcb362-3764-45f6-97ff-301af16f6258" />
<img width="1280" alt="문제 페이지" src="https://github.com/user-attachments/assets/fc033c24-b436-411d-9b61-e44be296ef92" />
<img width="1280" alt="점수판" src="https://github.com/user-attachments/assets/6ac41d87-e109-4e90-862a-9d4e65dd2ac7" />
<img width="1280" alt="점수판 그래프" src="https://github.com/user-attachments/assets/84880f87-8a53-441d-b497-63f172c721a5" />

<br>
