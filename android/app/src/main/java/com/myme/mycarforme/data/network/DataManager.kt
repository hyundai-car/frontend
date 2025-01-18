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

    fun getRecommendHistoryCarList(context: Context, callback: (ArrayList<Car>) -> Unit) {
        val accessToken = SharedPrefs.getAccessToken(context)
        val carList = ArrayList<Car>()
        if (accessToken != null) {
            val url = "https://mycarf0r.me/api/recommendations/histories"

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

    fun getOrderingCar(context : Context, callback: (Int)-> Unit){
        val accessToken = SharedPrefs.getAccessToken(context)
        if (accessToken != null) {
            val url = "https://mycarf0r.me/api/orders"

            apiService.getOrderCarList(url, accessToken).enqueue(object : Callback<Int> {
                override fun onResponse(call: Call<OrderedCarResponse>, response: Response<OrderedCarResponse>) {
                    if (response.isSuccessful) {
                        val carListResponse = response.body()
                        carListResponse?.orderedCars?.forEach {
                            carList.add(it)
                        }
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

    fun getOrderStatus(context : Context, callback: (Int)-> Unit){
        val accessToken = SharedPrefs.getAccessToken(context)
        if (accessToken != null) {
            val url = "https://mycarf0r.me/api/orders"

            apiService.getOrderCarList(url, accessToken).enqueue(object : Callback<Int> {
                override fun onResponse(call: Call<OrderedCarResponse>, response: Response<OrderedCarResponse>) {
                    if (response.isSuccessful) {
                        val carListResponse = response.body()
                        carListResponse?.orderedCars?.forEach {
                            carList.add(it)
                        }
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



}