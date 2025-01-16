package com.myme.mycarforme.data.utils

import android.content.Context
import com.google.gson.Gson
import com.myme.mycarforme.data.network.UserInfo

object SharedPrefs {

    private const val PREF_NAME = "my_app_prefs"
    private const val TOKEN_KEY = "access_token"
    private const val REFRESH_TOKEN_KEY = "refresh_token"
    private const val USER_INFO_KEY = "user_info"

    // SharedPreferences 저장
    fun saveToken(context: Context, accessToken: String, refreshToken: String) {
        val prefs = context.getSharedPreferences(PREF_NAME, Context.MODE_PRIVATE)
        with(prefs.edit()) {
            putString(TOKEN_KEY, "Bearer " + accessToken)
            putString(REFRESH_TOKEN_KEY, refreshToken)
            apply()
        }
    }

    // SharedPreferences에서 토큰 가져오기
    fun getAccessToken(context: Context): String? {
        val prefs = context.getSharedPreferences(PREF_NAME, Context.MODE_PRIVATE)
        return prefs.getString(TOKEN_KEY, null)
    }

    // 유저 정보를 SharedPreferences에 저장
    fun saveUserInfo(context: Context, userInfo: UserInfo) {
        val prefs = context.getSharedPreferences(PREF_NAME, Context.MODE_PRIVATE)
        with(prefs.edit()) {
            putString(USER_INFO_KEY, Gson().toJson(userInfo))
            apply()
        }
    }

    // 유저 정보 가져오기
    fun getUserInfo(context: Context): UserInfo? {
        val prefs = context.getSharedPreferences(PREF_NAME, Context.MODE_PRIVATE)
        val userInfoJson = prefs.getString(USER_INFO_KEY, null)
        return Gson().fromJson(userInfoJson, UserInfo::class.java)
    }
}