package com.myme.mycarforme.ui.login

import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.TextView
import android.widget.Toast
import androidx.activity.enableEdgeToEdge
import androidx.activity.viewModels
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.ContextCompat
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import com.myme.mycarforme.MainActivity
import com.myme.mycarforme.R
import com.myme.mycarforme.data.network.ApiService
import com.myme.mycarforme.data.network.DataManager
import com.myme.mycarforme.data.network.RetrofitClient
import com.myme.mycarforme.databinding.ActivityLoginBinding

class LoginActivity : AppCompatActivity() {
    private var _binding : ActivityLoginBinding? = null
    private val binding get() = _binding!!


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
                    val intent = Intent(this, MainActivity::class.java)
                    startActivity(intent)
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


}