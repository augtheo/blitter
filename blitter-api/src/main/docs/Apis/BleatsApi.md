# BleatsApi

All URIs are relative to *http://localhost:8080*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**deleteBleat**](BleatsApi.md#deleteBleat) | **DELETE** /bleats/{id} | Delete a bleat by id |
| [**getBleat**](BleatsApi.md#getBleat) | **GET** /bleats/{id} | Get a bleat by id |
| [**getBleatReplies**](BleatsApi.md#getBleatReplies) | **GET** /bleats/{id}/reply | Get a list of replies to a bleat by id |
| [**getBleats**](BleatsApi.md#getBleats) | **GET** /bleats | Get a list of bleats |
| [**postBleat**](BleatsApi.md#postBleat) | **POST** /bleats | Creates a new bleat |
| [**replyBleat**](BleatsApi.md#replyBleat) | **POST** /bleats/{id}/reply | Post a reply to a bleat by id |
| [**updateBleat**](BleatsApi.md#updateBleat) | **PATCH** /bleats/{id} | Update a bleat by id |


<a name="deleteBleat"></a>
# **deleteBleat**
> deleteBleat(id)

Delete a bleat by id

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **id** | **String**|  | [default to null] |

### Return type

null (empty response body)

### Authorization

[blitterBearerAuth](../README.md#blitterBearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined

<a name="getBleat"></a>
# **getBleat**
> BleatRes getBleat(id)

Get a bleat by id

    returns a bleat

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **id** | **Long**|  | [default to null] |

### Return type

[**BleatRes**](../Models/BleatRes.md)

### Authorization

[blitterBearerAuth](../README.md#blitterBearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="getBleatReplies"></a>
# **getBleatReplies**
> PaginatedBleats getBleatReplies(id, page, per\_page)

Get a list of replies to a bleat by id

    returns all the replies to this bleat

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **id** | **Long**|  | [default to null] |
| **page** | **Integer**| The page number to retrieve (defaults to 1) | [optional] [default to 1] |
| **per\_page** | **Integer**| The number of items per page to retrieve (defaults to 10) | [optional] [default to 10] |

### Return type

[**PaginatedBleats**](../Models/PaginatedBleats.md)

### Authorization

[blitterBearerAuth](../README.md#blitterBearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="getBleats"></a>
# **getBleats**
> PaginatedBleats getBleats(page, per\_page, following\_only)

Get a list of bleats

    Returns a list of bleats with pagination

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **page** | **Integer**| The page number to retrieve (defaults to 1) | [optional] [default to 1] |
| **per\_page** | **Integer**| The number of items per page to retrieve (defaults to 10) | [optional] [default to 10] |
| **following\_only** | **Boolean**| Limits bleats to only from users being followed | [optional] [default to false] |

### Return type

[**PaginatedBleats**](../Models/PaginatedBleats.md)

### Authorization

[blitterBearerAuth](../README.md#blitterBearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="postBleat"></a>
# **postBleat**
> BleatRes postBleat(BleatReq)

Creates a new bleat

    Creates a new bleat

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **BleatReq** | [**BleatReq**](../Models/BleatReq.md)|  | [optional] |

### Return type

[**BleatRes**](../Models/BleatRes.md)

### Authorization

[blitterBearerAuth](../README.md#blitterBearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

<a name="replyBleat"></a>
# **replyBleat**
> BleatRes replyBleat(id, BleatReq)

Post a reply to a bleat by id

    publish a reply to a bleat

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **id** | **Long**|  | [default to null] |
| **BleatReq** | [**BleatReq**](../Models/BleatReq.md)|  | [optional] |

### Return type

[**BleatRes**](../Models/BleatRes.md)

### Authorization

[blitterBearerAuth](../README.md#blitterBearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

<a name="updateBleat"></a>
# **updateBleat**
> BleatRes updateBleat(id, BleatReq)

Update a bleat by id

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **id** | **Long**|  | [default to null] |
| **BleatReq** | [**BleatReq**](../Models/BleatReq.md)|  | [optional] |

### Return type

[**BleatRes**](../Models/BleatRes.md)

### Authorization

[blitterBearerAuth](../README.md#blitterBearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

