# MYSQL Cheet Sheet
## Data type
### 문자
|data type|저장가능한양|특징|
|---|---|---|
|CHAR|0~255자|CHAR(숫자)로 최대용량 지정가능, 몇자를 저장해도 지정용량만큼 차지|
|**VARCHAR**|0~65535자|VARCHAR(숫자)로 최대용량 지정가능, 실제넣은 글자 + 1byte 차지(256자 이상이면 + 2byte)|
|TEXT|0~65535자||
|TINYTEXT|0~255자||
|MEDIUMTEXT|0~1600만자||
|LONGTEXT|0~42억자||

### 숫자
|data type|저장가능한양|특징|
|---|---|---|
|SMALLINT|-32768 ~ 32767||
|MEDIUMINT|-838만 ~ 838만||
|**INT**|-21억 ~ 21억||
|**BIGINT**|-900경 ~ 900경||
|FLOAT|-10^38 ~ 10^38|소수점 7자리까지 저장가능 (약간의 오차발생함)|
|DOUBLE|-10^308 ~ 10^308|소수점 14자리까지 저장가능 (약간의 오차발생함)|
|**DECIMAL**|소수점 30자리 포함 최대 65자리|오차없이 소수점 저장 가능|

>음수를 지정하고 싶지 않으면 column 만들때 unsigned 옵션 추가
>> ex) SMALLINT의 경우 0 ~ 65535 까지 저장가능함

> 넣는 숫자가 커진다고 DB용량을 더 차지 하지 않음
>> INT는 4byte, SMALLINT는 2byte, BIGINT는 8byte

### 날짜&시간
|data type|저장가능한양|특징|
|---|---|---|
|DATE|1000년 ~ 9999년|YYYY-MM-DD 형식으로 날짜저장 가능|
|TIME|-839 ~ +838시간|HH:MM:SS 형식으로 시간의 양 저장 가능|
|**DATETIME**|1000년 ~ 9999년|YYYY-MM-DD HH:MM:SS 형식으로 날짜 & 시간 저장가능|
|TIMESTAMP|1970년 ~ 2038년|YYYY-MM-DD HH:MM:SS 형식으로 날짜 & 시간 저장가능한데 보통 안씀|

## SELECT
### 테이블의 모든 컬럼 출력
```SQL
SELECT * FROM 테이블명
```
### 테이블의 특정 컬럼 출력
```SQL
SELECT 컬럼명 FROM 테이블명
```
### 테이블의 특정 컬럼 여러개 출력
```SQL
SELECT 컬럼명1, 컬럼명2 FROM 테이블명
```
> 출력이 안될때 -> 테이블명 대신 데이터베이스명.테이블명

## ORDER BY
### 정렬 (오름차순 -> ASC(default 생략가능), 내림차순 -> DESC)
```SQL
SELECT * FROM 테이블명 ORDER BY 컬럼명 ASC;
```
### 여러개 정렬
```SQL
SELECT * FROM 테이블명 ORDER BY 컬럼명1 ASC, 컬럼명2 ASC;
```
> 컬럼명 대신 몇번째 컬럼인지 숫자로 작성 가능

## WHERE
### 조건에 맞는 컬럼 출력
```SQL
SELECT 컬럼명 FROM 테이블명 WHERE 조건식
```
> 조건식에는 >, <, =, !=, >=, <= 사용가능
### X이상 & Y이하
```SQL
SELECT 컬럼명 FROM 테이블명 WHERE 컬럼명 BETWEEN X AND Y
```
### 조건식이 2개이상 필요한 경우
```SQL
SELECT * FROM 테이블명 WHERE 조건식1 {AND|OR|NOR} 조건식2
```
> AND -> 조건이 전부 맞으면
> OR -> 조건중 하나 이상 맞으면
> NOR -> 해당 조건 제외
### 괄호안에 있는 식을 먼저 연산
```SQL
SELECT * FROM 테이블명 WHERE (조건식1 {AND|OR|NOR} 조건식2) {AND|OR|NOR} 조건식3
```
### OR 여러개 -> IN()
```SQL
SELECT * FROM 테이블명 WHERE 컬럼명 = '값1' OR 컬럼명 = '값2' OR 컬럼명 = '값3'
```
```SQL
SELECT * FROM 테이블명 WHERE 컬럼명 IN ('값1', '값2', '값3')
```
> 같은 컬럼명일때만 사용가능  
  OR여러개를 IN ()으로 축약가능하면 하는게 좋음 (처리속도 빠름)

