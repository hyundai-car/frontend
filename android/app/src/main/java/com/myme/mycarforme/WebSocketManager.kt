package com.myme.mycarforme

import android.content.Context
import okhttp3.*
import org.json.JSONObject
import android.util.Log
import com.myme.mycarforme.data.utils.SharedPrefs

class WebSocketManager{

    private val client = OkHttpClient()
    private var webSocket: WebSocket? = null

    fun connectWebSocket(url: String, context: Context, onMessageReceived: (String) -> Unit) {
        val accessToken = SharedPrefs.getAccessToken(context)
        val request = Request.Builder().url(url).addHeader("Authorization",accessToken ?: "").addHeader("clientType", "sub").build()

        val listener = object : WebSocketListener() {
            override fun onOpen(webSocket: WebSocket, response: Response) {
                super.onOpen(webSocket, response)
                Log.d("WebSocket", "Connected to WebSocket")
            }

            override fun onMessage(webSocket: WebSocket, text: String) {
                super.onMessage(webSocket, text)
                onMessageReceived(text) // 서버에서 받은 메시지를 처리
            }

            override fun onFailure(webSocket: WebSocket, t: Throwable, response: Response?) {
                super.onFailure(webSocket, t, response)
                Log.e("WebSocket", "Error: ${t.message}")
            }

            override fun onClosing(webSocket: WebSocket, code: Int, reason: String) {
                super.onClosing(webSocket, code, reason)
                Log.d("WebSocket", "Closing WebSocket: Code $code, Reason $reason")
            }
        }

        webSocket = client.newWebSocket(request, listener)
    }

    fun sendMessage(message: String) {
        webSocket?.send(message)
    }

    fun close() {
        webSocket?.close(1000, "Closing WebSocket")
    }
}
