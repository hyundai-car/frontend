package com.myme.mycarforme

import okhttp3.*
import android.util.Log
import com.google.gson.Gson
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.Response
import okhttp3.WebSocket
import okhttp3.WebSocketListener
import java.util.concurrent.TimeUnit

// WebSocketConfig.kt
data class StompFrame(
    val command: String,
    val headers: Map<String, String>,
    val body: String?
)

class StompClient(
    private val webSocket: OkHttpClient,
    private val url: String,
    private val scope: CoroutineScope
) {
    private var wsConnection: WebSocket? = null
    private val listeners = mutableMapOf<String, (String) -> Unit>()
    private var isConnected = false
    private var connectionHeaders: Map<String, String>? = null
    private var callback: ((Boolean) -> Unit)? = null

    fun connect(headers: Map<String, String>, callback: ((Boolean) -> Unit)? = null) {
        this.callback = callback
        connectionHeaders = headers

        val entropy = (Math.random() * 1000000).toInt().toString(36)
        val sockJsUrl = "${url}/websocket"

        Log.d("StompClient", "Attempting to connect to: $url")  // 연결 시도 시작 로그

        val request = Request.Builder()
            .url(url)
            .addHeader("Upgrade", "websocket")
            .addHeader("Connection", "Upgrade")
            .addHeader("Origin", "https://mycarf0r.me")
            // SockJS 관련 헤더 추가
            .addHeader("Sec-WebSocket-Protocol", "v10.stomp, v11.stomp")
            .build()

        Log.d("StompClient", "Created request with headers: $headers")  // 요청 생성 로그

        wsConnection = webSocket.newWebSocket(request, object : WebSocketListener() {
            override fun onOpen(webSocket: WebSocket, response: Response) {
                // STOMP CONNECT frame 전송 시 들어가야 할 헤더 수정
                Log.d("StompClient", "WebSocket onOpen called")  // onOpen 호출 확인
                val connectFrame = StompFrame(
                    command = "CONNECT",
                    headers = mapOf(
                        "accept-version" to "1.2",
                        "heart-beat" to "10000,10000",
                        "Authorization" to headers["Authorization"]!!,
                        "clientType" to headers["clientType"]!!,
                        "userId" to (headers["userId"] ?: "")  // userId가 없을 수 있으므로 null 처리
                    ),
                    body = null
                )
                webSocket.send(encodeFrame(connectFrame))
                Log.d("StompClient", "Sending CONNECT frame: ${encodeFrame(connectFrame)}")
            }

            override fun onMessage(webSocket: WebSocket, text: String) {
                scope.launch(Dispatchers.Main) {
                    handleStompFrame(text)
                }
            }

            override fun onFailure(webSocket: WebSocket, t: Throwable, response: Response?) {
                Log.e("StompClient", "WebSocket onFailure: ${t.message}")  // 실패 시 로그
                scope.launch(Dispatchers.Main) {
                    isConnected = false
                    callback?.invoke(false)
                }
            }

            override fun onClosing(webSocket: WebSocket, code: Int, reason: String) {
                Log.d("StompClient", "WebSocket onClosing: code=$code, reason=$reason")
            }

            override fun onClosed(webSocket: WebSocket, code: Int, reason: String) {
                Log.d("StompClient", "WebSocket onClosed: code=$code, reason=$reason")
            }
        })
    }

    fun subscribe(destination: String, callback: (String) -> Unit) {
        Log.d("StompClient", "Subscribing to: $destination")
        listeners[destination] = { message ->
            scope.launch(Dispatchers.Main) {
                Log.d("StompClient", "Received message for $destination: $message")
                callback(message)
            }
        }

        val subscribeFrame = StompFrame(
            command = "SUBSCRIBE",
            headers = mapOf(
                "destination" to destination,
                "id" to destination.hashCode().toString()
            ),
            body = null
        )
        Log.d("StompClient", "Sending SUBSCRIBE frame: ${encodeFrame(subscribeFrame)}")
        wsConnection?.send(encodeFrame(subscribeFrame))
    }

    fun send(destination: String, message: LocationUpdate) {
        if (!isConnected) {
            Log.e("StompClient", "Cannot send message - not connected")
            return
        }

        val sendFrame = StompFrame(
            command = "SEND",
            headers = mapOf(
                "destination" to destination,
                "content-type" to "application/json;charset=UTF-8"
            ),
            body = Gson().toJson(message)  // LocationUpdate 객체를 JSON으로 변환
        )
        Log.d("StompClient", "Sending message frame: ${encodeFrame(sendFrame)}")
        wsConnection?.send(encodeFrame(sendFrame))
    }

    fun disconnect() {
        val disconnectFrame = StompFrame(
            command = "DISCONNECT",
            headers = emptyMap(),
            body = null
        )
        wsConnection?.send(encodeFrame(disconnectFrame))
        wsConnection?.close(1000, null)
        wsConnection = null
        isConnected = false
        listeners.clear()
    }

    private fun handleStompFrame(rawFrame: String) {
        Log.d("StompClient", "Received frame: $rawFrame")
        val frame = decodeFrame(rawFrame)

        when (frame.command) {
            "CONNECTED" -> {
                Log.d("StompClient", "Connected successfully")
                isConnected = true
                Log.d("StompClient", "Calling callback with true")
                callback?.invoke(true)  // 여기에 콜백 호출 추가!
            }
            "MESSAGE" -> {
                val destination = frame.headers["destination"]
                destination?.let { dest ->
                    listeners[dest]?.invoke(frame.body ?: "")
                }
            }
            "ERROR" -> {
                Log.e("StompClient", "Error frame received: ${frame.body}")
                callback?.invoke(false)  // 에러시에도 콜백 호출
            }
        }
    }

    private fun encodeFrame(frame: StompFrame): String {
        val sb = StringBuilder()
        sb.append(frame.command).append('\n')

        frame.headers.forEach { (key, value) ->
            sb.append(key).append(':').append(value).append('\n')
        }

        sb.append('\n')  // 헤더와 바디 사이의 빈 줄
        if (frame.body != null) {
            sb.append(frame.body)
            sb.append('\n')  // 바디 끝에 개행 추가
        }
        sb.append('\u0000')  // NULL 문자로 프레임 종료

        return sb.toString()
    }

    private fun decodeFrame(rawFrame: String): StompFrame {
        val lines = rawFrame.split('\n')
        val command = lines[0]
        val headers = mutableMapOf<String, String>()
        var i = 1

        while (i < lines.size && lines[i].isNotEmpty()) {
            val header = lines[i].split(':', limit = 2)
            if (header.size == 2) {
                headers[header[0]] = header[1]
            }
            i++
        }

        val body = if (i < lines.size - 1) {
            lines.subList(i + 1, lines.size).joinToString("\n")
                .removeSuffix("\u0000")
        } else null

        return StompFrame(command, headers, body)
    }

    companion object {
        fun create(url: String, scope: CoroutineScope): StompClient {
            val client = OkHttpClient.Builder()
                .readTimeout(0, TimeUnit.MILLISECONDS)
                .build()

            return StompClient(client, url, scope)
        }
    }

    // LocationUpdate 데이터 클래스 추가
    data class LocationUpdate(
        val userId: String,
        val latitude: Double,
        val longitude: Double,
        val timestamp: String
    )
}