## LIKE
### '값' 찾을때
```SQL
SELECT * FROM 테이블명 WHERE 컬럼명 LIKE '값'
```
### '값' 포함찾을때
```SQL
SELECT * FROM 테이블명 WHERE 컬럼명 LIKE '%값%'
```
### '값' 으로 시작하는 문자열 찾을때
```SQL
SELECT * FROM 테이블명 WHERE 컬럼명 LIKE '값%'
```
### '값' 으로 끝나는 문자열 찾을때
```SQL
SELECT * FROM 테이블명 WHERE 컬럼명 LIKE '%값'
```
> 문자겁색 문법이므로 문자가 저장된 컬럼에서만 검색 가능  
  CHAR(6) 데이터타입의 경우 총6자를 저장할 수 있는데 4자만 입력해도 나머지 뒷부분 2자를 공백으로 채움  
  '가죽소파'를 저장하면 '가죽소파  ' 이렇게 저장되므로 '%소파'로 찾을 수 없음

> % 대신 _ 사용 가능  
> % 글자수 제한 없음 (0 이상)  
> _ 1글자

## 집계함수
### 해당 컬럼의 최댓값이 들어 있는 행만 출력할 때
```SQL
SELECT MAX(컬럼명) FROM 테이블명
```
### 해당 컬럼의 최솟값이 들어 있는 행만 출력할 때
```SQL
SELECT MIN(컬럼명) FROM 테이블명
```
### 해당 컬럼의 평균값 출력
```SQL
SELECT AVG(컬럼명) FROM 테이블명
```
### 해당 컬럼의 합 출력
```SQL
SELECT SUM(컬럼명) FROM 테이블명
```
### 행의 갯수
```SQL
SELECT COUNT(*) FROM 테이블명
```

### 컬럼명 바꾸고 싶으면 AS() (alias)
```SQL
SELECT MAX(컬럼명) AS 바꾸려는컬럼명 FROM 테이블명
```
### 필터링 이후의 통계
```SQL
SELECT AVG(컬럼명) FROM 테이블명 WHERE 조건식
```
### 중복값 제거
```SQL
SELECT AVG(DISTINCT 컬럼명) FROM 테이블명
```
### 출력되는 행 갯수의 제한 (1)
```SQL
SELECT * FROM 테이블명 ORDER BY 컬럼명 DESC LIMIT 1;
```

## 컬럼에 사칙연산 넣기
### 컬럼에 0.9 곱하기
```SQL
SELECT 컬럼명 * 0.9 FROM 테이블명
```
### 컬럼1에 0.9 곱하고 이름 바꾸기, 컬럼2에 100 더하기
```SQL
SELECT 컬럼명1 * 0.9 AS 바꾸려는컬럼명, 컬럼명2 + 100 FROM 테이블명
```
### 컬럼끼리 연산
```SQL
SELECT 컬럼명1 / 컬럼명2 FROM 테이블명
```
> 사칙연산은 숫자가 들어있는 컬럼만 가능

