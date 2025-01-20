package com.myme.mycarforme.data.network

import android.content.Context
import android.util.Log
import android.widget.Toast
import com.myme.mycarforme.data.model.Car
import com.myme.mycarforme.data.utils.SharedPrefs
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

object DataManager {

    private val apiService: ApiService by lazy {
        RetrofitClient.getClient().create(ApiService::class.java)
    }

    fun getCarsListwithUrl(context: Context, path: String, callback: (ArrayList<Car>) -> Unit) {
        val accessToken = SharedPrefs.getAccessToken(context)
        val carList = ArrayList<Car>()
        if (accessToken != null) {
            val url = "https://mycarf0r.me/api/cars/$path"

            apiService.getCarsList(url, accessToken).enqueue(object : Callback<CarListResponse> {
                override fun onResponse(call: Call<CarListResponse>, response: Response<CarListResponse>) {
                    if (response.isSuccessful) {
                        val carListResponse = response.body()
                        carListResponse?.contents?.forEach {
                            carList.add(it)
                        }
                        // 데이터 로드 후 callback 호출
                        callback(carList)
                    } else {
                        Log.d("chk","$url, $response")
                    }
                }

                override fun onFailure(call: Call<CarListResponse>, t: Throwable) {
                    Log.d("chk","${t.message}")
                }
            })
        }
    }

    fun getLikeCarList(context: Context, callback: (ArrayList<Car>) -> Unit) {
        val accessToken = SharedPrefs.getAccessToken(context)
        val carList = ArrayList<Car>()
        if (accessToken != null) {
            val url = "https://mycarf0r.me/api/likes"

            apiService.getCarsList(url, accessToken).enqueue(object : Callback<CarListResponse> {
                override fun onResponse(call: Call<CarListResponse>, response: Response<CarListResponse>) {
                    if (response.isSuccessful) {
                        val carListResponse = response.body()
                        carListResponse?.contents?.forEach {
                            carList.add(it)
                        }
                        // 데이터 로드 후 callback 호출
                        callback(carList)
                    } else {
                        Log.d("chk","$url, $response")
                    }
                }

                override fun onFailure(call: Call<CarListResponse>, t: Throwable) {
                    Log.d("chk","${t.message}")
                }
            })
        }
    }

    fun getRecommendHistoryCarList(context: Context, callback: (ArrayList<recoCars>) -> Unit) {
        val accessToken = SharedPrefs.getAccessToken(context)
        val carList = ArrayList<recoCars>()
        if (accessToken != null) {
            val url = "https://mycarf0r.me/api/recommendations/history"

            apiService.getRecommendCarsList(url, accessToken).enqueue(object : Callback<RecommendCarsResponse> {
                override fun onResponse(call: Call<RecommendCarsResponse>, response: Response<RecommendCarsResponse>) {
                    if (response.isSuccessful) {
                        val carListResponse = response.body()
                        carListResponse?.contents?.forEach {
                            carList.add(it.car)

                        }
                        // 데이터 로드 후 callback 호출
                        callback(carList)
                    } else {
                        Log.d("chk","$url, $response")
                    }
                }

                override fun onFailure(call: Call<RecommendCarsResponse>, t: Throwable) {
                    Log.d("chk","${t.message}")
                    Toast.makeText(context, "Request failed: ${t.message}", Toast.LENGTH_SHORT).show()
                }
            })
        }
    }

    fun likeCar(context: Context, carId: Int, onComplete: () -> Unit){
        val url = "https://mycarf0r.me/api/likes/$carId"
        val accessToken = SharedPrefs.getAccessToken(context)
        if (accessToken != null) {
            apiService.likeCar(url, accessToken, LikeRequestBody(carId)).enqueue(object : Callback<LikeResponse> {
                override fun onResponse(call: Call<LikeResponse>, response: Response<LikeResponse>) {
                    if (response.isSuccessful) {
                        Log.d("chk","likesuccess")
                        onComplete()
                    } else {
                        Log.d("chk","$url, $response")
                    }
                }

                override fun onFailure(call: Call<LikeResponse>, t: Throwable) {
                    Log.d("chk","${t.message}")
                    Toast.makeText(context, "Request failed: ${t.message}", Toast.LENGTH_SHORT).show()
                }
            })
        }
    }

    fun getOrderedCarList(context: Context, callback: (ArrayList<OrderCars>) -> Unit) {
        val accessToken = SharedPrefs.getAccessToken(context)
        val carList = ArrayList<OrderCars>()
        if (accessToken != null) {
            val url = "https://mycarf0r.me/api/orders"

            apiService.getOrderCarList(url, accessToken).enqueue(object : Callback<OrderedCarResponse> {
                override fun onResponse(call: Call<OrderedCarResponse>, response: Response<OrderedCarResponse>) {
                    if (response.isSuccessful) {
                        val carListResponse = response.body()
                        carListResponse?.orderedCars?.forEach {
                            carList.add(it)
                        }
                        // 데이터 로드 후 callback 호출
                        callback(carList)
                    } else {
                        Log.d("chk","$url, $response")
                    }
                }

                override fun onFailure(call: Call<OrderedCarResponse>, t: Throwable) {
                    Log.d("chk","${t.message}")
                }
            })
        }
    }

