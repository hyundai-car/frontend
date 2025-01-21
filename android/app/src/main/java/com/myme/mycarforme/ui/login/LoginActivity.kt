package com.myme.mycarforme.ui.login

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.widget.TextView
import android.widget.Toast
import androidx.activity.viewModels
import androidx.appcompat.app.AppCompatActivity
import com.myme.mycarforme.MainActivity
import com.myme.mycarforme.R
import com.myme.mycarforme.data.model.Car
import com.myme.mycarforme.data.network.DataManager
import com.myme.mycarforme.databinding.ActivityLoginBinding

class LoginActivity : AppCompatActivity() {
    private var _binding: ActivityLoginBinding? = null
    private val binding get() = _binding!!
    private lateinit var popularCar: ArrayList<Car>
    private lateinit var mmCar: ArrayList<Car>
    private lateinit var nextCar: ArrayList<Car>

    private val viewModel: LoginViewModel by viewModels()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        Log.d("LoginActivity", "onCreate called")
        _binding = ActivityLoginBinding.inflate(layoutInflater)
        setContentView(binding.root)

        findViewById<TextView>(R.id.login_button).setOnClickListener {
            viewModel.login(this)
        }

        // Observer 설정 시점 로그 추가
        Log.d("LoginActivity", "Setting up observer")
        viewModel.authState.observe(this) { state ->
            Log.d("LoginActivity", "Observer triggered with state: $state")
            when (state) {
                is AuthState.Success -> {
                    Log.d("LoginActivity", "Success state received, preparing to navigate")
                    try {
                        loadCarData()
                        val mainIntent = Intent(this, MainActivity::class.java)
                        mainIntent.putExtra("popular", popularCar)
                        mainIntent.putExtra("mm", mmCar)
                        mainIntent.putExtra("next", nextCar)
                        startActivity(mainIntent)
                        finish()
                    } catch (e: Exception) {
                        Log.e("LoginActivity", "Error during navigation", e)
                    }
                }
                is AuthState.Error -> {
                    Log.d("LoginActivity", "Error state received")
                    Toast.makeText(
                        this,
                        "로그인 에러가 발생했습니다. 다시 시도해주세요",
                        Toast.LENGTH_SHORT
                    ).show()
                }
                is AuthState.Loading -> {
                    Log.d("LoginActivity", "Loading state received")
                }
                is AuthState.Idle -> {
                    Log.d("LoginActivity", "Idle state received")
                }
            }
        }
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        Log.d("LoginActivity", "onActivityResult called: requestCode=$requestCode, resultCode=$resultCode")
        if (requestCode == 1000) {
            viewModel.handleAuthResponse(this, data)
        }
    }

    private fun loadCarData() {
        Log.d("LoginActivity", "Starting to load car data")
        DataManager.getCarsListwithUrl(this, "popular") { cars ->
            popularCar = cars
            Log.d("LoginActivity", "Popular car data loaded")
        }
        DataManager.getCarsListwithUrl(this, "mmscores") { cars ->
            mmCar = cars
            Log.d("LoginActivity", "MM car data loaded")
        }
        DataManager.getCarsListwithUrl(this, "upcoming") { cars ->
            nextCar = cars
            Log.d("LoginActivity", "Next car data loaded")
        }
    }
}