### 컬럼끼리 문자열 합치기
```SQL
SELECT CONCAT(컬럼명1, 컬럼명2) FROM 테이블명
```
### 컬럼끼리 문자열 합치기, 직접입력 문자 추가 (숫자입력해도 문자열로 합침)
```SQL
SELECT CONCAT(컬럼명1, ' is ', 컬럼명2) FROM 테이블명
```
### 문자 공백제거
```SQL
SELECT TRIM(컬럼명) FROM 테이블명
```
### 특정문자열 변경
```SQL
SELECT REPLACE(문자열, 찾을문자, 변경할문자)
```
### 원하는문자 뽑아내기
```SQL
SELECT SUBSTR(문자열, 시작위치, 몇개)
```
### 문자의일부를 다른단어로 교체
```SQL
SELECT INSERT(문자열, 시작위치, 몇개, 변경할문자열)
```
### 맨 뒤의 X자리 문자 출력
```SQL
SELECT RIGHT(문자열, x) from 테이블명
```

## 숫자 조작 함수
### 여러 숫자들 중 최댓값
```SQL
SELECT GREATEST(1,65,3,4,2)
```
### 여러 숫자들 중 최솟값
```SQL
SELECT LEAST(1,65,3,4,2)
```
> MAX(), MIN()은 하나의 컬럼 안에서 최대, 최소 1개 출력  
  GREATEST(), LEAST()은 하나의 행이나 숫자배열 안에서 최대, 최소 출력

### 소수 올림
```SQL
SELECT CEIL(10.1)
```
### 소수 내림
```SQL
SELECT FLOOR(10.1)
```
### 소수 반올림 (입력 자릿수까지)
```SQL
SELECT FLOOR(소수, 자릿수)
```
### 소수 내림 (입력 자릿수까지)
```SQL
SELECT TRUNCATE(소수, 자릿수)
```
### 거듭제곱
```SQL
SELECT POWER(숫자, 제곱)
```
### 절대값 출력
```SQL
SELECT ABS(숫자)
```

## 서브쿼리
### ex) 평균값 구하고
```SQL
SELECT AVG(컬럼명) FROM 테이블명
```
### ex) 평균보다 높은것만 출력
```SQL
SELECT * FROM 테이블명 WHERE 컬럼명 > 위에서구한평균
```
### 위의 2개를 합치면
```SQL
SELECT * FROM 테이블명 WHERE 컬럼명 > 
  (SELECT AVG(컬럼명) FROM 테이블명)
```
> 문자나 숫자 들어갈 곳에 서브쿼리를 대신 넣을수 있다.  
> 1개의 숫자, 문자를 출력하는 SELECT문만 서브쿼리로 넣을 수 있음
> 서브쿼리에 ()필수

### 컬럼명 자리에 서브쿼리
```SQL
SELECT 컬럼명, (1개만 출력하는 SELECT문) FROM 테이블명
```
### 컬럼명 자리에 숫자 문자 넣으면 그대로 출력
```SQL
SELECT 컬럼명, '낄낄' FROM 테이블명
```
### 컬럼명 자리에 숫자 문자 대신 서브쿼리 사용
```SQL
SELECT 컬럼명, (SELECT AVG(컬럼명) FROM 테이블명) FROM 테이블명
```
### IN() 에서는 여러개 출력하는 SELECT문 사용가능 (예외)
```SQL
SELECT 컬럼명 FROM 테이블명 WHERE 컬럼명 IN ('값1', '값2', '값3')
```
```SQL
SELECT 컬럼명 FROM 테이블명 WHERE 컬럼명 IN (SELECT 컬럼명 FROM 테이블명)
```

## 그룹통계
### GROUP BY
```SQL
SELECT 컬럼명 FROM 테이블명 GROUP BY 컬럼명
```
### 각 카테고리 별로 COUNT 출럭 (GROUP BY 는 주로 통계함수와 사용)
```SQL
SELECT 컬럼명, COUNT(컬럼명2) FROM 테이블명 GROUP BY 컬럼명
```
### HAVING
```SQL
SELECT 컬럼명 FROM 테이블명 GROUP BY 컬럼명 HAVING 조건식
```
> HAVING vs WHERE  
> HAVING은 GROUP BY 결과를 필터링하고 싶을 때 사용 (GROUP BY 에만 사용 가능)  
> WHERE는 테이블 전체 데이터 출력시 필터링 하고 싶을때 (SELECT FROM 에만 사용 가능)

