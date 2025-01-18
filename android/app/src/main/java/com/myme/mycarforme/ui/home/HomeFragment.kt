package com.myme.mycarforme.ui.home

import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.LinearLayoutManager
import com.myme.mycarforme.data.model.Car
import com.myme.mycarforme.data.network.DataManager
import com.myme.mycarforme.databinding.FragmentHomeBinding

class HomeFragment : Fragment() {

    private var _binding: FragmentHomeBinding? = null
    private val binding get() = _binding!!
//
//    private val carViewModel: HomeViewModel by activityViewModels()
//    private var popularCar = carViewModel.popularCar
//    private var mmCar = carViewModel.mmCar
//    private var nextCar = carViewModel.nextCar
    private var popularCar = ArrayList<Car>()
    private var mmCar = ArrayList<Car>()
    private var nextCar = ArrayList<Car>()

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentHomeBinding.inflate(inflater, container, false)

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
        loadCarData()
        return binding.root
    }

    private fun loadCarData() {
        context?.let {
            Log.d("chk","hey")
            // 각 데이터를 비동기적으로 로드하고 콜백을 통해 RecyclerView에 세팅
            DataManager.getCarsListwithUrl(it, "popular") { cars ->
                popularCar = cars
//                carViewModel.updatePopularCarList(cars)
                updateRecyclerView()
            }
            DataManager.getCarsListwithUrl(it, "mmscores") { cars ->
                mmCar = cars
//                carViewModel.updatemmCarList(cars)
                updateRecyclerView()
            }
            DataManager.getCarsListwithUrl(it, "sales") { cars ->
                nextCar = cars
//                carViewModel.updatenextCarList(cars)
                updateRecyclerView()
            }
        }
    }

    private fun updateRecyclerView() {
        // 데이터가 로드되면 RecyclerView 업데이트
        binding.homePopularRecyclerview.adapter = InfoCardAdapter(items = popularCar)
        binding.homePopularRecyclerview.layoutManager = LinearLayoutManager(context, LinearLayoutManager.HORIZONTAL, false)
        binding.homeFutureRecyclerview.adapter = InfoCardAdapter(items = mmCar)
        binding.homeFutureRecyclerview.layoutManager = LinearLayoutManager(context, LinearLayoutManager.HORIZONTAL, false)
        binding.homeNextRecyclerview.adapter = InfoCardAdapter(items = nextCar)
        binding.homeNextRecyclerview.layoutManager = LinearLayoutManager(context, LinearLayoutManager.HORIZONTAL, false)
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
