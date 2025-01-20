package com.myme.mycarforme.ui.my

import android.content.Intent
import android.os.Bundle
import android.provider.ContactsContract.Data
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.appcompat.app.AppCompatActivity
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.LinearLayoutManager
import com.myme.mycarforme.MainActivity
import com.myme.mycarforme.MainViewModel
import com.myme.mycarforme.R
import com.myme.mycarforme.data.model.Car
import com.myme.mycarforme.data.network.DataManager
import com.myme.mycarforme.data.utils.SharedPrefs
import com.myme.mycarforme.databinding.FragmentMyBinding
import com.myme.mycarforme.ui.DetailFragment
import com.myme.mycarforme.ui.PayFragment
import com.myme.mycarforme.ui.home.CardType
import com.myme.mycarforme.ui.home.InfoCardAdapter
import com.myme.mycarforme.ui.map.MapActivity

class MyFragment : Fragment() {

    private var _binding: FragmentMyBinding? = null
    private val binding get() = _binding!!

    private lateinit var viewModel: MainViewModel
    private lateinit var toolbar: View
    private lateinit var bottomNavigation: View
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
        toolbar = requireActivity().findViewById(R.id.main_toolbar)
        bottomNavigation = requireActivity().findViewById(R.id.nav_view)
        toolbar.visibility = View.VISIBLE
        bottomNavigation.visibility = View.VISIBLE
        setupUI()
        observeViewModel()

        return root
    }

    private fun setupUI() {

        val userInfo = SharedPrefs.getUserInfo(requireContext())
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
        binding.myUserNameText.text = userInfo!!.name // 실제 데이터 사용 시 업데이트 필요
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
            recommendedCarsAdapter.updateReItems(cars)
            binding.myUserHistoryCountText.text = cars.size.toString()
            binding.myUserHistorySectionCountText.text = cars.size.toString()
        }

        // 주문한 차량 데이터 관찰
        activity?.runOnUiThread {
            viewModel.orderCars.observe(viewLifecycleOwner) { cars ->
                orderedCarsAdapter.updateItems(cars.map { Car(it.carId,it.carName,it.initialRegistration,it.mileage,it.sellingPrice,it.mainImage,0.0,true,it.likecount,"none","none") }) // OrderedCarResponse를 Car로 변환
                binding.myUserOrderCountText.text = cars.size.toString()
                binding.myUserOrderSectionText.text = cars.size.toString()
            }
        }


        viewModel._userStatus.observe(viewLifecycleOwner) {status->
            setupProgress(status)
            Log.d("chk","$status")
        }
    }

    private fun setupProgress(status: String) {
        val progressBarView = binding.myProgressbar
        val progressButton = binding.myProgressbutton
        val stepLabels = listOf("계약금 입금", "잔금 결제", "탁송 시작", "탁송 완료")

        // UI 업데이트가 메인 스레드에서 실행되도록 보장
        activity?.runOnUiThread {
            Log.d("setupProgress", "Status: $status")  // status 값을 확인하기 위한 로그
            when (status) {
                "CONTRACTED" -> {
                    progressBarView.setupSteps(stepCount = 4, labels = stepLabels)
                    progressBarView.updateSteps(1)
                    binding.myProgressbutton.setup("잔금 결제하기") {
                        goToPaid()
                    }
                }
                "PAID" -> {
                    progressBarView.setupSteps(stepCount = 4, labels = stepLabels)
                    progressBarView.updateSteps(2)
                    binding.myProgressbutton.setup("배송 현황 보기") {
                        goToMap()
                    }
                }
                "DELIVERING" -> {
                    progressBarView.setupSteps(stepCount = 4, labels = stepLabels)
                    progressBarView.updateSteps(3)

                    binding.myProgressbutton.setup("배송 현황 보기") {
                        goToMap()
                    }
                }
                "DELIVERED" -> {
                    progressButton.visibility = View.GONE
                    progressBarView.visibility = View.GONE
                }
                else -> {
                    progressButton.visibility = View.GONE
                    progressBarView.visibility = View.GONE
                }
            }
        }
    }


    private fun goToPaid(){
        val bundle = Bundle()
        bundle.putInt("carId", viewModel.carId)  // carId를 번들로 전달
        val transaction = (context as AppCompatActivity).supportFragmentManager.beginTransaction()
        val payFragment = PayFragment()
        payFragment.arguments = bundle
        transaction.add(R.id.nav_host_fragment_activity_main, payFragment) // 디테일 프래그먼트로 교체
        transaction.addToBackStack(null) // 뒤로가기 스택에 추가
        transaction.commit()

        // 툴바와 네비게이션 바 숨기기
        (context as AppCompatActivity).findViewById<View>(R.id.main_toolbar).visibility = View.GONE
        (context as AppCompatActivity).findViewById<View>(R.id.nav_view).visibility = View.GONE
        viewModel

    }

    private fun goToMap() {
        val intent = Intent(requireContext(), MapActivity::class.java)
        val it = viewModel.getOrderingCar(viewModel.carId)
        if (it != null){
            val tomapCar = Car(it.carId, it.carName, it.carNumber, it.mileage, it.sellingPrice, it.mainImage, 0.0, true, it.likecount, "","")
            intent.putExtra("cardata",tomapCar)
            startActivity(intent)
        }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }

}