## 조건문
### IF ()
```SQL
SELECT 컬럼명1, 컬럼명2, IF(조건식, true일때 값, false일때 값) FROM 테이블명
```
### CASE ()
```SQL
SELECT 컬럼명1, 컬럼명2,

CASE
  WHEN 조건식1 THEN 조건식1이 true일때 값,
  WHEN 조건식2 THEN 조건식2이 true일때 값,
  WHEN 조건식3 THEN 조건식3이 true일때 값,
  ELSE 모두 false일때 값,
END

FROM 테이블명
```

## DDL
### 데이터베이스 생성
```SQL
CREATE DATABASE 데이터베이스명
```
### 데이터베이스 삭제
```SQL
DROP DATABASE 데이터베이스명
```
> 삭제시 되돌릴 수 없음
### 테이블 생성
```SQL
CREATE TABLE 테이블명 {
  컬럼명1 데이터타입,
  컬럼명2 데이터타입 DEFAULT 기본값으로 사용할 숫자, 문자,
  컬럼명3 데이터타입
}
```
> 맨 마지막줄에는 , 사용하지 않음
### 테이블 삭제
```SQL
DROP TABLE 테이블명
```
> 삭제시 되돌릴 수 없음
### 컬럼 생성
```SQL
ALTER TABLE 테이블명 ADD 컬럼명 데이터타입
```
### 컬럼 변경
```SQL
ALTER TABLE 테이블명 MODIFY COLUMN 컬럼명 데이터타입
```
### 컬럼 삭제
```SQL
ALTER TABLE 테이블명 DROP COLUMN 컬럼명 데이터타입
```

## 테이블 제약사항
### NOT NULL (빈값 금지)
```SQL
CREATE TABLE 테이블명 {
  컬럼명 데이터타입 NOT NULL
}
```
### UNIQUE (같은값 금지)
```SQL
CREATE TABLE 테이블명 {
  컬럼명 데이터타입 UNIQUE
}
```
### UNIQUE (컬럼명1, 컬럼명2 전부 같아야 금지가능)
```SQL
CREATE TABLE 테이블명 {
  컬럼명1 데이터타입,
  컬럼명2 데이터타입,
  UNIQUE(컬럼명1, 컬럼명2)
}
```
### CHECK()
```SQL
CREATE TABLE 테이블명 {
  컬럼명1 데이터타입 CHECK(조건식)
}
```
### PRIMARY KEY (NOT NULL, UNIQUE 자동 부여)
```SQL
CREATE TABLE 테이블명 {
  컬럼명1 데이터타입 PRIMARY KEY
}
```
### AUTO_INCREMEMT (주로 PRIMARY KEY 와 같이 사용)
```SQL
CREATE TABLE 테이블명 {
  컬럼명1 데이터타입 AUTO_INCREMEMT PRIMARY KEY
}
```
### CONSTRAINT()
```SQL
CREATE TABLE 테이블명 {
  컬럼명1 데이터타입,
  컬럼명2 데이터타입,
  컬럼명3 데이터타입,
  컬럼명4 데이터타입,
  컬럼명5 데이터타입,
  PRIMARY KEY (컬럼명1),
  CHECK(조건식)
}
```
```SQL
CREATE TABLE 테이블명 {
  컬럼명1 데이터타입,
  컬럼명2 데이터타입,
  컬럼명3 데이터타입,
  컬럼명4 데이터타입,
  컬럼명5 데이터타입,
  CONSTRAINT 제약조건명1 PRIMARY KEY (컬럼명1),
  CONSTRAINT 제약조건명2 CHECK(조건식)
}
```
> CONSTRAINT 을 사용하면 디바깅에 용이
### 이미 있는 컬럼에 제약사항 추가
```SQL
ALTER TABLE 테이블명 MODIFY 컬럼명 데이터타입 제약사항
```

