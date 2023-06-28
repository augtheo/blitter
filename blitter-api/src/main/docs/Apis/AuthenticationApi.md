# AuthenticationApi

All URIs are relative to *http://localhost:8080/v2*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**authPost**](AuthenticationApi.md#authPost) | **POST** /auth | Returns the JWT once authenticated |
| [**logoutPost**](AuthenticationApi.md#logoutPost) | **POST** /logout | Logs user out of the server |


<a name="authPost"></a>
# **authPost**
> _auth_post_200_response authPost()

Returns the JWT once authenticated

### Parameters
This endpoint does not need any parameter.

### Return type

[**_auth_post_200_response**](../Models/_auth_post_200_response.md)

### Authorization

[blitterBasicAuth](../README.md#blitterBasicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="logoutPost"></a>
# **logoutPost**
> logoutPost()

Logs user out of the server

    JWT is invalidated

### Parameters
This endpoint does not need any parameter.

### Return type

null (empty response body)

### Authorization

[blitterBearerAuth](../README.md#blitterBearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined

