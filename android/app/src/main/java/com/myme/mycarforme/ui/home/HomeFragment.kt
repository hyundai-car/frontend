package com.myme.mycarforme.ui.home

import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.lifecycle.Observer
import androidx.recyclerview.widget.LinearLayoutManager
import com.myme.mycarforme.MainActivity
import com.myme.mycarforme.MainViewModel
import com.myme.mycarforme.data.model.Car
import com.myme.mycarforme.data.network.DataManager
import com.myme.mycarforme.databinding.FragmentHomeBinding

class HomeFragment : Fragment() {

    private var _binding: FragmentHomeBinding? = null
    private val binding get() = _binding!!
    private lateinit var mainViewModel: MainViewModel

    private lateinit var popularAdapter: InfoCardAdapter
    private lateinit var mmAdapter: InfoCardAdapter
    private lateinit var nextAdapter: InfoCardAdapter


    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentHomeBinding.inflate(inflater, container, false)
        mainViewModel = (activity as MainActivity).mainViewModel
        // 이벤트 이미지 클릭 리스너
        val imageLinks = mapOf(
            binding.homeEventimage1 to "https://certified.hyundai.com/m/display/getSpdpInfo.do?catNo=80000010332",
            binding.homeEventimage2 to "https://certified.hyundai.com/m/display/getSpdpInfo.do?catNo=80000010333",
            binding.homeEventimage3 to "https://certified.hyundai.com/m/display/getSpdpInfo.do?catNo=80000010325",
            binding.homeEventimage4 to "https://certified.hyundai.com/m/display/getSpdpInfo.do?catNo=80000010326",
            binding.homeEventimage5 to "https://certified.hyundai.com/m/display/getSpdpInfo.do?catNo=80000010327",
            binding.homeEventimage6 to "https://certified.hyundai.com/m/display/getSpdpInfo.do?catNo=80000010328"
        )

        for ((imageView, url) in imageLinks) {
            imageView.setOnClickListener {
                openLink(url)
            }
        }

        popularAdapter = InfoCardAdapter(items = ArrayList(), requireContext(), CardType.Normal, mainViewModel)
        mmAdapter = InfoCardAdapter(items = ArrayList(), requireContext(), CardType.Normal, mainViewModel)
        nextAdapter = InfoCardAdapter(items = ArrayList(), requireContext(), CardType.Normal, mainViewModel)

        binding.homePopularRecyclerview.layoutManager = LinearLayoutManager(context, LinearLayoutManager.HORIZONTAL, false)
        binding.homeFutureRecyclerview.layoutManager = LinearLayoutManager(context, LinearLayoutManager.HORIZONTAL, false)
        binding.homeNextRecyclerview.layoutManager = LinearLayoutManager(context, LinearLayoutManager.HORIZONTAL, false)

        binding.homePopularRecyclerview.adapter = popularAdapter
        binding.homeFutureRecyclerview.adapter = mmAdapter
        binding.homeNextRecyclerview.adapter = nextAdapter

        observeLiveData()

        return binding.root
    }

    private fun observeLiveData() {
        mainViewModel.popularCars.observe(viewLifecycleOwner, Observer { cars ->
            // popularCars 데이터가 변경되면 RecyclerView 갱신
            popularAdapter.updateItems(cars)
        })

        mainViewModel.mmCars.observe(viewLifecycleOwner, Observer { cars ->
            // mmCars 데이터가 변경되면 RecyclerView 갱신
            mmAdapter.updateItems(cars)
        })

        mainViewModel.nextCars.observe(viewLifecycleOwner, Observer { cars ->
            // nextCars 데이터가 변경되면 RecyclerView 갱신
            nextAdapter.updateItems(cars)
        })
    }

    private fun openLink(url: String) {
        val intent = Intent(Intent.ACTION_VIEW, Uri.parse(url))
        startActivity(intent)
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}
