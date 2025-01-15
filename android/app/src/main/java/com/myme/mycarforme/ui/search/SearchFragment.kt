package com.myme.mycarforme.ui.search

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.TextView
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import com.myme.mycarforme.databinding.FragmentSearchBinding

class SearchFragment : Fragment() {

    private var _binding: FragmentSearchBinding? = null

    // This property is only valid between onCreateView and
    // onDestroyView.
    private val binding get() = _binding!!
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
        webView.loadUrl("http://192.168.201.101:3000/search")

        return root
    }
    private fun setupWebView() {
        webView.webViewClient = WebViewClient() // 내부 WebView에서 열리도록 설정
        val webSettings: WebSettings = webView.settings
        webSettings.javaScriptEnabled = true // JavaScript 사용 가능하게 설정
        webSettings.domStorageEnabled = true // DOM 저장소 활성화
    }


    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}