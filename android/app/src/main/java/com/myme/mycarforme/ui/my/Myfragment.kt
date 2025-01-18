package com.myme.mycarforme.ui.my

import android.content.Intent
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import androidx.recyclerview.widget.LinearLayoutManager
import com.myme.mycarforme.MainActivity
import com.myme.mycarforme.MainViewModel
import com.myme.mycarforme.data.model.Car
import com.myme.mycarforme.databinding.FragmentMyBinding
import com.myme.mycarforme.ui.home.CardType
import com.myme.mycarforme.ui.home.InfoCardAdapter
import com.myme.mycarforme.ui.map.MapActivity

class MyFragment : Fragment() {

    private var _binding: FragmentMyBinding? = null
    private val binding get() = _binding!!

    private lateinit var viewModel: MainViewModel
    private lateinit var likeCarsAdapter: InfoCardAdapter
    private lateinit var recommendedCarsAdapter: InfoCardAdapter
    private lateinit var orderedCarsAdapter: InfoCardAdapter

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentMyBinding.inflate(inflater, container, false)
        val root: View = binding.root

        viewModel = (activity as MainActivity).mainViewModel
        setupUI()
        observeViewModel()

        return root
    }

    private fun setupUI() {
        // ProgressBar 설정
        val progressBarView = binding.myProgressbar
        val stepLabels = listOf("계약금 입금", "잔금 결제", "탁송 시작", "탁송 완료")
        progressBarView.setupSteps(stepCount = 4, labels = stepLabels)
        progressBarView.updateSteps(3)

        binding.myProgressbutton.setup("배송 현황 보기") {
            buttonTap()
        }

        // RecyclerView 설정
        likeCarsAdapter = InfoCardAdapter(ArrayList(), requireContext(), CardType.My, viewModel)
        recommendedCarsAdapter = InfoCardAdapter(ArrayList(), requireContext(), CardType.Normal, viewModel)
        orderedCarsAdapter = InfoCardAdapter(ArrayList(), requireContext(), CardType.Order, viewModel)

        binding.myLikeRecyclerview.apply {
            adapter = likeCarsAdapter
            layoutManager = LinearLayoutManager(context, LinearLayoutManager.HORIZONTAL, false)
        }

        binding.myRecommendRecyclerview.apply {
            adapter = recommendedCarsAdapter
            layoutManager = LinearLayoutManager(context, LinearLayoutManager.HORIZONTAL, false)
        }

        binding.myOrderRecyclerview.apply {
            adapter = orderedCarsAdapter
            layoutManager = LinearLayoutManager(context, LinearLayoutManager.HORIZONTAL, false)
        }

        // 사용자 이름 설정
        binding.myUserNameText.text = "사용자 이름" // 실제 데이터 사용 시 업데이트 필요
    }

    private fun observeViewModel() {
        // 좋아요한 차량 데이터 관찰
        viewModel.likeCars.observe(viewLifecycleOwner) { cars ->
            likeCarsAdapter.updateItems(cars)
            binding.myUserLikeCount.text = cars.size.toString()
            binding.myUserLikeSectionCount.text = cars.size.toString()
        }

        // 추천 차량 데이터 관찰
        viewModel.recommendedCars.observe(viewLifecycleOwner) { cars ->
            recommendedCarsAdapter.updateItems(cars)
            binding.myUserHistoryCountText.text = cars.size.toString()
            binding.myUserHistorySectionCountText.text = cars.size.toString()
        }

        // 주문한 차량 데이터 관찰
        viewModel.orderCars.observe(viewLifecycleOwner) { cars ->
            orderedCarsAdapter.updateItems(cars.map { Car(it.carId,it.carName,it.initalRegistration,it.mileage,it.sellingPrice,it.mainImage,0.0,true,it.likecount,"none","none") }) // OrderedCarResponse를 Car로 변환
            binding.myUserOrderCountText.text = cars.size.toString()
            binding.myUserOrderSectionText.text = cars.size.toString()
        }
    }

    private fun buttonTap() {
        val intent = Intent(requireContext(), MapActivity::class.java)
        startActivity(intent)
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}
