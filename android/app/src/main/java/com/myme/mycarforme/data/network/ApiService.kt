package com.myme.mycarforme.data.network

import android.os.Parcelable
import com.myme.mycarforme.data.model.Car
import kotlinx.parcelize.Parcelize
import retrofit2.Call
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

data class RecommendCars(
    val car : recoCars,
    val recommendId: Int,
    val recommendedAt: String,
    val recommendPriority: Int,
    val recommendCondition: String,
    val recommendReason : String,
    val createdAt : String,
    val updatedAt : String,
)

data class recoCars(
    val carId: Int,
    val carName: String,
    val initialRegistration: String, // yyyy-MM 형태로 저장
    val mileage: Int,
    val sellingPrice: Int,
    val mainImage: String,
    val carNumber: String,
    var isLike: Boolean,
    val likeCount: Int,
    val createdAt: String, // yyyy-MM-dd 형태로 저장
    val updatedAt: String, // yyyy-MM-dd 형태로 저장

)

data class RecommendCarsResponse(
    val contents : List<RecommendCars>,
)

data class OrderedCarResponse(
    val contractingId: Int?,
    val orderedCars : List<OrderCars>
)
@Parcelize
data class OrderCars(
    val carId: Int,
    val carName: String,
    val initialRegistration: String,
    val mileage: Int,
    val sellingPrice: Int,
    val mainImage: String,
    val likecount: Int,
    val carNumber: String,
): Parcelable

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

data class trackingCodeResponse(
    val trackingCode : String,
)

data class Fcmtoken(
    val token : String,
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

    @GET
    fun getRecommendCarsList(
        @Url url: String,
        @Header("Authorization") accessToken: String
    ): Call<RecommendCarsResponse>

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

    @GET
    fun getTrackCode(
        @Url url: String,
        @Header("Authorization") accessToken: String,
    ): Call<trackingCodeResponse>

    @POST
    fun sendCode(
        @Url url: String,
        @Header("Authorization") accessToken: String,
        @Body token : Fcmtoken,
    ): Call<Any>

}

fun convertRecoCarsToCars(recoCarsList: List<recoCars>): ArrayList<Car> {
    return recoCarsList.map { recoCar ->
        Car(
            carId = recoCar.carId,
            carName = recoCar.carName,
            initialRegistration = recoCar.initialRegistration,
            mileage = recoCar.mileage,
            sellingPrice = recoCar.sellingPrice,
            mainImage = recoCar.mainImage,
            mmScore = 0.0,
            isLike = recoCar.isLike,
            likeCount = recoCar.likeCount,
            createdAt = recoCar.createdAt,
            updatedAt = recoCar.updatedAt
        )
    }.toCollection(ArrayList())
}