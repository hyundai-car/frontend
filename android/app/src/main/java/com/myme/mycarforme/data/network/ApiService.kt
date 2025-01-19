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
import retrofit2.http.PUT
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

data class RefreshTokenResponse(
    val accessToken: String,
    val refreshToken: String,
    val tokenType: String,
    val expiresIn: Int
)

data class LikeRequestBody(
    val carId : Int,
)

data class LikeResponse(
    val carId : Int,
    val isLike : Boolean,
    val createdAt : String,
    val updatedAt : String,
)

data class OrderedCarResponse(
    val contractingId: Int?,
    val orderedCars : List<OrderCars>
)

data class OrderCars(
    val carId: Int,
    val carName: String,
    val initalRegistration: String,
    val mileage: Int,
    val sellingPrice: Int,
    val mainImage: String,
    val likecount: Int,
)

data class History(
    val contractedAt: String,
    val paidAt : String,
    val deliveryStartedAt : String,
    val deliveryEndedAt : String,
)

data class nowOrderingResponse(
    val carId: Int,
    val paymentDeliveryStatus : String,
    val statusHistories : History,
    val createdAt: String,
    val updatedAt: String,
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

    @POST
    fun likeCar(
        @Url url: String,
        @Header("Authorization") accessToken: String,
        @Body likeRequestBody: LikeRequestBody
    ): Call<LikeResponse>

    @GET
    fun getOrderCarList(
        @Url url:String,
        @Header("Authorization") accessToken: String,
    ): Call<OrderedCarResponse>

    @POST
    fun getRefreshToken(
        @Url url:String,
        @Body refreshToken: String
    ): Call<RefreshTokenResponse>

    @GET
    fun getOrderStatus(
        @Url url:String,
        @Header("Authorization") accessToken: String,
    ): Call<nowOrderingResponse>

    @PUT
    fun putCar(
        @Url url: String,
        @Header("Authorization") accessToken: String,
    ): Call<Any>

    @PUT
    fun putPaid(
        @Url url: String,
        @Header("Authorization") accessToken: String,
    ): Call<Any>

}