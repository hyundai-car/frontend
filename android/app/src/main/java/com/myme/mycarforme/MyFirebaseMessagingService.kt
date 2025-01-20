package com.myme.mycarforme

import android.app.NotificationManager
import android.content.Context
import android.content.Intent
import android.util.Log
import androidx.core.app.NotificationCompat
import com.google.firebase.messaging.FirebaseMessagingService
import com.google.firebase.messaging.RemoteMessage

class MyFirebaseMessagingService : FirebaseMessagingService() {
    override fun onMessageReceived(remoteMessage: RemoteMessage) {
        super.onMessageReceived(remoteMessage)

        // 알림 생성
        val notificationBuilder = NotificationCompat.Builder(this, "CHANNEL_ID")
            .setContentTitle(remoteMessage.notification?.title)
            .setContentText(remoteMessage.notification?.body)
            .setSmallIcon(R.drawable.ic_launcher_background)
            .setAutoCancel(true)

        val notificationManager = getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
        notificationManager.notify(0, notificationBuilder.build())


        // 특정 단어가 포함되어 있는지 확인
        if (remoteMessage.notification?.body?.contains("완료되었어요!", ignoreCase = true) == true) {
            // 특정 단어가 포함된 메시지일 경우
            startSpecificActivity()
        }
    }
    private fun startSpecificActivity() {
        // 특정 Activity를 시작하는 Intent 생성
        val intent = Intent(this, CompleteActivity::class.java)
        // 플래그 설정 (기존 액티비티가 있다면 새로 시작하도록 설정)
        intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK
        startActivity(intent)
    }

    override fun onNewToken(token: String) {
        Log.d("FCM", "새로운 토큰: $token")
    }
}