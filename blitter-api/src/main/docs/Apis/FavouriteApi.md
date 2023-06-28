# FavouriteApi

All URIs are relative to *http://localhost:8080/v2*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**toggleLikeBleat**](FavouriteApi.md#toggleLikeBleat) | **POST** /bleats/{id}/toggleLike | Toggle the like for a bleat by id |


<a name="toggleLikeBleat"></a>
# **toggleLikeBleat**
> toggleLikeBleat_200_response toggleLikeBleat(id)

Toggle the like for a bleat by id

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **id** | **Long**|  | [default to null] |

### Return type

[**toggleLikeBleat_200_response**](../Models/toggleLikeBleat_200_response.md)

### Authorization

[blitterBearerAuth](../README.md#blitterBearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

