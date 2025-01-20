package com.myme.mycarforme.ui

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.webkit.WebChromeClient
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.activity.addCallback
import com.myme.mycarforme.MainActivity
import com.myme.mycarforme.MainViewModel
import com.myme.mycarforme.R
import com.myme.mycarforme.WebAppInterface
import com.myme.mycarforme.data.utils.SharedPrefs


class PayFragment : Fragment() {

    private lateinit var webView: WebView
    private lateinit var toolbar: View
    private lateinit var bottomNavigation: View
    private lateinit var viewModel: MainViewModel

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val root = inflater.inflate(R.layout.fragment_detail, container, false)

        // 툴바와 네비게이션 바 초기화
        toolbar = requireActivity().findViewById(R.id.main_toolbar)
        bottomNavigation = requireActivity().findViewById(R.id.nav_view)

        // 웹뷰 초기화
        webView = root.findViewById(R.id.detail_webview)
        setupWebView()

        requireActivity().onBackPressedDispatcher.addCallback(viewLifecycleOwner){
            onBackPressed() // 커스텀 뒤로가기 처리
        }

        return root
    }

    private fun setupWebView() {
        // 번들로 전달된 carId 가져오기
        val carId = arguments?.getInt("carId")
        viewModel = (activity as MainActivity).mainViewModel
        webView.addJavascriptInterface(WebAppInterface(requireContext(), (activity as MainActivity)), "AndroidBridge")

        val webSettings: WebSettings = webView.settings
        if (webSettings != null) {
            webSettings.javaScriptEnabled = true
            webSettings.cacheMode = WebSettings.LOAD_NO_CACHE
            webSettings.domStorageEnabled = true // DOM 저장소 활성화
        }
        // carId가 null이 아니면 웹뷰 URL에 carId를 포함시킴
        if (carId != null) {
            val url = "http://mycarf0r.me/payments/$carId/balance/process"  // carId를 URL에 포함
            val token = SharedPrefs.getAccessToken(requireContext())
            webView.loadUrl(url, mapOf("Authorization" to "$token"))
        }


        webView.webViewClient = WebViewClient()
        webView.webChromeClient = WebChromeClient()
    }

    // 뒤로가기 버튼 처리
    private fun onBackPressed() {
        // 웹뷰가 뒤로 갈 수 없을 때 원래 프래그먼트로 돌아가기
        if (!webView.canGoBack()) {
            parentFragmentManager.popBackStack() // 원래 프래그먼트로 돌아가기
            showUI() // 툴바와 네비게이션 바 보이기
        } else {
            webView.goBack() // 웹뷰에서 뒤로 가기
        }
    }

    fun showUI() {
        toolbar.visibility = View.VISIBLE
        bottomNavigation.visibility = View.VISIBLE
    }

    private fun hideUI() {
        toolbar.visibility = View.GONE
        bottomNavigation.visibility = View.GONE
    }

    override fun onDestroyView() {
        super.onDestroyView()
    }

    override fun onDestroy() {
        super.onDestroy()
    }
}