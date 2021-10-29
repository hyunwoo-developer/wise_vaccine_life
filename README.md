# wise_vaccine_life

![node_badge](https://img.shields.io/badge/node-v14.17.5-brightgreen)
![npm_badge](https://img.shields.io/badge/npm-v7.24.1-blue)

<img width="1366" alt="슬기로운 백신생활 2021-10-11 17-59-45" src="https://user-images.githubusercontent.com/86070069/136762866-01dbc19d-31fd-4a89-84da-c807dd0cecca.png">

# About the project
백신 1차 접종을 맞고 부작용을 겪은 후에 접종 맞은 사람들끼리 후기나 Tip 들을 공유하는 SNS 플랫폼이 있었으면 정보를 받아 어쩌면 부작용을 최소화 할수 있지 않았을까 라는 생각으로부터 시작하게 된 프로젝트 입니다.

슬기로운 백신생활 백신 접종 후기 SNS 플랫폼 - MERN Stack Project (프로젝트 기간: 7일)

API 명세서 : https://github.com/hyunwoo-developer/wise_vaccine_life/wiki

# Prerequisite
### Backend
- mongoose 
- cors 
- elasticsearch 
- multer 
- multer-s3 
- jsonwebtoken 
- aws-sdk

### Frontend
- styled-components 
- axios 
- react-router-dom 
- styled-reset 
- react-icons 
- quill 
- react-quill 
- react-loading 
- dayjs 
- redux 
- react-redux
- react-toasts 
- react-dropdown 
- react-calendar

```node_module의 react-dropdown에서 key 설정을 해주어야 합니다.```

# Snapshots

![React App 2021-10-15 23-32-16](https://user-images.githubusercontent.com/86070069/137505054-a3b3ab1c-5508-4818-8da0-bd8bda4bc864.png)
![React App 2021-10-15 23-32-32](https://user-images.githubusercontent.com/86070069/137505076-ec369787-b082-4d09-a0e1-de464d58eab0.png)
![React App 2021-10-15 23-33-26](https://user-images.githubusercontent.com/86070069/137505095-13081781-c8dc-41ed-b4c3-0ef7744ce46e.png)
![React App 2021-10-15 23-33-39](https://user-images.githubusercontent.com/86070069/137505119-d75f2533-4ad4-42a7-a22f-c892f39cd6a3.png)
![React App 2021-10-15 23-34-35](https://user-images.githubusercontent.com/86070069/137505130-3e795002-69bd-4772-8178-e08a7f438a11.png)
![React App 2021-10-15 23-35-15](https://user-images.githubusercontent.com/86070069/137505144-25c98169-4fa7-4271-b60c-3a7190fa2f61.png)

# Getting started

Mac OS 환경에서 개발되었습니다.

1. 백엔드 부터 ```npm install```
2. config 폴더 생성 후 awsConfig.json, dbConfig.json, jwtSecret.json 파일을 설정해준다.
3. 백엔드 ``` npm run dev```
4. 프론트 ```yarn install```
5. 프론트 node_module의 react-dropdown의 파일의 내용을 깃헙 레포의 issues에 첨부된 파일의 내용으로 변경
6. 프론트 ``` yarn start```
7. 정상 작동

