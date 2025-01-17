package com.myme.mycarforme.ui.search

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.webkit.JavascriptInterface
import android.webkit.WebChromeClient
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.Toast
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import com.myme.mycarforme.WebAppInterface
import com.myme.mycarforme.data.utils.SharedPrefs
import com.myme.mycarforme.databinding.FragmentSearchBinding


class SearchFragment : Fragment() {

    private var _binding: FragmentSearchBinding? = null

    // This property is only valid between onCreateView and
    // onDestroyView.
    val binding get() = _binding!!
    private lateinit var webView: WebView

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
        webView.setLayerType(View.LAYER_TYPE_HARDWARE, null)
        return root
    }

    fun setupWebView() {
        webView.webViewClient = WebViewClient() // 내부 WebView에서 열리도록 설정
        webView.webChromeClient = WebChromeClient()
        webView.clearCache(true)
        val webSettings: WebSettings? = webView?.settings
        if (webSettings != null) {
            webSettings.javaScriptEnabled = true
            //TODO: cachemode 바꾸기
            webSettings.cacheMode = WebSettings.LOAD_NO_CACHE
            webSettings.domStorageEnabled = true // DOM 저장소 활성화
        }
        webView.loadUrl("http://192.168.201.101:5173/search")
        webView.addJavascriptInterface(AndroidBridge(), "AndroidBridge")

    }

    inner class AndroidBridge {
        @JavascriptInterface
        fun getToken(): String? {
            return SharedPrefs.getAccessToken(requireContext())
        }
    }


    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}