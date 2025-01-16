package com.myme.mycarforme.data.network

import android.content.Context
import android.util.Log
import android.widget.Toast
import com.myme.mycarforme.data.model.Car
import com.myme.mycarforme.data.utils.SharedPrefs
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.Header
import retrofit2.http.POST
import retrofit2.http.Url

// 로그인 요청 바디
data class LoginRequestBody(
    val authorizationCode: String,
    val codeVerifier: String
)

// 로그인 응답 데이터
data class LoginResponse(
    val token: Token,
    val userInfo: UserInfo
)

data class Token(
    val accessToken: String,
    val refreshToken: String,
    val expiresIn: Int,
    val scope: String
)

data class UserInfo(
    val email: String,
    val name: String,
    val phoneNumber: String
)

// 자동차 목록 응답 데이터 (5개 항목)
data class CarListResponse(
    val contents: List<Car>
)


// 페이지네이션 자동차 목록 응답 데이터
data class CarPagedResponse(
    val content: List<Car>,
    val pageNumber: Int,
    val pageSize: Int,
    val totalElements: Int,
    val totalPages: Int,
    val isFirst: Boolean,
    val isLast: Boolean
)

interface ApiService {
    @POST
    fun loginUser(
        @Url url: String,
        @Body loginRequestBody: LoginRequestBody
    ): Call<LoginResponse>

    // 자동차 목록 요청 (5개 자동차 정보)
    @GET
    fun getCarsList(
        @Url url: String,
        @Header("Authorization") accessToken: String
    ): Call<CarListResponse>

    // 페이지네이션이 있는 자동차 목록 요청
    @POST
    fun getCarsPaged(
        @Url url: String,
        @Header("Authorization") accessToken: String
    ): Call<CarPagedResponse>
}