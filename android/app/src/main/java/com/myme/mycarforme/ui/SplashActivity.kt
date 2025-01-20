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
import com.myme.mycarforme.data.network.DataManager.refreshToken
import com.myme.mycarforme.data.network.RefreshTokenResponse
import com.myme.mycarforme.data.network.RetrofitClient
import com.myme.mycarforme.data.utils.SharedPrefs
import com.myme.mycarforme.databinding.ActivityMainBinding
import com.myme.mycarforme.databinding.ActivitySplashBinding
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
    private var statusLoaded = false

    private var nowStatus = "NONE"
    private var orderingCarId = 0

    private lateinit var mainIntent : Intent

    private val apiService: ApiService by lazy {
        RetrofitClient.getClient().create(ApiService::class.java)
    }
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val binding = ActivitySplashBinding.inflate(layoutInflater)
        setContentView(binding.root)
        mainIntent = Intent(this, MainActivity::class.java)
        checkLoginStatus()
    }

    private fun checkLoginStatus() {
        // Coroutine 사용 (비동기 작업 처리)
        CoroutineScope(Dispatchers.IO).launch {
            try {
                // 저장된 토큰 가져오기 (SharedPreferences 또는 다른 저장소 사용)
                val token = getTokenFromPreferences()
                refreshToken(this@SplashActivity){

                }
                if (token.isNullOrEmpty()) {
                    navigateToSignUp()
                } else {
                    withContext(Dispatchers.Main) {
                        if (token != "") {
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


    private fun navigateToMain() {
        mainIntent.putExtra("popular", popularCar)
        mainIntent.putExtra("mm", mmCar)
        mainIntent.putExtra("next", nextCar)
        mainIntent.putExtra("user",nowStatus)
        startActivity(mainIntent)
        finish()
    }

    private fun navigateToSignUp() {
        startActivity(Intent(this, LoginActivity::class.java))
        finish()
    }

    private fun loadCarData() {
        this.let { it ->
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
            DataManager.getOrderingCar(it) { orderingCarId ->
                if(orderingCarId != null){
                    mainIntent.putExtra("carid",orderingCarId)
                    Log.d("chk","$orderingCarId")
                    DataManager.getOrderingStatus(it,orderingCarId){status->
                        Log.d("chk","$status")
                        if (status != null) {
                            nowStatus = status
                        } else{
                            nowStatus = "NONE"
                        }
                        statusLoaded = true
                        checkAllDataLoaded()
                    }
                }
                else{
                    statusLoaded = true
                    checkAllDataLoaded()
                }
            }
        }
    }
    private fun checkAllDataLoaded() {
        if (popularCarLoaded && mmCarLoaded && nextCarLoaded && statusLoaded) {
            navigateToMain()
            finish()
        }
    }
}