## 정규형
### 1NF
하나의 셀 안에는 하나의 데이터만 보관
### 2NF
현재 테이블의 주제와 관련없는 컬럼은 다른 테이블로 옮긴다.  
1NF테이블에서 partial dependency를 제거한 테이블  
1. composite primary key는 하나의 컬럼만으로 primary key를 정할수 없는 경우에 2개 컬럼을 합해서 primary key 로 사용하는것
2. composite primary key중에 하나의 컬럼에만 종속되어 있는 컬럼을 partial dependency가 있다고 한다
3. partial dependency가 있는 컬럼을 다른 테이블로 빼면 제2정규형 테이블 완성
4. 종속관계 판단이 어렵다면 하나의 컬럼을 다른 값으로 바꿨을때, 다른 컬럼도 변경되어야 한다면 그 관계를 종속관계라고 한다.
### 3NF
제2정규형을 만족하는 테이블에서 primary key 또는 composite primary key 컬럼에 종속된게 아닌 컬럼에 종속된 컬럼을 다른 테이블로 빼는것
2NF테이블에서 transitive dependency를 제거한 테이블
1. composite primary key 또는 primary key 역할을 하는 컬럼이 있고
2. 거기에 직접 종속된 컬럼A가 있고
3. 또 거기에 직접 종속된 컬럼B가 있으면 컬럼B가 transitive dependency가 있다고 표현
4. 컬럼B를 다른 테이블로 옮기면 제3정규형 테이블 완성
> primarykey, foreign key 항상 넣으면 좋다

### foreign key 등록
```SQL
CREATE TABLE 테이블명 {
  컬럼명4 데이터타입 REFERENCES 다른테이블(다른테이블컬럼)
}
```
```SQL
CREATE TABLE 테이블명 {
  컬럼명4 데이터타입,
  CONSTRAINT 제약조건명 FOREIGN KEY (컬럼명4) REFERENCES 다른테이블(다른테이블컬럼)
}
```

### foreign key 수정
```SQL
ALTER TABLE 테이블명 ADD
CONSTRAINT 제약조건명 FOREIGN KEY (컬럼명4) REFERENCES 다른테이블(다른테이블컬럼)
```

## INNER JOIN
### 테이블 2개 합쳐서 출력 (CROSS JOIN)
```SQL
SELECT 컬럼명1, 컬럼명2, 컬럼명3 FROM 테이블명1, 테이블명2 WHERE 테이블명1.컬럼명 = 테이블명2.컬럼명
```
> 가능한 모든조합을 시도해서 행을 구성후 전부 출력함 (WHERE로 필터링 가능)
### INNER JOIN 사용
```SQL
SELECT 출력할컬럼들 FROM 테이블명1 INNER JOIN 테이블명2 ON 조건식
```
> ON에
### 출력할 테이블이 3개 이상인 경우
```SQL
SELECT 출력할컬럼들 FROM 테이블명1 INNER JOIN 테이블명2 ON 조건식 INNER JOIN 테이블명3 ON 조건식2
```
### CROSS JOIN
```SQL
SELECT 출력할컬럼들 FROM 테이블명1 CROSS JOIN 테이블명2
```
> WHERE 없이 출력이나 ON 없이 출력과 같음

## JOIN
### LEFT JOIN (INNER JOIN 결과 + 왼쪽 테이블 모든행 출력)
```SQL
SELECT 출력할컬럼들 FROM 테이블명1 LEFT JOIN 테이블명2 ON 조건식
```
### RIGHT JOIN (INNER JOIN 결과 + 오른쪽 테이블 모든행 출력)
```SQL
SELECT 출력할컬럼들 FROM 테이블명1 RIGHT JOIN 테이블명2 ON 조건식
```
> LEFT/RIGHT JOIN은 테이블끼리 합틸때 NULL이 발생하는 부분을 미리 찾아볼때 사용하는 경우가 많다  
> ```SQL
> SELECT 출력할컬럼들 FROM 테이블명1 RIGHT JOIN 테이블명2 ON 조건식 WHERE 컬럼명 IS NULL
> ```

