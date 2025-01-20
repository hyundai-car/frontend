package com.myme.mycarforme

import android.content.Context
import android.util.Log
import android.webkit.JavascriptInterface
import android.widget.Toast
import com.myme.mycarforme.data.utils.SharedPrefs

class WebAppInterface(private val context: Context) {

    @JavascriptInterface
    fun getAccessToken(): String? {
        val acceesToken = SharedPrefs.getAccessToken(context)
        Log.d("chk", "getAccessToken with $acceesToken")
        return acceesToken
    }

    @JavascriptInterface
    fun refreshToken() {
        Log.d("WebAppInterface", "Action performed from WebView!")
    }


}
