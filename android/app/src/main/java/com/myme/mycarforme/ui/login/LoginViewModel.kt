package com.myme.mycarforme.ui.login

import android.app.Activity
import android.content.Context
import android.content.Intent
import android.net.Uri
import android.util.Base64
import android.util.Log
import android.widget.Toast
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.myme.mycarforme.R
import com.myme.mycarforme.data.network.ApiService
import com.myme.mycarforme.data.network.LoginRequestBody
import com.myme.mycarforme.data.network.LoginResponse
import com.myme.mycarforme.data.network.RetrofitClient
import com.myme.mycarforme.data.utils.SharedPrefs
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import net.openid.appauth.AuthorizationException
import net.openid.appauth.AuthorizationRequest
import net.openid.appauth.AuthorizationResponse
import net.openid.appauth.AuthorizationService
import java.security.MessageDigest
import java.security.SecureRandom
import net.openid.appauth.AuthorizationServiceConfiguration
import net.openid.appauth.ResponseTypeValues
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class LoginViewModel : ViewModel() {
    val _authState = MutableLiveData<AuthState>(AuthState.Idle)
    val authState: LiveData<AuthState> = _authState

    private val authConfig = AuthorizationServiceConfiguration(
        Uri.parse("https://auth.mycarf0r.me/realms/MyCarForMe/protocol/openid-connect/auth"),
        Uri.parse("https://auth.mycarf0r.me/realms/MyCarForMe/protocol/openid-connect/token")
    )

    private val clientId = "mycarforme-client"
    private val redirectUri = Uri.parse("mycarforme://redirect")

    private var codeVerifier: String? = null

    private val apiService: ApiService by lazy {
        RetrofitClient.getClient().create(ApiService::class.java)
    }

    private fun generateCodeVerifier(): String {
        val secureRandom = SecureRandom()
        val bytes = ByteArray(32)
        secureRandom.nextBytes(bytes)
        return Base64.encodeToString(bytes, Base64.URL_SAFE or Base64.NO_PADDING or Base64.NO_WRAP)
    }

    private fun generateCodeChallenge(verifier: String): String {
        val bytes = verifier.toByteArray()
        val messageDigest = MessageDigest.getInstance("SHA-256")
        messageDigest.update(bytes)
        val digest = messageDigest.digest()
        return Base64.encodeToString(digest, Base64.URL_SAFE or Base64.NO_PADDING or Base64.NO_WRAP)
    }

    fun login(context: Context) {
        viewModelScope.launch {
            try {
                _authState.value = AuthState.Loading

                // PKCE verifier 생성
                codeVerifier = generateCodeVerifier()
                val codeChallenge = generateCodeChallenge(codeVerifier!!)

                val authService = AuthorizationService(context)
                val authRequest = AuthorizationRequest.Builder(
                    authConfig,
                    clientId,
                    ResponseTypeValues.CODE,
                    redirectUri
                ).apply {
                    setScopes("openid", "profile", "email")
                    setCodeVerifier(
                        codeVerifier,
                        codeChallenge,
                        "S256"
                    )
                }.build()
                val authIntent = authService.getAuthorizationRequestIntent(authRequest)
                (context as Activity).startActivityForResult(authIntent, 1000)
            } catch (e: Exception) {
                _authState.value = AuthState.Error(R.string.text_error_unknown)
            }
        }
    }
    fun handleAuthResponse(context: Context, intent: Intent?) {
        val response = AuthorizationResponse.fromIntent(intent!!)
        val error = AuthorizationException.fromIntent(intent)

        when {
            error != null -> {
                _authState.value = AuthState.Error(R.string.text_error_unknown)
            }
            response != null -> {
                viewModelScope.launch {
                    try {
                        val authCode = response.authorizationCode

                        loginUser(authCode!!, codeVerifier!!, context)

                        if (true) {
                            withContext(Dispatchers.Main) {
                                _authState.value = AuthState.Success
                            }

                        } else {
                            withContext(Dispatchers.Main) {
                                _authState.value = AuthState.Error(R.string.text_error_unknown)
                            }

                        }
                    } catch (e: Exception) {
                        withContext(Dispatchers.Main) {
                            _authState.value = AuthState.Error(R.string.text_error_unknown)
                        }
                    }
                }
            }
        }
    }

    override fun onCleared() {
        super.onCleared()
        codeVerifier = null
    }
    val url = "https://mycarf0r.me/api/auth/login"

    private fun loginUser(authCode: String, verifier: String, context : Context) {
        val loginRequestBody = LoginRequestBody(authCode, verifier)

        Log.d("LoginViewModel", "Attempting login with authCode: $authCode")

        apiService.loginUser(url, loginRequestBody).enqueue(object : Callback<LoginResponse> {
            override fun onResponse(call: Call<LoginResponse>, response: Response<LoginResponse>) {
                Log.d("LoginViewModel", "Login response: ${response.isSuccessful}, code: ${response.code()}")

                if (response.isSuccessful) {
                    val loginResponse = response.body()
                    Log.d("LoginViewModel", "Login successful, response: $loginResponse")
                    loginResponse?.let {
                        viewModelScope.launch(Dispatchers.Main) {
                            SharedPrefs.saveToken(context, it.token.accessToken, it.token.refreshToken)
                            SharedPrefs.saveUserInfo(context, it.userInfo)
                            _authState.value = AuthState.Success  // postValue 대신 value 사용
                            Log.d("LoginViewModel", "Auth state updated to Success")
                        }
                    }
                } else {
                    Log.d("LoginViewModel", "Login failed: ${response.errorBody()?.string()}")
                    _authState.postValue(AuthState.Error(R.string.text_error_unknown))
                }
            }

            override fun onFailure(call: Call<LoginResponse>, t: Throwable) {
                Log.e("LoginViewModel", "Login network error", t)
                _authState.postValue(AuthState.Error(R.string.text_error_unknown))
            }
        })
    }
}

sealed class AuthState {
    object Idle : AuthState()
    object Loading : AuthState()
    data class Error(val messageResId: Int) : AuthState()
    object Success : AuthState()
}