## CRUD
### INSERT
```SQL
INSERT INFO 테이블명 (컬럼명1, 컬럼명2, ...) VALUES ('값1', '값2', ...)
```
### 모든컬럼에 빠짐없이 INSERT
```SQL
INSERT INFO 테이블명 VALUES ('값1', '값2', ...)
```
### 여러행 동시에 INSERT
```SQL
INSERT INFO 테이블명 (컬럼명1, 컬럼명2, ...) VALUES ('값1', '값2', ...), ('값1', '값2', ...);
```
### 다른 테이블에 있는 데이터 복사 가능
```SQL
INSERT INFO 테이블명 SELECT 컬럼명 FROM 테이블명
```
### 다른 테이블에 있는 데이터 복사 가능2 (MYSQL)
```SQL
CREATE TABLE 새로운테이블명 SELECT * FROM 기존테이블명
```
### 임시테이블에 다른 테이블에 있는 데이터 복사 가능 (MYSQL)
```SQL
CREATE TEMPORARY TABLE 새로운테이블명 SELECT * FROM 기존테이블명
```
### UPDATE
```SQL
UPDATE 테이블명 SET 컬럼명1 = '값1', 컬럼명2 = '값2' WHERE 조건식
```
### DELETE
```SQL
DELETE FROM 테이블명 WHERE 조건식
```
### JOIN & UPDATE
```SQL
UPDATE 테이블명1 INNER JOIN 테이블명2 ON 조건식
SET 수정할 내용 WHERE 조건식
```
### JOIN & DELETE
```SQL
DELETE 테이블명1
FROM 테이블명1 INNER JOIN 테이블명2 ON 조건식

WHERE 조건식
```
> DELETE 우즉에 삭제할 테이블을 지정해주어야 함

## SELECT 결과를 위아래로 합칠때 UNION
### UNION
```SQL
SELECT * FROM 테이블명1 WHERE 조건식
UNION
SELECT * FROM 테이블명2 WHERE 조건식
```
> UNION은 컬럼갯수 다르면 에러
> 컬럼 갯수만 맞으면 출력 가능 하지만 서로 동일한 데이터 타입을 가진 컬럼을 출력하는게 좋음
### UNION ALL (중복제거 없이 사용할 때)
```SQL
SELECT * FROM 테이블명1 WHERE 조건식
UNION ALL
SELECT * FROM 테이블명2 WHERE 조건식
```

## VIEW
### VIEW 생성
```SQL
CREATE VIEW 뷰이름 AS SELECT 출력할컬럼명... FROM 테이블명
```
> view 쓰는 이유
> 1. 복잡하게 JOIN해둔 테이블들을 하나의 테이블 또는 view 로 만들어두면 재사용성 증가
> 2. view 는 실제 테이블이 아니기 때문에 용량을 많이 차지하지 않음
> 3. table에 컬럼변경이 필요할때 view 를 만들어서 먼저 실행해 볼 수 있음
> 4. view 안에서 SELECT 해서 view 만들수 있으나 너무 많은 중첩 금지
> 실제로 테이블이 생성되는것은 아님

## PROCEDURE
### stored procedure
```SQL
DROP PROCEDURE IF EXISTS 데이터베이스명.프로시저명;

DELIMITER $$
$$
CREATE PROCEDURE 데이터베이스명.프로시저명()
BEGIN
  query
END
$$
DELIMITER ;
```
### parameter 사용
```SQL
CREATE PROCEDURE 데이터베이스명.프로시저명(파라미터명1 datatype, 파라미터명2 datatype)
BEGIN
  SELECT * FROM 테이블명 WHERE 컬럼명 > 파라미터명1
END
```
```SQL
CALL 프로시저명(arg, arg2)
```
### OUT parameter
```SQL
CREATE PROCEDURE 데이터베이스명.프로시저명(OUT 파라미터명1 INT)
BEGIN
  SET 파라미터명1 = 20;
END
```
```SQL
CALL 프로시저명(@변수명)
SELECT @변수명; // 20
```

