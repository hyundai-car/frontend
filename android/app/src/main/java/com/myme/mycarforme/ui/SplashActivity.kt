package com.myme.mycarforme.ui

import android.content.Intent
import android.os.Bundle
import android.provider.ContactsContract.Data
import android.util.Log
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.myme.mycarforme.MainActivity
import com.myme.mycarforme.data.model.Car
import com.myme.mycarforme.data.network.ApiService
import com.myme.mycarforme.data.network.DataManager
import com.myme.mycarforme.data.network.RefreshTokenResponse
import com.myme.mycarforme.data.network.RetrofitClient
import com.myme.mycarforme.data.utils.SharedPrefs
import com.myme.mycarforme.ui.login.LoginActivity
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class SplashActivity : AppCompatActivity() {

    private var popularCar =  ArrayList<Car>()
    private var mmCar=  ArrayList<Car>()
    private var nextCar=  ArrayList<Car>()

    private var popularCarLoaded = false
    private var mmCarLoaded = false
    private var nextCarLoaded = false

    private val apiService: ApiService by lazy {
        RetrofitClient.getClient().create(ApiService::class.java)
    }
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        checkLoginStatus()
    }

    private fun checkLoginStatus() {
        // Coroutine 사용 (비동기 작업 처리)
        CoroutineScope(Dispatchers.IO).launch {
            try {
                // 저장된 토큰 가져오기 (SharedPreferences 또는 다른 저장소 사용)
                val token = getTokenFromPreferences()
                Log.d("chk","$token")
                if (token.isNullOrEmpty()) {
                    navigateToSignUp()
                } else {
                    withContext(Dispatchers.Main) {
                        // 토큰이 만료되었으면 리프레시 시도
//                        val isRefreshed = refreshToken()
                        val isRefreshed = "12"
                        if (isRefreshed != "") {
                            Log.d("chk","11111111")
                            loadCarData()
                        } else {
                            navigateToSignUp()
                        }
                    }
                }
            } catch (e: Exception) {
                e.printStackTrace()
                withContext(Dispatchers.Main) {
                    Toast.makeText(this@SplashActivity, "오류 발생: ${e.message}", Toast.LENGTH_SHORT).show()
                    Log.d("chk","$e")
                    navigateToSignUp()
                }
            }
        }
    }

    private fun getTokenFromPreferences(): String? {
        return SharedPrefs.getAccessToken(this)
    }

    private fun refreshToken(): String {
        var reaccesToken : String = ""
        SharedPrefs.getRefreshToken(this)?.let {
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
                            SharedPrefs.saveToken(this@SplashActivity, it.accessToken, it.refreshToken)
                            reaccesToken = it.accessToken
                        }
                    } else {
                        Toast.makeText(this@SplashActivity, "$response", Toast.LENGTH_SHORT).show()
                    }
                }
                override fun onFailure(call: Call<RefreshTokenResponse>, t: Throwable) {
                    Toast.makeText(this@SplashActivity, "Request failed: ${t.message}", Toast.LENGTH_SHORT).show()
                }
            })
        }
        return reaccesToken
    }

    private fun navigateToMain() {
        Log.d("chk","$1")
        val mainIntent = Intent(this, MainActivity::class.java)
        mainIntent.putExtra("popular", popularCar)
        mainIntent.putExtra("mm", mmCar)
        mainIntent.putExtra("next", nextCar)
        startActivity(mainIntent)
        finish()
    }

    private fun navigateToSignUp() {
        startActivity(Intent(this, LoginActivity::class.java))
        finish()
    }

    private fun loadCarData() {
        this.let {
            DataManager.getCarsListwithUrl(it, "popular") { cars ->
                popularCar = cars
                popularCarLoaded = true
                checkAllDataLoaded()
            }
            DataManager.getCarsListwithUrl(it, "mmscores") { cars ->
                mmCar = cars
                mmCarLoaded = true
                checkAllDataLoaded()
            }
            DataManager.getCarsListwithUrl(it, "upcoming") { cars ->
                nextCar = cars
                nextCarLoaded = true
                checkAllDataLoaded()
            }
        }
    }
    private fun checkAllDataLoaded() {
        if (popularCarLoaded && mmCarLoaded && nextCarLoaded) {
            navigateToMain()
            finish()
        }
    }
}