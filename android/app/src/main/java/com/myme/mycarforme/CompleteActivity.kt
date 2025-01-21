package com.myme.mycarforme

import android.content.Intent
import android.os.Bundle
import android.os.Handler
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat

class CompleteActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val intent : Intent = intent
        enableEdgeToEdge()
        setContentView(R.layout.activity_complete)
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }
        Handler().postDelayed({
            val intent = Intent(this, MainActivity::class.java)
            intent.putExtra("navigate_to_fragment", "MainFragment")
            intent.putExtra("user", "NONE")
            finish()  // 현재 액티비티 종료
        }, 3000) // 3000 milliseconds = 3초
    }
}