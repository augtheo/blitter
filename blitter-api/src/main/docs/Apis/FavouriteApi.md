# FavouriteApi

All URIs are relative to *http://localhost:8080*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**likeBleat**](FavouriteApi.md#likeBleat) | **POST** /bleats/{id}/like | Like bleat by id |
| [**toggleLikeBleat**](FavouriteApi.md#toggleLikeBleat) | **POST** /bleats/{id}/toggleLike | Toggle the like for a bleat by id |
| [**unlikeBleat**](FavouriteApi.md#unlikeBleat) | **POST** /bleats/{id}/unlike | Unlike a bleat by id |


<a name="likeBleat"></a>
# **likeBleat**
> likeBleat(id)

Like bleat by id

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **id** | **Long**|  | [default to null] |

### Return type

null (empty response body)

### Authorization

[blitterBearerAuth](../README.md#blitterBearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined

<a name="toggleLikeBleat"></a>
# **toggleLikeBleat**
> toggleLikeBleat(id)

Toggle the like for a bleat by id

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **id** | **Long**|  | [default to null] |

### Return type

null (empty response body)

### Authorization

[blitterBearerAuth](../README.md#blitterBearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined

<a name="unlikeBleat"></a>
# **unlikeBleat**
> unlikeBleat(id)

Unlike a bleat by id

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **id** | **Long**|  | [default to null] |

### Return type

null (empty response body)

### Authorization

[blitterBearerAuth](../README.md#blitterBearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined

