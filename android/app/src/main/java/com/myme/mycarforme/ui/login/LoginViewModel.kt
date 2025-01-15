package com.myme.mycarforme.ui.login

import android.app.Activity
import android.content.Context
import android.content.Intent
import android.net.Uri
import android.util.Base64
import android.util.Log
import android.view.View
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.google.android.material.snackbar.Snackbar
import com.myme.mycarforme.R
import kotlinx.coroutines.launch
import net.openid.appauth.AuthorizationException
import net.openid.appauth.AuthorizationRequest
import net.openid.appauth.AuthorizationResponse
import net.openid.appauth.AuthorizationService
import java.security.MessageDigest
import java.security.SecureRandom
import net.openid.appauth.AuthorizationServiceConfiguration
import net.openid.appauth.ResponseTypeValues

class LoginViewModel : ViewModel() {
    private val _authState = MutableLiveData<AuthState>(AuthState.Idle)
    val authState: LiveData<AuthState> = _authState

    private val authConfig = AuthorizationServiceConfiguration(
        Uri.parse("https://auth.mycarf0r.me/realms/MyCarForMe/protocol/openid-connect/auth"),
        Uri.parse("https://auth.mycarf0r.me/realms/MyCarForMe/protocol/openid-connect/token")
    )

    private val clientId = "mycarforme-client"
    private val redirectUri = Uri.parse("mycarforme://redirect")

    private var codeVerifier: String? = null

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
                        // 백엔드로 code와 verifier 전송
                        val authCode = response.authorizationCode

                        Log.d("AUTHORIZATION CODE", "$authCode")
                        Log.d("VERIFIER", "$codeVerifier")
//                        val rootView = (context as? Activity)?.window?.decorView?.findViewById<View>(android.R.id.content)
//                        rootView?.let {
//                            Snackbar.make(it, "Authorization Code : $authCode", Snackbar.LENGTH_SHORT).show()
//                        }

                        val additionalParams = response.additionalParameters
                        additionalParams.forEach { (key, value) ->
                            Log.d("chk", "$key = $value")
                        }
                        // 토큰 저장
                        Log.d("chk","${response}")
                        // 메인페이지에서 필요한 API 미리 호출
                        if (true) {
                            _authState.value = AuthState.Success
                        } else {
                            _authState.value = AuthState.Error(R.string.text_error_unknown)
                        }
                    } catch (e: Exception) {
                        _authState.value = AuthState.Error(R.string.text_error_unknown)
                    }
                }
            }
        }
    }

    override fun onCleared() {
        super.onCleared()
        codeVerifier = null
    }

}

sealed class AuthState {
    object Idle : AuthState()
    object Loading : AuthState()
    data class Error(val messageResId: Int) : AuthState()
    object Success : AuthState()
}