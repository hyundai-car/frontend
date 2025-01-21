package com.myme.mycarforme

import android.content.Context
import android.util.Log
import android.webkit.JavascriptInterface
import com.myme.mycarforme.data.network.DataManager
import com.myme.mycarforme.data.network.UserInfo
import com.myme.mycarforme.data.utils.SharedPrefs
import org.json.JSONObject

class WebAppInterface(private val context: Context,  private val mainActivity: MainActivity ) {

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

    @JavascriptInterface
    fun moveToMy(){
        val viewModel = (mainActivity).mainViewModel
        if (context is MainActivity) {
            DataManager.getOrderedCarList(context){ list ->
                list.map{
                    viewModel.saveOrderedCArs(list)
                }
                context.runOnUiThread {
                    context.navigateToFragment()
                }
                if(viewModel.userStatus.value == "CONTRACTED" ){
                    viewModel.saveStatus("PAID")
                } else{
                    viewModel.saveStatus("CONTRACTED")
                }
            }
        }
    }

    @JavascriptInterface
    fun getUserName(): String{
        return SharedPrefs.getUserInfo(context)!!.name
    }

    @JavascriptInterface
    fun getUserEmail(): String{
        return SharedPrefs.getUserInfo(context)!!.email
    }

    @JavascriptInterface
    fun getUserPhoneNumber(): String{
        return formatPhoneNumber(SharedPrefs.getUserInfo(context)!!.phoneNumber)
    }

    fun convertUserInfoToJson(userInfo: UserInfo): String {
        // UserInfo 객체를 JSONObject로 변환
        val jsonObject = JSONObject()
        jsonObject.put("email", userInfo.email)
        jsonObject.put("name", userInfo.name)
        jsonObject.put("phoneNumber", userInfo.phoneNumber)
        return jsonObject.toString()
    }

    fun formatPhoneNumber(phoneNumber: String): String {
        if (phoneNumber.length == 11 && phoneNumber.startsWith("010")) {
            return "${phoneNumber.substring(0, 3)}-${phoneNumber.substring(3, 7)}-${phoneNumber.substring(7)}"
        } else {
            throw IllegalArgumentException("올바른 전화번호 형식이 아닙니다. (11자리 숫자, '010'으로 시작)")
        }
    }



}
