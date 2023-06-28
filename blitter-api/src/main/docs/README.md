# Documentation for blitter

<a name="documentation-for-api-endpoints"></a>
## Documentation for API Endpoints

All URIs are relative to *http://localhost:8080/v2*

| Class | Method | HTTP request | Description |
|------------ | ------------- | ------------- | -------------|
| *AuthenticationApi* | [**authPost**](Apis/AuthenticationApi.md#authpost) | **POST** /auth | Returns the JWT once authenticated |
*AuthenticationApi* | [**logoutPost**](Apis/AuthenticationApi.md#logoutpost) | **POST** /logout | Logs user out of the server |
| *BleatsApi* | [**deleteBleat**](Apis/BleatsApi.md#deletebleat) | **DELETE** /bleats/{id} | Delete a bleat by id |
*BleatsApi* | [**getBleat**](Apis/BleatsApi.md#getbleat) | **GET** /bleats/{id} | Get a bleat by id |
*BleatsApi* | [**getBleatReplies**](Apis/BleatsApi.md#getbleatreplies) | **GET** /bleats/{id}/reply | Get a list of replies to a bleat by id |
*BleatsApi* | [**getBleats**](Apis/BleatsApi.md#getbleats) | **GET** /bleats | Get a list of bleats |
*BleatsApi* | [**postBleat**](Apis/BleatsApi.md#postbleat) | **POST** /bleats | Creates a new bleat |
*BleatsApi* | [**replyBleat**](Apis/BleatsApi.md#replybleat) | **POST** /bleats/{id}/reply | Post a reply to a bleat by id |
*BleatsApi* | [**updateBleat**](Apis/BleatsApi.md#updatebleat) | **PATCH** /bleats/{id} | Update a bleat by id |
| *FavouriteApi* | [**toggleLikeBleat**](Apis/FavouriteApi.md#togglelikebleat) | **POST** /bleats/{id}/toggleLike | Toggle the like for a bleat by id |
| *UsersApi* | [**createUser**](Apis/UsersApi.md#createuser) | **POST** /register | Creates a new user |
*UsersApi* | [**followUser**](Apis/UsersApi.md#followuser) | **POST** /users/{username}/follow | Follow a user |
*UsersApi* | [**getAuthor**](Apis/UsersApi.md#getauthor) | **GET** /users/{username} | returns a specific author |
*UsersApi* | [**getFollowingUsers**](Apis/UsersApi.md#getfollowingusers) | **GET** /users/{username}/following | Get list of users the user is following |
*UsersApi* | [**getSelf**](Apis/UsersApi.md#getself) | **GET** /users | returns the current user |
*UsersApi* | [**unfollowUser**](Apis/UsersApi.md#unfollowuser) | **POST** /users/{username}/unfollow | Unfollow a user |
*UsersApi* | [**usersUsernameBleatsGet**](Apis/UsersApi.md#usersusernamebleatsget) | **GET** /users/{username}/bleats | Get a list of bleats posted by user |
*UsersApi* | [**usersUsernameLikedGet**](Apis/UsersApi.md#usersusernamelikedget) | **GET** /users/{username}/liked | Get a list of bleats liked by user |


<a name="documentation-for-models"></a>
## Documentation for Models

 - [AuthorRes](./Models/AuthorRes.md)
 - [BleatReq](./Models/BleatReq.md)
 - [BleatRes](./Models/BleatRes.md)
 - [RegisterReq](./Models/RegisterReq.md)
 - [_auth_post_200_response](./Models/_auth_post_200_response.md)
 - [getBleats_200_response](./Models/getBleats_200_response.md)
 - [toggleLikeBleat_200_response](./Models/toggleLikeBleat_200_response.md)


<a name="documentation-for-authorization"></a>
## Documentation for Authorization

<a name="blitterBasicAuth"></a>
### blitterBasicAuth

- **Type**: HTTP basic authentication

<a name="blitterBearerAuth"></a>
### blitterBearerAuth

- **Type**: HTTP basic authentication

