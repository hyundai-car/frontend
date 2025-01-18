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
                        Toast.makeText(context, "Failed to get cars", Toast.LENGTH_SHORT).show()
                    }
                }

                override fun onFailure(call: Call<CarListResponse>, t: Throwable) {
                    Log.d("chk","${t.message}")
                    Toast.makeText(context, "Request failed: ${t.message}", Toast.LENGTH_SHORT).show()
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
                            Log.d("chk","$it")
                        }
                        // 데이터 로드 후 callback 호출
                        callback(carList)
                    } else {
                        Toast.makeText(context, "Failed to get cars", Toast.LENGTH_SHORT).show()
                    }
                }

                override fun onFailure(call: Call<CarListResponse>, t: Throwable) {
                    Log.d("chk","${t.message}")
                    Toast.makeText(context, "Request failed: ${t.message}", Toast.LENGTH_SHORT).show()
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
                            Log.d("chk","$it")
                        }
                        // 데이터 로드 후 callback 호출
                        callback(carList)
                    } else {
                        Toast.makeText(context, "Failed to get cars", Toast.LENGTH_SHORT).show()
                    }
                }

                override fun onFailure(call: Call<CarListResponse>, t: Throwable) {
                    Log.d("chk","${t.message}")
                    Toast.makeText(context, "Request failed: ${t.message}", Toast.LENGTH_SHORT).show()
                }
            })
        }
    }
}