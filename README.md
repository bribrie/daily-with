## Daily work with Daily With!
```
📍 직원과 직원 업무, 매출 관리와 분석까지 할 수 있는 실제 피트니스 센터에서 사용하고 있는 인포 시스템
```

실제로 사용해보고 싶다면 
[Daily With](https://daily-with-d2d4f.web.app/)에서 로그인 후 이용해보세요!


</br>

## 서비스 미리보기
간단한 시연 영상이니 직접 사용해보시는 걸 추천해 드립니다.


</br>

### 1. 로그인

![로그인, 구글 로그인-정보 없는 버전](https://user-images.githubusercontent.com/75575789/213299618-f3b1efd5-1ea9-4230-b1dd-e1b39852d977.gif)
* 이메일과 비밀번호로 회원가입 후 일반 로그인 또는 구글 로그인 가능
* 센터 이름은 company 페이지에서 변경 가능

</br>

### 2. Dashboard
![notice](https://user-images.githubusercontent.com/75575789/213364363-1e96d906-6568-4aa3-9213-1954d5f825cb.gif)

* 오늘 날짜를 최상단에 보여주며, 당월에 입력된 매출 데이터를 시각화해주는 페이지므로 데이터가 없다면 등록하기 버튼들을 보여줌
* **등록 수 분석:** 
  * 오늘 등록 회원, 당월 헬스 총등록 수, 당월 신규등록/재등록 수와 총등록 수 대비 신규/재등록 수 비율을 순서대로 보여줌
  * 비율은 차트로 한눈에 확인 가능
* **당월 일별 매출:** 당월 총매출을 일자별로 막대그래프를 통해 한눈에 확인 가능
* **이번 달 목표 달성률:** 당월 헬스 목표 달성률을 원그래프를 통해 확인 가능
* **당월 공지사항:** 당월 공지사항 등록/삭제/순서 변경 가능
* **시간별 직원 업무 리스트 확인:** 등록된 업무 리스트를 시간에 맞게 변경되어 해당 시간 업무 바로 확인 가능

</br>
</br>

### 3. Task
![task](https://user-images.githubusercontent.com/75575789/213546033-7111494f-1fd5-408e-8ec7-18dc54b42afe.gif)

* 인포메이션 직원 업무 리스트 등록/수정/삭제
* 요일 또는 특정 날짜로 입력 가능
* 담당 시간별로 입력 가능

</br>
</br>

### 4. Member
![member](https://user-images.githubusercontent.com/75575789/213368579-483b8d7e-3482-4e87-836a-611c44f23536.gif)

* 직원 정보 등록/수정/삭제
  * 근무일, 입사일 등의 정보와 구분하기 쉽게 대표 색상 설정 가능
* 직원 이름으로 검색 가능

</br>
</br>

### 5. Price
![price](https://user-images.githubusercontent.com/75575789/213369531-ffdaf3d4-79a9-4706-95db-b7bff8eb3628.gif)

* 이용권 정보 등록/수정/삭제
  * 이벤트 유/무, 기간/횟수제 등 선택 가능 
* 이용권 이름으로 검색 가능

</br>
</br>

### 6. Sales
#### 6-1. 일별 매출
![sales](https://user-images.githubusercontent.com/75575789/213384001-f0bd9dc3-c18c-4428-b6f5-ebd203c0d999.gif)
* 일별 매출 등록/수정/삭제
* 이번 달 또는 전체 기간으로 필터링 가능
* 일별 총매출 dashboard에서 확인 가능
</br>

#### 6-2. 월별 목표 매출
  ![target](https://user-images.githubusercontent.com/75575789/213372315-28134428-858f-45bc-83a3-5f277e5cff40.gif)
  * 월별 목표 매출 등록/수정/삭제
  * 종목 필터별로 확인 가능
  * 헬스 목표 달성률을 dashboard에서 확인 가능
</br>

#### 6-3. 일별 방문 경로
![visit](https://user-images.githubusercontent.com/75575789/213377594-b31e2ae1-3be5-4ff7-a617-5f941c27ba36.gif)
* 일별 방문 기록 등록/수정/삭제 
* 이번 달 또는 전체 기간으로 필터링 가능
</br>
</br>

### 7. Company
![company](https://user-images.githubusercontent.com/75575789/213524099-e978a4d6-24b0-440b-976a-940973016219.gif)
* 센터 이름을 포함한 회사 정보 입력/수정 가능
* 연계 사이트 입력 시 (올바른 url형식인지 확인), 해당 사이트 이동 가능

</br>

### 8. DeskTop/Tablet/Mobile
* Tablet과 Mobile 레이아웃
#### 8-1. Tablet
![Tablet](https://user-images.githubusercontent.com/75575789/213547194-dc3821d9-100e-460e-a884-0b6f79e1ec91.gif)

#### 8-2. Mobile
![Mobile](https://user-images.githubusercontent.com/75575789/213547254-ed90541a-1219-44b1-be71-99623d746c4d.gif)
</br>
</br>

## 스택
* Typescript
* React
  * react-beautiful-dnd
* Redux
  * redux-toolkit
  * redux-persist
* D3
* Firebase
  * authentication
  * firestore
  * storage
  * hosting
* SCSS
