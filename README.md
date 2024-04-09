

# Table of contents

1. [Introduction](#0000)
1. [Stack and libraries](#0001)
1. [Setup app](#0002)
1. Setup Social applications
    1. [Linkedin App](#0003)
1. [TODO](#0004)
1. [Missing](#0005)

## Introduction <a name="0000"></a>

<p>
  In essence, this web application enables users to publish articles on popular social networks such as Facebook and LinkedIn, while also retrieving metrics such as likes, shares, and comments for these articles
</p>

---

## Stack & libraries <a name="0001"></a>

### Frontend

- React
- React Query
- React-router-dom
- Axios
- Antd Design
- Shadcn/ui

### Backend

- nvm (node version management) => require node version 20
- Nodejs
- NestJS
- Mongoose
- ClassValidate (for validation input data)
- Passport (for authentication)
- JWT
- mockito (for unit test)

### Initial setup <a name="0002"></a>

```bash
cd frontend 
cp .env.example .env
yarn

cd backend
cp .env.example local.env
yarn
```

## Setup Social applications
### Linkedin App <a name="0003"></a>
  <ol>
    <li>
    Create new Linkedin App & Company
      <ul>
        <li>
          Add products
          <ul>
            <li>Share on Linkedin</li>
            <li>Sign In with Linkedin</li>
          </ul>
        </li>
        <li>
          Setup "Authorized redirect URLs for your app" for get access_token after successfully login by user
            <ul>
              <li>http://localhost:3000/linkedIn/authenticated (our frontend side)</li>
               <li>frontend using axios sending code and state to backend handle get **access_token**, **refresh_token**  and update database</li>
            </ul>
        </li>
      </ul>  
    </li>
    <li>
      After add products, set permissions, please set .env variable at <b>/backend/env/local.env</b>
      <ul>
        <li>
          LINKED_CLIENT_ID=app_client_id
        </li>
        <li>
          LINKED_CLIENT_SECRET=app_client_secret
        </li>
        <li>
          LINKED_IN_REDIRECT=http://localhost:4173/linkedIn/authenticated (Redirect to frontend)
        </li>
      </ul>  
    </li>
  </ol>
### Mainly ideas (For facebook)
#### Sign in process

### Mainly ideas (For Linkedin)
- Because Linkedin doesn't provide Javascript SDK to login, so Oauth2 sign-in process must be done by using backend, and receive **access_token**, **refresh_token** from Linkedin via assigned callback url on setup process
#### Posting process
- Use **access_token** to post thought this `/ugcPosts` endpoint, then save post_id to database to get like share comment later
#### Get like share comment
LinkedIn offers an endpoint to retrieve like, share, and comment counts. However, accessing this endpoint requires submitting your app for review to gain permissions for further access. As an alternative, we're currently crawling HTML from the following URL: https://linkedin-data-api.p.rapidapi.com/get-profile-post-and-comments to obtain like and share counts. It's important to note that while this link provides likes and shares counts, it doesn't include the share count.
### Thing to do <a name="0004"></a>
- Write more unit-test for posting process
- Linkedin: find out way to get shares in post
- Facebook: research and integration posting
- Implement sign out function app and linkedin, facebook
### Missing <a name="0005"></a>
- Integration posting for facebook, get reaction count