## 변수
```SQL
SET @변수명 = '값';
SET @변수명 := '값';
SELECT @변수명 := '값';
```
### PROCEDURE 에서 변수 생성
```SQL
CREATE PROCEDURE 데이터베이스명.프로시저명()
BEGIN
  DECLARE 변수1 datatype;
  DECLARE 변수2 datatype;
  DECLARE 변수3 datatype DEFAULT 기본값;
END
```
### PROCEDURE 에서 변수값 변경
```SQL
CREATE PROCEDURE 데이터베이스명.프로시저명()
BEGIN
  DECLARE 변수1 INT;
  SET 변수1 = 10;
  SET 변수1 = 변수1 + 1;
  SELECT 변수1;
END
```
> DECLAER 변수 vs @변수 차이
> @변수는 user variable이라고 부르는데, 한번 만들어놓으면 DBMS 종료때까지 남아 있음.  
> 그리고 작성하는 SQL파일 모든 곳에서 전역으로 사용가능 함  
> DECLARE 변수는 변수를 만든 procedure 내부에서만 사용가능
> procedure 종료시 바로 사라짐

## 날짜&시간
### DATETIME 컬럼 가져오기
```SQL
SELECT * FROM 테이블명 WHERE 컬럼명 > '2023-03-10 08:08:08'
SELECT * FROM 테이블명 WHERE 컬럼명 = '2023-03-10 08:08:08'
```
### 원하는 날짜의 모든 행 가져오기
```SQL
SELECT * FROM 테이블명 WHERE 컬럼명 >= '2023-03-10 00:00:00' AND WHERE 컬럼명 < '2023-03-11 00:00:00'
```
```SQL
SELECT * FROM 테이블명 WHERE 컬럼명 BETWEEN '2023-03-10 00:00:00' AND '2023-03-11 00:00:00'
```
> 시간을 ms 단위까지 저장하기 때문에 BETWEEN을 사용하면 빵꾸날수 있음  
> 부등호는 컬럼명 < '2023-03-10' 처럼 시간 사용하지 않아도 됨
### 2022년 3월 10일부터 현재 시간까지 발행된 글 출력
```SQL
SELECT * FROM 테이블명 WHERE 컬럼명 > '2022-03-10 00:00:00' AND 컬럼명 <= now()
```
> now(6) 이면 현재 날짜/시간을 초단위 소수점 6자리까지 알려둠  
> curdate() 시간없이 현재날짜만  
> date() 는 DATETIME -> DATE로 형식 변경됨, index를 쓸수 없는 방법이라 느릴수 있음
### 날짜 포맷 바꾸기
```SQL
SELECT date_format(now(), '%Y년 %d일이고 %m일입니다.')
```
### 새로운 행에 날짜 입력
```SQL
INSERT INTO 테이블명 VALUES('2020-01-01 00:00:00')
```

## FUNCTION
### FUNCTION 생성
```SQL
DROP PROCEDURE IF EXISTS 데이터베이스명.프로시저명;

DELIMITER $$
$$
CREATE FUNCTION 데이터베이스명.함수명(파라미터명1 datatype)
RETURN datatype
BEGIN
  로직
  RETURN 반환값
END
$$
DELIMITER ;
```
> FUNCTION vs PROCEDURE  
> 계산기능을 만들었는데, 자주 재사용하고 싶을때는 FUNCTION  
> 긴 쿼리문을 자주 재사용하고 싶을 떄는 PROCEDURE
> FUNCTION은 RETURN 필수, PROCEDURE는 선택
> FUNCTION은 CALL없이 호출, PROCEDURE는 CALL로 호출
> FUNCTION은 자유롭게 사용, PROCEDURE는 쿼리문 중간에 갑자기 사용 불가능
------------------------------------------------------------------------------------------
# 테이블 언어설정
*ALTER TABLE a CONVERT TO CHARACTER SET utf8;*
