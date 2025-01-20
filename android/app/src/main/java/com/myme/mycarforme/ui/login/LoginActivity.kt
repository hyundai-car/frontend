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
    private var _binding : ActivityLoginBinding? = null
    private val binding get() = _binding!!
    private lateinit var popularCar: ArrayList<Car>
    private lateinit var mmCar: ArrayList<Car>
    private lateinit var nextCar: ArrayList<Car>

    private val viewModel: LoginViewModel by viewModels()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)
        _binding = ActivityLoginBinding.inflate(layoutInflater)
        val loginButton = findViewById<TextView>(R.id.login_button)
        loginButton.setOnClickListener{
            viewModel.login(this)
        }
        observeAuthState()
    }

    private fun observeAuthState() {
        viewModel.authState.observe(this) { state ->
            when (state) {
                is AuthState.Success -> {
                    val mainIntent = Intent(this, MainActivity::class.java)
                    loadCarData()
                    mainIntent.putExtra("popular",popularCar)
                    mainIntent.putExtra("mm",mmCar)
                    mainIntent.putExtra("next",nextCar)
                    startActivity(mainIntent)
                    finish()
                }
                is AuthState.Error -> {
                    Toast.makeText(this, "로그인 에러가 발생했습니다. 다시 시도해주세요", Toast.LENGTH_SHORT).show()
                }
                else -> {
                }
            }
        }
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        if (requestCode == 1000) {
            viewModel.handleAuthResponse(this, data)
        }
    }

    private fun loadCarData() {
        this.let {
            // 각 데이터를 비동기적으로 로드하고 콜백을 통해 RecyclerView에 세팅
            DataManager.getCarsListwithUrl(it, "popular") { cars ->
                popularCar = cars
            }
            DataManager.getCarsListwithUrl(it, "mmscores") { cars ->
                mmCar = cars
            }
            DataManager.getCarsListwithUrl(it, "sales") { cars ->
                nextCar = cars
            }
        }
    }


}