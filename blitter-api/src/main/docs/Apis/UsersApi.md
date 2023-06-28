# UsersApi

All URIs are relative to *http://localhost:8080/v2*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**createUser**](UsersApi.md#createUser) | **POST** /register | Creates a new user |
| [**followUser**](UsersApi.md#followUser) | **POST** /users/{username}/follow | Follow a user |
| [**getAuthor**](UsersApi.md#getAuthor) | **GET** /users/{username} |  |
| [**getFollowingUsers**](UsersApi.md#getFollowingUsers) | **GET** /users/{username}/following | Get list of users the user is following |
| [**getSelf**](UsersApi.md#getSelf) | **GET** /users |  |
| [**unfollowUser**](UsersApi.md#unfollowUser) | **POST** /users/{username}/unfollow | Unfollow a user |
| [**usersUsernameBleatsGet**](UsersApi.md#usersUsernameBleatsGet) | **GET** /users/{username}/bleats | Get a list of bleats posted by user |
| [**usersUsernameLikedGet**](UsersApi.md#usersUsernameLikedGet) | **GET** /users/{username}/liked | Get a list of bleats liked by user |


<a name="createUser"></a>
# **createUser**
> createUser(RegisterReq)

Creates a new user

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **RegisterReq** | [**RegisterReq**](../Models/RegisterReq.md)|  | |

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: Not defined

<a name="followUser"></a>
# **followUser**
> followUser(username)

Follow a user

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **username** | **String**|  | [default to null] |

### Return type

null (empty response body)

### Authorization

[blitterBearerAuth](../README.md#blitterBearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined

<a name="getAuthor"></a>
# **getAuthor**
> AuthorRes getAuthor(username)



    returns a specific author

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **username** | **String**|  | [default to null] |

### Return type

[**AuthorRes**](../Models/AuthorRes.md)

### Authorization

[blitterBearerAuth](../README.md#blitterBearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="getFollowingUsers"></a>
# **getFollowingUsers**
> List getFollowingUsers(username)

Get list of users the user is following

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **username** | **String**|  | [default to null] |

### Return type

[**List**](../Models/AuthorRes.md)

### Authorization

[blitterBearerAuth](../README.md#blitterBearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="getSelf"></a>
# **getSelf**
> AuthorRes getSelf()



    returns the current user

### Parameters
This endpoint does not need any parameter.

### Return type

[**AuthorRes**](../Models/AuthorRes.md)

### Authorization

[blitterBearerAuth](../README.md#blitterBearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="unfollowUser"></a>
# **unfollowUser**
> unfollowUser(username)

Unfollow a user

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **username** | **String**|  | [default to null] |

### Return type

null (empty response body)

### Authorization

[blitterBearerAuth](../README.md#blitterBearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined

<a name="usersUsernameBleatsGet"></a>
# **usersUsernameBleatsGet**
> List usersUsernameBleatsGet(username)

Get a list of bleats posted by user

    returns the list of  bleats by the author

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **username** | **String**|  | [default to null] |

### Return type

[**List**](../Models/BleatRes.md)

### Authorization

[blitterBearerAuth](../README.md#blitterBearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="usersUsernameLikedGet"></a>
# **usersUsernameLikedGet**
> List usersUsernameLikedGet(username)

Get a list of bleats liked by user

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **username** | **String**|  | [default to null] |

### Return type

[**List**](../Models/BleatRes.md)

### Authorization

[blitterBearerAuth](../README.md#blitterBearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