    fun getOrderingCar(context : Context, callback: (Int?)-> Unit){
        val accessToken = SharedPrefs.getAccessToken(context)
        if (accessToken != null) {
            val url = "https://mycarf0r.me/api/orders"
            apiService.getOrderCarList(url, accessToken).enqueue(object : Callback<OrderedCarResponse> {
                override fun onResponse(call: Call<OrderedCarResponse>, response: Response<OrderedCarResponse>) {
                    if (response.isSuccessful) {
                        val carListResponse = response.body()
                        // 데이터 로드 후 callback 호출
                        callback(carListResponse?.contractingId)
                    } else {
                        Log.d("chk","$url, $response")
                    }
                }

                override fun onFailure(call: Call<OrderedCarResponse>, t: Throwable) {
                    Log.d("chk","${t.message}")
                }
            })
        }
    }

    fun getOrderingStatus(context : Context, carId: Int, callback: (String?)-> Unit){
        val accessToken = SharedPrefs.getAccessToken(context)
        if (accessToken != null) {
            val url = "https://mycarf0r.me/api/orders/$carId/status"

            apiService.getOrderStatus(url, accessToken).enqueue(object : Callback<nowOrderingResponse> {
                override fun onResponse(call: Call<nowOrderingResponse>, response: Response<nowOrderingResponse>) {
                    if (response.isSuccessful) {
                        val carListResponse = response.body()
                        // 데이터 로드 후 callback 호출
                        callback( carListResponse?.paymentDeliveryStatus)
                    } else {
                        Log.d("chk","$url, $response")
                    }
                }

                override fun onFailure(call: Call<nowOrderingResponse>, t: Throwable) {
                    Log.d("chk","${t.message}")
                }
            })
        }
    }

    fun putCont(context : Context, carId: Int){
        val accessToken = SharedPrefs.getAccessToken(context)
        if (accessToken != null) {
            val url = "https://mycarf0r.me/api/orders/$carId/contract"

            apiService.putCar(url, accessToken).enqueue(object : Callback<Any> {
                override fun onResponse(call: Call<Any>, response: Response<Any>) {
                    if (response.isSuccessful) {
                        val carListResponse = response.body()
                        // 데이터 로드 후 callback 호출
                        Log.d("chk","contract")
                    } else {
                        Log.d("chk","$url, $response")
                    }
                }

                override fun onFailure(call: Call<Any>, t: Throwable) {
                    Log.d("chk","${t.message}")
                }
            })
        }
    }

    fun putPaid(context : Context, carId: Int){
        val accessToken = SharedPrefs.getAccessToken(context)
        if (accessToken != null) {
            val url = "https://mycarf0r.me/api/orders/1/pay"

            apiService.putCar(url, accessToken).enqueue(object : Callback<Any> {
                override fun onResponse(call: Call<Any>, response: Response<Any>) {
                    if (response.isSuccessful) {
                        val carListResponse = response.body()
                        // 데이터 로드 후 callback 호출
                        Log.d("chk","pay")
                    } else {
                        Log.d("chk","$url, $response")
                    }
                }

                override fun onFailure(call: Call<Any>, t: Throwable) {
                    Log.d("chk","${t.message}")
                }
            })
        }
    }

    fun getCode(context : Context, callback: (String?)-> Unit){
        val accessToken = SharedPrefs.getAccessToken(context)
        if (accessToken != null) {
            val url = "https://mycarf0r.me/api/sorders/trackingCode"
            apiService.getTrackCode(url, accessToken).enqueue(object : Callback<trackingCodeResponse> {
                override fun onResponse(call: Call<trackingCodeResponse>, response: Response<trackingCodeResponse>) {
                    if (response.isSuccessful) {
                        // 데이터 로드 후 callback 호출
                        Log.d("chk1234","${response.body()}")
                        callback(response.body()?.trackingCode)
                    } else {
                        Log.d("chk","$url, $response")
                    }
                }

                override fun onFailure(call: Call<trackingCodeResponse>, t: Throwable) {
                    Log.d("chk","${call}")
                }
            })
        }
    }

    fun sendCode(context : Context, token : String, callback: ()-> Unit){
        val accessToken = SharedPrefs.getAccessToken(context)
        if (accessToken != null) {
            val url = "https://mycarf0r.me/api/fcm/token"
            apiService.sendCode(url, accessToken, Fcmtoken(token)).enqueue(object : Callback<Any> {
                override fun onResponse(call: Call<Any>, response: Response<Any>) {
                    if (response.isSuccessful) {
                        // 데이터 로드 후 callback 호출
                        Log.d("chk","sendToken $token")
                        callback()
                    } else {
                        Log.d("chk","$url, $response")
                    }
                }
                override fun onFailure(call: Call<Any>, t: Throwable) {
                    Log.d("chk","${t}")
                }
            })
        }
    }

    fun refreshToken(context: Context, callback: (String) -> Unit): String {
        var reaccesToken : String = ""
        SharedPrefs.getRefreshToken(context)?.let {
            apiService.getRefreshToken("https://mycarf0r.me/api/auth/reissue", it).enqueue(object : Callback<RefreshTokenResponse> {
                override fun onResponse(
                    call: Call<RefreshTokenResponse>,
                    response: Response<RefreshTokenResponse>
                ) {
                    if (response.isSuccessful) {
                        // 응답 데이터 파싱
                        val loginResponse = response.body()
                        loginResponse?.let {
                            // SharedPreferences에 토큰과 유저 정보 저장
                            SharedPrefs.saveToken(context, it.accessToken, it.refreshToken)
                            reaccesToken = it.accessToken
                            callback(reaccesToken)
                        }
                    } else {
                    }
                }
                override fun onFailure(call: Call<RefreshTokenResponse>, t: Throwable) {
                    Toast.makeText(context, "Request failed: ${t.message}", Toast.LENGTH_SHORT).show()
                }
            })
        }
        return reaccesToken
    }
}