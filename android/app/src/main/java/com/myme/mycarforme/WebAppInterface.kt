package com.myme.mycarforme

import android.content.Context
import android.util.Log
import android.webkit.JavascriptInterface
import android.widget.Toast

class WebAppInterface(private val context: Context) {

    @JavascriptInterface
    fun showToast(message: String) {
        Toast.makeText(context, message, Toast.LENGTH_SHORT).show()
    }

    @JavascriptInterface
    fun performAction() {
        Log.d("WebAppInterface", "Action performed from WebView!")
    }
}
