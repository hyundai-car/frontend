package com.myme.mycarforme.ui.search

import android.net.Uri
import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.MotionEvent
import android.view.View
import android.view.ViewGroup
import android.webkit.JavascriptInterface
import android.webkit.WebChromeClient
import android.webkit.WebResourceRequest
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.Toast
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import com.myme.mycarforme.R
import com.myme.mycarforme.WebAppInterface
import com.myme.mycarforme.data.utils.SharedPrefs
import com.myme.mycarforme.databinding.FragmentSearchBinding


class SearchFragment : Fragment() {

    private var _binding: FragmentSearchBinding? = null

    // This property is only valid between onCreateView and
    // onDestroyView.
    val binding get() = _binding!!
    private lateinit var webView: WebView
    private lateinit var toolbar: View
    private lateinit var bottomNavigation: View
    private val basePath = "/search"

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        val searchViewModel =
            ViewModelProvider(this).get(SearchViewModel::class.java)
        _binding = FragmentSearchBinding.inflate(inflater, container, false)
        val root: View = binding.root
        webView = binding.searchWebview
        setupWebView()
        toolbar = requireActivity().findViewById(R.id.main_toolbar)
        bottomNavigation = requireActivity().findViewById(R.id.nav_view)

        webView.setLayerType(View.LAYER_TYPE_HARDWARE, null)

        setupWebViewTouchListener()
        return root
    }

    fun setupWebView() {
        webView.webViewClient = WebViewClient() // 내부 WebView에서 열리도록 설정
        webView.webChromeClient = WebChromeClient()
        webView.clearCache(true)
        val webSettings: WebSettings = webView.settings
        if (webSettings != null) {
            webSettings.javaScriptEnabled = true
            //TODO: cachemode 바꾸기
            webSettings.cacheMode = WebSettings.LOAD_NO_CACHE
            webSettings.domStorageEnabled = true // DOM 저장소 활성화
        }
        webView.webViewClient = object : WebViewClient() {
            override fun onPageFinished(view: WebView?, url: String?) {
                super.onPageFinished(view, url)
                Log.d("chk","$url")
                // URL 변경에 따라 UI를 숨기거나 보이기
                if (url != null && isSamePath(url)) {
                    Log.d("chk","$url")
                    showUI()
                } else {
                    hideUI()
                }
            }
            override fun shouldOverrideUrlLoading(view: WebView?, request: WebResourceRequest?): Boolean {
                val url = request?.url.toString()
                Log.d("URL Override", url)

                // URL 변경 시 동일한 경로인지 확인
                if (url.isNotEmpty() && isSamePath(url)) {
                    showUI()
                } else {
                    hideUI()
                }

                // WebView가 자체적으로 URL을 로드하도록 false 반환
                return false
            }
        }
        webView.loadUrl("https://mycarf0r.me$basePath")
        webView.addJavascriptInterface(WebAppInterface(requireContext()), "AndroidBridge")
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