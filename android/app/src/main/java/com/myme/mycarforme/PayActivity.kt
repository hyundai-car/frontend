package com.myme.mycarforme

import android.os.Bundle
import android.view.View
import android.webkit.WebChromeClient
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import com.myme.mycarforme.databinding.ActivityDetailBinding
import com.myme.mycarforme.databinding.ActivityPayBinding

class PayActivity : AppCompatActivity() {

    private var _binding : ActivityPayBinding? = null
    private val binding get() = _binding!!
    private lateinit var webView: WebView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_detail)
        _binding = ActivityPayBinding.inflate(layoutInflater)
        val root: View = binding.root
        webView = binding.detailWebview

    }

    fun setupWebView(path : String) {
        webView.webViewClient = WebViewClient()
        webView.webChromeClient = WebChromeClient()
        webView.clearCache(true)
        val webSettings: WebSettings = webView.settings
        if (webSettings != null) {
            webSettings.javaScriptEnabled = true
            webSettings.cacheMode = WebSettings.LOAD_NO_CACHE
            webSettings.domStorageEnabled = true // DOM 저장소 활성화
        }
        webView.loadUrl(path)
    }

    override fun onDestroy() {
        super.onDestroy()
        _binding = null
    }
}
