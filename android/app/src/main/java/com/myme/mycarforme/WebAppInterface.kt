package com.myme.mycarforme

import android.content.Context
import android.util.Log
import android.webkit.JavascriptInterface
import android.widget.Toast
import com.myme.mycarforme.data.network.ApiService
import com.myme.mycarforme.data.network.DataManager
import com.myme.mycarforme.data.network.UserInfo
import com.myme.mycarforme.data.utils.SharedPrefs
import org.json.JSONObject

class WebAppInterface(private val context: Context) {

    @JavascriptInterface
    fun getAccessToken(): String? {
        val acceesToken = SharedPrefs.getAccessToken(context)
        Log.d("chk", "getAccessToken with web $acceesToken")
        return acceesToken
    }

    @JavascriptInterface
    fun getRefreshToken(): String? {
        return SharedPrefs.getRefreshToken(context)
    }


    @JavascriptInterface
    fun getUserInfo(): String {
        Log.d("123123123","${SharedPrefs.getUserInfo(context)}")
        return  convertUserInfoToJson(SharedPrefs.getUserInfo(context)!!)
    }


    fun convertUserInfoToJson(userInfo: UserInfo): String {
        // UserInfo 객체를 JSONObject로 변환
        val jsonObject = JSONObject()
        jsonObject.put("email", userInfo.email)
        jsonObject.put("name", userInfo.name)
        jsonObject.put("phoneNumber", userInfo.phoneNumber)

        // JSON 문자열 반환
        return jsonObject.toString()
    }


}
