package com.myme.mycarforme.ui.recommend

import android.net.Uri
import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.MotionEvent
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
import com.myme.mycarforme.MainActivity
import com.myme.mycarforme.R
import com.myme.mycarforme.WebAppInterface
import com.myme.mycarforme.data.utils.SharedPrefs
import com.myme.mycarforme.databinding.FragmentRecommendBinding

class RecommendFragment : Fragment() {

    private var _binding: FragmentRecommendBinding? = null

    // This property is only valid between onCreateView and
    // onDestroyView.
    private lateinit var webView: WebView
    private val binding get() = _binding!!
    private lateinit var toolbar: View
    private lateinit var bottomNavigation: View
    private val basePath = "/recommendation/candidates"

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {

        _binding = FragmentRecommendBinding.inflate(inflater, container, false)
        val root: View = binding.root
        webView = binding.recommendWebview
        setupWebView()
        webView.setLayerType(View.LAYER_TYPE_HARDWARE, null)
        toolbar = requireActivity().findViewById(R.id.main_toolbar)
        bottomNavigation = requireActivity().findViewById(R.id.nav_view)
        setupWebViewTouchListener()
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
        webView.loadUrl("http://mycarf0r.me$basePath")
        webView.addJavascriptInterface(WebAppInterface(requireContext(), (activity as MainActivity)), "AndroidBridge")
    }


    private fun setupWebViewTouchListener() {
        webView.setOnTouchListener { _, event ->
            if (event.action == MotionEvent.ACTION_DOWN || event.action == MotionEvent.ACTION_UP) {

                webView.postDelayed({
                    val currentUrl = webView.url
                    Log.d("WebView Touch", "Current URL: $currentUrl")

                    if (currentUrl != null && isSamePath(currentUrl)) {
                        showUI()
                    } else {
                        hideUI()
                    }
                }, 100)
            }
            false // 터치 이벤트를 WebView 자체에서도 처리하도록 false 반환
        }
    }
    private fun isSamePath(url: String): Boolean {
        // URL의 path 추출
        val uri = Uri.parse(url)
        return uri.path == basePath
    }

    private fun hideUI() {
        toolbar.visibility = View.GONE
        bottomNavigation.visibility = View.GONE
    }

    private fun showUI() {
        toolbar.visibility = View.VISIBLE
        bottomNavigation.visibility = View.VISIBLE
    }


    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}