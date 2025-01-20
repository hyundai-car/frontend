package com.myme.mycarforme.ui.recommend

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.webkit.JavascriptInterface
import android.webkit.WebChromeClient
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.TextView
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import com.myme.mycarforme.WebAppInterface
import com.myme.mycarforme.data.utils.SharedPrefs
import com.myme.mycarforme.databinding.FragmentRecommendBinding

class RecommendFragment : Fragment() {

    private var _binding: FragmentRecommendBinding? = null

    // This property is only valid between onCreateView and
    // onDestroyView.
    private lateinit var webView: WebView
    private val binding get() = _binding!!

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        val recommendViewModel =
            ViewModelProvider(this).get(RecommendViewModel::class.java)

        _binding = FragmentRecommendBinding.inflate(inflater, container, false)
        val root: View = binding.root
        webView = binding.recommendWebview
        setupWebView()
        webView.setLayerType(View.LAYER_TYPE_HARDWARE, null)
        return root
    }

    fun setupWebView() {
        webView.webViewClient = WebViewClient() // 내부 WebView에서 열리도록 설정
        webView.webChromeClient = WebChromeClient()
        webView.clearCache(true)
        val webSettings: WebSettings? = webView.settings
        if (webSettings != null) {
            webSettings.javaScriptEnabled = true
            webSettings.cacheMode = WebSettings.LOAD_NO_CACHE
            webSettings.domStorageEnabled = true // DOM 저장소 활성화
        }
        webView?.loadUrl("http://mycarf0r.me/recommendation/candidates")
        webView.addJavascriptInterface(WebAppInterface(requireContext()), "AndroidBridge")
    }


    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}